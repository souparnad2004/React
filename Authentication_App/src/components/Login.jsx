import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({});
  const [apiError, setApiError] = useState(null);

  function set(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function validate(val) {
    const e = {};
    if (!val.email.trim()) e.email = "email is required";
    if (!val.password.trim()) e.password = "password is required";

    return e;
  }

  async function submit(e) {
    e.preventDefault();
    const err = validate(values);
    setError(err);
    if (Object.keys(err).length > 0) return 0;
    const url = "https://api.freeapi.app/api/v1/users/login";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    };

    try {
      setLoading(true);
      const res = await fetch(url, options);
      const jsonRes = await res.json();
      console.log(jsonRes)
      if (!res.ok || !jsonRes.success) {
        setApiError(jsonRes.message);
        return;
      }
      localStorage.setItem("AccessToken", jsonRes.data.accessToken);

      navigate("/profile");
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="max-w-md mx-auto mt-10 p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-semibold text-white text-center">Login</h2>

      <div className="flex flex-col gap-1">
        <input
          type="email"
          value={values.email}
          onChange={set("email")}
          name="email"
          placeholder="Email"
          className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {error.email && <p className="text-red-400 text-sm">{error.email}</p>}
      </div>

      <div className="flex flex-col gap-1">
        <input
          type="password"
          value={values.password}
          onChange={set("password")}
          name="password"
          placeholder="Password"
          className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {error.password && (
          <p className="text-red-400 text-sm">{error.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Logging in...
          </span>
        ) : (
          "Login"
        )}
      </button>
      {apiError && <p className="text-center text-red-500">{apiError}</p>}
    </form>
  );
}

export default Login;
