import { gql } from "@apollo/client";

export const VALIDATE_SESSION = gql`
  query ValidateSession {
    validateSession {
      authenticated

      user {
        id
        fullName
        email
        phone
        role
      }
    }
  }
`;
