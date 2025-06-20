import React from "react";
import { Link } from "react-router-dom";

interface RecipeCardProps {
    meal: any;
    isFavorite: boolean;
    toggleFavorite: (id: string) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ meal, isFavorite, toggleFavorite }) => {
    return (
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
            {/* Favorite Button */}
            <button
                onClick={() => toggleFavorite(meal.idMeal)}
                className="text-2xl absolute top-3 right-3 z-10"
                title="Add to Favorites"
            >
                {isFavorite ? "❤️" : "🤍"}
            </button>


            <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{meal.strMeal}</h3>
                <p className="text-sm text-gray-600">Category: {meal.strCategory}</p>
                <Link
                    to={`/recipe/${meal.idMeal}`}
                    className="inline-block mt-3 text-blue-500 hover:underline"
                >
                    View Recipe →
                </Link>
            </div>
        </div>
    );
};

export default RecipeCard;
