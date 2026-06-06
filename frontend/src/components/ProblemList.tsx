import { Problem, ProblemStatus, statuses } from "../types/problem";
import { StatusBadge } from "./StatusBadge";

interface ProblemListProps {
  problems: Problem[];
  isLoading: boolean;
  onStatusChange: (id: number, status: ProblemStatus) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const ProblemList = ({ problems, isLoading, onStatusChange, onDelete }: ProblemListProps) => {
  if (isLoading) {
    return <div className="panel empty-state">Loading problems...</div>;
  }

  if (problems.length === 0) {
    return (
      <div className="panel empty-state">
        <h3>No problems found</h3>
        <p>Add your first question or adjust the filters.</p>
      </div>
    );
  }

  return (
    <section className="panel problem-list">
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Problem</th>
              <th>Platform</th>
              <th>Difficulty</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Added</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr key={problem.id}>
                <td data-label="Problem">
                  <strong>{problem.title}</strong>
                </td>
                <td data-label="Platform">{problem.platform}</td>
                <td data-label="Difficulty">
                  <StatusBadge label={problem.difficulty} type="difficulty" />
                </td>
                <td data-label="Topic">{problem.topic}</td>
                <td data-label="Status">
                  <div className="status-control">
                    <StatusBadge label={problem.status} type="status" />
                    <select
                      value={problem.status}
                      onChange={(event) =>
                        onStatusChange(problem.id, event.target.value as ProblemStatus)
                      }
                    >
                      {statuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
                <td data-label="Notes" className="notes-cell">
                  {problem.notes || "-"}
                </td>
                <td data-label="Added">{new Date(problem.created_at).toLocaleDateString()}</td>
                <td className="actions-cell">
                  <button className="danger-button" onClick={() => onDelete(problem.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

