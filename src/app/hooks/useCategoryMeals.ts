import { useEffect, useState } from "react";
import { Meal } from "@/app/types/type";
import { meals } from "@/data/restaurantsEtMeals";

export function useCategoryMeals(categoryId: number | null) {
  const [data, setData] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!categoryId) return;

    setLoading(true);

    // simulate lazy fetch
    const timer = setTimeout(() => {
      setData(meals.filter(m => m.categoryId === categoryId));
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [categoryId]);

  return { data, loading };
}
