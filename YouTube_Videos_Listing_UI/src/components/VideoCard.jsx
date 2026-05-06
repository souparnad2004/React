function VideoCard({ video }) {
  if(!video) return null;
  const { snippet, statistics, contentDetails, id } = video;
  function formatDuration(duration) {
    const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    const hours = match[1] || "0";
    const minutes = match[2] || "0";
    const seconds = match[3] || "0";

    if (hours !== "0") {
      return `${hours}:${minutes.padStart(2, "0")}:${seconds.padStart(2, "0")}`;
    } else {
      return `${minutes}:${seconds.padStart(2, "0")}`;
    }
  }


  return (
    <a href={`https://www.youtube.com/watch?v=${id}`}>
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 shadow-md hover:shadow-xl flex flex-col">
      <div className="relative">
        <img
          src={snippet.thumbnails.high.url}
          alt={snippet.title}
          className="w-full h-48 object-cover"
        />

        <span className="absolute bottom-2 right-2 bg-black/80 text-xs px-2 py-1 rounded">
          {formatDuration(contentDetails.duration)}
        </span>
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h2 className="font-semibold text-base line-clamp-2">
          {snippet.title}
        </h2>

        <p className="text-sm text-gray-300">{snippet.channelTitle}</p>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>{statistics.viewCount} views</span>
          <span>{statistics.likeCount} likes</span>
        </div>

        {snippet.tags && (
          <div className="flex flex-wrap gap-2 mt-3">
            {snippet.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-indigo-600/20 text-indigo-300 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <p className="text-xs text-gray-200 mt-auto">
          {(new Date(snippet.publishedAt)).toDateString()}
        </p>
      </div>
    </div>
    </a>
  );
}
export default VideoCard;
