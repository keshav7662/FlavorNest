import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useRecipes } from '@/context/RecipeContext'
import { Bookmark, Heart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const RecipeGrid = ({ recipe }) => {
  const { favouriteHandler, bookmarkHandler } = useRecipes();
  return (
    <Card className="shadow-sm rounded-md overflow-hidden pt-0 hover:shadow-xl transition-all duration-300 group cursor-pointer">
      {/* Image outside of CardContent to avoid padding */}
      <div className="relative">
        <img
          src={recipe.recipeImage}
          alt=""
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className='w-full absolute top-0 flex justify-between p-2'>
          <Badge className='bg-white/90 text-gray-900 rounded-full'>Dessert</Badge>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white cursor-pointer"
              onClick={() => favouriteHandler(recipe.id)}
            >
              <Heart className={`h-4 w-4 ${recipe.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
            </Button>

            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white cursor-pointer"
              onClick={() => bookmarkHandler(recipe.id)}
            >
              <Bookmark
                className={`h-4 w-4 ${recipe.isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`}
              />
            </Button>
          </div>
        </div>
      </div>
      <CardContent className='space-y-4'>
        <h1 className='text-2xl font-semibold text-gray-900 hover:text-orange-600'>{recipe.title}</h1>
        <p className='text-sm text-gray-600 line-clamp-2 break-words'>{recipe.description}</p>
        <div className='flex gap-4 items-center'>
          <div className='flex items-center min-w-0 flex-1'>
            <Avatar className="h-6 w-6 mr-2 shrink-0">
              <AvatarFallback className="text-xs bg-orange-100 text-orange-700">{recipe.chefName[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600 truncate">{recipe.chefName}</span>
            <span className="text-gray-400 mx-2">•</span>
            <span className="text-sm text-gray-500 truncate">{recipe.cuisine}</span>
          </div>
          <Button size="sm" className="bg-orange-600 hover:bg-orange-700 cursor-pointer" asChild>
            <Link to={`/recipes/${recipe.id}`} >
              View Recipe
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecipeGrid
