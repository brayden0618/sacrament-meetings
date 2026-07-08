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
        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        View Meetings
      </Link>
    </main>
  );
}
