export default function FilterSelector({ selectedFilter, setSelectedFilter }) {
  const filters = ["Original", "Black & White", "Cool", "Warm", "Retro"];
  return (
    /* Mobile: horizontal scroll. Desktop: flex-wrap (original) */
    <div className="flex gap-2 md:gap-3 overflow-x-auto md:flex-wrap pb-1 md:pb-0"
      style={{ scrollbarWidth:"none", msOverflowStyle:"none" }}>
      {filters.map((filter) => (
        <button key={filter} onClick={() => setSelectedFilter(filter)}
          className="flex-shrink-0 md:flex-shrink px-3 md:px-4 py-1.5 md:py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
          style={selectedFilter === filter ? {
            background: "linear-gradient(135deg,#ec4899,#f43f5e)",
            color: "white",
            boxShadow: "0 3px 10px rgba(236,72,153,0.35)",
          } : {
            background: "rgba(252,231,243,0.8)",
            color: "#be185d",
          }}>
          {filter}
        </button>
      ))}
    </div>
  );
}