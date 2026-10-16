// components/restaurant/SetupRestaurantPrompt.tsx
"use client";

import CreateRestaurantForm from "../createRestaurantForm";

export default function SetupRestaurantPrompt() {
  return (
    <div className="flex flex-col items-center justify-center bg-black rounded-t-3xl p-8 text-center">
      <div className="max-w-md mb-2">
        <div className="text-5xl mb-4">🍽️</div>
        <h1 className="text-xl font-bold text-[#391713] mb-2">
          Set up your restaurant
        </h1>
        <p className="text-gray-500 text-sm">
          Before you can add menu items or receive orders, tell customers
          about your restaurant — name, location and a photo.
        </p>
      </div>
      <CreateRestaurantForm />
    </div>
  );
}
