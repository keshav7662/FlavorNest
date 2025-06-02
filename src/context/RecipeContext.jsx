import { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {

  const [recipes, setRecipes] = useState(() => {
    const storedRecipe = localStorage.getItem('recipes')
    return storedRecipe ? JSON.parse(storedRecipe) : [];
  })

  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);

  const favouriteHandler = (id) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === id) {
        const newFavStatus = !recipe.isFavorite;
        toast.success(newFavStatus ? 'Added to favorites!' : 'Removed from favorites!');
        return { ...recipe, isFavorite: newFavStatus };
      }
      return recipe;
    });
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  const bookmarkHandler = (id) => {
    const updatedRecipes = recipes.map((recipe) => {
      if (recipe.id === id) {
        const newBookmarkStatus = !recipe.isBookmarked;
        toast.success(newBookmarkStatus ? 'Bookmarked!' : 'Removed from bookmarks!');
        return { ...recipe, isBookmarked: newBookmarkStatus };
      }
      return recipe;
    });

    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  };

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, favouriteHandler, bookmarkHandler, favoriteRecipes }}>
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipes = () => useContext(RecipeContext);

