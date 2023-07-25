import { gql } from '@apollo/client';

export const RECIPES_QUERY = gql`
  query Recipes($search: String) {
    recipes(search: $search) {
      id
      title
      description
      instructions
      ingredients {
        id
        name
        quantity
        unit
      }
    }
  }
`;

export const GET_RECIPE_QUERY = gql`
  query Recipe($id: ID!) {
    recipe(id: $id) {
      id
      title
      description
      instructions
      ingredients {
        id
        name
        quantity
        unit
      }
    }
  }
`;
