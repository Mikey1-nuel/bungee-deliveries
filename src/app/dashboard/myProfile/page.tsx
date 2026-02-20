"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { categories } from '@/app/components/home'
import { meals } from '@/data/restaurantsEtMeals'
import { Meal } from '@/app/types/type'
import { MealCardProps } from '@/app/types/type'
import { getMealPrice } from '@/lib/getMealPrice'

const CategoriesMeals = ({ meal, restaurantId, onClick }: MealCardProps) => {
    const [activeTab, setActiveTab] = useState<
        "mainMeals" | "soups&Swallows" | "grill&Sides" | "snacks&Pastries" | "desserts" | "drinks&Beverages"
      >("mainMeals");
      const [activeMeal, setActiveMeal] = useState<Meal | null>(null);
      const catId = categories.map((cat) => cat.id)
        const mealId = meals.map((meal) => meal.categoryId)
        const mealId2 = meals.find(meal => meal.categoryId === catId[1]);
        const mealId3 = meals.map((meal) => meal)
      const mainMeals = mealId === catId;
      console.log("MainMeals: ", mealId2);
      console.log("MainMeals2: ", mealId3);
      console.log("catId: ",catId);
      console.log("mealId: ", mealId);
      
  return (
    <main>
             <div className="flex gap-4">
        <button
          onClick={() => setActiveTab("mainMeals")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "mainMeals" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Main Meals
        </button>
        <button
          onClick={() => setActiveTab("soups&Swallows")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "soups&Swallows" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Soups Swallows
        </button>
        <button
          onClick={() => setActiveTab("grill&Sides")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "grill&Sides" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Grill Sides
        </button>
        <button
          onClick={() => setActiveTab("snacks&Pastries")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "snacks&Pastries" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Snacks Pastries
        </button>
        <button
          onClick={() => setActiveTab("desserts")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "desserts" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Desserts
        </button>
        <button
          onClick={() => setActiveTab("drinks&Beverages")}
          className={`px-4 py-1 rounded-[20px] font-[500] ${activeTab === "drinks&Beverages" ? "bg-[#E95322] text-white" : "bg-[#FFDECF] text-[#E95322]"}`}
        >
          Drinks Beverages
        </button>
      </div>

        {/* {meals.map((meal) => (
            
        ))} */}
      {activeTab === "mainMeals" && (
        <div
              onClick={() => onClick?.(meal)}
              className="rounded-2xl border p-3 bg-white shadow-sm cursor-pointer hover:shadow-md transition"
            >
              <div className="relative w-full h-[200px] bg-gray-50 rounded-xl overflow-hidden">
                <Image
                  src="/Screenshot (283).png"
                  alt=""
                  width={300}
                  height={300}
                  className="object-contain w-full"
                />
              </div>
        
              <h3 className="mt-2 font-semibold text-[#391713]">
                Jollof Rice
              </h3>
        
             
              
            </div>
      )}
    </main>
  )
}

export default CategoriesMeals