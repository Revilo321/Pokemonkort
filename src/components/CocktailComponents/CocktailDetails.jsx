import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCart } from "../../features/cart/cartSlice";

export const CocktailDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cocktail, setCocktail] = useState(null);
  const [activeTab, setActiveTab] = useState("ingredients");

  useEffect(() => {
    const fetchCocktail = async () => {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      const data = await response.json();
      setCocktail(data.drinks[0]);
    };

    fetchCocktail();
  }, [id]);

  if (!cocktail) {
    return <div className="py-32">Loading...</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ idDrink: cocktail.idDrink, data: cocktail }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-10 py-32">
      <button
        onClick={handleBack}
        className="mb-4 px-4 py-2 bg-gray-300 text-black rounded"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold">{cocktail.strDrink}</h2>
      <img
        src={cocktail.strDrinkThumb}
        alt={cocktail.strDrink}
        className="w-full max-w-md"
      />
      <div className="my-4">
        <button
          onClick={() => setActiveTab("ingredients")}
          className={`px-4 py-2 ${
            activeTab === "ingredients" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Ingredients
        </button>
        <button
          onClick={() => setActiveTab("instructions")}
          className={`px-4 py-2 ${
            activeTab === "instructions" ? "text-blue-600" : "text-gray-600"
          }`}
        >
          Instructions
        </button>
      </div>
      {activeTab === "ingredients" && (
        <ul>
          {Array.from(Array(15).keys()).map((index) => {
            const ingredient = cocktail[`strIngredient${index + 1}`];
            const measure = cocktail[`strMeasure${index + 1}`];
            return ingredient ? (
              <li key={index}>{`${
                measure ? measure.trim() : ""
              } ${ingredient}`}</li>
            ) : null;
          })}
        </ul>
      )}
      {activeTab === "instructions" && <p>{cocktail.strInstructions}</p>}
      <button
        onClick={handleAddToCart}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};
