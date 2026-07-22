"use client";

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="max-w-xl mx-auto p-8 text-center">

      <h1 className="text-3xl font-bold text-red-600 mb-4">
        Something went wrong
      </h1>

      <p className="mb-6">
        {error.message || "An unexpected error occurred."}
      </p>

      <div className="flex justify-center gap-4">

        <button
          onClick={reset}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Back to Meetings
        </Link>

      </div>

    </main>
  );
}