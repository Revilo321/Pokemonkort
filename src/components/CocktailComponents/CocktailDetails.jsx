import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addToCartAsync } from '../../features/cart/cartSlice'
import { selectCocktails } from '../../features/cocktails/cocktailSlice'
import { toast } from 'sonner'
import { BackButton } from '../BackButton'

export const CocktailDetails = () => {
  const { id } = useParams()
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

  return (
    <div className='px-10 pt-40 md:flex'>
      <div className='md:w-1/3'>
        <BackButton />
        <h2 className='text-2xl font-bold'>{cocktail.strDrink}</h2>
        <img
          src={cocktail.strDrinkThumb}
          alt={cocktail.strDrink}
          className='w-full max-w-lg'
        />
      </div>
      <div className='md:pl-10 pb-10 relative md:w-2/3'>
        <div className='my-4'>
          <button
            onClick={() => setActiveTab('ingredients')}
            className={` pr-4 py-2 ${
              activeTab === 'ingredients' ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            Ingredients
          </button>
          <button
            onClick={() => setActiveTab('instructions')}
            className={`py-2 ${
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
        <div className='md:absolute bottom-0 pt-5'>
          <p>Price: ${cocktail.sellingPrice}</p>
          <button
            onClick={handleAddToCart}
            className='mt-4 px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
