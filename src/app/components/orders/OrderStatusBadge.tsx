import { OrderStatus } from "@/app/types/type";

interface Props {
  status: OrderStatus;
}

export default function OrderStatusBadge({ status }: Props) {
  const styles: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",

    accepted: "bg-blue-100 text-blue-700",

    preparing: "bg-orange-100 text-orange-700",

    ready_for_pickup: "bg-purple-100 text-purple-700",

    picked_up: "bg-indigo-100 text-indigo-700",

    delivered: "bg-green-100 text-green-700",

    cancelled: "bg-red-100 text-red-700",

    rejected: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${styles[status]}
      `}
    >
      {status.replaceAll("_", " ")}
    </span>
  );
}
