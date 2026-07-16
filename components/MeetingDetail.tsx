import { SacramentMeeting } from "@/lib/types";

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps) {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow">
      <h1 className="text-4xl font-bold mb-6">
        Sacrament Meeting – {meeting.date}
      </h1>

      <p>
        <strong>Meeting Type:</strong> {meeting.meetingType}
      </p>

      <p>
        <strong>Presiding:</strong> {meeting.presiding}
      </p>

      <p>
        <strong>Conducting:</strong> {meeting.conducting}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Opening
      </h2>

      <p>
        <strong>Opening Hymn:</strong> #{meeting.openingHymn.number} -{" "}
        {meeting.openingHymn.title}
      </p>

      <p>
        <strong>Opening Prayer:</strong> {meeting.openingPrayer}
      </p>

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Ward Business
      </h2>

      {meeting.wardBusiness.length > 0 ? (
        <ul className="list-disc ml-6">
          {meeting.wardBusiness.map((item, index) => (
            <li key={index}>
              <strong>{item.title}</strong>: {item.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No ward business.</p>
      )}

      {meeting.stakeBusiness && (
        <>
          <h3 className="text-xl font-semibold mt-4">
            Stake Business
          </h3>

          <p>Stake business will be conducted during this meeting.</p>
        </>
      )}

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

      {meeting.speakers.length > 0 ? (
        <ul className="list-disc ml-6">
          {meeting.speakers.map((speaker, index) => (
            <li key={index}>
              <strong>{speaker.name}</strong> — {speaker.topic}
            </li>
          ))}
        </ul>
      ) : (
        <p>No speakers assigned.</p>
      )}

      <hr className="my-6" />

      <h2 className="text-2xl font-semibold mb-2">
        Closing
      </h2>

      <p>
        <strong>Closing Hymn:</strong> #{meeting.closingHymn.number} -{" "}
        {meeting.closingHymn.title}
      </p>

      <p>
        <strong>Closing Prayer:</strong> {meeting.closingPrayer}
      </p>

      {meeting.announcements.length > 0 && (
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