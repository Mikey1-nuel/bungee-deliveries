"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useNotificationStore } from "@/app/store/notificationStore";
import { useMutation } from "@apollo/client/react";
import { MarkNotificationAsReadDocument } from "@/generated/graphql";
import { useAuth } from "@/context/authContext";

const getIcon = (type: string) => {
  switch (type) {
    case "order_created":
      return "🛎️";
    case "order_accepted":
      return "👍";
    case "order_rejected":
      return "❌";
    case "order_preparing":
      return "👨‍🍳";
    case "order_ready":
      return "📦";
    case "order_picked_up":
      return "🛵";
    case "order_delivered":
      return "🎉";
    case "order_cancelled":
      return "🚫";
    case "order_assigned":
      return "🛵";
    case "batch_accepted":
      return "✅";
    case "batch_rejected":
      return "⚠️";
    case "payment_success":
      return "💳";
    case "offer":
      return "🏷️";
    default:
      return "🔔";
  }
};

const formatTimestamp = (createdAt: string): string => {
  if (!createdAt) return "";

  let created: Date;

  // Handle Unix millisecond string (e.g. "1753027200000")
  const asNumber = Number(createdAt);
  if (!isNaN(asNumber) && asNumber > 1_000_000_000_000) {
    created = new Date(asNumber);
  } else {
    // Fallback: ISO string or any other parseable format
    created = new Date(createdAt);
  }

  // Guard against genuinely invalid dates
  if (isNaN(created.getTime())) return "Just now";

  const now = new Date();
  const diffMs = now.getTime() - created.getTime();

  // Handle future timestamps (clock skew)
  if (diffMs < 0) return "Just now";

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  if (weeks < 4) return `${weeks}w ago`;

  return created.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: created.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};

// NotificationPage.tsx
const ROLE_HOME: Record<string, string> = {
  customer: "/dashboard",
  restaurant: "/dashboard/restaurant_dash",
  admin: "/dashboard/admin",
  rider: "/dashboard/rider",
  logistics: "/dashboard/logistics",
};

export default function NotificationPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotificationStore();
  const [markNotification] = useMutation(MarkNotificationAsReadDocument);

  const handleClick = async (n: any) => {
    if (!n.read) {
      markAsRead(n.id);
      await markNotification({ variables: { notificationId: n.id } });
    }

    // The backend already generated the correct deep link for this
    // recipient at creation time — use it directly.
    const destination = n.action_url || ROLE_HOME[user?.role ?? "customer"];
    router.push(destination);
  };

  return (
    <main className="min-h-screen bg-white rounded-[30px_30px_0_0]">
      <div className="bg-white rounded-[30px_30px_0_0] p-[35px_45px]">
        <div className="max-w-xl">
          <div className="border-b flex justify-between items-center mb-4 pb-3">
            <h2 className="font-semibold text-lg text-[#391713]">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <span className="text-sm text-[#E95322] font-medium">
                {unreadCount} new
              </span>
            )}
          </div>

          {notifications.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-10">
              No notifications yet
            </p>
          ) : (
            <div className="space-y-3">
              {notifications.map((n) => (
                <motion.div
                  key={n.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClick(n)}
                  className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                    !n.read
                      ? "bg-orange-50 border-orange-100"
                      : "bg-white border-gray-100"
                  }`}
                >
                  {/* TOP ROW — icon + title + timestamp */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-semibold text-sm text-[#391713] leading-snug">
                      {getIcon(n.type)} {n.title}
                    </h3>
                    <span className="text-[11px] text-gray-400 whitespace-nowrap mt-0.5 shrink-0">
                      {formatTimestamp(n.created_at)}
                    </span>
                  </div>

                  {/* MESSAGE */}
                  <p className="text-sm text-gray-500 mt-1 leading-snug">
                    {n.message}
                  </p>

                  {/* UNREAD DOT */}
                  {!n.read && (
                    <div className="flex justify-end mt-2">
                      <span className="w-2 h-2 rounded-full bg-[#E95322]" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
