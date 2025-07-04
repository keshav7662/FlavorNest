import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useRecipes } from '@/context/RecipeContext';
import { ArrowLeft, Bookmark, Check, ChefHat, Clock, CloudCog, FilePenLine, Trash2, Users } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import RecipeNotFound from './RecipeNotFound';
import { useEffect, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const RecipeDetails = () => {
  const { id } = useParams();
  const { recipes, bookmarkHandler, editRecipeHandler, deleteRecipeHandler } = useRecipes();
  const recipe = recipes.find((recipe) => recipe.id === id);

  if (!recipe) {
    return (
      <RecipeNotFound entityName="Recipe" backTo={"/recipes"} />
    )
  }
  const [editFormModal, setEditFormModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { register, handleSubmit, control, reset } = useForm();

  useEffect(() => {
    if (editFormModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [editFormModal]);

  const handleEditForm = () => {
    reset({
      title: recipe.title,
      chefName: recipe.chefName,
      recipeImage: recipe.recipeImage,
      description: recipe.description,
      category: recipe.category,
      cuisine: recipe.cuisine,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      calories: recipe.calories
    });
    setEditFormModal(true);
  }

  const submitHandler = (data) => {
    editRecipeHandler(id, data);
    setEditFormModal(false);
    reset()
  }

  return (
    <div className='container relative mx-auto px-4 py-4 md:py-10'>
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-4'>
          <div className='relative'>
            <img src={recipe.recipeImage} alt={recipe.title}
              className={'w-full h-90 object-cover rounded-xl shadow-lg'}
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
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <Badge variant="outline">{recipe.category}</Badge>
                <Badge variant="outline" >{recipe.cuisine}</Badge>
              </div>
              <div className='flex items-center gap-2 p-2 rounded-lg'>
                <FilePenLine onClick={handleEditForm} className="w-8 h-8 text-orange-500 bg-orange-100 rounded px-2 py-1 hover:text-orange-600 hover:scale-[1.2] transition-all duration-300 cursor-pointer" />
                <Trash2 onClick={() => setDeleteModal(true)} className="w-8 h-8 text-red-500 bg-red-100 rounded px-2 py-1 hover:text-red-600 hover:scale-[1.2] transition-all duration-300 cursor-pointer" />
              </div>

            </div>
            <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>{recipe.title}</h1>
            <p className="text-gray-700 break-words">{recipe.description}</p>
            <div className='flex items-start space-x-3 p-4 bg-white rounded-lg shadow-sm md:w-fit'>
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

      {
        editFormModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex justify-center px-4 py-4 overflow-y-auto">
            <div className="w-full max-w-2xl bg-white rounded-xl relative p-6 h-fit">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold z-10"
                onClick={() => setEditFormModal(false)}
                aria-label="Close modal"
              >
                &times;
              </button>
              <form onSubmit={handleSubmit(submitHandler)} className="space-y-4">
                <h3 className="text-center font-black text-2xl sm:text-3xl text-orange-600 mb-2">Edit Recipe</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="mb-2 text-sm">Recipe Name</Label>
                      <Input id="title" {...register("title", { required: 'Recipe title is required!' })} />
                    </div>
                    <div>
                      <Label className="mb-2 text-sm">Chef Name</Label>
                      <Input id="chef" {...register("chefName", { required: 'Chef name is required!' })} />
                    </div>
                    <div>
                      <Label className="mb-2 text-sm">Recipe Image</Label>
                      <Input id="image" {...register("recipeImage", { required: 'Recipe image is required!' })} />
                    </div>
                  </div>
                  <div>
                    <Label className="mb-2 text-sm">Recipe Description</Label>
                    <Textarea
                      id="desc"
                      {...register('description', {
                        required: 'description is required!',
                        minLength: { value: 50, message: 'Description must be at least 50 characters long' }
                      })}
                      className="min-h-[100px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-2 text-sm">Category *</Label>
                      <Controller
                        name='category'
                        control={control}
                        rules={{ required: 'Category is required!' }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Breakfast">Breakfast</SelectItem>
                              <SelectItem value="Lunch">Lunch</SelectItem>
                              <SelectItem value="Dinner">Dinner</SelectItem>
                              <SelectItem value="Snack">Snack</SelectItem>
                              <SelectItem value="Dessert">Dessert</SelectItem>
                              <SelectItem value="Mocktails">Mocktails</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                    <div>
                      <Label className="mb-2 text-sm">Cuisine *</Label>
                      <Controller
                        name='cuisine'
                        control={control}
                        rules={{ required: 'Cuisine is required!' }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} value={field.value}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select cuisine" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="American">American</SelectItem>
                              <SelectItem value="Italian">Italian</SelectItem>
                              <SelectItem value="Mexican">Mexican</SelectItem>
                              <SelectItem value="Chinese">Chinese</SelectItem>
                              <SelectItem value="Indian">Indian</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm mb-2">Cooking Time *</Label>
                      <Input {...register('cookingTime', { required: 'cooking time is required!' })} />
                    </div>
                    <div>
                      <Label className="text-sm mb-2">Servings *</Label>
                      <Input {...register('servings', { required: 'servings is required!' })} />
                    </div>
                    <div>
                      <Label className="text-sm mb-2">Calories *</Label>
                      <Input {...register('calories', { required: 'calories is required!' })} />
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={() => setEditFormModal(false)}>Cancel</Button>
                    <Button className="bg-orange-600 hover:bg-orange-700">Update</Button>
                  </div>
                </div>
              </form>
            </div>
          </div>

        )
      }

      {deleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center px-4">
          <div className="relative bg-white w-full max-w-md rounded-xl shadow-xl p-6">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl"
              onClick={() => setDeleteModal(false)}
              aria-label="Close modal"
            >
              &times;
            </button>

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl">
                🗑️
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-semibold text-center mb-2">
              Are you sure you want to delete?
            </h2>
            <p className="text-center text-gray-500 mb-6">
              This action cannot be undone.
            </p>

            {/* Actions */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDeleteModal(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteRecipeHandler(recipe.id)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default RecipeDetails