function Error({ message }) {
  return (
    <div className="w-full flex flex-col justify-center items-center py-10 gap-3">
      <p className="text-red-400 text-lg font-semibold">
        Something went wrong
      </p>
      <p className="text-gray-400 text-sm">
        {message || "Please try again later."}
      </p>
    </div>
  );
}

export default Error;