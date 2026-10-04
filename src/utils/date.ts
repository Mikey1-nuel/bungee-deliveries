export const formatDateTime = (
  value?: string | number | null,
  options?: Intl.DateTimeFormatOptions,
) => {
  if (!value) return "-";

  const timestamp =
    typeof value === "string" && /^\d+$/.test(value) ? Number(value) : value;

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    ...options,
  }).format(date);
};

export const formatDate = (
  value?: string | number |null
) => {
  if (!value) return "-";

  const timestamp =
    typeof value === "string" && /^\d+$/.test(value)
      ? Number(value)
      : value;

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

export const formatTime = (
  value?: string | number | null
) => {
  if (!value) return "-";

  const timestamp =
    typeof value === "string" && /^\d+$/.test(value)
      ? Number(value)
      : value;

  const date = new Date(timestamp);

  if (isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};
