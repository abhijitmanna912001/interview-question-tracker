import { Difficulty, ProblemStatus } from "../types/problem";

interface StatusBadgeProps {
  label: ProblemStatus | Difficulty;
  type: "status" | "difficulty";
}

export const StatusBadge = ({ label, type }: StatusBadgeProps) => {
  const className = `badge badge-${type}-${label.toLowerCase().replaceAll(" ", "-")}`;

  return <span className={className}>{label}</span>;
};

