// src/app/dashboard/admin/dispatch/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_DISPATCH_BATCHES,
  GET_ADMIN_ORDERS,
  CREATE_DISPATCH_BATCH,
} from "@/graphql/queries/admin.queries";
import { GET_ADMIN_RIDERS } from "@/graphql/queries/admin.queries";
import {
  GetDispatchBatchesResponse,
  DispatchBatch,
  DispatchSlot,
  AdminOrdersResponse,
  AdminRidersResponse,
  AdminOrder,
  CreateDispatchBatchResponse,
} from "@/app/types/type";
import AdminPagination from "@/app/components/admin/AdminPagination";
import toast from "react-hot-toast";
import { formatDateTime } from "@/utils/date";

const SLOT_LABELS: Record<DispatchSlot, string> = {
  morning: "🌅 Morning (9:00 AM)",
  afternoon: "☀️ Afternoon (1:00 PM)",
  evening: "🌆 Evening (6:00 PM)",
};

const SLOT_COLORS: Record<DispatchSlot, string> = {
  morning: "bg-yellow-100 text-yellow-700",
  afternoon: "bg-orange-100 text-orange-700",
  evening: "bg-indigo-100 text-indigo-700",
};

const STATUS_COLORS: Record<string, string> = {
  scheduled: "bg-blue-100   text-blue-700",
  in_progress: "bg-orange-100 text-orange-700",
  completed: "bg-green-100  text-green-700",
  cancelled: "bg-red-100    text-red-600",
};

export default function AdminDispatchPage() {
  const [page, setPage] = useState(1);
  const [slotFilter, setSlotFilter] = useState<DispatchSlot | "">("");
  const [dateFilter, setDateFilter] = useState("");
  const [creating, setCreating] = useState(false);

  // New batch form state
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [selectedRider, setSelectedRider] = useState("");
  const [selectedSlot, setSelectedSlot] = useState<DispatchSlot>("morning");
  const [scheduledDate, setScheduledDate] = useState(
    new Date().toISOString().split("T")[0],
  );

  const {
    data: batchData,
    loading: batchLoading,
    refetch,
  } = useQuery<GetDispatchBatchesResponse>(GET_DISPATCH_BATCHES, {
    variables: {
      page,
      limit: 20,
      slot: slotFilter || null,
      date: dateFilter || null,
    },
  });

  const { data: ordersData } = useQuery<AdminOrdersResponse>(GET_ADMIN_ORDERS, {
    variables: {
      page: 1,
      limit: 100,
      status: "ready_for_pickup",
      search: null,
    },
    skip: !creating,
  });

  const { data: ridersData } = useQuery<AdminRidersResponse>(GET_ADMIN_RIDERS, {
    variables: { page: 1, limit: 100, search: null },
    skip: !creating,
  });

  const [createBatch, { loading: creating_batch }] =
    useMutation<CreateDispatchBatchResponse>(CREATE_DISPATCH_BATCH);

  const batches = batchData?.getDispatchBatches.batches ?? [];
  const pagination = batchData?.getDispatchBatches.pagination;
  const readyOrders = ordersData?.getAdminOrders.orders ?? [];
  const riders = ridersData?.getAdminRiders.riders ?? [];

  const toggleOrder = (id: string) =>
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id],
    );

  const handleCreateBatch = async () => {
    if (!selectedRider) {
      toast.error("Select a rider");
      return;
    }
    if (!selectedOrders.length) {
      toast.error("Select at least one order");
      return;
    }
    if (!scheduledDate) {
      toast.error("Select a date");
      return;
    }

    try {
      const { data } = await createBatch({
        variables: {
          riderId: selectedRider,
          orderIds: selectedOrders,
          slot: selectedSlot,
          scheduledDate,
        },
      });
      if (!data?.createDispatchBatch?.success)
        throw new Error("Failed to create batch");
      toast.success(data.createDispatchBatch.message);
      setCreating(false);
      setSelectedOrders([]);
      setSelectedRider("");
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#391713]">Dispatch</h1>
          <p className="text-gray-500">Schedule and manage delivery batches</p>
        </div>
        <button
          onClick={() => setCreating(true)}
          className="bg-[#E95322] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#d14a1e] transition"
        >
          + New Batch
        </button>
      </div>

      {/* SLOT INFO BANNER */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {(Object.entries(SLOT_LABELS) as [DispatchSlot, string][]).map(
          ([slot, label]) => (
            <div
              key={slot}
              className={`rounded-2xl p-3 text-center text-sm font-semibold ${SLOT_COLORS[slot]}`}
            >
              {label}
            </div>
          ),
        )}
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <select
          value={slotFilter}
          onChange={(e) => {
            setSlotFilter(e.target.value as DispatchSlot | "");
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
        >
          <option value="">All Slots</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setPage(1);
          }}
          className="border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
        />
        {dateFilter && (
          <button
            onClick={() => setDateFilter("")}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Clear date
          </button>
        )}
      </div>

      {/* BATCH LIST */}
      {batchLoading ? (
        <div className="py-10 text-center text-gray-400">
          Loading batches...
        </div>
      ) : batches.length === 0 ? (
        <div className="py-10 text-center text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="font-medium text-sm">No dispatch batches yet</p>
          <p className="text-xs mt-1">
            Create a batch to assign orders to riders
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {batches.map((batch: DispatchBatch) => (
            <div
              key={batch.id}
              className={`border rounded-2xl p-4 bg-white ${
                batch.status === "cancelled"
                  ? "border-red-100   bg-red-50"
                  : batch.status === "in_progress"
                    ? "border-orange-100 bg-orange-50"
                    : batch.status === "completed"
                      ? "border-green-100  bg-green-50"
                      : "border-gray-100"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${SLOT_COLORS[batch.slot]}`}
                    >
                      {SLOT_LABELS[batch.slot]}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${
                        STATUS_COLORS[batch.status] ??
                        "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {batch.status === "in_progress"
                        ? "✅ Rider Accepted"
                        : batch.status === "cancelled"
                          ? "❌ Rider Rejected"
                          : batch.status === "completed"
                            ? "🎉 Completed"
                            : "⏳ Awaiting Acceptance"}
                    </span>
                  </div>
                  <p className="text-sm font-semibold text-[#391713]">
                    🛵 {batch.riderName}
                    {batch.riderPhone && (
                      <span className="text-gray-400 font-normal ml-2 text-xs">
                        {batch.riderPhone}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    📅{" "}
                    {new Date(Number(batch.scheduledAt)).toLocaleString(
                      undefined,
                      {
                        weekday: "short",
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )}
                  </p>
                  {batch.status === "cancelled" && (
                    <p className="text-xs text-red-500 mt-1 font-medium">
                      ⚠️ Orders need to be reassigned
                    </p>
                  )}
                </div>
                <div
                  className={`border rounded-xl px-4 py-2 text-center shrink-0 ${
                    batch.status === "cancelled"
                      ? "bg-red-100 border-red-200"
                      : "bg-[#FFF9F7] border-orange-100"
                  }`}
                >
                  <p className="text-xl font-bold text-[#391713]">
                    {batch.orderCount}
                  </p>
                  <p className="text-[10px] text-gray-500">Orders</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminPagination
        page={page}
        totalPages={pagination?.totalPages ?? 1}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* CREATE BATCH PANEL */}
      {creating && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl w-full max-w-lg mx-0 sm:mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-[#391713]">
                New Dispatch Batch
              </h2>
              <button
                onClick={() => setCreating(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {/* DATE + SLOT */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">
                    Date
                  </label>
                  <input
                    type="date"
                    min={todayStr}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium mb-1 block">
                    Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) =>
                      setSelectedSlot(e.target.value as DispatchSlot)
                    }
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                  >
                    <option value="morning">Morning (9:00 AM)</option>
                    <option value="afternoon">Afternoon (1:00 PM)</option>
                    <option value="evening">Evening (6:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* RIDER SELECTION */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-1 block">
                  Assign Rider
                </label>
                <select
                  value={selectedRider}
                  onChange={(e) => setSelectedRider(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none"
                >
                  <option value="">Select a rider...</option>
                  {riders.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.fullName} {r.isOnline ? "✓" : "(offline)"}
                    </option>
                  ))}
                </select>
              </div>

              {/* ORDER SELECTION */}
              <div>
                <label className="text-xs text-gray-500 font-medium mb-2 block">
                  Select Orders ({selectedOrders.length} selected)
                </label>
                {readyOrders.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4 border border-dashed border-gray-200 rounded-xl">
                    No orders ready for pickup
                  </p>
                ) : (
                  <div className="border border-gray-200 rounded-xl max-h-48 overflow-y-auto divide-y divide-gray-50">
                    {readyOrders.map((order: AdminOrder) => {
                      const checked = selectedOrders.includes(order.id);
                      return (
                        <div
                          key={order.id}
                          onClick={() => toggleOrder(order.id)}
                          className={`flex items-center gap-3 px-3 py-2.5 cursor-pointer transition ${
                            checked ? "bg-orange-50" : "hover:bg-gray-50"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition ${
                              checked
                                ? "bg-[#E95322] border-[#E95322]"
                                : "border-gray-300"
                            }`}
                          >
                            {checked && (
                              <span className="text-white text-[10px] font-bold">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-[#391713] truncate">
                              #{order.id.slice(0, 8)} · {order.restaurant.name}
                            </p>
                            <p className="text-[11px] text-gray-500 truncate">
                              {order.customer.fullName} ·{" "}
                              {order.deliveryAddress}
                            </p>
                          </div>
                          <p className="text-xs font-bold text-[#E95322] shrink-0">
                            ₦{order.total.toLocaleString()}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setCreating(false)}
                className="flex-1 border rounded-xl py-2.5 text-sm hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBatch}
                disabled={creating_batch}
                className="flex-1 bg-[#E95322] text-white rounded-xl py-2.5 text-sm font-semibold hover:bg-[#d14a1e] transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {creating_batch && (
                  <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {creating_batch ? "Scheduling..." : "Schedule Batch"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
