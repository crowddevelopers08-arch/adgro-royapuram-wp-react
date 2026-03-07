import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TELECRM_API_KEY = process.env.TELECRM_API_KEY;
const TELECRM_API_URL = process.env.TELECRM_API_URL;

/**
 * Generate comprehensive form data string with all user details
 */
function generateFormDataString(leadData: any): string {
  const details = [];
  
  if (leadData.name) details.push(`Name: ${leadData.name}`);
  if (leadData.phone) details.push(`Phone: ${leadData.phone}`);
  if (leadData.concern) details.push(`Concern: ${leadData.concern}`);
  if (leadData.hairLossStage) details.push(`Hair Loss Stage: ${leadData.hairLossStage}`);
  if (leadData.pincode) details.push(`PIN Code: ${leadData.pincode}`);
  if (leadData.source) details.push(`Source: ${leadData.source}`);
  if (leadData.pageUrl) details.push(`Page URL: ${leadData.pageUrl}`);
  details.push(`Consent: Yes`);
  
  return details.join(' | ');
}

/**
 * Send lead data to TeleCRM
 */
async function sendToTeleCRM(leadData: any) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  if (!TELECRM_API_URL || !TELECRM_API_KEY) {
    throw new Error('TeleCRM configuration missing');
  }

  try {
    // Format the concerns/procedure text
    const concernsText = leadData.concern || 'Not specified';
    const formDataString = generateFormDataString(leadData);

    const telecrmPayload = {
      fields: {
        Id: "",
        name: leadData.name,
        email: leadData.email || "",
        phone: leadData.phone.replace(/\D/g, ''),
        city_1: leadData.pincode || "",
        message: leadData.message || "",
        select_the_procedure: concernsText,
        Country: "",
        LeadID: "",
        "CreatedOn": new Date().toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }),
        "Lead Stage": "",
        "Lead Status": "new",
        "Lead Request Type": "consultation",
        "PageName": leadData.pageUrl || "https://adgrohairvelachery.in/",
        "State": "",
        "Age": "",
        "FormName": "Hair Consultation Form"
      },
      actions: [
        {
          "type": "SYSTEM_NOTE",
          "text": `Form Name: Hair Consultation Form`
        },
        {
          "type": "SYSTEM_NOTE", 
          "text": `Complete Form Data: ${formDataString}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Lead Source: ${leadData.source || 'Website'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Concern: ${leadData.concern || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Hair Loss Stage: ${leadData.hairLossStage || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `PIN Code: ${leadData.pincode || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Page URL: ${leadData.pageUrl || 'Not specified'}`
        },
        {
          "type": "SYSTEM_NOTE",
          "text": `Consent Given: Yes`
        }
      ]
    };

    console.log("Sending to TeleCRM:", JSON.stringify(telecrmPayload, null, 2));

    const response = await fetch(TELECRM_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TELECRM_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify(telecrmPayload),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // Handle 204 No Content as success
    if (response.status === 204) {
      return { 
        success: true, 
        status: 'success',
        message: 'Lead created (204 No Content)',
        synced: true
      };
    }

    const responseText = await response.text();

    // Check for HTML response
    if (responseText.trim().startsWith('<!DOCTYPE') || 
        responseText.trim().startsWith('<html')) {
      console.warn('TeleCRM returned HTML response');
      throw new Error('TeleCRM returned HTML response instead of JSON');
    }

    try {
      const data = responseText ? JSON.parse(responseText) : {};
      
      if (!response.ok) {
        throw new Error(data.message || `HTTP ${response.status} from TeleCRM`);
      }
      
      return {
        ...data,
        success: true,
        synced: true
      };
    } catch {
      throw new Error(`Invalid JSON from TeleCRM: ${responseText.slice(0, 100)}...`);
    }

  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

export async function POST(req: NextRequest) {
  let savedLead: any = null;

  try {
    const body = await req.json();
    
    // Get the page URL from the request headers or body
    const pageUrl = req.headers.get('referer') || body.pageUrl || 'https://adgrohairvelachery.in/';
    
    console.log("Received form submission:", { ...body, pageUrl });

    const { name, mobile, concern, treatment, message, source, formName, hairLossStage } = body;
    
    // Extract pincode from message
    const pincodeMatch = message?.match(/Pincode:\s*(\d+)/);
    const pincode = pincodeMatch ? pincodeMatch[1] : "";

    // Basic validation
    if (!name || !mobile) {
      return NextResponse.json(
        { success: false, error: "Name and phone are required" },
        { status: 400 }
      );
    }

    // Phone validation
    if (!/^\d{10}$/.test(mobile)) {
      return NextResponse.json(
        { success: false, error: "Invalid phone number. Must be 10 digits" },
        { status: 400 }
      );
    }

    // Step 1: Save to database - USING THE FIXED DB HELPER
    savedLead = await db.lead.create({
      name: name.trim(),
      phone: mobile.trim(),
      concern: concern || treatment || "",
      treatment: concern || treatment || "",
      procedure: concern || treatment || "",
      message: message || "",
      pincode: pincode,
      hairLossStage: hairLossStage || "",
      pageUrl: pageUrl,
      formName: formName || "Hair Consultation Form",
      source: source || "Website",
      consent: true,
      status: "NEW",
      telecrmSynced: false
    });

    console.log("✅ Lead saved to database:", savedLead.id);

    // Step 2: Send to TeleCRM
    let telecrmError = null;
    
    try {
      const telecrmResponse = await sendToTeleCRM({
        name: name.trim(),
        phone: mobile.trim(),
        concern: concern || treatment || "",
        hairLossStage: hairLossStage || "",
        pincode: pincode,
        source: source || "Website",
        message: message || "",
        pageUrl: pageUrl
      });

      console.log("✅ TeleCRM sync successful:", telecrmResponse);

      // Update lead with TeleCRM sync status
      await db.lead.update({
        where: { id: savedLead.id },
        data: {
          telecrmSynced: true,
          telecrmId: telecrmResponse.id || telecrmResponse.leadId,
          syncedAt: new Date()
        }
      });

    } catch (error) {
      telecrmError = error;
      console.error("❌ TeleCRM sync failed:", error);

      // Update lead with error
      await db.lead.update({
        where: { id: savedLead.id },
        data: {
          error: error instanceof Error ? error.message : String(error),
          telecrmSynced: false
        }
      });
    }

    // Always return success to user
    return NextResponse.json({ 
      success: true, 
      leadId: savedLead.id,
      message: "Thank you! We'll contact you soon.",
      telecrmSynced: !telecrmError
    }, { status: 201 });

  } catch (err: any) {
    console.error("Server error:", err);

    // Try to save error lead
    if (!savedLead) {
      try {
        const body = await req.json().catch(() => ({}));
        const pageUrl = req.headers.get('referer') || body.pageUrl || 'https://adgrohairvelachery.in/';
        
        await db.lead.create({
          name: body.name || "Unknown",
          phone: body.mobile || "Unknown",
          error: err?.message || "Server error",
          status: "NEW",
          pageUrl: pageUrl,
          formName: "Hair Consultation Form",
          consent: false,
          telecrmSynced: false
        });
      } catch (dbError) {
        console.error("Failed to save error lead:", dbError);
      }
    }

    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;
    
    // Search & Filters
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const treatment = searchParams.get('treatment') || '';
    const syncStatus = searchParams.get('sync') || '';
    const dateRange = searchParams.get('date') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    // Build where clause
    const where: any = {};

    // Search across multiple fields
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search } },
        { email: { contains: search, mode: 'insensitive' } },
        { concern: { contains: search, mode: 'insensitive' } },
        { treatment: { contains: search, mode: 'insensitive' } },
        { procedure: { contains: search, mode: 'insensitive' } },
        { pincode: { contains: search } },
        { pageUrl: { contains: search, mode: 'insensitive' } },
        { message: { contains: search, mode: 'insensitive' } },
        { hairLossStage: { contains: search, mode: 'insensitive' } }
      ];
    }

    // Filter by status
    if (status && status !== 'all') {
      where.status = status.toUpperCase();
    }

    // Filter by treatment/concerns
    if (treatment && treatment !== 'all') {
      where.OR = where.OR || [];
      where.OR.push(
        { concern: { contains: treatment, mode: 'insensitive' } },
        { treatment: { contains: treatment, mode: 'insensitive' } },
        { procedure: { contains: treatment, mode: 'insensitive' } }
      );
    }

    // Filter by TeleCRM sync status
    if (syncStatus === 'synced') {
      where.telecrmSynced = true;
    } else if (syncStatus === 'unsynced') {
      where.telecrmSynced = false;
    }

    // Filter by date range
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (dateRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          where.createdAt = { gte: startDate };
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          where.createdAt = { gte: startDate };
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          where.createdAt = { gte: startDate };
          break;
      }
    }

    // Get total count for pagination
    const totalCount = await db.lead.count({ where });

    // Get leads with pagination and sorting
    const leads = await db.lead.findMany({
      where,
      orderBy: {
        [sortBy]: sortOrder
      },
      skip,
      take: limit
    });

    // Get statistics for dashboard
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
    const monthAgo = new Date();
    monthAgo.setMonth(monthAgo.getMonth() - 1);

    const [
      totalLeads,
      todayLeads,
      weekLeads,
      monthLeads,
      syncedLeads
    ] = await Promise.all([
      db.lead.count(),
      db.lead.count({
        where: {
          createdAt: {
            gte: today
          }
        }
      }),
      db.lead.count({
        where: {
          createdAt: {
            gte: weekAgo
          }
        }
      }),
      db.lead.count({
        where: {
          createdAt: {
            gte: monthAgo
          }
        }
      }),
      db.lead.count({
        where: {
          telecrmSynced: true
        }
      })
    ]);

    // Get status counts
    const statusCounts = await db.lead.groupBy({
      by: ['status'],
      _count: true
    });

    // Transform the data for frontend
    const transformedLeads = leads.map(lead => ({
      id: lead.id,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      treatment: lead.treatment || lead.concern || lead.procedure || "",
      procedure: lead.procedure || lead.concern || lead.treatment || "",
      concern: lead.concern,
      message: lead.message,
      city: lead.city || lead.pincode,
      age: lead.age,
      pincode: lead.pincode,
      pageUrl: lead.pageUrl,
      consent: lead.consent,
      source: lead.source,
      formName: lead.formName,
      status: lead.status,
      telecrmSynced: lead.telecrmSynced,
      telecrmId: lead.telecrmId,
      hairLossStage: lead.hairLossStage,
      notes: lead.notes,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
      syncedAt: lead.syncedAt?.toISOString() || null
    }));

    // Format stats for frontend
    const stats = {
      total: totalLeads,
      today: todayLeads,
      week: weekLeads,
      month: monthLeads,
      synced: syncedLeads,
      byStatus: statusCounts.reduce((acc: any, curr) => {
        acc[curr.status.toLowerCase()] = curr._count;
        return acc;
      }, {})
    };

    return NextResponse.json({
      success: true,
      leads: transformedLeads,
      stats: stats,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        hasNextPage: page < Math.ceil(totalCount / limit),
        hasPrevPage: page > 1
      },
      filters: {
        search,
        status,
        treatment,
        syncStatus,
        dateRange,
        sortBy,
        sortOrder
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch leads',
        leads: [],
        stats: {
          total: 0,
          today: 0,
          week: 0,
          month: 0,
          synced: 0,
          byStatus: {}
        }
      },
      { status: 500 }
    );
  }
}