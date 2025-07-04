import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChefHat, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const RecipeNotFound = ({ entityName, backTo }) => {
  return (
    <div className='min-h-screen max-w-4xl mx-auto py-12 px-4'>
      <div className="flex flex-col space-y-8">
        <Button asChild variant="ghost" size="sm" className="w-fit hover:bg-gray-100 transition-colors">
          <Link to={`${backTo}`} className="flex items-center space-x-2 text-gray-600">
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Back to {entityName}</span>
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className='text-4xl font-bold text-gray-900'>Recipe Not Found</h1>
          <p className="text-lg text-gray-600">
            We couldn't find what you're looking for. Be the first to create this recipe!
          </p>

          <Button className="bg-orange-600 hover:bg-orange-700">
            <ChefHat className="h-4 w-4 mr-2" />
            <Link to='/create'>Create Recipe</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipeNotFound;