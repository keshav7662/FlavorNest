import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card"
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Clock, Save, User } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { nanoid } from 'nanoid'
import { useRecipes } from '@/context/RecipeContext'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

const Upload = () => {

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
  const { recipes, setRecipes } = useRecipes();
  const [isVerified, setIsVerified] = useState(false);
  let totalRecipesCreated = JSON.parse(localStorage.getItem('totalRecipesCreated')) || 0;
  const navigate = useNavigate();

  const onSubmit = (values) => {
    totalRecipesCreated++;
    const newRecipe = { ...values, id: nanoid(), isVerified }
    const updatedRecipes = [...recipes, newRecipe]
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes))
    localStorage.setItem('totalRecipesCreated', JSON.stringify(totalRecipesCreated))
    setRecipes(updatedRecipes)

    toast.success('Recipe Saved!')
    reset({
      title: '',
      chefName: '',
      recipeImage: '',
      description: '',
      category: '',
      cuisine: '',
      cookingTime: '',
      servings: '',
      calories: ''
    });
    setIsVerified(false);
    navigate('/recipes')
  }

  return (
    <div className='py-10 px-4'>
      <div className='container mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          <div className='space-y-6'>
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                <span>Back to Home</span>
              </Link>
            </Button>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl tracking-tight">Basic Information</CardTitle>
                <CardDescription>Tell us about your recipe</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recipe Title, Chef Name, Image URL */}
                <div className='grid md:grid-cols-3 gap-2'>
                  <div>
                    <Label htmlFor="title">Recipe Title *</Label>
                    <Input
                      {...register('title', { required: true })}
                      id="title"
                      placeholder="e.g., Grandma's Chocolate Chip Cookies"
                      className="mt-2"
                    />
                    {errors.title && <span className='text-red-500 text-xs font-medium'>Recipe title is required!</span>}
                  </div>
                  <div>
                    <Label htmlFor="chefName">Chef Name *</Label>
                    <Input
                      {...register('chefName', { required: true })}
                      id="chefName"
                      placeholder="e.g., Baker John"
                      className="mt-2"
                    />
                    {errors.chefName && <span className='text-red-500 text-xs font-medium'>Chef name is required!</span>}
                  </div>
                  <div>
                    <Label htmlFor="recipeImage">Recipe Image (URL) *</Label>
                    <Input
                      {...register('recipeImage', { required: true })}
                      id="recipeImage"
                      placeholder="Enter image URL"
                      className="mt-2"
                    />
                    {errors.recipeImage && <span className='text-red-500 text-xs font-medium'>Recipe image URL is required!</span>}
                  </div>
                </div>

                {/* Description Field */}
                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    {...register('description', {
                      required: "Description is required!",
                      minLength: { value: 50, message: 'Description must be at least 50 characters long' }
                    })}
                    id="description"
                    placeholder="Describe your recipe here..."
                    className="mt-2"
                    rows={3}
                  />
                  {errors.description && <span className='text-red-500 text-xs font-medium'>{errors.description.message}</span>}
                </div>

                {/* Category and Cuisine Selectors */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="mt-2 w-full">
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
                    {errors.category && <span className='text-red-500 text-xs font-medium'>Category is required!</span>}
                  </div>
                  <div>
                    <Label htmlFor="cuisine">Cuisine *</Label>
                    <Controller
                      name="cuisine"
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className="mt-2 w-full">
                            <SelectValue placeholder="Select cuisine" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="American">American</SelectItem>
                            <SelectItem value="Italian">Italian</SelectItem>
                            <SelectItem value="Mexican">Mexican</SelectItem>
                            <SelectItem value="Indian">Indian</SelectItem>
                            <SelectItem value="Chinese">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.cuisine && <span className='text-red-500 text-xs font-medium'>Cuisine is required!</span>}
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl tracking-tight">Recipe Details</CardTitle>
                <CardDescription>Cooking Information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recipe Title, Chef Name, Image URL */}
                <div className='grid md:grid-cols-3 gap-2'>
                  <div>
                    <Label htmlFor="cookTime">Cook Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('cookingTime')}
                        id="cookTime"
                        placeholder="15 min"
                        className="pl-10 mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="servings">Servings</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        {...register('servings')}
                        id="servings"
                        placeholder="4"
                        className="pl-10 mt-2"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="calories">Calories per serving (optional)</Label>
                    <Input
                      {...register('calories')}
                      id="calories"
                      placeholder="250"
                      className="mt-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            {/* verify */}

            <div className="flex items-center space-x-2">
              <Checkbox id="terms"
                checked={isVerified}
                onCheckedChange={setIsVerified}
                className="border border-black"
                required
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Verify Yourself
              </Label>
            </div>

            {/* Form Action Buttons */}
            <div className='flex justify-end'>
              <div className='flex gap-2'>
                <Button type="button" size="sm" variant="outline" className="px-6" asChild>
                  <Link to="/">Cancel</Link>
                </Button>
                <Button size="sm" className="bg-orange-600 hover:bg-orange-700 text-white rounded-sm cursor-pointer">
                  <Save className='mr-1' />
                  Save Recipe
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Upload;
