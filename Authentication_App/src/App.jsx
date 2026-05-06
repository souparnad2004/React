import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile.jsx";
import Auth from "./pages/Auth.jsx";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("AccessToken");
  return token ? children : <Auth />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
