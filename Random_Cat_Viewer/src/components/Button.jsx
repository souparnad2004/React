


function Button({ name, onClick, loading = false }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 
      ${loading 
        ? "bg-gray-400 cursor-not-allowed" 
        : "bg-blue-600 hover:bg-blue-700 active:scale-95"}
      text-white shadow-md hover:shadow-lg`}
    >
      {loading ? "Loading..." : name}
    </button>
  );
}

export default Button;