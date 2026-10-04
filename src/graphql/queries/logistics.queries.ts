// src/graphql/queries/logistics.queries.ts
import { gql } from "@apollo/client";

export const GET_LOGISTICS_OVERVIEW = gql`
  query GetLogisticsOverview {
    getLogisticsOverview {
      totalRiders
      onlineRiders
      availableRiders
      busyRiders
      totalDeliveries
      pendingAssignments
    }
  }
`;

export const GET_LOGISTICS_RIDERS = gql`
  query GetLogisticsRiders {
    getLogisticsRiders {
      id
      fullName
      phone
      email
      isAvailable
      totalDeliveries
      isOnline
      lastSeen
    }
  }
`;

export const ASSIGN_RIDER_TO_ORDER = gql`
  mutation AssignRiderToOrder($orderId: ID!, $riderId: ID!) {
    assignRiderToOrder(orderId: $orderId, riderId: $riderId) {
      id
      status
    }
  }
`;
