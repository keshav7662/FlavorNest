import { Card, CardContent } from '@/components/ui/card'
import { Badge } from "@/components/ui/badge"
import { Bookmark, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { Link } from 'react-router-dom'
import { useRecipes } from '@/context/RecipeContext'
const RecipeList = ({ recipe }) => {
  const { favouriteHandler, bookmarkHandler } = useRecipes();

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent >
        <div className='flex gap-6'>
          <div className='shrink-0 relative'>
            <img src={recipe.recipeImage} alt="" className='w-30 h-20 object-cover rounded-lg' />
            <Badge className="absolute -top-2 -right-2 bg-gray-200 text-gray-900 text-xs rounded-full">{recipe.category}</Badge>
          </div>
          <div className='flex-1'>
            <div className='flex justify-between items-start mb-2'>
              <h4 className="text-lg font-semibold text-gray-900 hover:text-orange-600 transition-colors cursor-pointer">
                {recipe.title}
              </h4>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => favouriteHandler(recipe.id)}
                >
                  <Heart className={`h-4 w-4 ${recipe.isFavorite ? "fill-red-500 text-red-500" : ""}`} />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer"
                  onClick={() => bookmarkHandler(recipe.id)}
                >
                  <Bookmark
                    className={`h-4 w-4 ${recipe.isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`}
                  />
                </Button>

              </div>
            </div>
            <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>

            <div className='flex justify-between items-center'>
              <div className='flex items-center'>
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback className="text-xs bg-orange-100 text-orange-700">{recipe.chefName[0]}</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">{recipe.chefName}</span>
                <span className="text-gray-400 mx-2">•</span>
                <span className="text-sm text-gray-500">{recipe.cuisine}</span>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700 cursor-pointer" asChild>
                <Link to={`/recipes/${recipe.id}`} >
                  View Recipe
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default RecipeList