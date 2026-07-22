"use client";

import { deleteMeetingAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

interface DeleteMeetingButtonProps {
  id: number;
}

export default function DeleteMeetingButton({
  id,
}: DeleteMeetingButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = confirm(
      "Are you sure you want to delete this meeting?"
    );

    if (!confirmed) {
      return;
    }

    await deleteMeetingAction(id);

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Delete
    </button>
  );
}