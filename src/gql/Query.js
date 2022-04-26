import { gql } from "@apollo/client";
export const GET_PRODUCTS = gql`
  query getProducts {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          name
          type
          items {
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
    
    currencies {
      label
      symbol
    }
  }
`;
