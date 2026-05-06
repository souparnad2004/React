import { useEffect, useState } from "react"
import Button from "./components/Button.jsx";
import CatDetails from "./components/CatDetails";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";

function App() {
  const [cat, setCat] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  async function fetchRandomCat() {
    setLoading(true);
    const url = "https://api.freeapi.app/api/v1/public/cats/cat/random"
    const options = {method: 'GET', headers: {accept: 'application/json'}};
    try {
      const catData = await fetch(url, options);
      const jsonData = await catData.json();
      console.log(jsonData.data)
      setCat(jsonData.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }



  useEffect(() => {
    // eslint-disable-next-line
    fetchRandomCat();
  }, [])

  return (
    <div className="bg-gray-900 p-10">
      {loading && <Loading/>}
      {error && <Error message={error}/>}
      {!loading && !error && <CatDetails cat={cat}/>}
      <Button name="Get a Random Cat" onClick={fetchRandomCat}/>
    </div>
  )
}

export default App
