// src/graphql/queries/rider.queries.ts
import { gql } from "@apollo/client";

export const GET_MY_DELIVERIES = gql`
  query GetMyDeliveries {
    getMyDeliveries {
      id
      status
      total
      deliveryAddress
      createdAt
      pickedUpAt
      deliveredAt
      restaurant {
        id
        name
        image
        location
      }
      customer {
        id
        fullName
        phone
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
`;

export const GET_MY_BATCHES = gql`
  query GetMyDispatchBatches {
    getMyDispatchBatches {
      id
      slot
      status
      scheduledAt
      createdAt
      orderCount
      orders {
        id
        status
        total
        deliveryAddress
        restaurant
        customer
        items {
          name
          type
          image
          quantity
        }
      }
    }
  }
`;

export const ACCEPT_DISPATCH_BATCH = gql`
  mutation AcceptDispatchBatch($batchId: ID!) {
    acceptDispatchBatch(batchId: $batchId)
  }
`;

export const REJECT_DISPATCH_BATCH = gql`
  mutation RejectDispatchBatch($batchId: ID!, $reason: String) {
    rejectDispatchBatch(batchId: $batchId, reason: $reason)
  }
`;

export const GET_MY_EARNINGS = gql`
  query GetMyEarnings {
    getMyEarnings {
      totalDeliveries
      totalEarnings
      todayDeliveries
      todayEarnings
    }
  }
`;

export const GET_MY_RIDER_PROFILE = gql`
  query GetMyRiderProfile {
    getMyRiderProfile {
      id
      fullName
      phone
      email
      isAvailable
      logisticsCompany {
        id
        name
        contactPhone
      }
    }
  }
`;

export const UPDATE_RIDER_AVAILABILITY = gql`
  mutation UpdateRiderAvailability($isAvailable: Boolean!) {
    updateRiderAvailability(isAvailable: $isAvailable)
  }
`;

// Add to rider.queries.ts
export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;
