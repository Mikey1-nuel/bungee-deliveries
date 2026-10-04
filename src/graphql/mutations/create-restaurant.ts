import { gql } from "@apollo/client";

export const CREATE_RESTAURANT = gql`
  mutation CreateRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      id
      name
      location
      image
      message
    }
  }
`;
