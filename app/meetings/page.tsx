import MeetingCard from "@/components/MeetingCard";
import { SacramentMeeting } from "@/lib/types";

async function getMeetings() {
  const res = await fetch("http://localhost:3000/api/meetings", {
    cache: "no-store",
  });

  return res.json();
}

export default async function MeetingsPage() {
  const meetings: SacramentMeeting[] = await getMeetings();

  return (
    <div>
      <h1 className="text-4xl font-bold mb-6">
        All Meetings
      </h1>

      {meetings.map((meeting) => (
        <MeetingCard
          key={meeting.id}
          meeting={meeting}
        />
      ))}
    </div>
  );
}