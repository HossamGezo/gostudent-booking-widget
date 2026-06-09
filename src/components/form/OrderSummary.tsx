import { useState } from "react";

import { cn } from "@utils/cn";
import { formatCurrency } from "@utils/formatCurrency";

import {
  PLAN_MONTHS,
  DEFAULT_PLAN_MONTHS,
  PRICING_PLANS,
  SETUP_FEE,
  ADVANCED_PAYMENT_DISCOUNT_PCT,
} from "@constants/pricing";

interface OrderSummaryProps {
  sessionsCount: number;
}

const OrderSummary = ({ sessionsCount }: OrderSummaryProps) => {
  // --- State Management ---

  const [selectedMonths, setSelectedMonths] = useState<number>(DEFAULT_PLAN_MONTHS);
  const [isPayInAdvance, setIsPayInAdvance] = useState<boolean>(false);

  // --- Dynamic Pricing Calculations ---

  const currentPlan = PRICING_PLANS[selectedMonths];

  const regularPricePerSession = currentPlan.regularPricePerSession;
  const yourPricePerSession = currentPlan.discountedPricePerSession;

  let totalMonthlyPrice = yourPricePerSession * sessionsCount;
  let totalDiscountValue = (regularPricePerSession - yourPricePerSession) * sessionsCount;
  let discountPercentage = currentPlan.discountPercentage;

  if (isPayInAdvance) {
    const extraDiscountAmount = totalMonthlyPrice * (ADVANCED_PAYMENT_DISCOUNT_PCT / 100);
    totalMonthlyPrice -= extraDiscountAmount;
    totalDiscountValue += extraDiscountAmount;
    discountPercentage += ADVANCED_PAYMENT_DISCOUNT_PCT;
  }

  return (
    <section className="bg-background-overview relative col-span-1 p-5 lg:col-span-5 lg:p-8">
      <h3 className="mb-6 text-[12px] font-bold">ORDER OVERVIEW</h3>
      {/* --- Interactive Durations Grid ---- */}
      <div className="mb-6 grid grid-cols-3">
        {PLAN_MONTHS.map((month) => {
          return (
            <button
              key={month.value}
              type="button"
              onClick={() => setSelectedMonths(month.value)}
              className={cn(
                "text-text-secondary border-border-default hover:border-brand-hover relative col-span-1 -mt-px -ml-px flex cursor-pointer items-center justify-center border bg-white p-3 text-[10px] transition-colors duration-100 hover:z-10 focus:z-10",
                month.value === selectedMonths && "border-brand-primary hover:border-brand-primary z-20",
              )}
            >
              {month.label}
            </button>
          );
        })}
      </div>

      {/* --- Interactive Pay in Advance Toggle --- */}
      <div className="mb-10 ml-2.5 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setIsPayInAdvance((prev) => !prev)}
          className={cn(
            "bg-background border-toggle-inactive relative h-4 w-6.5 cursor-pointer rounded-4xl border transition-colors duration-200",
            isPayInAdvance && "border-brand-primary",
          )}
        >
          <span
            className={cn(
              "bg-toggle-inactive absolute top-1/2 left-0.5 h-3 w-3 -translate-y-1/2 rounded-full transition-all duration-200 ease-in-out",
              isPayInAdvance && "bg-brand-primary translate-x-2",
            )}
          ></span>
        </button>
        <p className="text-[10px] font-bold">Pay in advance - EXTRA 5% DISCOUNT</p>
      </div>

      {/* --- Prices --- */}
      <div className="border-b-text-inverse mb-3.5 flex flex-col gap-3.5 border-b-2 pb-5">
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>NUMBER OF SESSIONS P.M.</span>
          <span className="text-text-primary font-bold">{sessionsCount}</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>REGULAR PRICE</span>
          <span className="text-text-primary font-bold line-through">{formatCurrency(regularPricePerSession)}</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>YOUR PRICE</span>
          <span className="text-text-primary font-bold">{formatCurrency(yourPricePerSession)}</span>
        </div>
        <div className="text-status-success flex items-center justify-between text-[11px]">
          <span className="text-[11px] font-semibold">DISCOUNT -{discountPercentage}%</span>
          <span className="text-[16px] font-bold">-{formatCurrency(totalDiscountValue)}</span>
        </div>
      </div>

      <div className="mb-3.5 flex flex-col gap-3.5">
        <div className="text-text-secondary flex items-center justify-between text-[12px]">
          <span>Setup fee</span>
          <span className="text-brand-gradient-start text-[16px] font-extrabold">{formatCurrency(SETUP_FEE)}</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[12px]">
          <span>TOTAL P.M.</span>
          <span className="text-brand-gradient-start text-[16px] font-extrabold">
            {formatCurrency(totalMonthlyPrice)}
          </span>
        </div>
      </div>

      <div className="mx-auto mb-3.5 flex w-9/10 items-start gap-2">
        <input type="checkbox" className="mt-1" />
        <p className="text-text-secondary text-[12px]">
          I accept the{" "}
          <a href="#" className="text-brand-hover">
            Terms & Conditions
          </a>{" "}
          and understand my{" "}
          <a href="#" className="text-brand-hover">
            right of withdrawal
          </a>{" "}
          as well as the circumstances that lead to a repeal of the same.
        </p>
      </div>

      <button className="border-text-primary/80 from-brand-gradient-start to-brand-gradient-end w-full cursor-pointer rounded-sm border bg-linear-to-r p-3 text-[14px] font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.995]">
        Order Now
      </button>
      <span className="text-text-secondary mt-8 block text-center text-[13px] font-bold lg:absolute lg:right-1/2 lg:bottom-5 lg:mt-0 lg:translate-x-1/2">
        95% SATISFACTION RATE!
      </span>
    </section>
  );
};

export default OrderSummary;
