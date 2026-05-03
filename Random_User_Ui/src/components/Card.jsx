function Card({ user }) {
  return (
    <div className="bg-linear-to-b from-blue-950 to-blue-900 w-64 rounded-2xl p-5 text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] flex flex-col gap-4 h-95">

      {/* Image */}
      <div className="flex justify-center">
        <img
          src={user.picture.large}
          alt="user"
          className="w-24 h-24 rounded-full border-4 border-blue-400 object-cover shadow-md"
        />
      </div>

      <div className="text-center">
        <h3 className="text-xl font-semibold tracking-wide">
          {`${user.name.title} ${user.name.first} ${user.name.last}`}
        </h3>
        <p className="text-sm text-blue-200">
          {user.email}
        </p>
        <p className="text-xs text-blue-200">
            phone: {user.phone}
        </p>
      </div>

      {/* Location */}
      <div className="text-center text-sm text-blue-100">
        📍 {`${user.location.city}, ${user.location.country}`}
      </div>

      {/* Stats */}
      <div className="flex justify-evenly text-xs mt-2">
        <div className="bg-blue-800 px-3 py-1 rounded-lg">
          Age: <span className="font-semibold">{user.dob.age}</span>
        </div>

        <div className="bg-blue-800 px-3 py-1 rounded-lg">
          Since: <span className="font-semibold">
            {user.registered.date.slice(0, 4)}
          </span>
        </div>
      </div>

      {/* Button */}
      <button className="bg-blue-500 hover:bg-blue-600 transition-all py-2 rounded-lg font-medium mt-auto cursor-pointer">
        View Profile
      </button>

    </div>
  );
}

export default Card;