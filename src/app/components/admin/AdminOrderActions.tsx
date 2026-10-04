// src/app/components/admin/AdminOrderActions.tsx
"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import {
  ADMIN_UPDATE_ORDER_STATUS,
  ADMIN_ASSIGN_RIDER,
} from "@/graphql/queries/admin.queries";
import { OrderStatus, RiderWithStats } from "@/app/types/type";
import toast from "react-hot-toast";

const STATUS_OPTIONS: { value: OrderStatus; label: string }[] = [
  { value: "accepted", label: "Accept" },
  { value: "rejected", label: "Reject" },
  { value: "preparing", label: "Mark Preparing" },
  { value: "ready_for_pickup", label: "Ready for Pickup" },
  { value: "picked_up", label: "Mark Picked Up" },
  { value: "delivered", label: "Mark Delivered" },
  { value: "cancelled", label: "Cancel" },
];

interface Props {
  orderId: string;
  currentStatus: OrderStatus;
  assignedRider?: { id: string; fullName: string } | null; // ← add
  riders: RiderWithStats[];
  onUpdate: () => void;
}

export default function AdminOrderActions({
  orderId,
  currentStatus,
  assignedRider,
  riders,
  onUpdate,
}: Props) {
  const [open, setOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [updateStatus] = useMutation(ADMIN_UPDATE_ORDER_STATUS);
  const [assignRider] = useMutation(ADMIN_ASSIGN_RIDER);

  const handleStatus = async (status: OrderStatus) => {
    try {
      await updateStatus({ variables: { orderId, status } });
      toast.success("Order status updated");
      setOpen(false);
      onUpdate();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleAssign = async (riderId: string) => {
    try {
      await assignRider({ variables: { orderId, riderId } });
      toast.success("Rider assigned");
      setAssignOpen(false);
      onUpdate();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const availableStatuses = STATUS_OPTIONS.filter(
    (s) => s.value !== currentStatus,
  );

  return (
    <div className="flex flex-col gap-2 items-end">
      {/* Show assigned rider if present */}
      {assignedRider && (
        <span className="text-[11px] text-purple-600 font-medium bg-purple-50 px-2 py-0.5 rounded-full">
          🛵 {assignedRider.fullName}
        </span>
      )}

      <div className="flex gap-2 relative">
        {/* STATUS DROPDOWN — same as before */}
        <div className="relative">
          <button
            onClick={() => {
              setOpen((p) => !p);
              setAssignOpen(false);
            }}
            className="text-xs px-3 py-1.5 rounded-full bg-[#FFF1EB] text-[#E95322] font-semibold hover:bg-orange-100 transition"
          >
            Update Status ▾
          </button>
          {open && (
            <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[160px] py-1">
              {availableStatuses.map((s) => (
                <button
                  key={s.value}
                  onClick={() => handleStatus(s.value)}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-orange-50 text-[#391713] transition"
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ASSIGN RIDER — disabled if already assigned */}
        <div className="relative">
          <button
            onClick={() => {
              setAssignOpen((p) => !p);
              setOpen(false);
            }}
            disabled={!!assignedRider}
            className={`text-xs px-3 py-1.5 rounded-full font-semibold transition ${
              assignedRider
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {assignedRider ? "Assigned ✓" : "Assign Rider ▾"}
          </button>
          {assignOpen && !assignedRider && (
            <div className="absolute right-0 top-8 z-20 bg-white border border-gray-100 rounded-xl shadow-lg min-w-[180px] py-1 max-h-48 overflow-y-auto">
              {riders.length === 0 ? (
                <p className="px-4 py-2 text-xs text-gray-400">
                  No riders available
                </p>
              ) : (
                riders.map((rider) => (
                  <button
                    key={rider.id}
                    onClick={() => handleAssign(rider.id)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-purple-50 text-[#391713] transition flex justify-between items-center"
                  >
                    <span>{rider.fullName}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        rider.isOnline
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {rider.isOnline ? "Online" : "Offline"}
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
