import React, { useEffect, useState } from "react";
import axios from "axios";
import RecipeCard from "../RecipeCard/RecipeCard";

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<string[]>([]);
    const [favMeals, setFavMeals] = useState<any[]>([]);

    useEffect(() => {
        const storedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavs);
    }, []);

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const requests = favorites.map((id) =>
                    axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
                );
                const responses = await Promise.all(requests);
                const meals = responses.map((res) => res.data.meals[0]);
                setFavMeals(meals);
            } catch (error) {
                console.error("Error fetching favorite meals:", error);
            }
        };

        if (favorites.length > 0) {
            fetchFavorites();
        } else {
            setFavMeals([]); 
        }
    }, [favorites]);

    const toggleFavorite = (id: string) => {
        const updatedFavs = favorites.filter((favId) => favId !== id);
        setFavorites(updatedFavs);
        localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    };

    return (
        <div className="min-h-screen bg-yellow-50 py-8 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Your Favorite Recipes</h1>

            {favMeals.length === 0 ? (
                <p className="text-center text-gray-500">No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {favMeals.map((meal) => (
                        <RecipeCard
                            key={meal.idMeal}
                            meal={meal}
                            isFavorite={true}
                            toggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
