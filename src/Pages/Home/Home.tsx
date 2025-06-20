import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";
import bgImage from "@assets/images/tastetales-bg.jpg";
const Home: React.FC = () => {
    const [meals, setMeals] = useState<any[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMeals = async () => {
            try {
                setLoading(true);
                const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
                const requests = alphabet.map((letter) =>
                    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
                );
                const responses = await Promise.all(requests);
                const allMeals = responses
                    .map((res) => res.data.meals)
                    .filter((meals) => meals !== null)
                    .flat();
                setMeals(allMeals);
            } catch (error) {
                console.error("Error fetching meals:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMeals();
        const storedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(storedFavs);
    }, []);

    const toggleFavorite = (id: string) => {
        let updatedFavs;
        if (favorites.includes(id)) {
            updatedFavs = favorites.filter((favId) => favId !== id);
        } else {
            updatedFavs = [...favorites, id];
            navigate("/favorites");
        }
        setFavorites(updatedFavs);
        localStorage.setItem("favorites", JSON.stringify(updatedFavs));
    };

    const handleSearch = async () => {
        if (searchTerm.trim() === "") return;

        try {
            setLoading(true);
            const res = await axios.get(
                `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
            );
            setMeals(res.data.meals || []);
        } catch (error) {
            console.error("Search failed", error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <>

            {/* Main Section */}
            <section className="bg-cover bg-center h-64 flex flex-col justify-center items-center text-white"
                style={{ backgroundImage: `url(${bgImage})` }}>
                <div className="bg-black bg-opacity-40 px-6 py-4 rounded">
                    <h2 className="text-3xl font-bold">Find your perfect meal to be made!</h2>
                    <button
                        onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                        className="mt-4 px-6 py-2 bg-white text-pink-600 rounded hover:bg-pink-100 transition"
                    >
                        Find Recipes
                    </button>
                </div>
            </section>

            {/* Search */}
            <div className="flex justify-center my-8 px-4">
                <input
                    type="text"
                    placeholder="Search recipes..."
                    className="border border-gray-300 rounded px-4 py-2 w-full sm:w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleSearch();
                    }}
                />
                <button
                    onClick={handleSearch}
                    className="ml-2 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
                >
                    Search
                </button>
            </div>

            {/* Content */}
            <main className="px-4 pb-12 min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">All Recipes</h3>

                    {loading ? (
                        <div className="flex justify-center items-center min-h-[40vh]">
                            <div className="w-10 h-10 border-4 border-pink-400 border-dashed rounded-full animate-spin"></div>
                        </div>
                    ) : meals.length === 0 ? (
                        <p className="text-center text-gray-500">No recipes found.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {meals.map((meal) => (
                                <RecipeCard
                                    key={meal.idMeal}
                                    meal={meal}
                                    isFavorite={favorites.includes(meal.idMeal)}
                                    toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Home;
