import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <div className="border rounded-lg shadow p-6 mb-4">
      <h2 className="text-2xl font-semibold">
        {meeting.date}
      </h2>

      <p>
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>

      <p>
        <strong>Conducting:</strong> {meeting.conducting}
      </p>

      <p>
        <strong>Presiding:</strong> {meeting.presiding}
      </p>

      <Link
        href={`/meetings/${meeting.id}`}
        className="text-blue-600 hover:underline"
      >
        View Details
      </Link>
    </div>
  );
}