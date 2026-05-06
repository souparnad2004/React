export default function MealCard({ meal }) {
  const tags = meal.strTags?.split(",").map(tag => tag.trim());

  return (
    <div className="group relative bg-white/5 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full border border-white/10 hover:border-white/20">
      
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-white/10 via-transparent to-white/10 blur-lg"></div>
      </div>
      
      <div className="relative overflow-hidden">
        <img
          className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          src={meal.strMealThumb}
          alt={meal.strMeal}
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>

        <div className="absolute top-3 left-3">
          <div className="bg-white/10 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-medium text-white">
            ⭐ 4.5
          </div>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3 relative z-10 flex-1">
        <h2 className="text-center font-semibold text-lg text-white line-clamp-2 min-h-14">
          {meal.strMeal}
        </h2>

        <div className="flex justify-center gap-2 flex-wrap">
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
            🍳 {meal.strCategory}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-white flex items-center gap-1">
            📍 {meal.strArea}
          </span>
        </div>

        {tags && (
          <div className="flex gap-2 overflow-hidden whitespace-nowrap justify-center">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="bg-white/10 text-white/80 text-xs px-2 py-1 rounded-full shrink-0"
              >
                #{tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs text-white/60">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}

        <button className="mt-auto bg-white/10 w-full text-white py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/20 active:scale-95">
          <span className="flex items-center justify-center gap-2">
            View Details
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </button>
      </div>
    </div>
  );
}