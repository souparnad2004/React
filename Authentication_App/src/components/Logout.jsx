import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LogoutButton({ className = "" }) {
  const [loading, setLoading] = useState(false);
  const navigate= useNavigate();

  async function handleLogout() {
    const token = localStorage.getItem("AccessToken");

    try {
      setLoading(true);

      const res = await fetch(
        "https://api.freeapi.app/api/v1/users/logout",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("AccessToken");

      setLoading(false);
      navigate("/");
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition cursor-pointer
      ${
        loading
          ? "bg-red-400 cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600"
      } text-white shadow-md hover:shadow-lg ${className} cursor-pointer`}
    >
      {loading ? (
        <>
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          Logging out...
        </>
      ) : (
        <>
          Logout
        </>
      )}
    </button>
  );
}

export default LogoutButton;