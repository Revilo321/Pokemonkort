import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import AddToCartButton from '../CartComponents/AddToCardButton'
export const PokemonDetails = () => {
  const { id } = useParams() // Extract the ID from URL parameters
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddToCart = (card) => {
    dispatch(addToCart(card))
    toast.success('Card was added to your basket!')
  }

  //TODO: Consolidate the arrays once there is access to the database
  const [cards, setCards] = useState([])

  /*   useEffect(() => {
    const getCards = async () => {
      try {
        const response = await axios.get('http://localhost:8000/pokemoncard')
        if (response.data && response.data.pokemoncard) {
          setCards(response.data.pokemoncard)
        } else {
          console.error('Invalid data format:', response.data)
        }
      } catch (error) {
        console.error('Error fetching cards:', error)
      }
    }
    getCards()
  }, []) */

  const fetchImageUrl = async (attachmentUrl) => {
    try {
      const response = await fetch(attachmentUrl)
      const data = await response.json()
      return data[0].guid.rendered
    } catch (err) {
      console.error('Failed to fetch image', err)
      return null
    }
  }

  useEffect(() => {
    const getWpCards = async () => {
      try {
        const response = await axios.get(
          `http://51.20.142.151/wp-json/wp/v2/posts/${id}`
        )
        const post = response.data
        const imageAPI = post._links['wp:attachment'][0].href
        const imageUrl = await fetchImageUrl(imageAPI)
        const newObject = {
          id: post.id,
          name: post.title.rendered,
          description: post.excerpt.rendered.replace(/<\/?[^>]+>/gi, ''),
          price: post.custom_fields.price[0],
          image: imageUrl,
        }

        setCards(newObject)
      } catch (error) {
        console.error('Error fetching cards:', error)
      }
    }

    getWpCards()
  }, [])

  // Convert the id to string to ensure it matches with the id of each card
  const stringId = id.toString()

  // Filter the cards array to include only the card with the matching ID
  /* const filteredCards = cards.filter((card) => card.id == stringId) */

  return (
    <div className='py-40'>
      <h1>Pokemon Cards</h1>
      <div className='card-container'>
        <div
          key={cards.id}
          className='max-w-sm rounded overflow-hidden h-full shadow-lg relative group'>
          <div className='px-10 md:flex-col'>
            <div className=''>
              <h2 className='text-2xl font-bold'>{cards.name}</h2>
              <img
                src={cards.image}
                alt={cards.name}
                className='w-full max-w-lg'
              />
            </div>

            <div className='pb-5'>
              <p>{cards.description}</p>
              <p>Price: ${cards.price}</p>
              {/* <button
            onClick={handleAddToCart}
            className='mt-4 px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600'
          >
            Add to Cart
          </button> */}
              <AddToCartButton item={cards} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
