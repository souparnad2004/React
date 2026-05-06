import { useState } from "react";
import { useEffect} from "react";
import Navbar from "./components/Navbar.jsx";
import MealCard from "./components/MealCard.jsx";
import Button from "./components/Button.jsx";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";

function App() {
  const [meals, setMeals] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const limit = 10;

  const handlePage = (e) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const getMeals = async () => {
      try {
        setLoading(true);
        const url = `https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=${limit}`;

        const options = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        const response = await fetch(url, options);
        const jsonData = await response.json();
        const newMeals = jsonData.data.data;

        setMeals((prev) => [...prev, ...newMeals]);

        if (newMeals.length < limit) {
          setHasMore(false);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getMeals();
  }, [page]);

  return (
<div className="min-h-screen w-full bg-[#0f1115] text-white">
  <Navbar />

  {loading && <Loading />}
  {error && <Error message={error} />}

  <div className="max-w-7xl mx-auto px-4 py-10">
    
    <div className="grid grid-cols-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {
        meals.map((meal, index) => (
          <MealCard key={`${meal.idMeal}-${page}-${index}`} meal={meal} />
        ))}
    </div>

    {hasMore && !loading && !error && (
      <div className="flex justify-center mt-10">
        <Button fn={handlePage} name="Show More" />
      </div>
    )}
    
  </div>
</div>
  )
}

export default App;
