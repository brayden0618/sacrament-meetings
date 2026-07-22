import Link from "next/link";

export default function NotFound() {
  return (
    <main className="max-w-xl mx-auto p-8 text-center">

      <h1 className="text-3xl font-bold mb-4">
        Meeting Not Found
      </h1>

      <p className="mb-6">
        The meeting you are looking for does not exist.
      </p>

      <Link
        href="/meetings"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Back to Meetings
      </Link>

    </main>
  );
}