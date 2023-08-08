import React from 'react';
import useRecipeForm from '../../hooks/useRecipeForm';
import { FaTimes } from 'react-icons/fa';

const AddForm = () => {
  const { register, handleSubmit, onSubmit, fields, append, remove } =
    useRecipeForm();

  return (
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
            <FaTimes className="delete-button" onClick={() => remove(index)} />
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
  );
};

export default AddForm;
