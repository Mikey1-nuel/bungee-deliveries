"use client";

import { useState, useEffect }        from "react";
import { useQuery, useMutation }       from "@apollo/client/react";
import Image                           from "next/image";
import {
  GET_MY_BATCHES,
  ACCEPT_DISPATCH_BATCH,
  REJECT_DISPATCH_BATCH,
  UPDATE_ORDER_STATUS,
} from "@/graphql/queries/rider.queries";
import {
  GetMyDispatchBatchesResponse,
  RiderBatch,
  RiderBatchOrder,
  RiderBatchOrderItem,
  DispatchSlot,
} from "@/app/types/type";
import { getChecked, saveChecked, clearChecked } from "@/utils/batchChecklist";
import toast from "react-hot-toast";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const SLOT_META: Record<DispatchSlot, {
  label: string; icon: string; color: string; bg: string;
}> = {
  morning:   { label: "Morning",   icon: "🌅", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200"  },
  afternoon: { label: "Afternoon", icon: "☀️",  color: "text-orange-700", bg: "bg-orange-50 border-orange-200"  },
  evening:   { label: "Evening",   icon: "🌆", color: "text-indigo-700", bg: "bg-indigo-50 border-indigo-200"  },
};

const STATUS_META: Record<string, { label: string; dot: string; badge: string }> = {
  scheduled:   { label: "Scheduled",   dot: "bg-blue-500",   badge: "bg-blue-100   text-blue-700"   },
  in_progress: { label: "In Progress", dot: "bg-orange-500", badge: "bg-orange-100 text-orange-700" },
  completed:   { label: "Completed",   dot: "bg-green-500",  badge: "bg-green-100  text-green-700"  },
  cancelled:   { label: "Cancelled",   dot: "bg-red-400",    badge: "bg-red-100    text-red-600"    },
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending:          "bg-yellow-100 text-yellow-700",
  accepted:         "bg-blue-100   text-blue-700",
  preparing:        "bg-orange-100 text-orange-700",
  ready_for_pickup: "bg-purple-100 text-purple-700",
  picked_up:        "bg-indigo-100 text-indigo-700",
  delivered:        "bg-green-100  text-green-700",
  cancelled:        "bg-red-100    text-red-600",
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const formatScheduled = (ts: string) => {
  const d = new Date(Number(ts));
  return {
    date: d.toLocaleDateString(undefined, {
      weekday: "long", day: "numeric", month: "short", year: "numeric",
    }),
    time: d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" }),
  };
};

const getRelativeTime = (ts: string): string => {
  const diff = new Date(Number(ts)).getTime() - Date.now();
  const abs  = Math.abs(diff);
  const mins = Math.floor(abs / 60000);
  const hrs  = Math.floor(abs / 3600000);
  if (diff > 0) return mins < 60 ? `Starts in ${mins}m` : `Starts in ${hrs}h`;
  return mins < 60 ? `Started ${mins}m ago` : `Started ${hrs}h ago`;
};

const groupByDate = (batches: RiderBatch[]) => {
  const today    = new Date().toDateString();
  const tomorrow = new Date(Date.now() + 86400000).toDateString();
  const groups   = new Map<string, RiderBatch[]>();

  batches.forEach((b) => {
    const d   = new Date(Number(b.scheduledAt)).toDateString();
    const key =
      d === today    ? "Today" :
      d === tomorrow ? "Tomorrow" :
      new Date(Number(b.scheduledAt)).toLocaleDateString(undefined, {
        weekday: "long", day: "numeric", month: "short",
      });
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(b);
  });

  return groups;
};

// ─── ITEM CHECKLIST ──────────────────────────────────────────────────────────
// Persisted in localStorage — survives refetches and page refreshes

function ItemChecklist({
  orderId,
  items,
}: {
  orderId: string;
  items: RiderBatchOrderItem[];
}) {
  const [checked, setChecked] = useState<Set<number>>(() => getChecked(orderId));

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      saveChecked(orderId, next);
      return next;
    });
  };

  const allCollected = checked.size === items.length;

  return (
    <div className="mt-2 flex flex-col gap-1.5">
      <div className="flex items-center justify-between mb-0.5">
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
          Items to collect at restaurant
        </p>
        {allCollected && (
          <span className="text-[10px] text-green-600 font-semibold">✓ All collected</span>
        )}
      </div>
      {items.map((item, i) => (
        <div
          key={i}
          onClick={() => toggle(i)}
          className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer select-none transition ${
            checked.has(i) ? "bg-green-50" : "bg-gray-50 hover:bg-gray-100"
          }`}
        >
          <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
            checked.has(i) ? "bg-green-500 border-green-500" : "border-gray-300"
          }`}>
            {checked.has(i) && (
              <span className="text-white text-[9px] font-bold">✓</span>
            )}
          </div>
          {item.image && (
            <div className="relative w-6 h-6 rounded overflow-hidden shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
          )}
          <span className={`text-xs flex-1 transition ${
            checked.has(i) ? "line-through text-gray-400" : "text-[#391713]"
          }`}>
            {item.name}
            <span className="text-gray-400 ml-1">× {item.quantity}</span>
          </span>
          <span className="text-[10px] text-gray-400 capitalize">{item.type}</span>
        </div>
      ))}
      <p className="text-[10px] text-gray-400 mt-0.5">
        {checked.size}/{items.length} items collected
      </p>
    </div>
  );
}

