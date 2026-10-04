import { restaurants } from "@/data/restaurantsEtMenus";
import { ExtraGroup } from "@/app/types/type";

export const categoryExtraGroups: Record<string, ExtraGroup[]> = {
  "cat-1": [
    {
      id: "grp-protein",
      name: "Add Protein",
      type: "multiple",
      extraIds: ["ext-1", "ext-2", "ext-3", "ext-6", "ext-7"],
    },
    {
      id: "grp-sides",
      name: "Sides",
      type: "multiple",
      extraIds: ["ext-4", "ext-5", "ext-8", "ext-11"],
    },
    {
      id: "grp-sauces",
      name: "Sauces",
      type: "multiple",
      extraIds: ["ext-9", "ext-10"],
    },
  ],
  "cat-2": [
    {
      id: "grp-swallow",
      name: "Choose Swallow",
      type: "single",
      required: true,
      extraIds: ["ext-19", "ext-20", "ext-21", "ext-22", "ext-23", "ext-24"],
    },
    {
      id: "grp-protein",
      name: "Add Protein",
      type: "multiple",
      extraIds: ["ext-1", "ext-2", "ext-3", "ext-6"],
    },
  ],
  "cat-3": [
    {
      id: "grp-sides",
      name: "Sides",
      type: "multiple",
      extraIds: ["ext-25", "ext-26", "ext-29", "ext-30"],
    },
    {
      id: "grp-sauces",
      name: "Sauces",
      type: "multiple",
      extraIds: ["ext-27", "ext-28"],
    },
  ],
  "cat-4": [
    {
      id: "grp-burger-protein",
      name: "Choose Patty",
      type: "single",
      extraIds: ["ext-36", "ext-37"],
    },
    {
      id: "grp-toppings",
      name: "Toppings",
      type: "multiple",
      extraIds: ["ext-38", "ext-39", "ext-40", "ext-41"],
    },
  ],
  "cat-5": [
    {
      id: "grp-icecream",
      name: "Ice Cream Flavour",
      type: "single",
      extraIds: ["ext-42", "ext-43", "ext-44", "ext-45", "ext-46"],
    },
    {
      id: "grp-cake",
      name: "Cake Flavour",
      type: "single",
      extraIds: ["ext-47", "ext-48", "ext-49", "ext-50", "ext-51"],
    },
    {
      id: "grp-cupcake",
      name: "Cupcake Flavour",
      type: "single",
      extraIds: ["ext-52", "ext-53", "ext-54", "ext-55", "ext-56"],
    },
    {
      id: "grp-doughnut",
      name: "Doughnut Flavour",
      type: "single",
      extraIds: ["ext-57", "ext-58", "ext-59", "ext-60", "ext-61"],
    },
  ],
  "cat-6": [
    {
      id: "grp-size",
      name: "Choose Size",
      type: "single",
      required: true,
      extraIds: ["ext-62", "ext-63", "ext-64"],
    },
    {
      id: "grp-smoothie",
      name: "Smoothie Flavour",
      type: "single",
      extraIds: ["ext-65", "ext-66", "ext-67", "ext-68", "ext-69"],
    },
    {
      id: "grp-milkshake",
      name: "Milkshake Flavour",
      type: "single",
      extraIds: ["ext-70", "ext-71", "ext-72", "ext-73", "ext-74"],
    },
    {
      id: "grp-softdrinks",
      name: "Drink Options",
      type: "single",
      extraIds: [
        "ext-75",
        "ext-76",
        "ext-77",
        "ext-78",
        "ext-79",
        "ext-80",
        "ext-81",
        "ext-82",
      ],
    },
  ],
};

// export const restaurantCategoryMap: Record<number, number[]> = {};

// restaurants.forEach((r) => {
//   const cuisine = r.cuisine.toLowerCase();
//   let categories: number[] = [];

//   if (cuisine.includes("nigerian") || cuisine.includes("local"))
//     categories.push(1, 2);
//   if (cuisine.includes("continental") || cuisine.includes("dining"))
//     categories.push(1, 5);
//   if (cuisine.includes("barbecue")) categories.push(3);
//   if (cuisine.includes("fast food")) categories.push(4);
//   if (cuisine.includes("snack")) categories.push(4);
//   if (cuisine.includes("café") || cuisine.includes("lounge"))
//     categories.push(6);
//   if (cuisine.includes("chinese") || cuisine.includes("oriental"))
//     categories.push(3, 5);
//   if (cuisine.includes("italian")) categories.push(1, 5);
//   if (cuisine.includes("hotel") || cuisine.includes("resort"))
//     categories.push(1, 5);
//   if (cuisine.includes("drink") || cuisine.includes("bar")) categories.push(6);

//   // Remove duplicates
//   restaurantCategoryMap[r.id] = Array.from(new Set(categories));
// });

export const restaurantCategoryMap: Record<string, string[]> = {};

restaurants.forEach((r) => {
  const cuisine = r.cuisine.toLowerCase();
  let categories: string[] = [];

  if (cuisine.includes("nigerian") || cuisine.includes("local"))
    categories.push("cat-main", "cat-soups");

  if (cuisine.includes("continental") || cuisine.includes("dining"))
    categories.push("cat-main", "cat-desserts");

  if (cuisine.includes("barbecue")) categories.push("cat-grills");
  if (cuisine.includes("fast food")) categories.push("cat-snacks");
  if (cuisine.includes("snack")) categories.push("cat-snacks");
  if (cuisine.includes("café") || cuisine.includes("lounge"))
    categories.push("cat-drinks");

  restaurantCategoryMap[r.id] = Array.from(new Set(categories));
});
