function JokeCard({ joke }) {
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all duration-300 rounded-2xl p-5 shadow-md hover:shadow-xl hover:scale-[1.02]">
      
      <p className="text-gray-100 text-base leading-relaxed">
        {joke.content}
      </p>
    </div>
  );
}

export default JokeCard;