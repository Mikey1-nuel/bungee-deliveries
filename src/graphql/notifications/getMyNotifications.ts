import { gql } from "@apollo/client";

export const GET_MY_NOTIFICATIONS = gql`
  query GetMyNotifications {
    getMyNotifications {
      id
      type
      title
      message
      read
      action_url
      created_at
    }
  }
`;
