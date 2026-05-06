import { useState } from "react";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";


function Auth() {
  const [tab, setTab] = useState("login");

  function renderTab(tab) {
    if (tab === "register") return <Register />;
    else return <Login />;
  }


  return (
    <div className="w-screen min-h-screen bg-gray-950 flex justify-center items-center text-gray-100">
      <div className="bg-gray-900/70 backdrop-blur-lg border border-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md">
  
        <div className="flex justify-center gap-2 mb-6">
          <div className="flex bg-gray-800 p-1 rounded-xl">
            <h2
              onClick={() => setTab("login")}
              className={`px-4 py-1 rounded-lg cursor-pointer transition ${
                tab === "login"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </h2>

            <h2
              onClick={() => setTab("register")}
              className={`px-4 py-1 rounded-lg cursor-pointer transition ${
                tab === "register"
                  ? "bg-blue-500 text-white shadow"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Register
            </h2>
          </div>
        </div>

        <div>{renderTab(tab)}</div>
      </div>
    </div>
  );
}

export default Auth;
