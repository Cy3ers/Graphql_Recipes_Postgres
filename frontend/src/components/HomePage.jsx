import React from 'react';
import { useQuery } from '@apollo/client';
import RecipeCard from './RecipeCard';
import { FaTimes } from 'react-icons/fa';
import { RECIPES_QUERY } from '../GQL/queries';
import useRecipeForm from '../hooks/useRecipeForm';

const HomePage = () => {
  const { loading, error, data } = useQuery(RECIPES_QUERY);

  const {
    register,
    handleSubmit,
    showAddForm,
    onSubmit,
    handleAddRecipe,
    handleCloseForm,
    fields,
    append,
    remove,
  } = useRecipeForm();

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
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              Title:
              <input type="text" {...register('title', { required: true })} />
            </label>
            <label>
              Description:
              <textarea
                className="text-areas"
                {...register('description', { required: true })}
              />
            </label>
            <label>
              Instructions:
              <textarea
                className="text-areas"
                {...register('instructions', { required: true })}
              />
            </label>
            <h3>Ingredients:</h3>
            {fields.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <label>
                  Name:
                  <input
                    type="text"
                    name={`ingredients[${index}].name`}
                    {...register(`ingredients.${index}.name`, {
                      required: true,
                    })}
                  />
                </label>
                <label>
                  Quantity:
                  <input
                    type="text"
                    name={`ingredients[${index}].quantity`}
                    {...register(`ingredients.${index}.quantity`, {
                      required: true,
                    })}
                  />
                </label>
                <label>
                  Unit:
                  <input
                    type="text"
                    name={`ingredients[${index}].unit`}
                    {...register(`ingredients.${index}.unit`, {
                      required: true,
                    })}
                  />
                </label>
                {window.innerWidth <= 767 ? (
                  <button
                    className="remove-button-mobile"
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </button>
                ) : (
                  <FaTimes
                    className="delete-button"
                    onClick={() => remove(index)}
                  />
                )}
              </div>
            ))}
            <button
              className="add-button"
              type="button"
              onClick={() => append({ name: '', quantity: '', unit: '' })}
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
