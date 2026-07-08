import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return NextResponse.json(
      { error: "Invalid meeting id" },
      { status: 400 }
    );
  }

  const meeting = getMeetingById(id);

  if (!meeting) {
    return NextResponse.json(
      { error: "Meeting not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(meeting);
}