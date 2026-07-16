import { NextRequest, NextResponse } from "next/server";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const date = searchParams.get("date") ?? undefined;

  const meetings = await getMeetings(date);

  return NextResponse.json(meetings);
}