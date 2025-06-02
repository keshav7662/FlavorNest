import { Button } from '@/components/ui/button'
import { ChefHat, HeartPlus } from 'lucide-react'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 py-2`'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 '>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center space-x-2'>
            <ChefHat className='h-8 w-8 text-orange-600' />
            <h1 className="font-[Impact] text-3xl">
              KhaanaChahiye
            </h1>
          </div>

          <div className='hidden md:flex items-center space-x-2'>
            <NavLink to='/' className={(e) => `font-medium text-sm text-gray-700 px-3 py-2 ${!e.isActive && 'hover:text-primary'} ${e.isActive && 'text-orange-600'}`}>Home</NavLink>
            <NavLink to='/recipes' className={(e) => `font-medium text-sm text-gray-700 px-3 py-2 ${!e.isActive && 'hover:text-primary'} ${e.isActive && 'text-orange-600'}`}>View recipes</NavLink>
            <Button
              asChild
              size="sm"
              variant="outline"
              className="ml-4 cursor-pointer rounded-sm"
            >
              <Link to="/favorites" className="flex items-center">
                <HeartPlus className="mr-1" />
                Favourites
              </Link>
            </Button>

          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar