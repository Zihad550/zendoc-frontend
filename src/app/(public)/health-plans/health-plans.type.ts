export type THealthPlanType =
  | "Basic"
  | "Standard"
  | "Premium"
  | "Family"
  | "Senior"
  | "Team";

export interface IHealthPlan {
  key: number;
  id: string;
  name: `${THealthPlanType} ${"Care" | "Basic" | "Plus" | "Premium"}`;
  price: number;
  period: string;
  description: string;
  coverage: string;
  benefits: string[];
  popular: boolean;
  color: "default" | "primary" | "secondary";
}

export interface IHealthPlanCategory {
  id: "individual" | "family" | "senior" | "corporate";
  label: string;
}

export type THealthFeatures =
  | "Coverage"
  | "Regular Check-ups"
  | "Emergency Care"
  | "Prescription Coverage"
  | "Specialist Consultations"
  | "Preventive Screenings"
  | "Mental Health Support"
  | "Wellness Programs"
  | "Dental Coverage"
  | "Vision Coverage";
