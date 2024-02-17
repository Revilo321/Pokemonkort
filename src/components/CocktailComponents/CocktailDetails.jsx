import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCartAsync } from '../../features/cart/cartSlice'
import { selectCocktails } from '../../features/cocktails/cocktailSlice'
import { toast } from 'sonner'

export const CocktailDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cocktails = useSelector(selectCocktails)
  const cocktail = cocktails.cocktails.find(
    (cocktail) => cocktail.idDrink === id
  )
  const [activeTab, setActiveTab] = useState('ingredients')

  if (!cocktail) {
    return <div className='py-32'>Loading...</div>
  }

  const handleAddToCart = () => {
    dispatch(addToCartAsync(cocktail))
    toast.success('The cocktail was added to your cart!')
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className='px-10 pt-40 md:flex'>
      <div className='md:w-1/3'>
        <svg
          onClick={handleBack}
          className='cursor-pointer h-6 w-6'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18'
          />
        </svg>
        <h2 className='text-2xl font-bold'>{cocktail.strDrink}</h2>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className='w-full max-w-lg'
        />
      </div>
      <div className='pl-10 pb-10 relative'>
        <div className='my-4'>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={`px-4 py-2 ${
              activeTab === 'ingredients' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`px-4 py-2 ${
              activeTab === 'instructions' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            Instructions
          </button>
        </div>
        <div className='px-4'>
          {activeTab === 'ingredients' && (
            <ul>
              {Array.from(Array(15).keys()).map((index) => {
                const ingredient = cocktail[`strIngredient${index + 1}`]
                const measure = cocktail[`strMeasure${index + 1}`]
                return ingredient ? (
                  <li key={index}>{`${
                    measure ? measure.trim() : ''
                  } ${ingredient}`}</li>
                ) : null
              })}
            </ul>
          )}
          {activeTab === 'instructions' && <p>{cocktail.strInstructions}</p>}
        </div>
        <button
          onClick={handleAddToCart}
          className='mt-4 px-4 py-2 bg-blue-500 absolute bottom-0 text-white rounded hover:bg-blue-600'
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}
