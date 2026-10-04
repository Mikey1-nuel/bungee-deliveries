// Common reusable type
export type UUID = string;

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
  // dob: string;
  password: string;
  role: string;
}

export interface AuthUser {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  role: string;
}

export interface LoginResponse {
  login: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export interface LoginInput {
  identifier: string;
  password: string;
}

export interface LoginVariables {
  input: LoginInput;
}

export type UserRole = "admin" | "restaurant" | "user";

export interface User {
  id: UUID;
  name: string;
  role: UserRole;
  restaurantId?: UUID;
}

export interface MenuCardProps {
  restaurantMenu: RestaurantMenu;

  onClick?: (restaurantMenu: RestaurantMenu) => void;
}

export interface RestaurantCardProps {
  restaurant: Restaurant;
}

export interface MyProfileForm {
  fullName: string;
  dob: string;
  email: string;
  phoneNumber: string;
  profilePhoto: string;

  currentPassword: string;
  newPassword: string;
  confirmPassword: string;

  accountDeactivation: boolean;
}

export interface DeliveryAddressForm {
  name: string;
  address: string;
}

// app/types/order.ts

export interface CartItem {
  id: string;

  restaurant_menu_id: string;

  restaurant_id: string;

  restaurant_name: string;

  menu_name: string;

  menu_type: MenuType;

  menu_image?: string;

  unit_price: number;

  quantity: number;

  total_price: number;
}

export interface CreateOrderItemInput {
  restaurant_menu_id: string;

  quantity: number;
}

export interface CreateOrderInput {
  restaurantId: string;

  delivery_address: string;

  items: CreateOrderItemInput[];
}

export interface OrderRestaurant {
  id: string;

  name: string;

  image?: string;

  location?: string;
}

export interface OrderCustomer {
  id: string;

  fullName: string;

  email?: string;

  phone?: string;
}

export interface Rider {
  id: string;
  fullName: string;
  phone: String;
}

export interface LogisticsCompany {
  id: string;
  name: string;
  contact_phone: string;
}

export interface Payment {
  id: string;
  amount: number;
  status: string;
  method: string;
  created_at: string;
}

export interface Order {
  id: string;

  status: OrderStatus;

  total: number;

  deliveryAddress: string;

  createdAt: string;

  restaurant: OrderRestaurant;

  customer?: OrderCustomer;

  items: OrderItem[];

  payment?: Payment;

  rider?: Rider;

  logisticsCompany?: LogisticsCompany;
}

export interface CreateOrderResponse {
  createOrder: Order;
}

export interface CheckoutCartResponse {
  checkoutCart: {
    orders: Array<{
      id: string;
      total: number;
      status: string;
    }>;
    orderCount: number;
    subtotal: number;
    total: number;
  };
}

export interface CheckoutCartVariables {
  input: {
    deliveryAddress: string;

    items: Array<{
      restaurantMenuId: string;
      quantity: number;
    }>;
  };
}

export interface OrderRestaurant {
  id: string;

  name: string;

  image?: string;

  location?: string;
}

export interface OrderMenu {
  name: string;

  image?: string;

  type: MenuType;
}

export interface UserOrder {
  id: string;

  status: OrderStatus;

  total: number;

  delivery_address: string;

  created_at: string;

  restaurant: OrderRestaurant;

  items: OrderItem[];
}

export interface GetMyOrdersResponse {
  getMyOrders: Order[];
}

export interface RestaurantOrdersResponse {
  orders: Order[];
  total: number;
  page: number;
  totalPages: number;
}

export interface GetRestaurantOrdersResponse {
  getRestaurantOrders: RestaurantOrdersResponse;
}

export interface UpdateOrderStatusResponse {
  updateOrderStatus: {
    id: string;

    status: OrderStatus;
  };
}

export interface RestaurantOrderStats {
  pending: number;
  accepted: number;
  preparing: number;
  readyForPickup: number;
  pickedUp: number;
  deliveredToday: number;
  revenueToday: number;
}

export interface GetRestaurantOrderStatsResponse {
  getRestaurantOrderStats: RestaurantOrderStats;
}

export type OrderStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "preparing"
  | "ready_for_pickup"
  | "picked_up"
  | "delivered"
  | "cancelled";

export interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;      // was: unit_price
  totalPrice: number;     // was: total_price
  restaurantMenuId: string; // was: restaurant_menu_id
  menu: OrderMenu;
}

