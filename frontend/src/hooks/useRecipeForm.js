// useRecipeForm.js
import { useState } from 'react';
import { useCreateRecipeMutation } from './useCreateRecipeMutation';

const useRecipeForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [showAddForm, setShowAddForm] = useState(false);
  const createRecipe = useCreateRecipeMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleIngredientChange = (index, e) => {
    const { name, value } = e.target;
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients[index][name] = value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: updatedIngredients,
    }));
  };

  const handleAddIngredient = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: [
        ...prevFormData.ingredients,
        { name: '', quantity: '', unit: '' },
      ],
    }));
  };

  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...formData.ingredients];
    updatedIngredients.splice(index, 1);
    setFormData((prevFormData) => ({
      ...prevFormData,
      ingredients: updatedIngredients,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const ingredientsWithFloatQuantity = formData.ingredients.map(
      (ingredient) => {
        const parsedQuantity =
          ingredient.quantity && ingredient.quantity.trim() !== ''
            ? parseFloat(ingredient.quantity)
            : 0.0;
        return {
          ...ingredient,
          quantity: parsedQuantity,
        };
      }
    );

    const { title, description, instructions } = formData;
    createRecipe({
      variables: {
        title,
        description,
        instructions,
        ingredients: ingredientsWithFloatQuantity,
      },
    }).then(() => {
      setShowAddForm(false);
      setFormData({
        title: '',
        description: '',
        instructions: '',
        ingredients: [{ name: '', quantity: '', unit: '' }],
      });
    });
  };

  const handleAddRecipe = () => {
    setShowAddForm(true);
  };

  const handleCloseForm = () => {
    setShowAddForm(false);
    setFormData({
      title: '',
      description: '',
      instructions: '',
      ingredients: [{ name: '', quantity: '', unit: '' }],
    });
  };

  const resetForm = () => {
    setFormData(initialState);
  };

  return {
    formData,
    showAddForm,
    handleChange,
    handleIngredientChange,
    handleAddIngredient,
    handleRemoveIngredient,
    handleSubmit,
    handleAddRecipe,
    handleCloseForm,
    resetForm,
  };
};

export default useRecipeForm;
