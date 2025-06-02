import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const RecipeStatsCard = ({ title, value, gradient, color }) => {

  return (
    <Card className={`text-center border-0 shadow-sm rounded-md bg-gradient-to-br ${gradient}`}>
      <CardContent>
        <div className={`text-4xl font-bold mb-2 ${color}`}>{value}</div>
        <div className='text-md text-gray-600'>{title}</div>
      </CardContent>
    </Card>
  )
}

export default RecipeStatsCard