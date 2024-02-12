import React from 'react'

const CocktailCard = ({ cocktail }) => {
  return (
    <div className='max-w-sm rounded overflow-hidden shadow-lg'>
      <img
        className='w-full'
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
      />
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{cocktail.strDrink}</div>
        <p className='text-gray-700 text-base'>
          {cocktail.strInstructions
            ? cocktail.strInstructions.substring(0, 100) + '...'
            : ''}
        </p>
      </div>
      <div className='px-6 pt-4 pb-2'>
        {cocktail.strTags?.split(',').map((tag) => (
          <span
            key={tag}
            className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default CocktailCard
