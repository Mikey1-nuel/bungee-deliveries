// components/restaurant/RequireRestaurant.tsx
"use client";

import { useQuery } from "@apollo/client/react";
import { GET_RESTAURANTS } from "@/graphql/queries/restaurant.queries";
import SetupRestaurantPrompt from "./SetupRestaurantPrompt";
import { GetRestaurantsResponse } from "@/app/types/type";

export default function RequireRestaurant({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, loading } = useQuery<GetRestaurantsResponse>(GET_RESTAURANTS);
  const hasRestaurant = (data?.getRestaurants?.length ?? 0) > 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">
        Loading...
      </div>
    );
  }

  if (!hasRestaurant) {
    return <SetupRestaurantPrompt />;
  }

  return <>{children}</>;
}
