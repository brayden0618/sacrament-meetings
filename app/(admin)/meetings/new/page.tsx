import MeetingForm from "@/components/MeetingForm";

export default function NewMeetingPage() {
  return (
    <main className="max-w-2xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Create Meeting
      </h1>

      <MeetingForm />

    </main>
  );
}