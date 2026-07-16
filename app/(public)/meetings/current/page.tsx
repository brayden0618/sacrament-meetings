import { redirect } from "next/navigation";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function CurrentMeetingPage() {
  const today = new Date();

  const meetings = await getMeetings();

  const currentMeeting = meetings.find((meeting) => {
    const meetingDate = new Date(meeting.date);

    return meetingDate <= today;
  });

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  }

  return (
    <h1>
      No current meeting found.
    </h1>
  );
}