import Link from "next/link";
import DeleteMeetingButton from "./DeleteMeetingButton";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">

      <h2 className="text-2xl font-bold mb-4">
        Sacrament Meeting - {meeting.date}
      </h2>

      <p>
        <strong>Meeting Type:</strong>{" "}
        {meeting.meetingType}
      </p>

      <p>
        <strong>Presiding:</strong>{" "}
        {meeting.presiding}
      </p>

      <p>
        <strong>Conducting:</strong>{" "}
        {meeting.conducting}
      </p>


      <hr className="my-4" />


      <h3 className="text-xl font-semibold">
        Opening Hymn
      </h3>

      <p>
        #{meeting.openingHymn.number} -{" "}
        {meeting.openingHymn.title}
      </p>


      <h3 className="text-xl font-semibold mt-4">
        Speakers
      </h3>

      {meeting.speakers.length > 0 ? (
        <ul className="list-disc ml-6">
          {meeting.speakers.slice(0, 2).map((speaker, index) => (
            <li key={index}>
              <strong>{speaker.name}</strong>
              {" - "}
              {speaker.topic}
            </li>
          ))}
        </ul>
      ) : (
        <p>No speakers assigned.</p>
      )}


      <div className="flex gap-6 mt-6">

        <Link
          href={`/meetings/${meeting.id}`}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          View
        </Link>

        <Link
          href={`/meetings/${meeting.id}/edit`}
          className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </Link>

        <DeleteMeetingButton id={meeting.id} />

      </div>

    </div>
  );
}