export interface Plan {
  id: number;
  name: string;
  price: number;
}

export interface PlanItemProps {
  plan: Plan;
  selectedPlan: number | null;
  onSelectPlan: (id: number) => void;
}
