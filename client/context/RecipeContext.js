import React, { createContext, useContext, useState } from 'react';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [meal, setMeal] = useState(null);

  const setMealData = (data) => {
    setMeal(data);
  };

  return (
    <RecipeContext.Provider value={{ meal, setMealData }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  return useContext(RecipeContext);
};
