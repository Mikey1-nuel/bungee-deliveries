import { Order, OrderItem, SidesExtra } from "../app/types/type";

export const restaurants = [
  {
    id: 1,
    name: "OceanEventsNG",
    rating: 4.8,
    cuisine: "Barbecue & Local Dishes",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 2,
    name: "Ntachi-Osa",
    rating: 4.7,
    cuisine: "Local Nigerian Meals",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 3,
    name: "The Manor Restaurant",
    rating: 4.6,
    cuisine: "Continental & Upscale Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 4,
    name: "Bush House Arena",
    rating: 4.5,
    cuisine: "Barbecue & Local Dishes",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 5,
    name: "Shanghai Octopus",
    rating: 4.3,
    cuisine: "Chinese & Oriental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 6,
    name: "Dolphin Restaurant",
    rating: 4.6,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 7,
    name: "Foodopolis Enugu",
    rating: 4.5,
    cuisine: "Modern Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 8,
    name: "Rewind Luxury Place",
    rating: 4.4,
    cuisine: "Nigerian & International",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 9,
    name: "Roots Restaurant & Café",
    rating: 4.4,
    cuisine: "International & Local Fusion",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 10,
    name: "Latitude Café and Lounge",
    rating: 4.3,
    cuisine: "Café & Lounge",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 11,
    name: "Aaron’s Signature Restaurant",
    rating: 4.3,
    cuisine: "French & Chinese Fusion",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 12,
    name: "7th Planet International Ltd",
    rating: 4.2,
    cuisine: "Italian, Bar & Pub",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 13,
    name: "Eclipse Resort Enugu",
    rating: 4.2,
    cuisine: "Resort Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 14,
    name: "Open Sharaton",
    rating: 4.1,
    cuisine: "African & Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 15,
    name: "Bungalow Restaurant",
    rating: 4.1,
    cuisine: "Continental & Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 16,
    name: "Discovery Kitchen",
    rating: 4.1,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 17,
    name: "Golden Royale Restaurant",
    rating: 4.0,
    cuisine: "Hotel Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 18,
    name: "Villa Toscana",
    rating: 4.0,
    cuisine: "Italian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 19,
    name: "Octopus Chinese Restaurant",
    rating: 4.0,
    cuisine: "Chinese",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 20,
    name: "Cheers Bar & Restaurant",
    rating: 4.0,
    cuisine: "Bar & Grill",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 21,
    name: "Nwanyi Owerri Restaurant & Bar",
    rating: 3.9,
    cuisine: "Local Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 22,
    name: "Mummy B Restaurant",
    rating: 3.8,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 23,
    name: "Crunchies Fried Chicken",
    rating: 3.8,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 24,
    name: "Kilimanjaro Restaurant",
    rating: 3.8,
    cuisine: "Fast Food & Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 25,
    name: "Mr. Biggs",
    rating: 3.7,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 26,
    name: "Chicken Republic",
    rating: 3.7,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 27,
    name: "Genesis Restaurant",
    rating: 3.7,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 28,
    name: "Protea Hotel Restaurant",
    rating: 3.7,
    cuisine: "Hotel Dining",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 29,
    name: "Polo Lounge",
    rating: 3.6,
    cuisine: "Lounge & Bar",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 30,
    name: "Chitis Fast Food",
    rating: 3.6,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 31,
    name: "Mama Cass",
    rating: 3.6,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 32,
    name: "De Castle Restaurant",
    rating: 3.6,
    cuisine: "Nigerian & Continental",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 33,
    name: "Royal Palace Restaurant",
    rating: 3.5,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 34,
    name: "Nwanyi Enugu Kitchen",
    rating: 3.5,
    cuisine: "Local Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 35,
    name: "Tasty Fried Chicken",
    rating: 3.5,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 36,
    name: "Crunchies Plus",
    rating: 3.5,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 37,
    name: "Ebis Restaurant",
    rating: 3.5,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 38,
    name: "Jovit Restaurant",
    rating: 3.4,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 39,
    name: "Agofure Kitchen",
    rating: 3.4,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 40,
    name: "Munchies Restaurant",
    rating: 3.4,
    cuisine: "Fast Food",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 41,
    name: "Mama’s Pot",
    rating: 3.3,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 42,
    name: "Uncle T’s Kitchen",
    rating: 3.3,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
  {
    id: 43,
    name: "Royal Garden Restaurant",
    rating: 3.3,
    cuisine: "Nigerian",
    image: "/amin-ramezani-afOvuzIgxPU-unsplash.jpg",
    location: "Enugu",
  },
];

export const continentalMealExtras: SidesExtra[] = [
  { id: 1, name: "Chicken", price: 1200 },
  { id: 2, name: "Beef", price: 1000 },
  { id: 3, name: "Fish", price: 1500 },
  { id: 4, name: "Plantain", price: 700 },
  { id: 5, name: "Egg", price: 500 },

  { id: 6, name: "Turkey", price: 1500 },
  { id: 7, name: "Shrimp", price: 1800 },
  { id: 8, name: "Coleslaw", price: 600 },

  { id: 9, name: "Ofada Sauce (Ayamase)", price: 1000 },

  { id: 10, name: "Stew", price: 800 },

  { id: 11, name: "Vegetable Salad", price: 600 },

  { id: 12, name: "Vegetables", price: 600 },

  { id: 13, name: "Meatballs", price: 1200 },
  { id: 14, name: "Garlic Bread", price: 600 },

  { id: 15, name: "Mushrooms", price: 600 },
  { id: 16, name: "Parmesan Cheese", price: 800 },

  { id: 17, name: "Extra Cheese", price: 800 },
  { id: 18, name: "Pepperoni", price: 1000 },
];

// Swallows (for soups)
export const swallows: SidesExtra[] = [
  { id: 1, name: "Eba (Garri)", price: 500 },
  { id: 2, name: "Pounded Yam", price: 800 },
  { id: 3, name: "Semovita", price: 600 },
  { id: 4, name: "Fufu", price: 600 },
  { id: 5, name: "Wheat", price: 700 },
  { id: 6, name: "Amala", price: 700 },
];

// Grill Extras
export const grillExtras: SidesExtra[] = [
  { id: 1, name: "Fried Plantain", price: 700 },
  { id: 2, name: "Bole (Roasted Plantain)", price: 600 },
  { id: 3, name: "Pepper Sauce", price: 300 },
  { id: 4, name: "Coleslaw", price: 400 },
  { id: 5, name: "Fries", price: 800 },
  { id: 6, name: "Fried Yam", price: 700 },
];

// Abacha Extras
export const abachaExtras: SidesExtra[] = [
  { id: 1, name: "Kpomo", price: 500 },
  { id: 2, name: "Fried Fish", price: 1000 },
  { id: 3, name: "Garden Egg", price: 400 },
  { id: 4, name: "Onions", price: 200 },
  { id: 5, name: "Tomato", price: 300 },
];

// Burger Toppings
export const burgerToppings: SidesExtra[] = [
  { id: 1, name: "Beef Patty", price: 1200 },
  { id: 2, name: "Chicken Patty", price: 1000 },
  { id: 3, name: "Lettuce", price: 200 },
  { id: 4, name: "Onions", price: 200 },
  { id: 5, name: "Tomato", price: 200 },
  { id: 6, name: "Cheese", price: 500 },
];

// Ice Cream Flavours
export const iceCreamFlavour: SidesExtra[] = [
  { id: 1, name: "Vanilla", price: 500 },
  { id: 2, name: "Strawberry", price: 600 },
  { id: 3, name: "Chocolate", price: 600 },
  { id: 4, name: "Mint", price: 500 },
  { id: 5, name: "Cookies & Cream", price: 700 },
];

// Cake Flavours
export const cakeFlavour: SidesExtra[] = [
  { id: 1, name: "Vanilla", price: 1000 },
  { id: 2, name: "Strawberry", price: 1200 },
  { id: 3, name: "Chocolate", price: 1200 },
  { id: 4, name: "Red Velvet", price: 1500 },
  { id: 5, name: "Lemon", price: 1000 },
];

// Cupcake Flavours
export const cupCakeFlavour: SidesExtra[] = [
  { id: 1, name: "Vanilla", price: 500 },
  { id: 2, name: "Strawberry", price: 600 },
  { id: 3, name: "Chocolate", price: 600 },
  { id: 4, name: "Red Velvet", price: 700 },
  { id: 5, name: "Lemon", price: 500 },
];

// Doughnut Flavours
export const doughnutFlavour: SidesExtra[] = [
  { id: 1, name: "Sugar Glazed", price: 500 },
  { id: 2, name: "Chocolate", price: 600 },
  { id: 3, name: "Strawberry", price: 600 },
  { id: 4, name: "Coconut", price: 500 },
  { id: 5, name: "Cinnamon", price: 500 },
];

// Drink Sizes
export const drinkSize: SidesExtra[] = [
  { id: 1, name: "Small", price: 300 },
  { id: 2, name: "Medium", price: 500 },
  { id: 3, name: "Large", price: 700 },
];

// Smoothie Flavours
export const smoothieFlavour: SidesExtra[] = [
  { id: 1, name: "Banana", price: 800 },
  { id: 2, name: "Apple", price: 800 },
  { id: 3, name: "Pineapple", price: 900 },
  { id: 4, name: "Mango", price: 900 },
  { id: 5, name: "Berry Mix", price: 1000 },
];

// Milkshake Flavours
export const milkshakeFlavour: SidesExtra[] = [
  { id: 1, name: "Oreo", price: 1000 },
  { id: 2, name: "Strawberry", price: 900 },
  { id: 3, name: "Blueberry", price: 1000 },
  { id: 4, name: "Vanilla", price: 800 },
  { id: 5, name: "Chocolate", price: 900 },
];

// Soft Drink Options
export const softDrinkOptions: SidesExtra[] = [
  { id: 1, name: "Coca Cola", price: 500 },
  { id: 2, name: "Fanta", price: 500 },
  { id: 3, name: "Sprite", price: 500 },
  { id: 4, name: "Pepsi", price: 500 },
  { id: 5, name: "Schweppes", price: 600 },
  { id: 6, name: "Chivita", price: 700 },
  { id: 7, name: "Vita Milk", price: 700 },
  { id: 8, name: "Chi Exotic", price: 700 },
];

export const meals = [
  // MAIN MEALS
  {
    id: 1,
    name: "Jollof Rice",
    categoryId: 1,
    image: "/Screenshot (283).png",
    extra: continentalMealExtras,
    description:
      "A vibrant West African classic made with long-grain rice simmered in a rich tomato and pepper base, infused with smoky spices. Beloved for its bold flavor and festive appeal.",
  },
  {
    id: 2,
    name: "Fried Rice",
    categoryId: 1,
    image: "/Screenshot (282).png",
    extra: continentalMealExtras,
    description:
      "Golden rice stir-fried with colorful vegetables, seasoned with savory spices, and often paired with chicken or seafood. A staple at Nigerian parties and celebrations.",
  },
  {
    id: 3,
    name: "Ofada Rice & Sauce",
    categoryId: 1,
    image: "/Screenshot (284).png",
    extra: continentalMealExtras,
    description:
      "Local Nigerian rice served with Ayamase (green pepper sauce), known for its earthy aroma and fiery flavor. A rustic delicacy that celebrates traditional taste.",
  },
  {
    id: 4,
    name: "White Rice & Stew",
    categoryId: 1,
    image: "/Screenshot (285).png",
    extra: continentalMealExtras,
    description:
      "Steamed white rice paired with rich tomato stew, often accompanied by chicken, beef, or fish. A comforting everyday Nigerian meal.",
  },
  {
    id: 5,
    name: "Coconut Rice",
    categoryId: 1,
    image: "/Screenshot (286).png",
    extra: continentalMealExtras,
    description:
      "Fragrant rice cooked in creamy coconut milk, giving it a subtle sweetness and tropical flavor. Often garnished with shrimp or vegetables.",
  },
  {
    id: 6,
    name: "Porridge Yam",
    categoryId: 1,
    image: "/Screenshot (287).png",
    extra: continentalMealExtras,
    description:
      "Soft yam chunks simmered in palm oil, peppers, and spices until creamy. A hearty, comforting dish enjoyed across Nigeria.",
  },
  {
    id: 7,
    name: "Beans & Plantain",
    categoryId: 1,
    image: "/Screenshot (288).png",
    extra: continentalMealExtras,
    description:
      "Protein-rich beans cooked to perfection, served with sweet, caramelized fried plantains. A wholesome and satisfying combo.",
  },
  {
    id: 8,
    name: "Moi Moi",
    categoryId: 1,
    image: "/Screenshot (289).png",
    description:
      "Steamed bean pudding made from blended beans, peppers, and spices. Soft, savory, and often enriched with egg or fish.",
  },
  {
    id: 9,
    name: "Spaghetti Bolognese",
    categoryId: 1,
    image: "/Screenshot (291).png",
    extra: continentalMealExtras,
    description:
      "Italian-inspired pasta dish with spaghetti tossed in a rich tomato and minced meat sauce, seasoned with herbs and spices.",
  },
  {
    id: 10,
    name: "Pasta Alfredo",
    categoryId: 1,
    image: "/Screenshot (293).png",
    extra: continentalMealExtras,
    description:
      "Creamy pasta made with butter, cream, and Parmesan cheese, often paired with chicken or shrimp for a luxurious taste.",
  },
  {
    id: 11,
    name: "Pizza Margherita",
    categoryId: 1,
    image: "/Screenshot (294).png",
    extra: continentalMealExtras,
    description:
      "Classic Italian pizza topped with fresh tomato sauce, mozzarella cheese, and basil. Simple yet bursting with flavor.",
  },
  {
    id: 12,
    name: "Yam & Egg Sauce",
    categoryId: 1,
    image: "/Screenshot (295).png",
    extra: continentalMealExtras,
    description:
      "Boiled yam served with a savory egg and tomato sauce. A quick, nutritious, and popular Nigerian breakfast or dinner option.",
  },
  {
    id: 13,
    name: "Abacha",
    categoryId: 1,
    image: "/Screenshot (313).png",
    extra: abachaExtras,
    description:
      "African salad made from dried shredded cassava, mixed with palm oil, spices, and toppings like fish or kpomo. A beloved Igbo delicacy.",
  },

  // SOUPS & SWALLOWS
  {
    id: 14,
    name: "Egusi Soup",
    categoryId: 2,
    extra: swallows,
    allowsSwallow: true,
    swallowOptions: [1, 2, 3, 4, 5, 6],
    image: "/Screenshot (297).png",
    description:
      "Rich Nigerian soup made with ground melon seeds, leafy vegetables, and assorted meats. Thick, nutty, and deeply satisfying.",
  },
  {
    id: 15,
    name: "Ogbono Soup",
    categoryId: 2,
    extra: swallows,
    allowsSwallow: true,
    swallowOptions: [1, 2, 3, 4, 5, 6],
    image: "/Screenshot (298).png",
    description:
      "Soup made from ground ogbono seeds, giving it a unique slimy texture. Cooked with meats, fish, and leafy greens.",
  },
  {
    id: 16,
    name: "Vegetable Soup",
    categoryId: 2,
    extra: swallows,
    allowsSwallow: true,
    swallowOptions: [1, 2, 3, 4, 5, 6],
    image: "/Screenshot (299).png",
    description:
      "Nutritious soup made with a variety of fresh vegetables, palm oil, and proteins. A healthy and flavorful choice.",
  },
  {
    id: 17,
    name: "Afang Soup",
    categoryId: 2,
    extra: swallows,
    allowsSwallow: true,
    swallowOptions: [1, 2, 3, 4, 5, 6],
    image: "/Screenshot (300).png",
    description:
      "Traditional Efik soup made with afang leaves and waterleaf, cooked with meats and fish. Rich, earthy, and aromatic.",
  },
  {
    id: 18,
    name: "Banga Soup",
    categoryId: 2,
    extra: swallows,
    allowsSwallow: true,
    swallowOptions: [1, 2, 3, 4, 5, 6],
    image: "/Screenshot (301).png",
    description:
      "Delta delicacy made from palm fruit extract, simmered with spices, meats, and fish. Flavorful and deeply traditional.",
  },
  {
    id: 19,
    name: "Oha Soup",
    categoryId: 2,
    extra: swallows,
    allowsSwallow: true,
    swallowOptions: [1, 2, 3, 4, 5, 6],
    image: "/Screenshot (296).png",
    description:
      "Igbo soup prepared with tender oha leaves, cocoyam paste, and assorted proteins. Comforting and rich in flavor.",
  },
  {
    id: 20,
    name: "Pepper Soup (Goat Meat)",
    categoryId: 2,
    extra: swallows,
    image: "/Screenshot (302).png",
    description:
      "Spicy broth infused with traditional herbs, served with tender goat meat. Known for its warming and medicinal qualities.",
  },
  {
    id: 21,
    name: "Pepper Soup (Fish)",
    categoryId: 2,
    extra: swallows,
    image: "/Screenshot (303).png",
    description:
      "Light, spicy soup made with fresh fish and aromatic spices. Refreshing and perfect for cold evenings.",
  },
  {
    id: 22,
    name: "Amala, Ewedu, Gbegiri",
    categoryId: 2,
    extra: swallows,
    image: "/Screenshot (304).png",
    description:
      "Yoruba delicacy combining amala (yam flour swallow), ewedu (jute leaf soup), and gbegiri (bean soup). A rich, cultural trio.",
  },

  // GRILLS & SIDES
  // GRILLS & SIDES
  {
    id: 23,
    name: "Chicken Suya",
    categoryId: 3,
    image: "/Screenshot (306).png",
    extra: grillExtras,
    description:
      "Tender chicken skewers marinated in suya spices, grilled to smoky perfection. A spicy, savory street food favorite.",
  },
  {
    id: 24,
    name: "Beef Suya",
    categoryId: 3,
    image: "/Screenshot (305).png",
    extra: grillExtras,
    description:
      "Thinly sliced beef coated in a fiery peanut-spice rub, grilled over open flames. Bold, aromatic, and irresistibly Nigerian.",
  },
  {
    id: 25,
    name: "Grilled Fish",
    categoryId: 3,
    image: "/Screenshot (307).png",
    extra: grillExtras,
    description:
      "Fresh fish seasoned with herbs and spices, grilled until juicy with a crispy skin. A wholesome and flavorful option.",
  },
  {
    id: 26,
    name: "Grilled Turkey",
    categoryId: 3,
    image: "/Screenshot (310).png",
    extra: grillExtras,
    description:
      "Succulent turkey pieces marinated and grilled, offering a smoky taste with a tender bite.",
  },
  {
    id: 27,
    name: "Grilled Chicken",
    categoryId: 3,
    image: "/Screenshot (309).png",
    extra: grillExtras,
    description:
      "Classic grilled chicken seasoned with spices, juicy inside and charred outside for maximum flavor.",
  },
  {
    id: 28,
    name: "Asun (Spicy Goat Meat)",
    categoryId: 3,
    image: "/Screenshot (311).png",
    extra: grillExtras,
    description:
      "Fiery goat meat chunks roasted and tossed in hot pepper sauce. A party favorite with bold heat.",
  },
  {
    id: 29,
    name: "Nkwobi",
    categoryId: 3,
    image: "/Screenshot (312).png",
    extra: grillExtras,
    description:
      "Cow foot delicacy cooked in palm oil, spices, and garnished with onions and utazi leaves. Rich and traditional.",
  },
  {
    id: 30,
    name: "Peppered Snail",
    categoryId: 3,
    image: "/Screenshot (314).png",
    extra: grillExtras,
    description:
      "Delicacy of tender snails sautéed in spicy pepper sauce. Exotic, chewy, and bursting with flavor.",
  },
  {
    id: 31,
    name: "Peppered Chicken",
    categoryId: 3,
    image: "/Screenshot (315).png",
    extra: grillExtras,
    description:
      "Juicy chicken pieces tossed in hot pepper sauce. Spicy, savory, and perfect with chilled drinks.",
  },
  {
    id: 32,
    name: "Peppered Turkey",
    categoryId: 3,
    image: "/Screenshot (316).png",
    extra: grillExtras,
    description:
      "Turkey chunks cooked in spicy pepper mix, offering a smoky, fiery taste.",
  },
  {
    id: 33,
    name: "Peppered Beef",
    categoryId: 3,
    image: "/Screenshot (317).png",
    extra: grillExtras,
    description:
      "Beef strips stir-fried in pepper sauce. Spicy, aromatic, and satisfying.",
  },
  {
    id: 34,
    name: "Peppered Goat Meat",
    categoryId: 3,
    image: "/Screenshot (319).png",
    extra: grillExtras,
    description:
      "Goat meat infused with hot peppers and spices. A bold, traditional delicacy.",
  },
  {
    id: 35,
    name: "Peppered Fish",
    categoryId: 3,
    image: "/Screenshot (318).png",
    extra: grillExtras,
    description:
      "Fish fillets cooked in spicy pepper sauce. Tender, flavorful, and zesty.",
  },
  {
    id: 36,
    name: "Fried Chicken",
    categoryId: 3,
    image: "/Screenshot (320).png",
    extra: grillExtras,
    description:
      "Crispy golden chicken fried to perfection. Crunchy outside, juicy inside.",
  },
  {
    id: 37,
    name: "Fried Turkey",
    categoryId: 3,
    image: "/Screenshot (321).png",
    extra: grillExtras,
    description:
      "Turkey pieces deep-fried until crispy and savory. A hearty snack or side.",
  },
  {
    id: 38,
    name: "Fried Beef",
    categoryId: 3,
    image: "/Screenshot (322).png",
    extra: grillExtras,
    description:
      "Seasoned beef chunks fried until golden brown. Simple, tasty, and filling.",
  },
  {
    id: 39,
    name: "Fried Fish",
    categoryId: 3,
    image: "/Screenshot (323).png",
    extra: grillExtras,
    description:
      "Fish fillets fried until crispy, served hot with a savory crunch.",
  },

  // SNACKS & PASTRIES
  {
    id: 40,
    name: "Meat Pie",
    categoryId: 4,
    image: "/Screenshot (324).png",
    description:
      "Flaky pastry stuffed with minced meat, potatoes, and spices. A classic Nigerian snack.",
  },
  {
    id: 41,
    name: "Chicken Pie",
    categoryId: 4,
    image: "/Screenshot (325).png",
    description:
      "Golden pastry filled with tender chicken and vegetables. Savory and satisfying.",
  },
  {
    id: 42,
    name: "Sausage Roll",
    categoryId: 4,
    image: "/Screenshot (326).png",
    description:
      "Pastry roll filled with seasoned sausage meat. Crispy, meaty, and delicious.",
  },
  {
    id: 43,
    name: "Puff Puff",
    categoryId: 4,
    image: "/Screenshot (327).png",
    description:
      "Sweet, fluffy fried dough balls. A beloved Nigerian street snack.",
  },
  {
    id: 44,
    name: "Spring Rolls",
    categoryId: 4,
    image: "/Screenshot (328).png",
    description:
      "Crispy rolls filled with vegetables and sometimes meat. Light and crunchy.",
  },
  {
    id: 45,
    name: "Samosa",
    categoryId: 4,
    image: "/Screenshot (329).png",
    description:
      "Triangular pastry stuffed with spiced meat or vegetables. Crispy and flavorful.",
  },
  {
    id: 46,
    name: "Chin Chin",
    categoryId: 4,
    image: "/Screenshot (330).png",
    description:
      "Crunchy fried dough cubes, lightly sweetened. Perfect for snacking.",
  },
  {
    id: 47,
    name: "Buns",
    categoryId: 4,
    image: "/Screenshot (333).png",
    description: "Golden fried dough balls, slightly sweet and fluffy inside.",
  },
  {
    id: 48,
    name: "Okpa",
    categoryId: 4,
    image: "/Screenshot (334).png",
    description:
      "Traditional Igbo delicacy made from Bambara nut flour, steamed into a savory pudding.",
  },
  {
    id: 49,
    name: "Burger",
    categoryId: 4,
    image: "/Screenshot (332).png",
    description:
      "Juicy beef or chicken patty served in a bun with fresh toppings. A modern fast-food favorite.",
  },

  // DESSERTS
  {
    id: 50,
    name: "Ice Cream",
    categoryId: 5,
    image: "/Screenshot (335).png",
    extra: iceCreamFlavour,
    description:
      "Cold, creamy dessert available in multiple flavors. Sweet and refreshing.",
  },
  {
    id: 51,
    name: "Cake",
    categoryId: 5,
    image: "/Screenshot (336).png",
    extra: cakeFlavour,
    description:
      "Soft, moist baked dessert layered with frosting. Perfect for celebrations.",
  },
  {
    id: 52,
    name: "Cupcakes",
    categoryId: 5,
    image: "/Screenshot (338).png",
    extra: cupCakeFlavour,
    description:
      "Mini cakes topped with frosting. Fun, colorful, and delicious.",
  },
  {
    id: 53,
    name: "Doughnuts",
    categoryId: 5,
    image: "/Screenshot (339).png",
    extra: doughnutFlavour,
    description:
      "Sweet fried dough rings, glazed or sugared. A timeless treat.",
  },

  // DRINKS & BEVERAGES
  {
    id: 54,
    name: "Zobo Drink",
    categoryId: 6,
    image: "/Screenshot (340).png",
    description:
      "Refreshing hibiscus-based drink, spiced with ginger and cloves. Tangy and cooling.",
  },
  {
    id: 55,
    name: "Tigernut Drink",
    categoryId: 6,
    image: "/Screenshot (342).png",
    description:
      "Creamy, sweet drink made from tiger nuts. Nutritious and energizing.",
  },
  {
    id: 56,
    name: "Smoothie",
    categoryId: 6,
    image: "/Screenshot (343).png",
    extra: smoothieFlavour,
    description:
      "Blended fruit drink, thick and refreshing. Packed with vitamins.",
  },
  {
    id: 57,
    name: "Soft Drinks",
    categoryId: 6,
    image: "/Screenshot (344).png",
    extra: softDrinkOptions,
    description:
      "Carbonated beverages like Coke, Fanta, and Sprite. Sweet and fizzy.",
  },
  {
    id: 58,
    name: "Bottled Water",
    categoryId: 6,
    image: "/Screenshot (346).png",
    description: "Pure, refreshing drinking water. Essential and hydrating.",
  },
  {
    id: 59,
    name: "Coffee",
    categoryId: 6,
    image: "/Screenshot (348).png",
    description:
      "Hot brewed beverage made from roasted coffee beans. Bold and energizing.",
  },
  {
    id: 60,
    name: "Milkshake",
    categoryId: 6,
    image: "/Screenshot (349).png",
    extra: milkshakeFlavour,
    description:
      "Creamy drink made with milk, ice cream, and flavorings. Sweet and indulgent.",
  },
];

export const restaurantMeals = [
  // OceanEventsNG
  { id: 1, restaurantId: 1, mealId: 3, basePrice: 12000, isAvailable: true },
  { id: 2, restaurantId: 1, mealId: 4, basePrice: 4500, isAvailable: true },

  // Ntachi-Osa
  { id: 3, restaurantId: 2, mealId: 5, basePrice: 500, isAvailable: true },
  { id: 4, restaurantId: 2, mealId: 6, basePrice: 2500, isAvailable: true },

  // The Manor Restaurant
  { id: 5, restaurantId: 3, mealId: 7, basePrice: 8000, isAvailable: true },
  { id: 6, restaurantId: 3, mealId: 8, basePrice: 6000, isAvailable: true },

  // Bush House Arena
  { id: 7, restaurantId: 4, mealId: 9, basePrice: 2000, isAvailable: true },
  { id: 8, restaurantId: 4, mealId: 10, basePrice: 3500, isAvailable: true },

  // Shanghai Octopus
  { id: 9, restaurantId: 5, mealId: 11, basePrice: 5000, isAvailable: true },
  { id: 10, restaurantId: 5, mealId: 12, basePrice: 3000, isAvailable: true },

  // Shared meals across restaurants (example)
  { id: 11, restaurantId: 1, mealId: 1, basePrice: 4000, isAvailable: true },
  { id: 12, restaurantId: 3, mealId: 1, basePrice: 4500, isAvailable: true },
];

// cuisineMealMap.ts
// cuisineMealMap.ts
export const cuisineMealMap: Record<string, number[]> = {
  "Catering & Fine Dining": [3, 4, 5, 14, 16, 18, 25, 26, 27, 50, 51, 59, 60],

  "Local Nigerian Meals": [
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
  { id: 1, restaurantId: 2, status: "paid", createdAt: "2026-02-01" },
  { id: 2, restaurantId: 2, status: "paid", createdAt: "2026-02-02" },
  { id: 3, restaurantId: 1, status: "paid", createdAt: "2026-02-02" },
  { id: 4, restaurantId: 3, status: "cancelled", createdAt: "2026-02-03" },
];

export const mockOrderItems: OrderItem[] = [
  // Order 1 (Ntachi Osa)
  { orderId: 1, mealId: 2, quantity: 1 }, // Fried Rice
  { orderId: 1, mealId: 1, quantity: 1 }, // Jollof Rice

  // Order 2 (Ntachi Osa)
  { orderId: 2, mealId: 2, quantity: 1 }, // Fried Rice

  // Order 3 (OceanEventsNG)
  { orderId: 3, mealId: 2, quantity: 1 }, // Fried Rice

  { orderId: 1, mealId: 4, quantity: 1 }, // Fried Rice
  { orderId: 1, mealId: 3, quantity: 1 }, // Jollof Rice

  // Order 2 (Ntachi Osa)
  { orderId: 2, mealId: 4, quantity: 1 }, // Fried Rice

  // Order 3 (OceanEventsNG)
  { orderId: 3, mealId: 6, quantity: 1 }, // Fried Rice

  { orderId: 1, mealId: 6, quantity: 1 }, // Fried Rice
  { orderId: 1, mealId: 5, quantity: 1 }, // Jollof Rice

  // Order 2 (Ntachi Osa)
  { orderId: 2, mealId: 6, quantity: 1 }, // Fried Rice

  // Order 3 (OceanEventsNG)
  { orderId: 3, mealId: 6, quantity: 1 }, // Fried Rice
];
