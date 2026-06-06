import { useCallback, useEffect, useState } from "react";
import {
  createProblem,
  deleteProblem,
  fetchProblems,
  updateProblemStatus
} from "./api/problemsApi";
import { ProblemFilters } from "./components/ProblemFilters";
import { ProblemForm } from "./components/ProblemForm";
import { ProblemList } from "./components/ProblemList";
import { Problem, ProblemFilters as Filters, ProblemFormInput, ProblemStatus } from "./types/problem";

const initialFilters: Filters = {
  search: "",
  difficulty: "",
  topic: ""
};

function App() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [totalSolved, setTotalSolved] = useState(0);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProblems = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const data = await fetchProblems(filters);
      setProblems(data.problems);
      setTotalSolved(data.totalSolved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load problems.");
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    void loadProblems();
  }, [loadProblems]);

  const handleCreate = async (input: ProblemFormInput) => {
    await createProblem(input);
    await loadProblems();
  };

  const handleStatusChange = async (id: number, status: ProblemStatus) => {
    try {
      await updateProblemStatus(id, status);
      await loadProblems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update status.");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteProblem(id);
      await loadProblems();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete problem.");
    }
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">DSA Prep Dashboard</p>
          <h1>Interview Question Tracker</h1>
          <p className="hero-copy">
            Keep solved questions, revision items, and unsolved practice targets in one clean view.
          </p>
        </div>
        <div className="solved-card">
          <span>Total Solved</span>
          <strong>{totalSolved}</strong>
        </div>
      </header>

      <ProblemForm onSubmit={handleCreate} />

      <section className="section-heading list-heading">
        <p className="eyebrow">Problem Bank</p>
        <h2>Review and revise</h2>
      </section>

      <ProblemFilters filters={filters} onChange={setFilters} />

      {error && <div className="app-error">{error}</div>}

      <ProblemList
        problems={problems}
        isLoading={isLoading}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default App;

