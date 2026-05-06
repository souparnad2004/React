import { useState } from "react";
import { useEffect } from "react";
import Loading from "./components/Loading.jsx";
import Error from "./components/Error.jsx";
import Button from "./components/Button.jsx";
import VideoCard from "./components/VideoCard.jsx";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const limit = 10;

  async function fetchVideos() {
    const url = `https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=${limit}`;
    const options = { method: "GET", headers: { accept: "application/json" } };

    setLoading(true);
    try {
      const videosData = await fetch(url, options);
      const jsonData = await videosData.json();
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
      const newVideos = await fetchVideos();
      if (newVideos) setVideos((prev) => [...prev, ...newVideos]);
    }
    addtoState();
    //eslint-disable-next-line
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-800 text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">🎬 Video Library</h1>
      {loading && <Loading />}
      {error && <Error message={error}/>}
      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {videos.map((item, index) => (
          <VideoCard key={`${item.items.id}-${page}-${index}`} video={item.items} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Button onClick={() => setPage((p) => p + 1)} name="Load More Videos" />
      </div>
    </div>
  );
}

export default App;
