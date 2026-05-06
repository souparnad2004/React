import { useState } from "react";
import { useEffect } from "react";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";
import ProductCard from "./components/ProductCard.jsx";
import Button from "./components/Button.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 10;
  const url = `https://api.freeapi.app/api/v1/public/randomproducts?page=${page}&limit=${limit}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  async function fetchJokes() {
    setLoading(true);
    try {
      const jokesData = await fetch(url, options);
      const jsonData = await jokesData.json();
      console.log(jsonData.data.data);
      return jsonData.data.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function addtoState() {
      const newProducts = await fetchJokes();
      setProducts((prev) => [...prev, ...newProducts]);
    }
    addtoState();
    //eslint-disable-next-line
  }, [page]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🛒 Product List</h1>
      {loading && <Loading />}
      {error && <Error message = {error.message}/>}
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${page}-${index}`} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => setPage(p => p + 1)} name="Load More Products" />
      </div>
    </div>
  );
}

export default App;
