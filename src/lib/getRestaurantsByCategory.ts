import { Meal, Restaurant, RestaurantMeal } from "@/app/types/type";

export function getRestaurantsByCategory(
  categoryId: number,
  meals: Meal[],
  restaurants: Restaurant[],
  restaurantMeals: RestaurantMeal[]
) {
  // Meals in this category
  const mealIds = meals
    .filter(m => m.categoryId === categoryId)
    .map(m => m.id);

  // Restaurants that serve those meals
  const restaurantIds = new Set(
    restaurantMeals
      .filter(rm => mealIds.includes(rm.mealId))
      .map(rm => rm.restaurantId)
  );

  return restaurants.filter(r => restaurantIds.has(r.id));
}
