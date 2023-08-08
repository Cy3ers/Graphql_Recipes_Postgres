import React from 'react';
import { useQuery } from '@apollo/client';
import RecipeCard from './RecipeCard';
import { FaTimes } from 'react-icons/fa';
import { RECIPES_QUERY } from '../GQL/queries';
import useRecipeForm from '../hooks/useRecipeForm';
import AddForm from './sub-components/AddForm';
import LoadingSpinner from './sub-components/LoadingSpinner';
import ErrorPage from './sub-components/ErrorPage';

const HomePage = () => {
  const { loading, error, data } = useQuery(RECIPES_QUERY);

  const { showAddForm, handleAddRecipe, handleCloseForm } = useRecipeForm();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorPage />;

  return (
    <div className="home-page">
      <h1>Recipes</h1>
      {showAddForm ? (
        <div className="add-recipe-form">
          <h2>
            Add Recipe
            <FaTimes className="delete-button" onClick={handleCloseForm} />
          </h2>
          <AddForm />
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
