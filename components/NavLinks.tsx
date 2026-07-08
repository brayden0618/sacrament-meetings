"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const linkStyle = (path: string) =>
    pathname === path
      ? "text-blue-600 font-bold underline"
      : "text-gray-700 hover:text-blue-600";

  return (
    <nav className="flex gap-6 py-4">
      <Link href="/" className={linkStyle("/")}>
        Home
      </Link>

      <Link href="/meetings" className={linkStyle("/meetings")}>
        Meetings
      </Link>

      <Link href="/meetings/current" className={linkStyle("/meetings/current")}>
        Current Meeting
      </Link>
    </nav>
  );
}