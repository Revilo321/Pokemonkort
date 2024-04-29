import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import AddToCartButton from '../CartComponents/AddToCardButton';

export const Pokemoncardindex = (card) => {
    const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleAddToCart = (e) => {
    dispatch(addToCart(card))
    toast.success('The cocktail was added to your cart!')
  }
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const getCards = async () => {
            try {
                const response = await axios.get('http://localhost:8000/pokemoncard');
                if (response.data && response.data.pokemoncard) {
                    setCards(response.data.pokemoncard);
                } else {
                    console.error('Invalid data format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching cards:', error);
            }
        };
        getCards();
    }, []);

    return (
        <div>
            
            <h1>Pokemon Cards</h1>
            <div className=''>
     
      <div className='mx-auto'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center'>
        
                {cards.length > 0 ? (
                    cards.map(card => (
                        <div className='max-w-sm rounded overflow-hidden h-full shadow-lg cursor-pointer relative group'>


                            <img
                            onClick={() => navigate(`/card/${card.id}`)}
                            className='w-full'
                            src={card.image}
                            alt={card.name}
                            />
                            <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                            <h2>{card.name}</h2>
                            <p>{card.price}</p>
                            <AddToCartButton item={card}/>
                            <Link
                                to={`/card/${card.id}`}
                                className='text-white hover:underline block text-center'
                            >
                                See Details
                            </Link>
                            </div>
                      </div>
                    ))
                ) : (
                    <p>No Pokemon cards available</p>
                )}
            </div>
        </div>
        </div>
      </div>
    
            
    );
};

