import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to the YSA 1st Ward Sacrament Meeting Planner
      </h1>

      <p className="text-lg mb-6">
        This application allows members of the bishopric to view and manage
        sacrament meeting agendas.
      </p>

      <Link
        href="/meetings"
        className="bg-blue-900 text-white px-4 py-2 rounded"
      >
        View Meetings
      </Link>
    </main>
  );
}
