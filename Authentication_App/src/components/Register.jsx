import { useState } from "react";

function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    role: "USER",
  });
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [apiError, setApiError] = useState(null);

  function set(field) {
    return (e) => setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  function validate(val) {
    const e = {};
    if (!val.username.trim()) e.username = "username is required";
    if (!val.email.trim()) e.email = "email is required";
    if (!val.password.trim()) e.password = "password is required";

    return e;
  }

  const url = "https://api.freeapi.app/api/v1/users/register";
  const options = {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(values),
  };

  async function submit(e) {
    e.preventDefault();
    const err = validate(values);
    setError(err);
    if (Object.keys(err).length > 0) return;
    try {
      setLoading(true);
      const res = await fetch(url, options);
      const data = await res.json();

      console.log(data);
      if (!data.success) {
        setApiError(data.message);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      alert("Network error");
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
      <h2 className="text-2xl font-semibold text-white text-center">
        Register
      </h2>

      <div className="flex flex-col gap-1">
        <input
          type="text"
          value={values.username}
          onChange={set("username")}
          name="username"
          placeholder="Username"
          className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-blue-400 transition"
        />
        {error.username && (
          <p className="text-red-400 text-sm">{error.username}</p>
        )}
      </div>

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

      <div className="relative">
        <select
          value={values.role}
          onChange={set("role")}
          name="role"
          className="w-full px-4 py-2 pr-10 rounded-lg bg-white/20 text-white outline-none appearance-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="USER" className="text-black">
            USER
          </option>
          <option value="ADMIN" className="text-black">
            ADMIN
          </option>
        </select>

        {/* Custom Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-300">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-2 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition text-white font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Registering...
          </span>
        ) : (
          "Register"
        )}
      </button>
      {submitted && <p className="text-green-400 text-center">Registered Successfully! Go to login</p>}
       {apiError && <p className="text-center text-red-500">{apiError}</p>}
    </form>
  );
}

export default Register;
