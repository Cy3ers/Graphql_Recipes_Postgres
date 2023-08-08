// useRecipeForm.js
import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useCreateRecipeMutation } from './useCreateRecipeMutation';

const useRecipeForm = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'ingredients',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const createRecipe = useCreateRecipeMutation();

  const onSubmit = (data) => {
    const ingredientsWithFloatQuantity = data.ingredients.map((ingredient) => {
      const parsedQuantity =
        ingredient.quantity && ingredient.quantity.trim() !== ''
          ? parseFloat(ingredient.quantity)
          : 0.0;
      return {
        ...ingredient,
        quantity: parsedQuantity,
      };
    });

    const { title, description, instructions } = data;
    createRecipe({
      variables: {
        title,
        description,
        instructions,
        ingredients: ingredientsWithFloatQuantity,
      },
    }).then(() => {
      setShowAddForm(false);
      reset({
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
    reset({
      title: '',
      description: '',
      instructions: '',
      ingredients: [{ name: '', quantity: '', unit: '' }],
    });
  };

  return {
    register,
    handleSubmit,
    showAddForm,
    onSubmit,
    handleAddRecipe,
    handleCloseForm,
    fields,
    append,
    remove,
  };
};

export default useRecipeForm;
