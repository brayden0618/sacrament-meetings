import MeetingDetail from "@/components/MeetingDetail";
import { getMeetingById } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const meetingId = Number(id);

  if (isNaN(meetingId)) {
    return <h1>Invalid meeting ID</h1>;
  }

  const meeting = await getMeetingById(meetingId);

  if (!meeting) {
    return <h1>Meeting not found.</h1>;
  }

  return <MeetingDetail meeting={meeting} />;
}