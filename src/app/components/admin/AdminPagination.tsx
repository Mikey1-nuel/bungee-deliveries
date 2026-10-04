// src/app/components/admin/AdminPagination.tsx
"use client";

interface Props {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function AdminPagination({
  page,
  totalPages,
  onPrev,
  onNext,
}: Props) {
  return (
    <div className="mt-6 flex items-center justify-between">
      <p className="text-sm text-gray-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <button
          disabled={page <= 1}
          onClick={onPrev}
          className="border rounded-lg px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-50 transition"
        >
          Previous
        </button>
        <button
          disabled={page >= totalPages}
          onClick={onNext}
          className="border rounded-lg px-4 py-2 text-sm disabled:opacity-40 hover:bg-gray-50 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
}
