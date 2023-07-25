import { Recipe, Ingredient } from '../model/RcpsModel.js';
import { Op } from 'sequelize';

const typeDefs = `
  type Recipe {
    id: ID!
    title: String!
    description: String!
    instructions: String!
    ingredients: [Ingredient!]!
  }

  type Ingredient {
    id: ID!
    name: String!
    quantity: Float!
    unit: String!
    recipeId: ID!
  }

  input IngredientInput {
    name: String!
    quantity: Float!
    unit: String!
  }

  type Query {
    recipes(search: String): [Recipe]
    recipe(id: ID!): Recipe
  }

  type Mutation {
    createRecipe(title: String!, description: String!, instructions: String!, ingredients: [IngredientInput!]!): Recipe
    updateRecipe(id: ID!, title: String, description: String, instructions: String, ingredients: [IngredientInput!]): Recipe
    deleteRecipe(id: ID!): Boolean
  }
`;

const resolvers = {
  Query: {
    recipes: async (_, { search }) => {
      try {
        let recipes;

        if (search) {
          recipes = await Recipe.findAll({
            include: [Ingredient],
            where: {
              [Op.or]: [
                {
                  title: {
                    [Op.iLike]: `%${search}%`,
                  },
                },
                {
                  description: {
                    [Op.iLike]: `%${search}%`,
                  },
                },
                {
                  instructions: {
                    [Op.iLike]: `%${search}`,
                  },
                },
                {
                  '$ingredients.name$': {
                    [Op.iLike]: `%${search}%`,
                  },
                },
              ],
            },
          });
        } else {
          recipes = await Recipe.findAll({
            include: [Ingredient],
          });
        }

        return recipes;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Internal server error');
      }
    },
    recipe: async (_, { id }) => {
      try {
        const recipe = await Recipe.findByPk(id, {
          include: [Ingredient],
        });

        if (!recipe) {
          throw new Error('Recipe not found');
        }

        return recipe;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Internal server error');
      }
    },
  },
  Mutation: {
    createRecipe: async (
      _,
      { title, description, instructions, ingredients }
    ) => {
      try {
        // Create the recipe without ingredients
        const recipe = await Recipe.create({
          title,
          description,
          instructions,
        });

        const createdIngredients = [];

        for (const ingredientInput of ingredients) {
          const { name, quantity, unit } = ingredientInput;
          const ingredient = await Ingredient.create({
            name,
            quantity,
            unit,
            recipeId: recipe.id, // Associate the ingredient with the recipe
          });

          createdIngredients.push(ingredient);
        }

        // Associate the created ingredients with the recipe
        await recipe.setIngredients(createdIngredients);

        // Fetch the updated recipe with associated ingredients
        const updatedRecipe = await Recipe.findByPk(recipe.id, {
          include: [Ingredient],
        });

        return updatedRecipe;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Internal server error');
      }
    },

    updateRecipe: async (
      _,
      { id, title, description, instructions, ingredients }
    ) => {
      try {
        const recipe = await Recipe.findByPk(id, {
          include: [Ingredient],
        });

        if (!recipe) {
          throw new Error('Recipe not found');
        }

        await recipe.update({
          title: title || recipe.title,
          description: description || recipe.description,
          instructions: instructions || recipe.instructions,
        });

        if (ingredients) {
          const createdIngredients = [];

          for (const ingredientInput of ingredients) {
            const { name, quantity, unit, recipeId } = ingredientInput;
            const ingredient = await Ingredient.create({
              name,
              quantity,
              unit,
              recipeId,
            });
            createdIngredients.push(ingredient);
          }

          recipe.ingredients = createdIngredients;
        }

        return recipe;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Internal server error');
      }
    },

    deleteRecipe: async (_, { id }) => {
      try {
        const recipe = await Recipe.findByPk(id);

        if (!recipe) {
          throw new Error('Recipe not found');
        }

        // Delete the associated ingredients
        await Ingredient.destroy({
          where: {
            recipeId: id,
          },
        });

        // Delete the recipe
        await recipe.destroy();

        return true;
      } catch (error) {
        console.error('Error:', error);
        throw new Error('Internal server error');
      }
    },
  },
};

export { typeDefs, resolvers };
