import { gql } from "@apollo/client";

export const GET_MY_ORDERS = gql`
  query GetMyOrders {
    getMyOrders {
      id
      status
      total
      deliveryAddress
      createdAt

      restaurant {
        id
        name
        image
        location
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

export const GET_RESTAURANT_ORDERS = gql`
  query GetRestaurantOrders(
    $page: Int
    $limit: Int
    $search: String
    $status: OrderStatus
  ) {
    getRestaurantOrders(
      page: $page
      limit: $limit
      search: $search
      status: $status
    ) {
      total
      page
      totalPages

      orders {
        id
        status
        total
        deliveryAddress
        createdAt

        customer {
          id
          fullName
          phone
          email
        }

        restaurant {
          id
          name
        }

        items {
          id
          quantity
          unitPrice
          totalPrice

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

// Add to src/graphql/queries/order.queries.ts

export const GET_RESTAURANT_ORDER_STATS = gql`
  query GetRestaurantOrderStats {
    getRestaurantOrderStats {
      pending
      accepted
      preparing
      readyForPickup
      pickedUp
      deliveredToday
      revenueToday
    }
  }
`;
