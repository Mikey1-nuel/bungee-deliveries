export interface Slide {
  icon: string;
  title: string;
  description: string;
  background: string;
  skippable: boolean;
}

export interface LogIn {
  identifier: string; // can be email or phone number
  password: string;
}

export interface SignUp {
  fullName: string;
  email: string;
  phone: string;
  dob: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
}

// export interface Meal {
//   id: number;
//   name: string;
//   categoryId: number; // links to Category
//   image?: string;
//   description?: string;
//     allowsSwallow?: boolean;
//   swallowOptions?: number[];
// }

// // src/types/index.ts

export interface Meal {
  id: number;
  name: string;
  categoryId: number;
  description?: string;
  image?: string;
  extra?: SidesExtra[];
  allowsSwallow?: boolean;
  swallowOptions?: number[];
}

export interface MealWithPrice extends Meal {
  price: number;
}

export interface MealWithOrderCount extends Meal {
  orderCount: number;
}

export interface Restaurant {
  id: number;
  name: string;
  rating: number;
  location: string; // Enugu, Independence Layout, etc
  cuisine: string;
  image?: string;
}

export interface RestaurantMeal {
  id: number;
  restaurantId: number;
  mealId: number;
  isAvailable: boolean;
  basePrice: number;
  swallowPrices?: {
    swallowId: number;
    extraPrice: number;
  }[];
}

export interface SidesExtra {
  id: number;
  name: string;
  price: number; // extra cost to add
}


// order.ts
export type OrderStatus = "pending" | "paid" | "cancelled";

export interface Order {
  id: number;
  restaurantId: number;
  status: OrderStatus;
  createdAt: string;
}

export interface OrderItem {
  orderId: number;
  mealId: number;
  quantity: number;
}

export interface MealWithOrderCount extends Meal {
  orderCount: number;
}

export interface RestaurantWithOrderCount extends Restaurant {
  orderCount: number;
}

export interface MealCardProps {
  meal: Meal & { price?: number; orderCount?: number };
  restaurantId?: number;
  onClick?: (meal: Meal) => void;
}

export interface RestaurantCardProps {
  restaurant: RestaurantWithOrderCount;
}

// const restaurantMeals = restaurantMealsTable.filter(
//   rm => rm.restaurantId === selectedRestaurantId
// );

// const categories: Category[] = [...];

// const meals: Meal[] = [...];

// const friedRice = meals.find(m => m.name === "Fried Rice");

// const options = restaurantMealsTable.filter(
//   rm => rm.mealId === friedRice.id && rm.isAvailable
// );
