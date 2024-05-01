import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import AddToCartButton from '../CartComponents/AddToCardButton'

export const Pokemoncardindex = () => {
  const navigate = useNavigate()
  const [cards, setCards] = useState([])

  const fetchImageUrl = async (attachmentUrl) => {
    try {
      const response = await axios.get(attachmentUrl)
      return response.data[0].guid.rendered
    } catch (err) {
      console.error('Failed to fetch image', err)
      return null
    }
  }

  const fetchData = async () => {
    try {
      const laravelResponse = await axios.get(
        'http://localhost:8000/pokemoncard'
      )
      const laravelCards = laravelResponse.data.pokemoncard.map((card) => ({
        id: `laravel-${card.pokemon_id}`,
        source: 'laravel',
        ...card,
      }))

      const wpResponse = await axios.get(
        'http://51.20.142.151/wp-json/wp/v2/posts?_embed'
      )
      const wpCardsPromises = wpResponse.data.map(async (post) => {
        const imageAPI = post._links['wp:attachment'][0]?.href
        const imageUrl = await fetchImageUrl(imageAPI)
        return {
          id: `wordpress-${post.id}`,
          source: 'wordpress',
          name: post.title.rendered,
          price: post.custom_fields.price[0],
          image: imageUrl,
        }
      })
      const wpCards = await Promise.all(wpCardsPromises)

      setCards([...laravelCards, ...wpCards])
    } catch (error) {
      console.error('Error fetching cards:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className='bg-main pb-10'>
      <div className='mx-auto px-10 bg-[#212121] rounded-lg container'>
        <h1 className='text-white text-center py-5'>
          Pokémon Cards Collection
        </h1>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center'>
          {cards.length > 0 ? (
            cards.map((card) => (
              <div
                key={card.id}
                className='max-w-sm rounded overflow-hidden h-full shadow-lg cursor-pointer relative group'>
                <img
                  onClick={() => navigate(`/card/${card.id}`)}
                  className='w-60'
                  src={card.image}
                  alt={card.name}
                />
                <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <h2 className='text-white'>{card.name}</h2>
                  <p className='text-white'>{card.price} kr.-</p>
                  <AddToCartButton item={card} />
                  <Link
                    to={`/card/${card.id}`}
                    className='text-white hover:underline block text-center'>
                    See Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No Pokémon cards available</p>
          )}
        </div>
      </div>
    </div>
  )
}
