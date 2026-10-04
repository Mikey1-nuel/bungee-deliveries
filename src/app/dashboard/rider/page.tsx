// src/app/dashboard/rider/page.tsx
"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_MY_EARNINGS,
  GET_MY_RIDER_PROFILE,
  UPDATE_RIDER_AVAILABILITY,
} from "@/graphql/queries/rider.queries";
import {
  GetMyEarningsResponse,
  GetMyRiderProfileResponse,
} from "@/app/types/type";
import Link from "next/link";

export default function RiderOverviewPage() {
  const { data: profileData, refetch } =
    useQuery<GetMyRiderProfileResponse>(GET_MY_RIDER_PROFILE);

  const { data: earningsData } =
    useQuery<GetMyEarningsResponse>(GET_MY_EARNINGS);

  const [updateAvailability, { loading }] = useMutation(
    UPDATE_RIDER_AVAILABILITY,
  );

  const profile = profileData?.getMyRiderProfile;
  const earnings = earningsData?.getMyEarnings;

  const handleToggle = async () => {
    await updateAvailability({
      variables: { isAvailable: !profile?.isAvailable },
    });
    refetch();
  };

  const statCards = [
    { label: "Today's Deliveries", value: earnings?.todayDeliveries ?? 0 },
    {
      label: "Today's Earnings",
      value: `₦${(earnings?.todayEarnings ?? 0).toLocaleString()}`,
    },
    { label: "Total Deliveries", value: earnings?.totalDeliveries ?? 0 },
    {
      label: "Total Earnings",
      value: `₦${(earnings?.totalEarnings ?? 0).toLocaleString()}`,
    },
  ];

  return (
    <main className="bg-white rounded-t-3xl p-8 min-h-screen">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#391713]">Rider Overview</h1>
        <p className="text-gray-500">Your delivery dashboard</p>
      </div>

      {/* AVAILABILITY TOGGLE */}
      <div className="flex items-center justify-between bg-[#FFF5EE] border border-orange-100 rounded-2xl p-4 mb-6">
        <div>
          <p className="font-semibold text-[#391713]">Availability</p>
          <p className="text-xs text-gray-500">
            {profile?.isAvailable
              ? "You are online and accepting deliveries"
              : "You are offline"}
          </p>
        </div>
        <button
          onClick={handleToggle}
          disabled={loading}
          className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${
            profile?.isAvailable ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-200 ${
              profile?.isAvailable ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* EARNINGS SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className="border border-orange-100 rounded-2xl p-4 bg-[#FFF9F7]"
          >
            <p className="text-xs text-gray-500 mb-1">{card.label}</p>
            <p className="text-xl font-bold text-[#391713]">{card.value}</p>
          </div>
        ))}
      </div>

      {/* QUICK LINKS */}
      <div className="flex flex-col gap-3">
        <Link
          href="/dashboard/rider/deliveries"
          className="flex items-center justify-between bg-[#E95322] text-white px-5 py-4 rounded-2xl font-semibold"
        >
          <span>🛵 Active Deliveries</span>
          <span>→</span>
        </Link>
        <Link
          href="/dashboard/rider/history"
          className="flex items-center justify-between border border-orange-100 text-[#391713] px-5 py-4 rounded-2xl font-semibold"
        >
          <span>📋 Delivery History</span>
          <span>→</span>
        </Link>
      </div>
    </main>
  );
}
