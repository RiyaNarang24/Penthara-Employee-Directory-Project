import { Search } from "lucide-react";
function SearchBar({ searchTerm, onSearch }) {
  return (
    <div className="relative">
      {/* Search icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[var(--color-secondary)]">
        <Search className="h-5 w-5" />
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Search by name, role or department..."
        className="w-full rounded-xl border border-[var(--color-border)] bg-white py-3 pl-11 pr-4 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-secondary)] focus:ring-4 focus:ring-blue-100"
      />
    </div>
  );
}

export default SearchBar;