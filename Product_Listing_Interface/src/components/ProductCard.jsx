function ProductCard({ product }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex flex-col">

      <div className="h-48 bg-zinc-800 overflow-hidden">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col gap-3 flex-1">

        {/* Title */}
        <h2 className="text-lg font-semibold line-clamp-1">
          {product.title}
        </h2>


        <div className="flex gap-2 text-xs">
          <span className="bg-blue-600/20 text-blue-300 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          <span className="bg-purple-600/20 text-purple-300 px-2 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <p className="text-sm text-gray-400 line-clamp-2">
          {product.description}
        </p>


        <div className="flex justify-between items-center mt-auto">
          <div>
            <p className="text-green-400 font-bold text-lg">
              ${product.price}
            </p>
            <p className="text-xs text-gray-500">
              -{product.discountPercentage}% off
            </p>
          </div>

          <div className="text-yellow-400 text-sm">
            ⭐ {product.rating}
          </div>
        </div>

        <p className="text-xs text-gray-500">
          {product.stock > 50 ? "🟢 In Stock" : "🟡 Limited Stock"}
        </p>

      </div>
    </div>
  );
}

export default ProductCard;