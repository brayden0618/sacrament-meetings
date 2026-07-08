import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-4xl font-bold mb-6">
        Sacrament Meeting
      </h1>

      <p><strong>Date:</strong> {meeting.date}</p>

      <p><strong>Meeting Type:</strong> {meeting.meetingType}</p>

      <p><strong>Presiding:</strong> {meeting.presiding}</p>

      <p><strong>Conducting:</strong> {meeting.conducting}</p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Opening
      </h2>

      <p>
        <strong>Opening Hymn:</strong>{" "}
        #{meeting.openingHymn.number} - {meeting.openingHymn.title}
      </p>

      <p>
        <strong>Opening Prayer:</strong>{" "}
        {meeting.openingPrayer}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Ward Business
        </h2>
          
        <p className="mt-4">
            <strong>Stake Business:</strong>
            {meeting.stakeBusiness ? "Yes" : "No"}
       </p>

      <ul className="list-disc ml-6">
        {meeting.wardBusiness.map((item, index) => (
          <li key={index}>
            {item.description}
          </li>
        ))}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Sacrament Hymn
      </h2>

      <p>
        #{meeting.sacramentHymn.number} -{" "}
        {meeting.sacramentHymn.title}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Speakers
      </h2>

      <ul className="space-y-2">
        {meeting.speakers.map((speaker, index) => (
          <li key={index}>
            <strong>{speaker.name}</strong>

            {speaker.type === "speaker"
              ? ` — ${speaker.topic}`
              : " (Musical Number)"}
          </li>
        ))}
      </ul>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Closing
      </h2>

      <p>
        <strong>Closing Hymn:</strong>{" "}
        #{meeting.closingHymn.number} -{" "}
        {meeting.closingHymn.title}
      </p>

      <p>
        <strong>Closing Prayer:</strong>{" "}
        {meeting.closingPrayer}
      </p>

      {meeting.announcements && meeting.announcements.length > 0 && (
        <>
          <hr className="my-6" />

          <h2 className="text-2xl font-semibold mb-2">
            Announcements
          </h2>

          <ul className="list-disc ml-6">
            {meeting.announcements.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}