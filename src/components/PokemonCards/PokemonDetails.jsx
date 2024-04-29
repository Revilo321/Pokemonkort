import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import AddToCartButton from '../CartComponents/AddToCardButton';
export const PokemonDetails = () => {
  const { id } = useParams(); // Extract the ID from URL parameters
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (card) => {
    dispatch(addToCart(card));
    toast.success('Card was added to your basket!');
  };

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

  // Convert the id to string to ensure it matches with the id of each card
  const stringId = id.toString();

  // Filter the cards array to include only the card with the matching ID
  const filteredCards = cards.filter(card => card.id == stringId);



  return (
    <div>
      <h1>Pokemon Cards</h1>
      <div className="card-container">
        {filteredCards.length ? (
          filteredCards.map(card => (
            <div key={card.id} className='max-w-sm rounded overflow-hidden h-full shadow-lg cursor-pointer relative group'>
              <div className='px-10 pt-40 md:flex'>
      <div className='md:w-1/3'>
        
        <h2 className='text-2xl font-bold'>{card.name}</h2>
        <img
          src={card.image}
          alt={card.name}
          className='w-full max-w-lg'
        />
      </div>
      

        <div className='md:absolute bottom-0 pt-5'>
          <p>Price: ${card.price}</p>
          {/* <button
            onClick={handleAddToCart}
            className='mt-4 px-4 py-2 bg-blue-500  text-white rounded hover:bg-blue-600'
          >
            Add to Cart
          </button> */}
          <AddToCartButton item={card}/>
        </div>
      </div>
    </div>
            
          ))
        ) : (
          <p>No Pokemon cards available</p>
        )}
      </div>
    </div>
  );
};
