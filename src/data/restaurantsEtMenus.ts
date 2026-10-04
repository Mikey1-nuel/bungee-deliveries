import {
  Order,
  OrderItem,
  Extra,
  Menu,
  Restaurant,
  RestaurantMenu,
  Swallow,
  RestaurantExtraPrice,
  RestaurantSwallowPrice,
} from "../app/types/type";

export const restaurants: Restaurant[] = [
  {
    id: "rest-1",
    name: "OceanEventsNG",
    rating: 4.8,
    cuisine: "Barbecue & Local Dishes",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-2",
    name: "Ntachi-Osa",
    rating: 4.7,
    cuisine: "Local Nigerian Menus",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-3",
    name: "The Manor Restaurant",
    rating: 4.6,
    cuisine: "Continental & Upscale Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-4",
    name: "Bush House Arena",
    rating: 4.5,
    cuisine: "Barbecue & Local Dishes",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-5",
    name: "Shanghai Octopus",
    rating: 4.3,
    cuisine: "Chinese & Oriental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-6",
    name: "Dolphin Restaurant",
    rating: 4.6,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-7",
    name: "Foodopolis Enugu",
    rating: 4.5,
    cuisine: "Modern Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-8",
    name: "Rewind Luxury Place",
    rating: 4.4,
    cuisine: "Nigerian & International",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-9",
    name: "Roots Restaurant & Café",
    rating: 4.4,
    cuisine: "International & Local Fusion",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-10",
    name: "Latitude Café and Lounge",
    rating: 4.3,
    cuisine: "Café & Lounge",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-11",
    name: "Aaron’s Signature Restaurant",
    rating: 4.3,
    cuisine: "French & Chinese Fusion",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-12",
    name: "7th Planet International Ltd",
    rating: 4.2,
    cuisine: "Italian, Bar & Pub",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-13",
    name: "Eclipse Resort Enugu",
    rating: 4.2,
    cuisine: "Resort Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-14",
    name: "Open Sharaton",
    rating: 4.1,
    cuisine: "African & Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-15",
    name: "Bungalow Restaurant",
    rating: 4.1,
    cuisine: "Continental & Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-16",
    name: "Discovery Kitchen",
    rating: 4.1,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-17",
    name: "Golden Royale Restaurant",
    rating: 4.0,
    cuisine: "Hotel Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-18",
    name: "Villa Toscana",
    rating: 4.0,
    cuisine: "Italian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-19",
    name: "Octopus Chinese Restaurant",
    rating: 4.0,
    cuisine: "Chinese",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-20",
    name: "Cheers Bar & Restaurant",
    rating: 4.0,
    cuisine: "Bar & Grill",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-21",
    name: "Nwanyi Owerri Restaurant & Bar",
    rating: 3.9,
    cuisine: "Local Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-22",
    name: "Mummy B Restaurant",
    rating: 3.8,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-23",
    name: "Crunchies Fried Chicken",
    rating: 3.8,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-24",
    name: "Kilimanjaro Restaurant",
    rating: 3.8,
    cuisine: "Fast Food & Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-25",
    name: "Mr. Biggs",
    rating: 3.7,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-26",
    name: "Chicken Republic",
    rating: 3.7,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-27",
    name: "Genesis Restaurant",
    rating: 3.7,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-28",
    name: "Protea Hotel Restaurant",
    rating: 3.7,
    cuisine: "Hotel Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-29",
    name: "Polo Lounge",
    rating: 3.6,
    cuisine: "Lounge & Bar",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-30",
    name: "Chitis Fast Food",
    rating: 3.6,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-31",
    name: "Mama Cass",
    rating: 3.6,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-32",
    name: "De Castle Restaurant",
    rating: 3.6,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-33",
    name: "Royal Palace Restaurant",
    rating: 3.5,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-34",
    name: "Nwanyi Enugu Kitchen",
    rating: 3.5,
    cuisine: "Local Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-35",
    name: "Tasty Fried Chicken",
    rating: 3.5,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-36",
    name: "Crunchies Plus",
    rating: 3.5,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-37",
    name: "Ebis Restaurant",
    rating: 3.5,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-38",
    name: "Jovit Restaurant",
    rating: 3.4,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-39",
    name: "Agofure Kitchen",
    rating: 3.4,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-40",
    name: "Munchies Restaurant",
    rating: 3.4,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-41",
    name: "Mama’s Pot",
    rating: 3.3,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-42",
    name: "Uncle T’s Kitchen",
    rating: 3.3,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: "rest-43",
    name: "Royal Garden Restaurant",
    rating: 3.3,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
];

// Combined Extras Array

export const extras: Extra[] = [
  // Continental Menu Extras
  { id: "ext-1", name: "Chicken" },
  { id: "ext-2", name: "Beef" },
  { id: "ext-3", name: "Fish" },
  { id: "ext-4", name: "Plantain" },
  { id: "ext-5", name: "Egg" },
  { id: "ext-6", name: "Turkey" },
  { id: "ext-7", name: "Shrimp" },
  { id: "ext-8", name: "Coleslaw" },
  { id: "ext-9", name: "Ofada Sauce (Ayamase)" },
  { id: "ext-10", name: "Stew" },
  { id: "ext-11", name: "Vegetable Salad" },
  { id: "ext-12", name: "Vegetables" },
  { id: "ext-13", name: "Meatballs" },
  { id: "ext-14", name: "Garlic Bread" },
  { id: "ext-15", name: "Mushrooms" },
  { id: "ext-16", name: "Parmesan Cheese" },
  { id: "ext-17", name: "Extra Cheese" },
  { id: "ext-18", name: "Pepperoni" },

  // Swallows (for soups)
  { id: "ext-19", name: "Eba (Garri)" },
  { id: "ext-20", name: "Pounded Yam" },
  { id: "ext-21", name: "Semovita" },
  { id: "ext-22", name: "Fufu" },
  { id: "ext-23", name: "Wheat" },
  { id: "ext-24", name: "Amala" },

  // Grill Extras
  { id: "ext-25", name: "Fried Plantain" },
  { id: "ext-26", name: "Bole (Roasted Plantain)" },
  { id: "ext-27", name: "Pepper Sauce" },
  { id: "ext-28", name: "Coleslaw" },
  { id: "ext-29", name: "Fries" },
  { id: "ext-30", name: "Fried Yam" },

  // Abacha Extras
  { id: "ext-31", name: "Kpomo" },
  { id: "ext-32", name: "Fried Fish" },
  { id: "ext-33", name: "Garden Egg" },
  { id: "ext-34", name: "Onions" },
  { id: "ext-35", name: "Tomato" },

  // Burger Toppings
  { id: "ext-36", name: "Beef Patty" },
  { id: "ext-37", name: "Chicken Patty" },
  { id: "ext-38", name: "Lettuce" },
  { id: "ext-39", name: "Onions" },
  { id: "ext-40", name: "Tomato" },
  { id: "ext-41", name: "Cheese" },

  // Ice Cream Flavours
  { id: "ext-42", name: "Vanilla" },
  { id: "ext-43", name: "Strawberry" },
  { id: "ext-44", name: "Chocolate" },
  { id: "ext-45", name: "Mint" },
  { id: "ext-46", name: "Cookies & Cream" },

  // Cake Flavours
  { id: "ext-47", name: "Vanilla" },
  { id: "ext-48", name: "Strawberry" },
  { id: "ext-49", name: "Chocolate" },
  { id: "ext-50", name: "Red Velvet" },
  { id: "ext-51", name: "Lemon" },

  // Cupcake Flavours
  { id: "ext-52", name: "Vanilla" },
  { id: "ext-53", name: "Strawberry" },
  { id: "ext-54", name: "Chocolate" },
  { id: "ext-55", name: "Red Velvet" },
  { id: "ext-56", name: "Lemon" },

  // Doughnut Flavours
  { id: "ext-57", name: "Sugar Glazed" },
  { id: "ext-58", name: "Chocolate" },
  { id: "ext-59", name: "Strawberry" },
  { id: "ext-60", name: "Coconut" },
  { id: "ext-61", name: "Cinnamon" },

  // Drink Sizes
  { id: "ext-62", name: "Small" },
  { id: "ext-63", name: "Medium" },
  { id: "ext-64", name: "Large" },

  // Smoothie Flavours
  { id: "ext-65", name: "Banana" },
  { id: "ext-66", name: "Apple" },
  { id: "ext-67", name: "Pineapple" },
  { id: "ext-68", name: "Mango" },
  { id: "ext-69", name: "Berry Mix" },

  // Milkshake Flavours
  { id: "ext-70", name: "Oreo" },
  { id: "ext-71", name: "Strawberry" },
  { id: "ext-72", name: "Blueberry" },
  { id: "ext-73", name: "Vanilla" },
  { id: "ext-74", name: "Chocolate" },

  // Soft Drink Options
  { id: "ext-75", name: "Coca Cola" },
  { id: "ext-76", name: "Fanta" },
  { id: "ext-77", name: "Sprite" },
  { id: "ext-78", name: "Pepsi" },
  { id: "ext-79", name: "Schweppes" },
  { id: "ext-80", name: "Chivita" },
  { id: "ext-81", name: "Vita Milk" },
  { id: "ext-82", name: "Chi Exotic" },
];

// Swallows (for soups)
export const swallows: Swallow[] = [
  { id: "sw-1", name: "Eba (Garri)" },
  { id: "sw-2", name: "Pounded Yam" },
  { id: "sw-3", name: "Semovita" },
  { id: "sw-4", name: "Fufu" },
  { id: "sw-5", name: "Wheat" },
  { id: "sw-6", name: "Amala" },
];

export const menus: Menu[] = [
  // MAIN MenuS
  {
    id: "menu-1",
    name: "Jollof Rice",
    categoryId: "cat-1",
    image: "/Screenshot (283).png",
    description:
      "A vibrant West African classic made with long-grain rice simmered in a rich tomato and pepper base, infused with smoky spices. Beloved for its bold flavor and festive appenu.",
  },
  {
    id: "menu-2",
    name: "Fried Rice",
    categoryId: "cat-1",
    image: "/Screenshot (282).png",
    description:
      "Golden rice stir-fried with colorful vegetables, seasoned with savory spices, and often paired with chicken or seafood. A staple at Nigerian parties and celebrations.",
  },
  {
    id: "menu-3",
    name: "Ofada Rice & Sauce",
    categoryId: "cat-1",
    image: "/Screenshot (284).png",
    description:
      "Local Nigerian rice served with Ayamase (green pepper sauce), known for its earthy aroma and fiery flavor. A rustic delicacy that celebrates traditional taste.",
  },
  {
    id: "menu-4",
    name: "White Rice & Stew",
    categoryId: "cat-1",
    image: "/Screenshot (285).png",
    description:
      "Steamed white rice paired with rich tomato stew, often accompanied by chicken, beef, or fish. A comforting everyday Nigerian menu.",
  },
  {
    id: "menu-5",
    name: "Coconut Rice",
    categoryId: "cat-1",
    image: "/Screenshot (286).png",
    description:
      "Fragrant rice cooked in creamy coconut milk, giving it a subtle sweetness and tropical flavor. Often garnished with shrimp or vegetables.",
  },
  {
    id: "menu-6",
    name: "Porridge Yam",
    categoryId: "cat-1",
    image: "/Screenshot (287).png",
    description:
      "Soft yam chunks simmered in palm oil, peppers, and spices until creamy. A hearty, comforting dish enjoyed across Nigeria.",
  },
  {
    id: "menu-7",
    name: "Beans & Plantain",
    categoryId: "cat-1",
    image: "/Screenshot (288).png",
    description:
      "Protein-rich beans cooked to perfection, served with sweet, caramelized fried plantains. A wholesome and satisfying combo.",
  },
  {
    id: "menu-8",
    name: "Moi Moi",
    categoryId: "cat-1",
    image: "/Screenshot (289).png",
    description:
      "Steamed bean pudding made from blended beans, peppers, and spices. Soft, savory, and often enriched with egg or fish.",
  },
  {
    id: "menu-9",
    name: "Spaghetti Bolognese",
    categoryId: "cat-1",
    image: "/Screenshot (291).png",
    description:
      "Italian-inspired pasta dish with spaghetti tossed in a rich tomato and minced meat sauce, seasoned with herbs and spices.",
  },
  {
    id: "menu-10",
    name: "Pasta Alfredo",
    categoryId: "cat-1",
    image: "/Screenshot (293).png",
    description:
      "Creamy pasta made with butter, cream, and Parmesan cheese, often paired with chicken or shrimp for a luxurious taste.",
  },
  {
    id: "menu-11",
    name: "Pizza Margherita",
    categoryId: "cat-1",
    image: "/Screenshot (294).png",
    description:
      "Classic Italian pizza topped with fresh tomato sauce, mozzarella cheese, and basil. Simple yet bursting with flavor.",
  },
  {
    id: "menu-12",
    name: "Yam & Egg Sauce",
    categoryId: "cat-1",
    image: "/Screenshot (295).png",
    description:
      "Boiled yam served with a savory egg and tomato sauce. A quick, nutritious, and popular Nigerian breakfast or dinner option.",
  },
  {
    id: "menu-13",
    name: "Abacha",
    categoryId: "cat-1",
    image: "/Screenshot (313).png",
    description:
      "African salad made from dried shredded cassava, mixed with palm oil, spices, and toppings like fish or kpomo. A beloved Igbo delicacy.",
  },

  // SOUPS & SWALLOWS
  {
    id: "menu-14",
    name: "Egusi Soup",
    categoryId: "cat-2",
    image: "/Screenshot (297).png",
    description:
      "Rich Nigerian soup made with ground melon seeds, leafy vegetables, and assorted meats. Thick, nutty, and deeply satisfying.",
  },
  {
    id: "menu-15",
    name: "Ogbono Soup",
    categoryId: "cat-2",
    image: "/Screenshot (298).png",
    description:
      "Soup made from ground ogbono seeds, giving it a unique slimy texture. Cooked with meats, fish, and leafy greens.",
  },
  {
    id: "menu-16",
    name: "Vegetable Soup",
    categoryId: "cat-2",
    image: "/Screenshot (299).png",
    description:
      "Nutritious soup made with a variety of fresh vegetables, palm oil, and proteins. A henuthy and flavorful choice.",
  },
  {
    id: "menu-17",
    name: "Afang Soup",
    categoryId: "cat-2",
    image: "/Screenshot (300).png",
    description:
      "Traditional Efik soup made with afang leaves and waterleaf, cooked with meats and fish. Rich, earthy, and aromatic.",
  },
  {
    id: "menu-18",
    name: "Banga Soup",
    categoryId: "cat-2",
    image: "/Screenshot (301).png",
    description:
      "Delta delicacy made from palm fruit extract, simmered with spices, meats, and fish. Flavorful and deeply traditional.",
  },
  {
    id: "menu-19",
    name: "Oha Soup",
    categoryId: "cat-2",
    image: "/Screenshot (296).png",
    description:
      "Igbo soup prepared with tender oha leaves, cocoyam paste, and assorted proteins. Comforting and rich in flavor.",
  },
  {
    id: "menu-20",
    name: "Pepper Soup (Goat Meat)",
    categoryId: "cat-2",
    image: "/Screenshot (302).png",
    description:
      "Spicy broth infused with traditional herbs, served with tender goat meat. Known for its warming and medicinal qualities.",
  },
  {
    id: "menu-21",
    name: "Pepper Soup (Fish)",
    categoryId: "cat-2",
    image: "/Screenshot (303).png",
    description:
      "Light, spicy soup made with fresh fish and aromatic spices. Refreshing and perfect for cold evenings.",
  },
  {
    id: "menu-22",
    name: "Amala, Ewedu, Gbegiri",
    categoryId: "cat-2",
    image: "/Screenshot (304).png",
    description:
      "Yoruba delicacy combining amala, ewedu, and gbegiri. A rich cultural trio.",
  },

  // GRILLS
  {
    id: "menu-23",
    name: "Chicken Suya",
    categoryId: "cat-3",
    image: "/Screenshot (306).png",
    description:
      "Tender chicken skewers marinated in suya spices, grilled to smoky perfection.",
  },
  {
    id: "menu-24",
    name: "Beef Suya",
    categoryId: "cat-3",
    image: "/Screenshot (305).png",
    description:
      "Thinly sliced beef coated in a fiery peanut-spice rub, grilled over open flames.",
  },
  {
    id: "menu-25",
    name: "Grilled Fish",
    categoryId: "cat-3",
    image: "/Screenshot (307).png",
    description:
      "Fresh fish seasoned with herbs and spices, grilled until juicy.",
  },
  {
    id: "menu-26",
    name: "Grilled Turkey",
    categoryId: "cat-3",
    image: "/Screenshot (310).png",
    description: "Succulent turkey pieces marinated and grilled.",
  },
  {
    id: "menu-27",
    name: "Grilled Chicken",
    categoryId: "cat-3",
    image: "/Screenshot (309).png",
    description: "Classic grilled chicken with rich seasoning.",
  },
  {
    id: "menu-28",
    name: "Asun",
    categoryId: "cat-3",
    image: "/Screenshot (311).png",
    description: "Fiery goat meat chunks roasted and tossed in pepper sauce.",
  },
  {
    id: "menu-29",
    name: "Nkwobi",
    categoryId: "cat-3",
    image: "/Screenshot (312).png",
    description: "Cow foot delicacy cooked in palm oil and spices.",
  },
  {
    id: "menu-30",
    name: "Peppered Snail",
    categoryId: "cat-3",
    image: "/Screenshot (314).png",
    description: "Tender snails sautéed in spicy pepper sauce.",
  },
  {
    id: "menu-31",
    name: "Peppered Chicken",
    categoryId: "cat-3",
    image: "/Screenshot (315).png",
    description: "Juicy chicken in spicy pepper sauce.",
  },
  {
    id: "menu-32",
    name: "Peppered Turkey",
    categoryId: "cat-3",
    image: "/Screenshot (316).png",
    description: "Turkey chunks cooked in spicy pepper mix.",
  },
  {
    id: "menu-33",
    name: "Peppered Beef",
    categoryId: "cat-3",
    image: "/Screenshot (317).png",
    description: "Beef strips stir-fried in pepper sauce.",
  },
  {
    id: "menu-34",
    name: "Peppered Goat Meat",
    categoryId: "cat-3",
    image: "/Screenshot (319).png",
    description: "Goat meat infused with hot peppers.",
  },
  {
    id: "menu-35",
    name: "Peppered Fish",
    categoryId: "cat-3",
    image: "/Screenshot (318).png",
    description: "Fish cooked in spicy pepper sauce.",
  },
  {
    id: "menu-36",
    name: "Fried Chicken",
    categoryId: "cat-3",
    image: "/Screenshot (320).png",
    description: "Crispy golden fried chicken.",
  },
  {
    id: "menu-37",
    name: "Fried Turkey",
    categoryId: "cat-3",
    image: "/Screenshot (321).png",
    description: "Deep-fried turkey pieces.",
  },
  {
    id: "menu-38",
    name: "Fried Beef",
    categoryId: "cat-3",
    image: "/Screenshot (322).png",
    description: "Seasoned beef chunks fried golden.",
  },
  {
    id: "menu-39",
    name: "Fried Fish",
    categoryId: "cat-3",
    image: "/Screenshot (323).png",
    description: "Crispy fried fish fillets.",
  },

  // SNACKS
  {
    id: "menu-40",
    name: "Meat Pie",
    categoryId: "cat-4",
    image: "/Screenshot (324).png",
    description: "Flaky pastry stuffed with minced meat.",
  },
  {
    id: "menu-41",
    name: "Chicken Pie",
    categoryId: "cat-4",
    image: "/Screenshot (325).png",
    description: "Pastry filled with chicken and vegetables.",
  },
  {
    id: "menu-42",
    name: "Sausage Roll",
    categoryId: "cat-4",
    image: "/Screenshot (326).png",
    description: "Pastry roll with sausage meat.",
  },
  {
    id: "menu-43",
    name: "Puff Puff",
    categoryId: "cat-4",
    image: "/Screenshot (327).png",
    description: "Sweet fried dough balls.",
  },
  {
    id: "menu-44",
    name: "Spring Rolls",
    categoryId: "cat-4",
    image: "/Screenshot (328).png",
    description: "Crispy vegetable rolls.",
  },
  {
    id: "menu-45",
    name: "Samosa",
    categoryId: "cat-4",
    image: "/Screenshot (329).png",
    description: "Triangular pastry with spiced filling.",
  },
  {
    id: "menu-46",
    name: "Chin Chin",
    categoryId: "cat-4",
    image: "/Screenshot (330).png",
    description: "Crunchy fried dough cubes.",
  },
  {
    id: "menu-47",
    name: "Buns",
    categoryId: "cat-4",
    image: "/Screenshot (333).png",
    description: "Golden fried dough balls.",
  },
  {
    id: "menu-48",
    name: "Okpa",
    categoryId: "cat-4",
    image: "/Screenshot (334).png",
    description: "Traditional steamed Bambara nut pudding.",
  },
  {
    id: "menu-49",
    name: "Burger",
    categoryId: "cat-4",
    image: "/Screenshot (332).png",
    description: "Juicy patty in a bun with toppings.",
  },

  // DESSERTS
  {
    id: "menu-50",
    name: "Ice Cream",
    categoryId: "cat-5",
    image: "/Screenshot (335).png",
    description: "Cold creamy dessert.",
  },
  {
    id: "menu-51",
    name: "Cake",
    categoryId: "cat-5",
    image: "/Screenshot (336).png",
    description: "Soft baked dessert with frosting.",
  },
  {
    id: "menu-52",
    name: "Cupcakes",
    categoryId: "cat-5",
    image: "/Screenshot (338).png",
    description: "Mini cakes topped with frosting.",
  },
  {
    id: "menu-53",
    name: "Doughnuts",
    categoryId: "cat-5",
    image: "/Screenshot (339).png",
    description: "Sweet fried dough rings.",
  },

  // DRINKS
  {
    id: "menu-54",
    name: "Zobo Drink",
    categoryId: "cat-6",
    image: "/Screenshot (340).png",
    description: "Refreshing hibiscus drink.",
  },
  {
    id: "menu-55",
    name: "Tigernut Drink",
    categoryId: "cat-6",
    image: "/Screenshot (342).png",
    description: "Creamy tiger nut beverage.",
  },
  {
    id: "menu-56",
    name: "Smoothie",
    categoryId: "cat-6",
    image: "/Screenshot (343).png",
    description: "Blended fruit drink.",
  },
  {
    id: "menu-57",
    name: "Soft Drinks",
    categoryId: "cat-6",
    image: "/Screenshot (344).png",
    description: "Carbonated beverages.",
  },
  {
    id: "menu-58",
    name: "Bottled Water",
    categoryId: "cat-6",
    image: "/Screenshot (346).png",
    description: "Pure drinking water.",
  },
  {
    id: "menu-59",
    name: "Coffee",
    categoryId: "cat-6",
    image: "/Screenshot (348).png",
    description: "Hot brewed coffee.",
  },
  {
    id: "menu-60",
    name: "Milkshake",
    categoryId: "cat-6",
    image: "/Screenshot (349).png",
    description: "Creamy milk-based drink.",
  },
];

export const restaurantMenus = [
  // OceanEventsNG
  { id: 'restm-1', restaurantId: 'rest-1', menuId: 'menu-3', basePrice: 12000, isAvailable: true },
  { id: 'restm-2', restaurantId: 'rest-1', menuId: 'menu-4', basePrice: 4500, isAvailable: true },

  // Ntachi-Osa
  { id: 'restm-3', restaurantId: 'rest-2', menuId: 'menu-5', basePrice: 500, isAvailable: true },
  { id: 'restm-4', restaurantId: 'rest-2', menuId: 'menu-6', basePrice: 2500, isAvailable: true },

  // The Manor Restaurant
  { id: 'restm-5', restaurantId: 'rest-3', menuId: 'menu-7', basePrice: 8000, isAvailable: true },
  { id: 'restm-6', restaurantId: 'rest-3', menuId: 'menu-8', basePrice: 6000, isAvailable: true },

  // Bush House Arena
  { id: 'restm-7', restaurantId: 'rest-4', menuId: 'menu-9', basePrice: 2000, isAvailable: true },
  { id: 'restm-8', restaurantId: 'rest-4', menuId: 'menu-10', basePrice: 3500, isAvailable: true },

  // Shanghai Octopus
  { id: 'restm-9', restaurantId: 'rest-5', menuId: 'menu-11', basePrice: 5000, isAvailable: true },
  { id: 'restm-10', restaurantId: 'rest-5', menuId: 'menu-12', basePrice: 3000, isAvailable: true },

  // Shared menus across restaurants (example)
  { id: 'restm-11', restaurantId: 'rest-1', menuId: 'menu-1', basePrice: 4000, isAvailable: true },
  { id: 'restm-12', restaurantId: 'rest-3', menuId: 'menu-1', basePrice: 4500, isAvailable: true },
];

// cuisineMenuMap.ts
// cuisineMenuMap.ts
export const cuisineMenuMap: Record<string, number[]> = {
  "Catering & Fine Dining": [3, 4, 5, 14, 16, 18, 25, 26, 27, 50, 51, 59, 60],

  "Local Nigerian Menus": [
    1, 2, 3, 4, 6, 7, 8, 14, 15, 16, 17, 18, 19, 23, 24, 28, 29, 31, 33,
  ],

  "Continental & Upscale Dining": [9, 10, 11, 25, 26, 27, 50, 51, 53, 59, 60],

  "Barbecue & Local Dishes": [23, 24, 25, 27, 28, 29, 31, 33, 35],

  "Chinese & Oriental": [9, 10, 25, 33, 21, 54, 56],

  "Nigerian & Continental": [
    1, 2, 4, 6, 9, 10, 14, 16, 18, 19, 23, 25, 27, 28, 50, 59,
  ],

  "Modern Dining": [9, 10, 11, 25, 26, 36, 37, 50, 51, 56, 60],

  "Nigerian & International": [1, 2, 4, 9, 10, 14, 16, 18, 25, 27, 50, 56],

  "International & Local Fusion": [1, 2, 9, 10, 14, 16, 25, 27, 50, 56],

  "Café & Lounge": [49, 50, 51, 53, 59, 60, 54, 55, 56],

  "French & Chinese Fusion": [9, 10, 11, 25, 33, 50, 51, 59],

  "Italian, Bar & Pub": [9, 10, 11, 25, 27, 49, 57, 59, 60],

  "Resort Dining": [3, 4, 5, 14, 16, 18, 25, 26, 27, 50, 51, 56, 60],

  "African & Fast Food": [1, 2, 4, 14, 16, 18, 36, 37, 38, 40, 41, 42, 57],

  "Continental & Nigerian": [1, 2, 4, 6, 9, 10, 14, 16, 18, 23, 25, 27, 50],

  "Hotel Dining": [3, 4, 9, 10, 14, 16, 25, 26, 50, 51, 59],

  Chinese: [9, 10, 25, 33, 21],

  "Bar & Grill": [23, 24, 25, 27, 28, 31, 57],

  "Local Nigerian": [1, 2, 3, 4, 6, 7, 14, 15, 16, 18, 19, 23, 24, 28, 29],

  Nigerian: [1, 2, 4, 6, 7, 14, 15, 16, 18, 19, 23, 24, 27, 28, 31],

  "Fast Food & Nigerian": [1, 2, 4, 36, 37, 38, 40, 41, 42, 49, 57],

  "Fast Food": [36, 37, 38, 39, 40, 41, 42, 49, 57],

  "Lounge & Bar": [49, 50, 51, 57, 59, 60],
};

export const mockOrders: Order[] = [
  {
    id: 'mocko-1',
    userId: 'user-1',
    restaurantId: 'rest-2',
    status: "paid",
    createdAt: "2026-02-01",
  },
  {
    id: 'mocko-2',
    userId: 'user-1',
    restaurantId: 'rest-2',
    status: "paid",
    createdAt: "2026-02-02",
  },
  {
    id: 'mocko-3',
    userId: 'user-1',
    restaurantId: 'rest-1',
    status: "paid",
    createdAt: "2026-02-02",
  },
  {
    id: 'mocko-4',
    userId: 'user-1',
    restaurantId: 'rest-3',
    status: "cancelled",
    createdAt: "2026-02-03",
  },
];

export const mockOrderItems: OrderItem[] = [
  // Order 1 (Ntachi Osa)
  { id: 'mock-1', orderId: 'mocko-1', restaurantMenuId: 'restm-4', quantity: 1 }, // menu-6
  { id: 'mock-2', orderId: 'mocko-1', restaurantMenuId: 'restm-11', quantity: 1 }, // menu-1

  // Order 2
  { id: 'mock-3', orderId: 'mocko-2', restaurantMenuId: 'restm-4', quantity: 1 },

  // Order 3
  { id: 'mock-4', orderId: 'mocko-3', restaurantMenuId: 'restm-4', quantity: 1 },

  // More items
  { id: 'mock-5', orderId: 'mocko-1', restaurantMenuId: 'restm-2', quantity: 1 }, // menu-4
  { id: 'mock-6', orderId: 'mocko-1', restaurantMenuId: 'restm-1', quantity: 1 }, // menu-3

  { id: 'mock-7', orderId: 'mocko-2', restaurantMenuId: 'restm-2', quantity: 1 },

  { id: 'mock-8', orderId: 'mocko-3', restaurantMenuId: 'restm-4', quantity: 1 },

  { id: 'mock-9', orderId: 'mocko-1', restaurantMenuId: 'restm-4', quantity: 1 },
  { id: 'mock-10', orderId: 'mocko-1', restaurantMenuId: 'restm-3', quantity: 1 },

  { id: 'mock-11', orderId: 'mocko-2', restaurantMenuId: 'restm-4', quantity: 1 },

  { id: 'mock-12', orderId: 'mocko-3', restaurantMenuId: 'restm-4', quantity: 1 },
];
