import { difficulties, ProblemFilters as Filters } from "../types/problem";

interface ProblemFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export const ProblemFilters = ({ filters, onChange }: ProblemFiltersProps) => {
  return (
    <section className="panel filters" aria-label="Problem filters">
      <label>
        Search by title
        <input
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="e.g. Two Sum"
        />
      </label>

      <label>
        Difficulty
        <select
          value={filters.difficulty}
          onChange={(event) =>
            onChange({ ...filters, difficulty: event.target.value as Filters["difficulty"] })
          }
        >
          <option value="">All difficulties</option>
          {difficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>
      </label>

      <label>
        Topic
        <input
          value={filters.topic}
          onChange={(event) => onChange({ ...filters, topic: event.target.value })}
          placeholder="e.g. DP, Graphs"
        />
      </label>
    </section>
  );
};

