import React from 'react';
import { useQuery } from '@apollo/client';
import RecipeCard from './RecipeCard';
import { FaTimes } from 'react-icons/fa';
import { RECIPES_QUERY } from '../GQL/queries';
import useRecipeForm from '../hooks/useRecipeForm';

const HomePage = () => {
  const { loading, error, data } = useQuery(RECIPES_QUERY);

  const {
    formData,
    showAddForm,
    handleChange,
    handleIngredientChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleSubmit,
    handleAddRecipe,
    handleCloseForm,
  } = useRecipeForm({
    title: '',
    description: '',
    instructions: '',
    ingredients: [{ name: '', quantity: '', unit: '' }],
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="home-page">
      <h1>Recipes</h1>
      {showAddForm ? (
        <div className="add-recipe-form">
          <h2>
            Add Recipe
            <FaTimes className="delete-button" onClick={handleCloseForm} />
          </h2>
          <form onSubmit={handleSubmit}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                style={{
                  resize: 'none',
                  overflowY: 'auto',
                }}
              ></textarea>
            </label>
            <label>
              Instructions:
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                style={{
                  resize: 'none',
                  overflowY: 'auto',
                }}
              ></textarea>
            </label>
            <h3>Ingredients:</h3>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="text"
                    name="quantity"
                    value={ingredient.quantity}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />
                </label>
                <label>
                  Unit:
                  <input
                    type="text"
                    name="unit"
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, e)}
                  />
                </label>
                {window.innerWidth <= 767 ? (
                  <button
                    className="remove-button-mobile"
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                  >
                    Remove
                  </button>
                ) : (
                  <FaTimes
                    className="delete-button"
                    onClick={() => handleRemoveIngredient(index)}
                  />
                )}
              </div>
            ))}
            <button
              className="add-button"
              type="button"
              onClick={handleAddIngredient}
            >
              +
            </button>
            <button className="sub-button" type="submit">
              Create Recipe
            </button>
          </form>
        </div>
      ) : (
        <div className="button-bar">
          <button onClick={handleAddRecipe}>Add Recipe</button>
        </div>
      )}
      <div className="recipe-cards-container">
        {data?.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
