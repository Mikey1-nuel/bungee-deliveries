import { gql } from "@apollo/client";

export const CREATE_MENU = gql`
  mutation CreateMenu($input: CreateMenuInput!) {
    createMenu(input: $input) {
      id
      menuId
      message
    }
  }
`;

export const GET_MENUS_BY_CATEGORY = gql`
  query GetMenusByCategory($categoryId: UUID!) {
    getMenusByCategory(categoryId: $categoryId) {
      id
      base_price
      is_available

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

export const GET_FEATURED_MENUS = gql`
  query GetFeaturedMenus {
    featuredMenus {
      id
      base_price
      is_available

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
      }
    }
  }
`;

export const GET_RESTAURANT_MENUS = gql`
  query GetRestaurantMenus {
    getRestaurantMenus {
      __typename

      #
      # RESTAURANT OWNER MENU
      #

      ... on RestaurantMenu {
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

      #
      # CUSTOMER GROUPED MENU
      #

      ... on GroupedMenu {
        slug
        name
        description
        image
        type
        lowest_price

        restaurants {
          id
          name
        }
      }
    }
  }
`;
