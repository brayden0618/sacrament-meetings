import Link from "next/link";
import { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <Link href={`/meetings/${meeting.id}`}>
      <article className="border rounded-lg shadow p-6 mb-6 bg-white hover:shadow-lg hover:bg-gray-50 transition cursor-pointer">
        <h2 className="text-2xl font-bold mb-2">
          {meeting.date}
        </h2>

        <p>
          <strong>Meeting Type:</strong> {meeting.meetingType}
        </p>

        <p>
          <strong>Presiding:</strong> {meeting.presiding}
        </p>

        <p>
          <strong>Conducting:</strong> {meeting.conducting}
        </p>

        <div className="mt-4">
          <strong>Speakers:</strong>

          {meeting.speakers.length > 0 ? (
            <ul className="list-disc ml-6 mt-1">
              {meeting.speakers.map((speaker, index) => (
                <li key={index}>
                  {speaker.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No speakers assigned.</p>
          )}
        </div>

        <p className="mt-4 text-blue-600 font-semibold">
          Click to view the complete meeting →
        </p>
      </article>
    </Link>
  );
}