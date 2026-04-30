// components/FilterSelector.jsx
export default function FilterSelector({ selectedFilter, setSelectedFilter }) {
  const filters = ["Original", "Black & White", "Cool", "Warm", "Retro"];

  return (
    <div className="flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-2 rounded-full ${
            selectedFilter === filter
              ? "bg-pink-500 text-white"
              : "bg-pink-100 text-pink-600"
          }`}
          onClick={() => setSelectedFilter(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
