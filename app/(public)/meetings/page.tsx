import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import Pagination from "@/components/Pagination";
import { getMeetings } from "@/lib/meetings-db";

export const dynamic = "force-dynamic";

export default async function MeetingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const { query, page } = await searchParams;

  const currentPage = parseInt(page ?? "1");

  const meetings = await getMeetings(
    query ?? "",
    currentPage
  );

  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Sacrament Meetings
      </h1>

      <MeetingSearch />

      <div className="space-y-4 mt-6">
        {meetings.map((meeting) => (
          <MeetingCard
            key={meeting.id}
            meeting={meeting}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(meetings.length / 5)}
      />
    </main>
  );
}