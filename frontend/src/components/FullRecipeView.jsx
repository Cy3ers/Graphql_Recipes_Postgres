import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_RECIPE_QUERY } from '../GQL/queries';
import '../styles/FullRecipeView.css';

const FullRecipeView = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_RECIPE_QUERY, {
    variables: { id },
  });

  const formatInstructions = (instructions) => {
    return instructions.replace(/\d+\. /g, '\n$&');
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-circle"></div>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  const { recipe } = data;

  return (
    <div className="full-recipe-view">
      <h1>{recipe.title}</h1>
      <p>{recipe.description}</p>
      <ul>
        {recipe.ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} - {ingredient.quantity} {ingredient.unit}
          </li>
        ))}
      </ul>
      <div className="full_instructions">
        {formatInstructions(recipe.instructions)}
      </div>
      <Link to="/" className="back-button">
        Back to Home
      </Link>
    </div>
  );
};

export default FullRecipeView;
