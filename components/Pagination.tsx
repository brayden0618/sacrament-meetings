"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";


export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {

  const searchParams = useSearchParams();

  const query = searchParams.get("query");


  return (
    <nav
      aria-label="Pagination navigation"
      className="flex gap-4 mt-8"
    >

      {currentPage > 1 && (
        <Link
          className="border px-4 py-2 rounded"
          href={`/meetings?page=${currentPage - 1}${
            query ? `&query=${query}` : ""
          }`}
        >
          Previous
        </Link>
      )}


      <span className="px-4 py-2">
        Page {currentPage} of {totalPages}
      </span>


      {currentPage < totalPages && (
        <Link
          className="border px-4 py-2 rounded"
          href={`/meetings?page=${currentPage + 1}${
            query ? `&query=${query}` : ""
          }`}
        >
          Next
        </Link>
      )}

    </nav>
  );
}