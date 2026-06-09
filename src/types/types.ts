export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface PricingPlan {
  months: number;
  regularPricePerSession: number;
  discountedPricePerSession: number;
  discountPercentage: number;
}
