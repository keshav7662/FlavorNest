import { createContext, useState, useContext } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {

  const [recipes, setRecipes] = useState(() => {
    const storedRecipe = localStorage.getItem('recipes')
    return storedRecipe ? JSON.parse(storedRecipe) : [];
  })
  
  const navigate = useNavigate();

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

  const editRecipeHandler = (id, data) => {
    const updatedRecipes = recipes.map((recipe) =>
      recipe.id === id
        ? { ...recipe, ...data }
        : recipe
    );

    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    toast.success('Recipe updated successfully!')
  }

  const deleteRecipeHandler = (id) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    toast.success('Recipe deleted successfully!');
    navigate(updatedRecipes.length > 0 ? '/recipes' : '/');
  }

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes, favouriteHandler, bookmarkHandler, editRecipeHandler, deleteRecipeHandler, favoriteRecipes }}>
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipes = () => useContext(RecipeContext);

