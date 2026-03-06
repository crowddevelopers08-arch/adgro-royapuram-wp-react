// /api/contact-form/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const leads = await db.lead.findMany();
  return NextResponse.json({ success: true, leads });
}

export async function POST(req: NextRequest) {
  let leadId: string | undefined;

  try {
    const body = await req.json();

    const data = {
      name: (body.name ?? "").trim(),
      mobile: (body.mobile ?? body.phone ?? "").trim(),
      email: (body.email ?? "").trim(),
      concern: (body.concern ?? body.treatment ?? "").trim(),
      treatment: (body.treatment ?? "").trim(),
      procedure: (body.procedure ?? "").trim(),
      message: body.message ?? "",
      hairLossStage: (body.hairLossStage ?? "").trim(),
      source: (body.source ?? "contact-form").trim(),
      formName: (body.formName ?? body.source ?? "contact-form").trim(),
    };

    if (!data.name || !data.mobile || !data.email || !data.concern)
      return NextResponse.json(
        { success: false, error: "Required fields missing" },
        { status: 400 }
      );

    const lead = await db.lead.create({
      name: data.name,
      phone: data.mobile,
      email: data.email,
      concern: data.concern,
      treatment: data.treatment || data.concern,
      procedure: data.procedure || null,
      message: data.message,
      formName: data.formName,
      source: data.source,
      consent: true,
      status: "NEW",
      hairLossStage: data.hairLossStage || null,
      telecrmSynced: false,
    });

    leadId = lead.id;

    return NextResponse.json(
      { success: true, leadId: lead.id, lead },
      { status: 201 }
    );
  } catch (err: any) {
    if (leadId) {
      await db.lead.update(leadId, {
        status: "LOST",
        error: err?.message ?? "Failed submission",
      });
    }

    return NextResponse.json(
      { success: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
