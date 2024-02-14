import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addToCart } from '../../features/cart/cartSlice'
import { selectCocktails } from '../../features/cocktails/cocktailSlice'

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
    dispatch(addToCart(cocktail))
  }

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className='px-10 py-32'>
      <button
        onClick={handleBack}
        className='mb-4 px-4 py-2 bg-gray-300 text-black rounded'
      >
        Back
      </button>
      <h2 className='text-2xl font-bold'>{cocktail.strDrink}</h2>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className='w-full max-w-md'
      />
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
      <button
        onClick={handleAddToCart}
        className='mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
      >
        Add to Cart
      </button>
    </div>
  )
}
