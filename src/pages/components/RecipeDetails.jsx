import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRecipes } from '@/context/RecipeContext';
import { ArrowLeft, Bookmark, Check, ChefHat, Clock, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import RecipeNotFound from './RecipeNotFound';
const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes, bookmarkHandler } = useRecipes();

  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return (
      <RecipeNotFound entityName="Recipe" backTo={"/recipes"} />
    )
  }
  return (
    <div className='container mx-auto px-4 py-10 md:py-20'>
      <div className='w-full max-w-6xl mx-auto'>
        <div className='mb-4'>
          <Button
            asChild
            variant="ghost"
            size="sm"
          >
            <Link to={-1} className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Back</span>
            </Link>
          </Button>
        </div>
        <div className='grid lg:grid-cols-2 gap-8 mb-4'>
          <div className='relative'>
            <img src={recipe.recipeImage} alt={recipe.title}
              className='w-full h-96 object-cover rounded-xl shadow-lg'
            />
            <div className='absolute top-4 right-4'>
              <Button
                size="sm"
                variant="secondary"
                className="bg-white/90 hover:bg-white cursor-pointer"
                onClick={() => bookmarkHandler(recipe.id)}
              >
                <Bookmark className={`h-4 w-4 ${recipe.isBookmarked ? 'fill-blue-500 text-blue-500' : ''}`} />
              </Button>
            </div>
          </div>
          <div className='space-y-6'>
            <div className='flex items-center gap-2 mb-4'>
              <Badge variant="outline">{recipe.category}</Badge>
              <Badge variant="outline" >{recipe.cuisine}</Badge>
            </div>
            <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>{recipe.title}</h1>
            <p className="text-base text-gray-700 leading-relaxed">{recipe.description}</p>
            <div className='flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm w-fit'>
              <Avatar className='h-12 w-12'>
                <AvatarFallback className="bg-orange-100 text-orange-700">{recipe.chefName?.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className='text-lg font-medium '>{recipe.chefName}</h2>
                <p className='text-xs text-gray-600 font-medium'>Chef</p>
              </div>

              {
                recipe.isVerified &&
                <Badge variant="outline" className='text-green-700' >
                  <Check />
                  verified
                </Badge>
              }

            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Card className="text-center">
                <CardContent className="pt-4">
                  <Clock className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">{recipe.cookingTime || '--'}</div>
                  <div className="text-xs text-gray-500">Total Time</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">{recipe.servings || '--'} servings</div>
                  <div className="text-xs text-gray-500">Serves</div>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-4">
                  <ChefHat className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm font-medium">{recipe.calories || "--"}</div>
                  <div className="text-xs text-gray-500">Calories</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetails