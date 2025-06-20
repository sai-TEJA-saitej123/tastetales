import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Play } from "lucide-react";

const RecipeDetail = () => {
    const { id } = useParams();
    const [meal, setMeal] = useState<any>(null);

    useEffect(() => {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((res) => setMeal(res.data.meals[0]));
    }, [id]);

    if (!meal) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 bg-white shadow-md rounded-xl mt-6">
            <h2 className="text-3xl font-bold mb-4 text-pink-600 text-center">
                {meal.strMeal}
            </h2>

            <div className="flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="rounded-lg shadow-md w-full md:w-1/2 object-cover"
                />

                <div className="flex-1 space-y-3">
                    <p>
                        <strong className="text-gray-600">Category:</strong>{" "}
                        <span className="text-gray-800">{meal.strCategory}</span>
                    </p>
                    <p>
                        <strong className="text-gray-600">Area:</strong>{" "}
                        <span className="text-gray-800">{meal.strArea}</span>
                    </p>
                    <p>
                        <strong className="text-gray-600">Instructions:</strong>
                        <span className="text-gray-700 block mt-2 leading-relaxed">
                            {meal.strInstructions}
                        </span>
                    </p>
                    <a
                        href={meal.strYoutube}
                        target="_blank"
                        rel="noreferrer"
                        className=" mt-4 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition flex w-40"
                    >
                        <Play className="pr-1" /> Watch Video

                    </a>

                </div>
            </div>
        </div>

    );
};

export default RecipeDetail;
