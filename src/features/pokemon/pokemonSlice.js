import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { addToCart } from '../../features/cart/cartSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

export const PokemonSlice = (_card) => {

  

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

}
export const selectCards = (state) => state.cards

