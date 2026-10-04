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

export default function AdminRestaurantsPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [debounced, setDebounced] = useState("");

  useEffect(() => {
    const t = setTimeout(() => {
      setDebounced(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, loading, refetch } = useQuery<AdminRestaurantsResponse>(
    GET_ADMIN_RESTAURANTS,
    { variables: { page, limit: 20, search: debounced || null } },
  );

  const [approveRestaurant] = useMutation(APPROVE_RESTAURANT);
  const [rejectRestaurant] = useMutation(REJECT_RESTAURANT);

  const restaurants = data?.getAdminRestaurants.restaurants ?? [];
  const pagination = data?.getAdminRestaurants.pagination;

  const handleApprove = async (restaurantId: string) => {
    try {
      await approveRestaurant({ variables: { restaurantId } });
      toast.success("Restaurant approved");
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleReject = async (restaurantId: string) => {
    try {
      await rejectRestaurant({ variables: { restaurantId } });
      toast.success("Restaurant rejected");
      refetch();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#391713]">Restaurants</h1>
        <p className="text-gray-500">
          {pagination?.total ?? 0} total restaurants
        </p>
      </div>

      <div className="mb-4">
        <AdminSearchBar
          value={searchInput}
          onChange={setSearchInput}
          placeholder="Search by restaurant or owner name..."
        />
      </div>

      {loading ? (
        <div className="py-10 text-center text-gray-400">
          Loading restaurants...
        </div>
      ) : restaurants.length === 0 ? (
        <div className="py-10 text-center text-gray-400">
          No restaurants found
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {restaurants.map((r: AdminRestaurant) => (
            <div
              key={r.id}
              className="border border-gray-100 rounded-2xl overflow-hidden bg-white flex gap-4"
            >
              <div className="relative w-20 h-20 shrink-0 bg-gray-100">
                <Image
                  src={r.image || "/placeholder.png"}
                  alt={r.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 py-3 pr-4 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-[#391713] truncate">
                      {r.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      Owner: {r.ownerName}
                    </p>
                    <p className="text-xs text-gray-400">{r.location}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => handleApprove(r.id)}
                      className="text-xs px-3 py-1.5 rounded-full bg-green-100 text-green-700 font-semibold hover:bg-green-200 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(r.id)}
                      className="text-xs px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-semibold hover:bg-red-200 transition"
                    >
                      Reject
                    </button>
                  </div>
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
    </main>
  );
}
