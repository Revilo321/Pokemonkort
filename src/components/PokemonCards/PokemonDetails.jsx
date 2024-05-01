import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import AddToCartButton from '../CartComponents/AddToCardButton'
import { BackButton } from '../BackButton'

export const PokemonDetails = () => {
  const { id } = useParams()
  const [card, setCard] = useState(null)

  const fetchImageUrl = async (attachmentUrl) => {
    try {
      const response = await axios.get(attachmentUrl)
      return response.data[0].guid.rendered
    } catch (err) {
      console.error('Failed to fetch image', err)
      return null
    }
  }

  const fetchLaravelCard = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/pokemoncard/${id}`
      )
      return response.data.pokemoncard || null
    } catch (error) {
      console.error('Error fetching card from Laravel:', error)
      return null
    }
  }

  const fetchWordPressCard = async (id) => {
    try {
      const response = await axios.get(
        `http://51.20.142.151/wp-json/wp/v2/posts/${id}`
      )
      const post = response.data
      const imageAPI = post._links['wp:attachment'][0]?.href
      const imageUrl = await fetchImageUrl(imageAPI)
      return {
        id: post.id,
        name: post.title.rendered,
        description: post.excerpt.rendered.replace(/<\/?[^>]+>/gi, ''),
        price: post.custom_fields.price[0],
        image: imageUrl,
      }
    } catch (error) {
      console.error('Error fetching card from WordPress:', error)
      return null
    }
  }

  useEffect(() => {
    const fetchCardDetails = async () => {
      let cardData = null

      if (id.startsWith('laravel-')) {
        const cardId = id.replace('laravel-', '')
        cardData = await fetchLaravelCard(cardId)
      } else if (id.startsWith('wordpress-')) {
        const cardId = id.replace('wordpress-', '')
        cardData = await fetchWordPressCard(cardId)
      }

      if (cardData) {
        setCard(cardData)
      } else {
        console.error('Card not found in either API.')
        toast.error('Card not found.')
      }
    }
    fetchCardDetails()
  }, [id])

  return (
    <div className='py-40 bg-main'>
      <div className='max-w-5xl mx-auto px-5'>
        <BackButton />
      </div>
      <h1 className='text-center text-xl font-semibold'>
        Pokemon Card Details
      </h1>
      <div className='card-container flex justify-center pt-5'>
        {card ? (
          <div
            key={card.id}
            className='max-w-sm rounded-lg overflow-hidden h-full relative group'>
            <div className='px-10 py-5 md:flex-col'>
              <div className=''>
                <h2 className='text-2xl font-bold'>{card.name}</h2>
                <img
                  src={`${card.image}`}
                  alt={card.name}
                  className='w-full max-w-lg rounded-2xl'
                />
              </div>

              <div className='pb-5'>
                <p>{card.description}</p>
                <p>Price: ${card.price}</p>
                <AddToCartButton item={card} />
              </div>
            </div>
          </div>
        ) : (
          <p>Card not found or loading...</p>
        )}
      </div>
    </div>
  )
}
