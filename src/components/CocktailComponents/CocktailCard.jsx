import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";

const CocktailCard = ({ cocktail }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(cocktail));
  };
  return (
    <div
      onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
      className="max-w-sm rounded overflow-hidden h-full shadow-lg cursor-pointer"
    >
      <img
        className="w-full"
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
      />
      {/* <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{cocktail.strDrink}</div>
        <p className="text-gray-700 text-base">
          {cocktail.strInstructions
            ? cocktail.strInstructions.substring(0, 100) + "..."
            : ""}
        </p>
      </div>
      <div className="px-6 pt-4 pb-12">
        {cocktail.strTags?.split(",").map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            #{tag}
          </span>
        ))}
      </div>
      <p>Price: {cocktail.sellingPrice}$</p>
      <div className="">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
        <Link to={`/cocktail/${cocktail.idDrink}`}>See details</Link>
      </div> */}
    </div>
  );
};

export default CocktailCard;
