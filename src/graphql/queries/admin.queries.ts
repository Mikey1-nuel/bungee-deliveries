import { gql } from "@apollo/client";

export const GET_ADMIN_STATS = gql`
  query GetAdminStats {
    getAdminStats {
      totalUsers
      totalRestaurants
      totalOrders
      totalRevenue
      pendingOrders
      deliveredToday
      newUsersToday
    }
  }
`;

export const GET_ADMIN_USERS = gql`
  query GetAdminUsers($page: Int, $limit: Int, $search: String, $role: String) {
    getAdminUsers(page: $page, limit: $limit, search: $search, role: $role) {
      users {
        id
        fullName
        email
        phone
        role
        status
        approvalStatus
        isOnline
        lastSeen
        createdAt
      }

      pagination {
        page
        limit
        total
        totalPages
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const GET_ADMIN_RESTAURANTS = gql`
  query GetAdminRestaurants($page: Int, $limit: Int, $search: String) {
    getAdminRestaurants(page: $page, limit: $limit, search: $search) {
      pagination {
        page
        limit
        total
        totalPages
        hasNextPage
        hasPreviousPage
      }
      restaurants {
        id
        name
        location
        image
        rating
        ownerId
        ownerName
        ownerEmail
        createdAt
      }
    }
  }
`;

export const GET_ADMIN_ORDERS = gql`
  query GetAdminOrders(
    $page: Int
    $limit: Int
    $search: String
    $status: OrderStatus
  ) {
    getAdminOrders(
      page: $page
      limit: $limit
      search: $search
      status: $status
    ) {
      pagination {
        page
        limit
        total
        totalPages
        hasNextPage
        hasPreviousPage
      }
      orders {
        id
        status
        total
        deliveryAddress
        createdAt
        rider {          # ← add
          id
          fullName
        }
        restaurant {
          id
          name
        }
        customer {
          id
          fullName
          phone
          email
        }
        items {
          id
          quantity
          unitPrice
          totalPrice
          restaurantMenuId
          menu {
            name
            image
            type
          }
        }
      }
    }
  }
`;

export const GET_ADMIN_RIDERS = gql`
  query GetAdminRiders($page: Int, $limit: Int, $search: String) {
    getAdminRiders(page: $page, limit: $limit, search: $search) {
      pagination {
        page
        limit
        total
        totalPages
        hasNextPage
        hasPreviousPage
      }
      riders {
        id
        fullName
        phone
        email
        isAvailable
        totalDeliveries
        isOnline
        lastSeen
        logisticsCompany {
          id
          name
          contactPhone
        }
      }
    }
  }
`;

export const BAN_USER = gql`
  mutation BanUser($userId: ID!) {
    banUser(userId: $userId) {
      success
      message
    }
  }
`;

export const UNBAN_USER = gql`
  mutation UnbanUser($userId: ID!) {
    unbanUser(userId: $userId) {
      success
      message
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: ID!) {
    deleteUser(userId: $userId) {
      success
      message
    }
  }
`;

export const APPROVE_RESTAURANT = gql`
  mutation ApproveRestaurant($restaurantId: ID!) {
    approveRestaurant(restaurantId: $restaurantId) {
      success
      message
    }
  }
`;

export const REJECT_RESTAURANT = gql`
  mutation RejectRestaurant($restaurantId: ID!) {
    rejectRestaurant(restaurantId: $restaurantId) {
      success
      message
    }
  }
`;

// Add to existing admin.queries.ts

export const GET_ADMIN_LOGISTICS = gql`
  query GetAdminLogistics($page: Int, $limit: Int, $search: String) {
    getAdminLogistics(page: $page, limit: $limit, search: $search) {
      pagination {
        page
        total
        totalPages
        hasNextPage
        hasPreviousPage
      }
      logistics {
        id
        name
        contactPhone
        createdAt
        totalRiders
        onlineRiders
        availableRiders
        busyRiders
      }
    }
  }
`;

export const GET_DISPATCH_BATCHES = gql`
  query GetDispatchBatches(
    $page: Int
    $limit: Int
    $slot: DispatchSlot
    $date: String
  ) {
    getDispatchBatches(page: $page, limit: $limit, slot: $slot, date: $date) {
      pagination {
        page
        total
        totalPages
        hasNextPage
        hasPreviousPage
      }
      batches {
        id
        slot
        scheduledAt
        status
        createdAt
        riderName
        riderPhone
        orderCount
      }
    }
  }
`;

export const ADMIN_CREATE_USER = gql`
  mutation AdminCreateUser(
    $fullName: String!
    $email: String!
    $phone: String!
    $password: String!
    $role: String!
    $restaurantName: String
    $restaurantLocation: String
    $logisticsCompanyId: ID
    $companyName: String
    $companyPhone: String
  ) {
    adminCreateUser(
      fullName: $fullName
      email: $email
      phone: $phone
      password: $password
      role: $role
      restaurantName: $restaurantName
      restaurantLocation: $restaurantLocation
      logisticsCompanyId: $logisticsCompanyId
      companyName: $companyName
      companyPhone: $companyPhone
    ) {
      success
      message
      userId
    }
  }
`;

export const CREATE_DISPATCH_BATCH = gql`
  mutation CreateDispatchBatch(
    $riderId: ID!
    $orderIds: [ID!]!
    $slot: DispatchSlot!
    $scheduledDate: String!
  ) {
    createDispatchBatch(
      riderId: $riderId
      orderIds: $orderIds
      slot: $slot
      scheduledDate: $scheduledDate
    ) {
      success
      message
      batchId
      scheduledAt
    }
  }
`;

export const ADMIN_UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;

export const ADMIN_ASSIGN_RIDER = gql`
  mutation AssignRiderToOrder($orderId: ID!, $riderId: ID!) {
    assignRiderToOrder(orderId: $orderId, riderId: $riderId) {
      id
      status
    }
  }
`;
