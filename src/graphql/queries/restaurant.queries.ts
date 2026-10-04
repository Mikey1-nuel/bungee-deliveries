import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
  query GetRestaurants {
    getRestaurants {
      id
      name
      rating
      location
      image
      owner_id
    }
  }
`;

export const GET_MENU_RESTAURANTS =
  gql`
    query GetMenuRestaurants(
      $slug: String!
    ) {
      getRestaurantMenusBySlug(
        slug: $slug
      ) {
        id

        base_price

        is_available

        restaurant {
          id
          name
          image
          location
        }

        menu {
          id
          name
          image
          description
          type
        }
      }
    }
  `;

  export const GET_RESTAURANT_MENUS_BY_RESTAURANT =
  gql`
    query GetRestaurantMenusByRestaurant(
      $restaurantId: ID!
    ) {

      getRestaurantMenusByRestaurant(
        restaurantId: $restaurantId
      ) {

        id
        base_price
        is_available
        created_at

        menu {
          id
          name
          description
          image
          type
        }

        restaurant {
          id
          name
          image
          location
        }
      }
    }
  `;
