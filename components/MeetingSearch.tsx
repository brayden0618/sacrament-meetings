"use client";

import { useDebouncedCallback } from "use-debounce";
import {
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function MeetingSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();


  const handleSearch = useDebouncedCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      params.set("page", "1");

      router.replace(`${pathname}?${params.toString()}`);
    },
    300
  );


  return (
    <input
      aria-label="Search meetings"
      placeholder="Search meetings..."
      defaultValue={
        searchParams.get("query")?.toString()
      }
      onChange={(e) =>
        handleSearch(e.target.value)
      }
      className="border rounded p-2 w-full mb-6"
    />
  );
}