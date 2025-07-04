import React from 'react'
import { Button } from '@/components/ui/button'
import { BookOpen, Plus } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRecipes } from '@/context/RecipeContext'
import RecipeStatsCard from './components/RecipeStatsCard'

const Home = () => {
  const { recipes } = useRecipes();
  const favoriteRecipes = recipes.filter((recipe) => recipe.isFavorite);
  const totalFavorites = favoriteRecipes.length;
  const totalServings = favoriteRecipes.reduce((sum, recipe) =>
    sum + parseInt(recipe.servings), 0);

  const stats = [
    {
      title: "Total Recipes",
      value: recipes.length,
      gradient: "from-white to-white",
      color: 'text-orange-600'
    },
    {
      title: "created This Month",
      value: JSON.parse(localStorage.getItem('totalRecipesCreated')) || 0,
      gradient: "from-white to-white",
      color: 'text-green-600'
    },
    {
      title: "Favorites",
      value: totalFavorites,
      gradient: "from-white to-white",
      color: 'text-blue-600'
    },
    {
      title: "Servings",
      value: totalServings,
      gradient: "from-white to-white",
      color: 'text-purple-600'
    }
  ];
  return (
    <section className='min-h-screen flex  justify-center py-16'>
      <div className='container mx-auto px-4 text-center'>
        <h2 className='text-4xl md:text-7xl font-bold mb-6 tracking-tighter'>Discover & Create
          <span className='text-orange-600 block'>Amazing recipes</span>
        </h2>
        <p className="text-md md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your personal recipe vault where culinary creativity meets organization. Save, create, and share recipes
          that bring joy to your kitchen.
        </p>

        <div className='flex flex-col md:flex-row justify-center items-center gap-4 mb-8'>
          <Button
            asChild
            size="lg"
            className="py-4 bg-orange-600 hover:bg-orange-700 text-white font-medium text-lg  rounded-full"
          >
            <Link to="/create" className="flex items-center space-x-2">
              <Plus />
              <span>Create New Recipe</span>
            </Link>
          </Button>

          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full py-4 border border-orange-600 text-orange-600 font-medium text-lg hover:bg-orange-50"
          >
            <Link to="/recipes" className="flex items-center space-x-2">
              <BookOpen />
              <span>Browse All recipes</span>
            </Link>
          </Button>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-white/50'>
          {
            stats.map((stat, index) => (
              <RecipeStatsCard key={index} title={stat.title} value={stat.value} gradient={stat.gradient} color={stat.color} />
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default Home