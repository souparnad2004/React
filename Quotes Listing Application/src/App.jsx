import { useState } from "react";
import { useEffect } from "react";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";
import QuoteCard from "./components/QuoteCard.jsx";
import Button from "./components/Button.jsx";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 10;
  const url = `https://api.freeapi.app/api/v1/public/quotes?page=${page}&limit=${limit}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  async function fetchQuotes() {
    setLoading(true);
    try {
      const quotesData = await fetch(url, options);
      const jsonData = await quotesData.json();
      return jsonData.data.data;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function addtoState() {
      const newQuotes = await fetchQuotes();
      setQuotes((prev) => [...prev, ...newQuotes]);
    }
    addtoState();
    //eslint-disable-next-line
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-10">
      
      <h1 className="text-4xl font-bold text-center mb-10">
        💬 Inspirational Quotes
      </h1>

      {loading && <Loading />}
      {error && <Error message={error} />}

      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} quote={quote} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => setPage((p) => p + 1)} name="Load More" />
      </div>
    </div>
  );
}

export default App;
