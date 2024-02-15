import { useDispatch, useSelector } from "react-redux";
import { fetchCocktails } from "../../features/cocktails/cocktailSlice";
import CocktailCard from "./CocktailCard";
import { useEffect } from "react";

export const CocktailsGrid = () => {
  const dispatch = useDispatch();
  const { cocktails, status, error } = useSelector((state) => state.cocktails);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCocktails());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  } else if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <p className="text-gray-600 text-center text-xl pb-2">
        Collection of cocktails
      </p>
      <hr className="max-w-xs lg:max-w-7xl mx-auto" />
      <div className="mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center">
          {cocktails.map((cocktail) => (
            <CocktailCard key={cocktail.idDrink} cocktail={cocktail} />
          ))}
        </div>
      </div>
    </div>
  );
};
