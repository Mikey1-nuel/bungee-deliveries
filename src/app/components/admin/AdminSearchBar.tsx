// src/app/components/admin/AdminSearchBar.tsx
"use client";

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function AdminSearchBar({
  value,
  onChange,
  placeholder,
}: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder ?? "Search..."}
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#E95322]/30"
    />
  );
}
