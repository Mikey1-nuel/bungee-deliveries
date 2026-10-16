"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_ADMIN_RESTAURANTS,
  APPROVE_RESTAURANT,
  REJECT_RESTAURANT,
} from "@/graphql/queries/admin.queries";
import { AdminRestaurantsResponse, AdminRestaurant } from "@/app/types/type";
import AdminSearchBar from "@/app/components/admin/AdminSearchBar";
import AdminPagination from "@/app/components/admin/AdminPagination";
import Image from "next/image";
import toast from "react-hot-toast";

// AdminRestaurantsPage.tsx
const STATUS_BADGE: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-600",
};

function ApprovalConfirmModal({
  action,
  restaurantName,
  onConfirm,
  onCancel,
  loading,
}: {
  action: "approve" | "reject";
  restaurantName: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  const isApprove = action === "approve";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
        <h3 className="font-bold text-[#391713] mb-2">
          {isApprove ? "Approve" : "Reject"} restaurant
        </h3>
        <p className="text-sm text-gray-500 mb-5">
          {isApprove
            ? `${restaurantName} will be approved and the owner notified — they'll be able to log in and start receiving orders.`
            : `${restaurantName}'s application will be rejected and the owner notified. This can be reversed later if needed.`}
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border rounded-xl py-2 text-sm hover:bg-gray-50 transition">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 text-white rounded-xl py-2 text-sm font-semibold transition disabled:opacity-50 flex items-center justify-center gap-2 ${
              isApprove ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading && <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            {loading ? "Processing..." : isApprove ? "Approve" : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminRestaurantsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");
  const [statusFilter, setStatusFilter] = useState<"" | "pending" | "approved" | "rejected">("pending"); // default to the queue that needs attention
  const [confirming, setConfirming] = useState<{ action: "approve" | "reject"; restaurant: AdminRestaurant } | null>(null);
  const [actioning, setActioning] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, loading, refetch } = useQuery<AdminRestaurantsResponse>(
    GET_ADMIN_RESTAURANTS,
    { variables: { page, limit: 20, search: debounced || null, approvalStatus: statusFilter || null } },
  );

  const [approveRestaurant] = useMutation(APPROVE_RESTAURANT);
  const [rejectRestaurant] = useMutation(REJECT_RESTAURANT);

  const restaurants = data?.getAdminRestaurants.restaurants ?? [];
  const pagination = data?.getAdminRestaurants.pagination;

  const handleConfirm = async () => {
    if (!confirming) return;
    setActioning(true);
    try {
      if (confirming.action === "approve") {
        await approveRestaurant({ variables: { restaurantId: confirming.restaurant.id } });
        toast.success(`${confirming.restaurant.name} approved`);
      } else {
        await rejectRestaurant({ variables: { restaurantId: confirming.restaurant.id } });
        toast.success(`${confirming.restaurant.name} rejected`);
      }
      setConfirming(null);
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setActioning(false);
    }
  };

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Restaurants</h1>
        <p className="text-gray-500">{pagination?.total ?? 0} total restaurants</p>
      </div>

      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex-1 min-w-[200px]">
          <AdminSearchBar value={searchInput} onChange={setSearchInput} placeholder="Search by restaurant or owner name..." />
        </div>
        <div className="flex gap-1.5">
          {(["pending", "approved", "rejected", ""] as const).map((s) => (
            <button
              key={s || "all"}
              onClick={() => { setStatusFilter(s); setPage(1); }}
              className={`text-xs px-3 py-2 rounded-full font-semibold capitalize transition ${
                statusFilter === s ? "bg-[#E95322] text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {s || "All"}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">Loading restaurants...</div>
      ) : restaurants.length === 0 ? (
        <div className="py-10 text-center text-gray-400">
          {statusFilter === "pending" ? "No restaurants awaiting approval" : "No restaurants found"}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {restaurants.map((r: AdminRestaurant) => (
            <div key={r.id} className="border border-gray-100 rounded-2xl overflow-hidden bg-white flex gap-4">
              <div className="relative w-20 h-20 shrink-0 bg-gray-100">
                <Image src={r.image || "/placeholder.png"} alt={r.name} fill className="object-cover" />
              </div>
              <div className="flex-1 py-3 pr-4 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <p className="font-semibold text-sm text-[#391713] truncate">{r.name}</p>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_BADGE[r.approvalStatus]}`}>
                        {r.approvalStatus}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Owner: {r.ownerName}</p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                  </div>
                  {/* Only show actions for a pending restaurant */}
                  {r.approvalStatus === "pending" && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => setConfirming({ action: "approve", restaurant: r })}
                        className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => setConfirming({ action: "reject", restaurant: r })}
                        className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
                      >
                        Reject
                      </button>
                    </div>
                  )}
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

      {confirming && (
        <ApprovalConfirmModal
          action={confirming.action}
          restaurantName={confirming.restaurant.name}
          onConfirm={handleConfirm}
          onCancel={() => setConfirming(null)}
          loading={actioning}
        />
      )}
    </main>
  );
}
