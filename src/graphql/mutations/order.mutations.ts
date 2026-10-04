import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id
      total
      status
      deliveryAddress
      createdAt

      restaurant {
        id
        name
      }

      items {
        id
        restaurantMenuId
        menuName
        menuType
        unitPrice
        quantity
        totalPrice
        menuImage
      }
    }
  }
`;

export const CHECKOUT_CART = gql`
  mutation CheckoutCart($input: CheckoutCartInput!) {
    checkoutCart(input: $input) {
      orders {
        id
        total
        status
        deliveryAddress
        createdAt

        restaurant {
          id
          name
        }

        items {
          id
          restaurantMenuId
          menuName
          menuType
          unitPrice
          quantity
          totalPrice
          menuImage
        }
      }

      orderCount
      subtotal
      total
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation UpdateOrderStatus($orderId: ID!, $status: OrderStatus!) {
    updateOrderStatus(orderId: $orderId, status: $status) {
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
          id
          name
          image
          type
        }
      }
    }
  }
`;
