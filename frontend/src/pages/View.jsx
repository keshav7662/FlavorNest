import React, { useState } from 'react'
import { useRecipes } from '@/context/RecipeContext'
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid3x3, List } from 'lucide-react';
import RecipeNotFound from './components/RecipeNotFound';
import RecipeList from './components/RecipeList'
import RecipeGrid from './components/RecipeGrid';

const View = () => {
  const { recipes } = useRecipes();
  const [viewMode, setViewMode] = useState('grid');
  if (!recipes.length) {
    return (
      <RecipeNotFound entityName="Home" backTo={'/'} />
    );
  }

  return (
    <div className='py-4 md:py-10 px-5 min-h-screen'>
      <div className='container mx-auto space-y-4'>
        <div className='max-w-5xl mx-auto space-y-4'>
          <div className='mb-4 flex justify-between'>
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
                  recipes?.map((recipe, index) => (
                    <RecipeGrid recipe={recipe} key={index} />
                  ))
                }
              </div>
            ) : (
              recipes?.map((recipe, index) => (
                <RecipeList recipe={recipe} key={index} />
              ))
            )
          }
        </div>
      </div>
    </div>
  )
}

export default View