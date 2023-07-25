import { Sequelize, DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizer/sequelizeinit.js';

// Define the Recipe model
class Recipe extends Model {}
Recipe.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    instructions: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'recipe' }
);

// Define the Ingredient model
class Ingredient extends Model {}
Ingredient.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recipeId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'ingredient' }
);

// Define associations between models
Recipe.hasMany(Ingredient, { foreignKey: 'recipeId' });
Ingredient.belongsTo(Recipe, { foreignKey: 'recipeId' });

// Synchronize the models with the database
sequelize
  .sync()
  .then(() => {
    console.log('Models synchronized successfully.');
  })
  .catch((error) => {
    console.error(`Error synchronizing models: ${error}`);
  });

export { Recipe, Ingredient };
