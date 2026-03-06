// /api/leads/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/prisma";

const MAP = {
  new: "NEW",
  contacted: "CONTACTED",
  scheduled: "SCHEDULED",
  converted: "CONVERTED",
  lost: "LOST",
} as const;

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const lead = await db.lead.findById(params.id);
  if (!lead)
    return NextResponse.json({ success: false, error: "Lead not found" });

  return NextResponse.json({ success: true, lead });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  if (body.status && !MAP[body.status])
    return NextResponse.json({ success: false, error: "Invalid status" });

  const lead = await db.lead.update(params.id, {
    status: body.status ? MAP[body.status] : undefined,
    notes: body.notes ?? undefined,
  });

  return NextResponse.json({ success: true, lead });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await db.lead.delete(params.id);
  return NextResponse.json({ success: true });
}
