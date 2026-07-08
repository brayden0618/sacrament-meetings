import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";


export default function MeetingsPage() {

  const meetings = getMeetings();


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