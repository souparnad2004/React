function QuoteCard({ quote }) {
  return (
    <div className="bg-gray-900 border border-gray-800 hover:border-gray-600 transition-all duration-300 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] flex flex-col gap-4">

      <p className="text-gray-100 text-lg leading-relaxed">
        “{quote.content}”
      </p>

      <div className="mt-auto flex justify-between items-center text-sm text-gray-400">
        <span>— {quote.author}</span>
        <span className="text-xs bg-gray-800 px-2 py-1 rounded-md">
          #{quote.id}
        </span>
      </div>

      {quote.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {quote.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuoteCard;