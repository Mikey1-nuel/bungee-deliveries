"use client";

import { useQuery } from "@apollo/client/react";

import { GetMenusByCategoryResponse } from "@/app/types/type";

import { GET_MENUS_BY_CATEGORY } from "@/graphql/queries/menu.queries";

export function useCategoryMenus(categoryId: string | null) {
  const { data, loading, error } = useQuery<GetMenusByCategoryResponse>(
    GET_MENUS_BY_CATEGORY,
    {
      variables: {
        categoryId,
      },

      skip: !categoryId,
    },
  );

  return {
    data: data?.getMenusByCategory || [],

    loading,

    error,
  };
}