export type NotificationSettings = {
  orders: boolean;
  payments: boolean;
  offers: boolean;
  general: boolean;

  push: boolean;
  sound: boolean;
  vibrate: boolean;
};

export type SettingsSection = {
  title: string;
  items: {
    key: keyof NotificationSettings;
    label: string;
    description?: string;
  }[];
};

export type NotificationItem = {
  id: UUID;
  type: "order" | "payment" | "offer" | "general";
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
};

export interface SignupResponse {
  signup: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export interface SignupInput {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface SignupVariables {
  input: SignupInput;
}

export type RestaurantForm = {
  name: string;
  location: string;
};

export type CreateRestaurantResponse = {
  createRestaurant: {
    id: string;
    name: string;
    location: string;
    image?: string;
    message: string;
  };
};

export type CreateRestaurantVariables = {
  input: {
    name: string;
    location?: string;
    image?: string;
  };
};

export type MenuType = "meal" | "extra" | "swallow";

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Restaurant {
  id: string;
  name: string;
  rating?: number;
  location?: string;
  image?: string;
  owner_id?: string;
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  image?: string;
  category_id?: string;
  type: MenuType;
}

export interface MenuRestaurant {
  id: string;

  name: string;
}

export interface GroupedMenu {
  __typename: "GroupedMenu";

  name: string;

  slug: string;

  description?: string;

  image?: string;

  type: "meal" | "extra" | "swallow";

  lowest_price: number;

  restaurants: MenuRestaurant[];
}

export interface RestaurantMenu {
  __typename: "RestaurantMenu";

  id: string;

  restaurant_id?: string;

  menu_id?: string;

  base_price: number;

  is_available: boolean;

  created_at?: string;

  menu: Menu;

  restaurant: Restaurant;
}

export type MenuResult = RestaurantMenu | GroupedMenu;

export interface GetRestaurantMenusResponse {
  getRestaurantMenus: MenuResult[];
}

export interface GetRestaurantMenusByMenuResponse {
  getRestaurantMenusBySlug: RestaurantMenu[];
}

export interface GetMenusByCategoryResponse {
  getMenusByCategory: RestaurantMenu[];
}

export interface GetFeaturedMenusResponse {
  featuredMenus: RestaurantMenu[];
}

export interface GetCategoriesResponse {
  categories: Category[];
}

export interface GetRestaurantsResponse {
  getRestaurants: Restaurant[];
}

export interface GetRestaurantMenusByRestaurantResponse {
  getRestaurantMenusByRestaurant: RestaurantMenu[];
}

export interface MenuForm {
  name: string;
  description: string;
  categoryId: string;
  // restaurantId: string;
  basePrice: number;
  type: MenuType;
}

export interface CreateMenuResponse {
  createMenu: {
    id: string;
    menuId: string;
    message: string;
  };
}

export interface CreateMenuVariables {
  input: {
    name: string;
    description?: string;
    categoryId: string;
    // restaurantId: string;
    basePrice: number;
    image?: string;
    type: MenuType;
  };
}

export interface ValidateSessionResponse {
  validateSession: {
    authenticated: boolean;

    user: AuthUser | null;
  };
}

// Add to src/app/types/type.ts

export interface RiderDelivery {
  id: string;
  status: OrderStatus;
  total: number;
  deliveryAddress: string;
  createdAt: string;
  pickedUpAt?: string;
  deliveredAt?: string;
  restaurant: OrderRestaurant;
  customer: OrderCustomer;
  items: OrderItem[];
}

export interface RiderBatchOrderItem {
  name: string;
  type: string;
  image?: string;
  quantity: number;
}

export interface RiderBatchOrder {
  id: string;
  status: OrderStatus;
  total: number;
  deliveryAddress: string;
  restaurant: string;
  customer: string;
  items: RiderBatchOrderItem[];
}

export interface RiderBatch {
  id: string;
  slot: DispatchSlot;
  status: string;
  scheduledAt: string;
  createdAt: string;
  orderCount: number;
  orders: RiderBatchOrder[];
}

export interface RiderEarnings {
  totalDeliveries: number;
  totalEarnings: number;
  todayDeliveries: number;
  todayEarnings: number;
}

export interface RiderProfile {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  isAvailable: boolean;
  logisticsCompany?: LogisticsCompanyInfo;
}

export interface LogisticsCompanyInfo {
  id: string;
  name: string;
  contact_phone?: string;
}

export interface RiderWithStats {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  isAvailable: boolean;
  isOnline: boolean;
  lastSeen?: string;
  totalDeliveries: number;
}

export interface LogisticsOverview {
  totalRiders: number;
  onlineRiders: number;
  availableRiders: number;
  busyRiders: number;
  totalDeliveries: number;
  pendingAssignments: number;
}

// Query response wrappers
export interface GetMyDeliveriesResponse {
  getMyDeliveries: RiderDelivery[];
}

export interface GetMyDispatchBatchesResponse {
  getMyDispatchBatches: RiderBatch[];
}

export interface GetMyEarningsResponse {
  getMyEarnings: RiderEarnings;
}

export interface GetMyRiderProfileResponse {
  getMyRiderProfile: RiderProfile;
}

export interface GetLogisticsOverviewResponse {
  getLogisticsOverview: LogisticsOverview;
}

export interface GetLogisticsRidersResponse {
  getLogisticsRiders: RiderWithStats[];
}

// Add to src/app/types/type.ts

export interface AdminUser {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  role: string;
  status: string;
  approvalStatus: string;
  isOnline: boolean;
  lastSeen?: string | null;
  createdAt: string;
}

export interface AdminRestaurant {
  id: string;
  name: string;
  location?: string;
  image?: string;
  rating?: number;
  owner_id: string;
  ownerName: string;
  ownerEmail?: string;
  created_at: string;
}

// type.ts
export interface AdminOrder {
  id: string;
  status: OrderStatus;
  total: number;
  deliveryAddress: string;
  createdAt: string;
  restaurant: OrderRestaurant;
  customer: OrderCustomer;
  items: OrderItem[];
  rider?: { id: string; fullName: string } | null; // ← add
}

export interface AdminRider {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  isAvailable: boolean;
  isOnline: boolean;       // ← add
  lastSeen?: string;       // ← add
  totalDeliveries: number;
  logisticsCompany?: LogisticsCompanyInfo;
}

export interface AdminStats {
  totalUsers: number;
  totalRestaurants: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  deliveredToday: number;
  newUsersToday: number;
}

export interface AdminUsersResponse {
  getAdminUsers: {
    users: AdminUser[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
}

export interface AdminRestaurantsResponse {
  getAdminRestaurants: {
    restaurants: AdminRestaurant[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
}

export interface AdminOrdersResponse {
  getAdminOrders: {
    orders: AdminOrder[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
}

export interface AdminRidersResponse {
  getAdminRiders: {
    riders: AdminRider[];
    pagination: {
      total: number;
      page: number;
      totalPages: number;
    };
  };
}

export interface GetAdminStatsResponse {
  getAdminStats: AdminStats;
}

// Add to src/app/types/type.ts

export interface AdminLogisticsCompany {
  id: string;
  name: string;
  contactPhone?: string;
  createdAt: string;
  totalRiders: number;
  onlineRiders: number;
  availableRiders: number;
  busyRiders: number;
}

export interface AdminLogisticsResponse {
  getAdminLogistics: {
    logistics: AdminLogisticsCompany[];
    pagination: {
      page: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export type DispatchSlot = "morning" | "afternoon" | "evening";

export interface DispatchBatch {
  id: string;
  slot: DispatchSlot;
  scheduledAt: string;
  status: string;
  createdAt: string;
  riderName: string;
  riderPhone?: string;
  orderCount: number;
}

export interface GetDispatchBatchesResponse {
  getDispatchBatches: {
    batches: DispatchBatch[];
    pagination: {
      page: number;
      total: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    };
  };
}

export interface CreateUserForm {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  restaurantName?: string;
  restaurantLocation?: string;
  logisticsCompanyId?: string;
  companyName?: string;
  companyPhone?: string;
}

export interface AdminCreateUserResponse {
  adminCreateUser: {
    success: boolean;
    message: string;
    userId: string;
  };
}

export interface CreateDispatchBatchResponse {
  createDispatchBatch: {
    success: boolean;
    message: string;
    batchId: string;
    scheduledAt: string;
  };
}
