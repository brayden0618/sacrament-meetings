import MeetingDetail from "@/components/MeetingDetail";
import { SacramentMeeting } from "@/lib/types";

async function getMeeting(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/meetings/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return null;
  }

  return res.json();
}

export default async function MeetingPage({
  params,
}: {
  params: { id: string };
}) {
  const meeting: SacramentMeeting | null =
    await getMeeting(params.id);

  if (!meeting) {
    return <h1>Meeting not found.</h1>;
  }

  return <MeetingDetail meeting={meeting} />;
}