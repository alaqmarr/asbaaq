import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const admins = await db.user.findMany();
    return NextResponse.json(admins);
  } catch (error: any) {
    return NextResponse.json({ error: error.message });
  }
}
