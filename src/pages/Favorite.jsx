import React, { useState } from 'react'
import RecipeStatsCard from './components/RecipeStatsCard'
import { useRecipes } from '@/context/RecipeContext'
import RecipeGrid from './components/RecipeGrid';
import { Grid3x3, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RecipeList from './components/RecipeList';

const Favorite = () => {

  const [viewMode, setViewMode] = useState('grid');
  const { recipes, favoriteRecipes } = useRecipes();
  const totalFavorites = favoriteRecipes.length;

  const avgCookingTime = favoriteRecipes.length > 0
    ? Math.round(favoriteRecipes.reduce((sum, recipe) =>
      sum + parseInt(recipe.cookingTime.replace(/\D/g, '')), 0) / favoriteRecipes.length)
    : 0;

  const avgCalories = favoriteRecipes.length > 0
    ? Math.round(favoriteRecipes.reduce((sum, recipe) =>
      sum + parseInt(recipe.calories), 0) / favoriteRecipes.length)
    : 0;

  const totalServings = favoriteRecipes.reduce((sum, recipe) =>
    sum + parseInt(recipe.servings), 0);

  const stats = [
    {
      title: "Favorite Recipes",
      value: totalFavorites,
      gradient: "from-pink-50 to-rose-50",
      color: 'text-red-600'
    },
    {
      title: "Avg Cook Time",
      value: `${avgCookingTime}m`,
      gradient: "from-blue-50 to-cyan-50",
      color: 'text-orange-600'
    },
    {
      title: "Total Servings",
      value: totalServings,
      gradient: "from-emerald-50 to-teal-50",
      color: 'text-green-600'
    },
    {
      title: "Avg Calories",
      value: `${avgCalories}`,
      gradient: "from-orange-50 to-red-50",
      color: 'text-blue-600'
    }
  ];



  return (
    <div className='py-10'>
      <div className='max-w-5xl mx-auto space-y-6'>
        <div className='grid md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {
            stats.map((stat, index) => (
              <RecipeStatsCard key={index} title={stat.title} value={stat.value} gradient={stat.gradient} color={stat.color} />
            ))
          }
        </div>
        <div className='flex justify-end'>
          <div className='flex gap-2 items-center'>
            <Button
              size="sm"
              variant={viewMode == 'grid' ? "default" : "outline"}
              onClick={() => setViewMode('grid')}
              className={'cursor-pointer'}
            >
              <Grid3x3 />
            </Button>
            <Button
              size="sm"
              variant={viewMode == 'list' ? "default" : "outline"}
              onClick={() => setViewMode('list')}
              className={'cursor-pointer'}
            >
              <List />
            </Button>
          </div>
        </div>
        {
          viewMode == 'grid' ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {
                favoriteRecipes?.map((recipe, index) => (
                  <RecipeGrid recipe={recipe} key={index} />
                ))
              }
            </div>
          ) : (
            favoriteRecipes?.map((recipe, index) => (
              <RecipeList recipe={recipe} key={index} />
            ))
          )
        }
      </div>
    </div>
  )
}

export default Favorite