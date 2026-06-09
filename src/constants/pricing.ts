import { type PricingPlan } from "@/types/types";

export const PRICING_PLANS: Record<number, PricingPlan> = {
  6: {
    months: 6,
    regularPricePerSession: 29.6,
    discountedPricePerSession: 28.4,
    discountPercentage: 4,
  },
  9: {
    months: 9,
    regularPricePerSession: 29.6,
    discountedPricePerSession: 27.2,
    discountPercentage: 8,
  },
  12: {
    months: 12,
    regularPricePerSession: 29.6,
    discountedPricePerSession: 26.0,
    discountPercentage: 12,
  },
  18: {
    months: 18,
    regularPricePerSession: 29.6,
    discountedPricePerSession: 24.8,
    discountPercentage: 16,
  },
  24: {
    months: 24,
    regularPricePerSession: 29.6,
    discountedPricePerSession: 23.6,
    discountPercentage: 20,
  },
  36: {
    months: 36,
    regularPricePerSession: 29.6,
    discountedPricePerSession: 22.2,
    discountPercentage: 25,
  },
};

export const PLAN_MONTHS = [
  { value: 6, label: "6 MONTHS" },
  { value: 9, label: "9 MONTHS" },
  { value: 12, label: "12 MONTHS" },
  { value: 18, label: "18 MONTHS" },
  { value: 24, label: "24 MONTHS" },
  { value: 36, label: "36 MONTHS" },
];

export const MONTHLY_SESSIONS_OPTIONS = [
  { value: 4, label: "4 Sessions" },
  { value: 8, label: "8 Sessions" },
  { value: 12, label: "12 Sessions" },
  { value: 16, label: "16 Sessions" },
];

export const DEFAULT_PLAN_MONTHS = 6;
export const DEFAULT_SESSIONS_COUNT = 8;

export const SETUP_FEE = 0.0;
export const ADVANCED_PAYMENT_DISCOUNT_PCT = 5;
