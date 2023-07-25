import { useMutation, gql } from '@apollo/client';
import { CREATE_RECIPE_MUTATION } from '../GQL/mutations';

export function useCreateRecipeMutation() {
  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION, {
    update(cache, { data: { createRecipe } }) {
      cache.modify({
        fields: {
          recipes(existingRecipes = []) {
            const newRecipeRef = cache.writeFragment({
              data: createRecipe,
              fragment: gql`
                fragment NewRecipe on Recipe {
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
              `,
            });
            return [...existingRecipes, newRecipeRef];
          },
        },
      });
    },
  });
  return createRecipe;
}
