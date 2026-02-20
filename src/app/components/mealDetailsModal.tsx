'use client';
import Image from "next/image";
import { Meal, SidesExtra, Restaurant } from "@/app/types/type";
import { useState } from "react";
import { getMealPrice } from "@/lib/getMealPrice";
import { useCart } from "./cartContext";
import { restaurants } from "@/data/restaurantsEtMeals";

interface Props {
  meal: Meal;
  restaurantId?: number;
  onClose: () => void;
}

const MealDetailsModal = ({ meal, restaurantId, onClose }: Props) => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<SidesExtra[]>([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState<number | undefined>(restaurantId);

  const restaurant = restaurants.find(r => r.id === selectedRestaurantId);

  const extras = meal.extra ?? [];

  const basePrice = selectedRestaurantId ? getMealPrice(meal.id, selectedRestaurantId) ?? 0 : 0;

  const handleAddExtra = (extraId: number) => {
    const extra = extras.find(e => e.id === extraId);
    if (!extra) return;
    if (selectedExtras.some(e => e.id === extra.id)) return;
    setSelectedExtras(prev => [...prev, extra]);
  };

  const removeExtra = (extraId: number) => setSelectedExtras(prev => prev.filter(e => e.id !== extraId));

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const totalPrice = (basePrice + extrasTotal) * quantity;

  const handleOrder = () => {
    if (!selectedRestaurantId || !restaurant) return;

    const cartItem = {
      id: `${meal.id}-${selectedRestaurantId}-${selectedExtras.map(e => e.id).join(",")}`,
      mealId: meal.id,
      mealName: meal.name,
      restaurantId: selectedRestaurantId,
      restaurantName: restaurant.name,
      quantity,
      basePrice,
      extras: selectedExtras,
      extrasTotal,
      totalPrice,
      image: meal.image,
    };

    addItem(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(15,23,42,0.6)] backdrop-blur">
      <div className="bg-white rounded-2xl w-full max-w-[800px] p-5 relative grid grid-cols-[1.5fr_2fr] gap-[10px]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500">✕</button>

        <div>
          <div className="relative w-[300px] h-[300px] mb-4 overflow-hidden rounded-2xl">
            <Image src={meal.image ?? "/placeholder.png"} alt={meal.name} width={300} height={300} className="object-contain rounded-2xl"/>
          </div>

          <h2 className="text-xl font-semibold">{meal.name}</h2>

          {!restaurantId && (
            <select
              className="border rounded-lg p-2 w-full mt-2"
              onChange={(e) => setSelectedRestaurantId(Number(e.target.value))}
              defaultValue=""
            >
              <option value="">Select a restaurant</option>
              {restaurants.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          )}

          {extras.length > 0 && (
            <div className="mt-4">
              <label className="font-medium mb-2 block text-[14px]">Add Extras / Sides</label>
              <select
                className="w-full border rounded-lg p-2 text-[14px] outline-none"
                defaultValue=""
                onChange={(e) => {
                  if (e.target.value) {
                    handleAddExtra(Number(e.target.value));
                    e.target.value = "";
                  }
                }}
              >
                <option value="">Select an extra</option>
                {extras.map(extra => (
                  <option key={extra.id} value={extra.id}>{extra.name} (+₦{extra.price})</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="relative h-full">
          <p className="text-[12px]">{meal.description}</p>
          <div className="h-full flex flex-col justify-between items-start">

          {selectedExtras.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="font-medium">Selected Extras</p>
              <div className="grid grid-cols-2 items-center gap-[10px]">
                {selectedExtras.map(extra => (
                  <div key={extra.id} className="flex justify-between items-center border rounded-lg p-2 text-[12px]">
                    <span>{extra.name} (+₦{extra.price})</span>
                    <button onClick={() => removeExtra(extra.id)} className="text-red-500 ml-[10px] text-[10px]">Remove</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="w-full absolute bottom-0 left-0">
            <div className="mt-4 flex items-center gap-3">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <button onClick={handleOrder} className="w-full mt-5 bg-[#391713] text-white py-3 rounded-lg">
              Order • ₦{totalPrice.toLocaleString()}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetailsModal;
