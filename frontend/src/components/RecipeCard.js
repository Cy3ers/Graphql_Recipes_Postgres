import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DELETE_RECIPE_MUTATION } from '../GQL/mutations';
import { RECIPES_QUERY } from '../GQL/queries';

const RecipeCard = ({ recipe }) => {
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION);
  const { refetch } = useQuery(RECIPES_QUERY);

  const handleDelete = () => {
    deleteRecipe({ variables: { id: recipe.id } })
      .then(() => {
        refetch();
      })
      .catch((error) => {
        console.error(`Error deleting recipe: ${error}`);
      });
  };

  const [showFullInstructions, setShowFullInstructions] = useState(false);

  const toggleInstructions = () => {
    setShowFullInstructions((prev) => !prev);
  };

  const formatInstructions = (instructions) => {
    return instructions.replace(/\d+\. /g, '\n$&');
  };

  return (
    <div className="recipe-card">
      <h3>
        <Link className="expand-recipe" to={`/recipe/${recipe.id}`}>
          {recipe.title}
        </Link>{' '}
        <FaTimes className="delete-button" onClick={handleDelete} />
      </h3>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
      <div className="instructions-container">
        <div className={`instructions ${showFullInstructions ? 'open' : ''}`}>
          {formatInstructions(recipe.instructions)}
        </div>
        {recipe.instructions.length > 150 && (
          <button className="read-more-button" onClick={toggleInstructions}>
            {showFullInstructions ? 'Read Less' : 'Read More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
