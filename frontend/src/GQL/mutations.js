import { gql } from '@apollo/client';

export const DELETE_RECIPE_MUTATION = gql`
  mutation deleteRecipe($id: ID!) {
    deleteRecipe(id: $id)
  }
`;

export const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe(
    $title: String!
    $description: String!
    $instructions: String!
    $ingredients: [IngredientInput!]!
  ) {
    createRecipe(
      title: $title
      description: $description
      instructions: $instructions
      ingredients: $ingredients
    ) {
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