// ─── ORDER CARD ───────────────────────────────────────────────────────────────

function OrderCard({
  order,
  batchStatus,
  onStatusUpdate,
}: {
  order: RiderBatchOrder;
  batchStatus: string;
  onStatusUpdate: () => void;
}) {
  const [showItems, setShowItems] = useState(false);
  const [updateStatus, { loading }] = useMutation(UPDATE_ORDER_STATUS);

  const handleStatusUpdate = async (newStatus: string) => {
    try {
      await updateStatus({ variables: { orderId: order.id, status: newStatus } });
      toast.success(`Order marked as ${newStatus.replace(/_/g, " ")}`);
      // Clear checklist when picked up (items collected)
      if (newStatus === "picked_up") clearChecked(order.id);
      onStatusUpdate();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const canPickUp  = order.status === "ready_for_pickup" && batchStatus === "in_progress";
  const canDeliver = order.status === "picked_up"        && batchStatus === "in_progress";

  return (
    <div className="border border-gray-100 rounded-xl p-3 bg-white">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold text-[#391713]">#{order.id.slice(0, 8)}</p>
          <p className="text-xs text-gray-500 mt-0.5">🍽️ {order.restaurant}</p>
          <p className="text-xs text-gray-500">👤 {order.customer}</p>
          <p className="text-xs text-gray-400 mt-0.5">📍 {order.deliveryAddress}</p>

          {/* Checklist toggle — only show when in_progress and not yet delivered */}
          {order.items.length > 0 && order.status !== "delivered" && (
            <button
              onClick={() => setShowItems((p) => !p)}
              className="mt-2 text-[11px] text-[#E95322] font-medium hover:underline"
            >
              {showItems
                ? "Hide items ▲"
                : `📋 ${order.items.length} item${order.items.length > 1 ? "s" : ""} to collect ▼`}
            </button>
          )}

          {showItems && <ItemChecklist orderId={order.id} items={order.items} />}

          {/* ACTION BUTTONS */}
          {(canPickUp || canDeliver) && (
            <div className="flex gap-2 mt-2">
              {canPickUp && (
                <button
                  onClick={() => handleStatusUpdate("picked_up")}
                  disabled={loading}
                  className="text-[11px] px-3 py-1 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-50 flex items-center gap-1"
                >
                  {loading && (
                    <span className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  🛵 Mark Picked Up
                </button>
              )}
              {canDeliver && (
                <button
                  onClick={() => handleStatusUpdate("delivered")}
                  disabled={loading}
                  className="text-[11px] px-3 py-1 rounded-full bg-green-600 text-white font-semibold hover:bg-green-700 transition disabled:opacity-50 flex items-center gap-1"
                >
                  {loading && (
                    <span className="w-2.5 h-2.5 border border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  ✅ Mark Delivered
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-1 shrink-0">
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold capitalize ${
            ORDER_STATUS_COLORS[order.status] ?? "bg-gray-100 text-gray-600"
          }`}>
            {order.status.replace(/_/g, " ")}
          </span>
          <p className="text-sm font-bold text-[#E95322]">
            ₦{order.total.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── REJECT MODAL ────────────────────────────────────────────────────────────

function RejectModal({
  onConfirm,
  onCancel,
  loading,
}: {
  onConfirm: (reason: string) => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-5 w-full max-w-sm mx-4 shadow-xl">
        <h3 className="font-bold text-[#391713] mb-2">Reject Batch</h3>
        <p className="text-sm text-gray-500 mb-3">
          Let the admin know why you can't take this batch.
        </p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason (optional)"
          rows={3}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-200 mb-4"
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border rounded-xl py-2 text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(reason)}
            disabled={loading}
            className="flex-1 bg-red-600 text-white rounded-xl py-2 text-sm font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && (
              <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Rejecting..." : "Confirm Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── BATCH CARD ───────────────────────────────────────────────────────────────

function BatchCard({ batch, onRefetch }: { batch: RiderBatch; onRefetch: () => void }) {
  const [expanded,    setExpanded]    = useState(false);
  const [rejectModal, setRejectModal] = useState(false);

  const [acceptBatch, { loading: accepting }] = useMutation(ACCEPT_DISPATCH_BATCH);
  const [rejectBatch, { loading: rejecting }] = useMutation(REJECT_DISPATCH_BATCH);

  const slot      = SLOT_META[batch.slot as DispatchSlot];
  const statusM   = STATUS_META[batch.status] ?? STATUS_META.scheduled;
  const scheduled = formatScheduled(batch.scheduledAt);
  const relative  = getRelativeTime(batch.scheduledAt);

  // Progress is driven by actual order statuses from the server
  const delivered  = batch.orders.filter((o) => o.status === "delivered").length;
  const inTransit  = batch.orders.filter((o) => o.status === "picked_up").length;
  const progress   = batch.orderCount > 0 ? (delivered / batch.orderCount) * 100 : 0;

  // Auto-expand when in_progress so rider sees their work
  useEffect(() => {
    if (batch.status === "in_progress") setExpanded(true);
  }, [batch.status]);

  const handleAccept = async () => {
    try {
      await acceptBatch({ variables: { batchId: batch.id } });
      toast.success("Batch accepted — deliveries started!");
      onRefetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleReject = async (reason: string) => {
    try {
      await rejectBatch({ variables: { batchId: batch.id, reason: reason || undefined } });
      toast.success("Batch rejected. Admin has been notified.");
      setRejectModal(false);
      onRefetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <div className={`border rounded-2xl overflow-hidden ${slot.bg}`}>
        <div className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              {/* Slot + Status */}
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <span className={`text-sm font-bold ${slot.color}`}>
                  {slot.icon} {slot.label} Dispatch
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold flex items-center gap-1 ${statusM.badge}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${statusM.dot}`} />
                  {statusM.label}
                </span>
              </div>

              {/* Date + Time */}
              <p className="text-xs font-semibold text-[#391713]">📅 {scheduled.date}</p>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-xs text-gray-500">🕐 {scheduled.time}</p>
                <span className="text-[10px] text-gray-400">·</span>
                <p className="text-[10px] text-gray-400 italic">{relative}</p>
              </div>
            </div>

            {/* Order count + progress summary */}
            <div className="bg-white border border-white/80 rounded-xl px-3 py-2 text-center shrink-0 shadow-sm">
              <p className="text-xl font-bold text-[#391713]">{delivered}/{batch.orderCount}</p>
              <p className="text-[10px] text-gray-500">Delivered</p>
            </div>
          </div>

          {/* PROGRESS BAR — driven by server order statuses */}
          {batch.orderCount > 0 && batch.status !== "scheduled" && (
            <div className="mt-3">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] text-gray-500">Delivery Progress</p>
                <p className="text-[10px] font-semibold text-[#391713]">
                  {delivered}/{batch.orderCount} delivered
                  {inTransit > 0 && (
                    <span className="text-indigo-500 ml-1.5">· {inTransit} in transit</span>
                  )}
                </p>
              </div>
              <div className="h-2.5 bg-white/60 rounded-full overflow-hidden">
                {/* In-transit overlay */}
                <div className="relative h-full rounded-full overflow-hidden bg-white/30">
                  <div
                    className="absolute inset-y-0 left-0 bg-indigo-300 rounded-full transition-all duration-500"
                    style={{ width: `${((delivered + inTransit) / batch.orderCount) * 100}%` }}
                  />
                  <div
                    className="absolute inset-y-0 left-0 bg-[#E95322] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="flex gap-2 mt-1.5 flex-wrap">
                {batch.orders.filter((o) => o.status === "ready_for_pickup").length > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-purple-100 text-purple-700">
                    {batch.orders.filter((o) => o.status === "ready_for_pickup").length} awaiting pickup
                  </span>
                )}
                {inTransit > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700">
                    {inTransit} in transit
                  </span>
                )}
                {delivered > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">
                    {delivered} delivered
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ACTIONS */}
          <div className="flex gap-2 mt-3 flex-wrap">
            {batch.status === "scheduled" && (
              <>
                <button
                  onClick={handleAccept}
                  disabled={accepting}
                  className="flex-1 bg-[#E95322] text-white text-xs font-semibold py-2 rounded-full hover:bg-[#d14a1e] transition disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {accepting && (
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  )}
                  {accepting ? "Accepting..." : "✓ Accept Batch"}
                </button>
                <button
                  onClick={() => setRejectModal(true)}
                  className="px-4 text-xs font-semibold py-2 rounded-full border border-red-200 text-red-500 hover:bg-red-50 transition"
                >
                  ✕ Reject
                </button>
              </>
            )}

            {batch.status === "in_progress" && (
              <div className="flex-1 bg-green-50 border border-green-200 rounded-full px-4 py-2 text-xs font-semibold text-green-700 text-center">
                🚴 Mark each order picked up or delivered below
              </div>
            )}

            {batch.status === "completed" && (
              <div className="flex-1 bg-green-100 border border-green-200 rounded-full px-4 py-2 text-xs font-semibold text-green-700 text-center">
                🎉 All deliveries completed
              </div>
            )}

            {batch.status === "cancelled" && (
              <div className="flex-1 bg-red-50 border border-red-200 rounded-full px-4 py-2 text-xs font-semibold text-red-500 text-center">
                ✕ Batch rejected
              </div>
            )}

            <button
              onClick={() => setExpanded((p) => !p)}
              className="px-4 text-xs font-semibold py-2 rounded-full bg-white border border-gray-200 text-[#391713] hover:bg-gray-50 transition"
            >
              {expanded ? "Hide Orders ▲" : `View Orders (${batch.orderCount}) ▼`}
            </button>
          </div>
        </div>

        {/* EXPANDED ORDERS */}
        {expanded && batch.orders.length > 0 && (
          <div className="px-4 pb-4 flex flex-col gap-2">
            <div className="border-t border-white/40 mb-2" />
            {batch.orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                batchStatus={batch.status}
                onStatusUpdate={onRefetch}
              />
            ))}
          </div>
        )}
      </div>

      {rejectModal && (
        <RejectModal
          onConfirm={handleReject}
          onCancel={() => setRejectModal(false)}
          loading={rejecting}
        />
      )}
    </>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function RiderBatchesPage() {
  // No pollInterval — refetch manually after mutations to prevent checklist resets
  const { data, loading, refetch } =
    useQuery<GetMyDispatchBatchesResponse>(GET_MY_BATCHES);

  const batches    = data?.getMyDispatchBatches ?? [];
  const grouped    = groupByDate(batches);
  const scheduled  = batches.filter((b) => b.status === "scheduled").length;
  const inProgress = batches.filter((b) => b.status === "in_progress").length;
  const completed  = batches.filter((b) => b.status === "completed").length;

  if (loading)
    return <main className="p-10 text-gray-400">Loading batches...</main>;

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">📦 My Batches</h1>
        <p className="text-gray-500">Upcoming and past dispatch batches assigned to you</p>
      </div>

      {batches.length > 0 && (
        <div className="flex gap-2 mb-6 flex-wrap">
          {scheduled  > 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-blue-100   text-blue-700   font-semibold">{scheduled}  Pending</span>
          )}
          {inProgress > 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">{inProgress} Active</span>
          )}
          {completed  > 0 && (
            <span className="text-xs px-3 py-1 rounded-full bg-green-100  text-green-700  font-semibold">{completed}  Completed</span>
          )}
        </div>
      )}

      {batches.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">📦</p>
          <p className="font-medium">No batches assigned yet</p>
          <p className="text-sm mt-1">The admin will assign delivery batches here</p>
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          {Array.from(grouped.entries()).map(([dateLabel, dayBatches]) => (
            <div key={dateLabel}>
              <div className="flex items-center gap-3 mb-3">
                <h2 className="text-sm font-bold text-[#391713]">{dateLabel}</h2>
                <div className="flex-1 h-px bg-orange-100" />
                <span className="text-xs text-gray-400">
                  {dayBatches.length} batch{dayBatches.length > 1 ? "es" : ""}
                </span>
              </div>
              <div className="flex flex-col gap-4">
                {dayBatches.map((batch) => (
                  <BatchCard key={batch.id} batch={batch} onRefetch={refetch} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
