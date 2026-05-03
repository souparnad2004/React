import { useEffect, useState } from "react";
import Card from "./components/Card.jsx";

function App() {
  const [usersdata, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = "https://api.freeapi.app/api/v1/public/randomusers";

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(url);
        const json = await res.json();
        console.log(json.data.data);
        setUsersData(json.data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);



  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-blue-950 to-gray-900 flex gap-5 flex-wrap p-10">
      {error?<h1 className="text-amber-50">Error</h1>:loading?
        <h1>Loading...</h1>:
        usersdata.map((userdata) => (
          <Card key={userdata.id} user = {userdata}/>
        ))
      }
      </div>
  );
}

export default App;
