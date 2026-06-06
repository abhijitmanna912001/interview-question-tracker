import { FormEvent, useState } from "react";
import { difficulties, ProblemFormInput, statuses } from "../types/problem";

const initialForm: ProblemFormInput = {
  title: "",
  platform: "",
  difficulty: "Easy",
  topic: "",
  status: "Unsolved",
  notes: ""
};

interface ProblemFormProps {
  onSubmit: (input: ProblemFormInput) => Promise<void>;
}

export const ProblemForm = ({ onSubmit }: ProblemFormProps) => {
  const [form, setForm] = useState<ProblemFormInput>(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!form.title.trim() || !form.platform.trim() || !form.topic.trim()) {
      setError("Title, platform, and topic are required.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        platform: form.platform.trim(),
        topic: form.topic.trim(),
        notes: form.notes.trim()
      });
      setForm(initialForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to add the problem.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <p className="eyebrow">Add Problem</p>
        <h2>Track a new question</h2>
      </div>

      <form className="problem-form" onSubmit={handleSubmit}>
        <label>
          Title *
          <input
            value={form.title}
            onChange={(event) => setForm({ ...form, title: event.target.value })}
            placeholder="Two Sum"
          />
        </label>

        <label>
          Platform *
          <input
            value={form.platform}
            onChange={(event) => setForm({ ...form, platform: event.target.value })}
            placeholder="LeetCode"
          />
        </label>

        <label>
          Difficulty *
          <select
            value={form.difficulty}
            onChange={(event) =>
              setForm({ ...form, difficulty: event.target.value as ProblemFormInput["difficulty"] })
            }
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>

        <label>
          Topic *
          <input
            value={form.topic}
            onChange={(event) => setForm({ ...form, topic: event.target.value })}
            placeholder="Arrays"
          />
        </label>

        <label>
          Status *
          <select
            value={form.status}
            onChange={(event) =>
              setForm({ ...form, status: event.target.value as ProblemFormInput["status"] })
            }
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>

        <label className="full-width">
          Notes
          <textarea
            value={form.notes}
            onChange={(event) => setForm({ ...form, notes: event.target.value })}
            placeholder="Approach, mistakes, revision hints..."
            rows={4}
          />
        </label>

        {error && <p className="form-error">{error}</p>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Problem"}
        </button>
      </form>
    </section>
  );
};

