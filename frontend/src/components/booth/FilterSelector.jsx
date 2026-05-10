export default function FilterSelector({ selectedFilter, setSelectedFilter }) {
  const filters = ["Original", "Black & White", "Cool", "Warm", "Retro"];
  return (
    <div className="flex flex-wrap gap-2 md:gap-3">
      {filters.map((filter) => (
        <button key={filter} onClick={() => setSelectedFilter(filter)}
          className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm transition-all ${
            selectedFilter === filter ? "bg-pink-500 text-white" : "bg-pink-100 text-pink-600"
          }`}>
          {filter}
        </button>
      ))}
    </div>
  );
}