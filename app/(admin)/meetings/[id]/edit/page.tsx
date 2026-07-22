import { notFound } from "next/navigation";

import MeetingForm from "@/components/MeetingForm";

import { getMeetingById } from "@/lib/meetings-db";
import { updateMeetingAction } from "@/lib/actions";


export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

  const meetingId = Number(id);

  const meeting = await getMeetingById(meetingId);


  if (!meeting) {
    notFound();
  }


  return (
    <main className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Edit Meeting
      </h1>


      <MeetingForm
        meeting={meeting}
        formAction={updateMeetingAction.bind(null, meetingId)}
        submitText="Update Meeting"
      />

    </main>
  );
}