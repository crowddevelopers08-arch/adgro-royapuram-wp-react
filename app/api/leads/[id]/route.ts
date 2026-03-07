import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { success: false, error: "Status is required" },
        { status: 400 }
      );
    }

    const updatedLead = await db.lead.update({
      where: { id },
      data: {
        status: status.toUpperCase(),
      },
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error("Error updating lead status:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update lead status" },
      { status: 500 }
    );
  }
}