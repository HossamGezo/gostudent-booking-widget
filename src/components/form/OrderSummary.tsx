import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { type BookingFormData } from "@utils/validationSchema";

import { cn } from "@utils/cn";
import { formatCurrency, formatNumber } from "@utils/formatCurrency";
import { translations, translateError } from "@constants/translations";

import { PLAN_MONTHS, PRICING_PLANS, SETUP_FEE, ADVANCED_PAYMENT_DISCOUNT_PCT } from "@constants/pricing";

interface OrderSummaryProps {
  sessionsCount: number;
  selectedMonths: number;
  setSelectedMonths: React.Dispatch<React.SetStateAction<number>>;
  isPayInAdvance: boolean;
  setIsPayInAdvance: React.Dispatch<React.SetStateAction<boolean>>;
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  lang: "en" | "ar";
}

const OrderSummary = ({
  sessionsCount,
  selectedMonths,
  setSelectedMonths,
  isPayInAdvance,
  setIsPayInAdvance,
  register,
  errors,
  lang,
}: OrderSummaryProps) => {
  const t = translations[lang];

  const currencyCode = lang === "ar" ? "SAR" : "EUR";
  const currencyLocale = lang === "ar" ? "ar-SA" : "de-DE";
  // const currencyLocale = lang === "ar" ? "ar-AE-u-nu-arab" : "de-DE";
  // const currencyLocale = lang === "ar" ? "ar-AE" : "en-IE";
  const conversionRate = lang === "ar" ? 4 : 1;

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
      <h3 className="mb-6 text-[10px]! font-bold!">{t.orderOverview}</h3>

      {/* --- Interactive Durations Grid ---- */}
      <div className="mb-6 grid grid-cols-3">
        {PLAN_MONTHS.map((month) => {
          return (
            <button
              key={month.value}
              type="button"
              onClick={() => setSelectedMonths(month.value)}
              className={cn(
                "text-text-secondary border-border-default hover:border-brand-hover relative col-span-1 -mt-px -ml-px flex cursor-pointer items-center border bg-white p-3 text-[10px] transition-colors duration-100 hover:z-10 focus:z-10",
                month.value === selectedMonths && "border-brand-primary hover:border-brand-primary z-20",
              )}
            >
              {lang === "ar" ? `${formatNumber(month.value, currencyLocale)} أشهر` : month.label}
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
        <p className="text-[10px] font-bold">{t.payInAdvance}</p>
      </div>

      {/* --- Prices --- */}
      <div className="border-b-text-inverse mb-3.5 flex flex-col gap-3.5 border-b-2 pb-5">
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>{t.numSessions}</span>
          <span className="text-text-primary font-bold">{sessionsCount}</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>{t.regularPrice}</span>
          <span className="text-text-primary font-bold line-through" dir="ltr">
            {formatCurrency(regularPricePerSession * conversionRate, currencyCode, currencyLocale)}
          </span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>{t.yourPrice}</span>
          <span className="text-text-primary font-bold" dir="ltr">
            {formatCurrency(yourPricePerSession * conversionRate, currencyCode, currencyLocale)}
          </span>
        </div>
        <div className="text-status-success flex items-center justify-between text-[11px]">
          <span className="text-[11px] font-semibold">
            {t.discount} <span dir="ltr">-{discountPercentage}%</span>
          </span>
          <span className="text-[16px] font-bold" dir="ltr">
            -{formatCurrency(totalDiscountValue * conversionRate, currencyCode, currencyLocale)}
          </span>
        </div>
      </div>

      <div className="mb-3.5 flex flex-col gap-3.5">
        <div className="text-text-secondary flex items-center justify-between text-[12px]">
          <span>{t.setupFee}</span>
          <span className="text-brand-gradient-start text-[16px] font-extrabold" dir="ltr">
            {formatCurrency(SETUP_FEE * conversionRate, currencyCode, currencyLocale)}
          </span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[12px]">
          <span>{t.totalPm}</span>
          <span className="text-brand-gradient-start text-[16px] font-extrabold" dir="ltr">
            {formatCurrency(totalMonthlyPrice * conversionRate, currencyCode, currencyLocale)}
          </span>
        </div>
      </div>

      {/* --- Terms and Conditions --- */}
      <div className="mx-auto mb-3.5 flex w-full flex-col gap-1 px-2">
        <div className="flex items-start gap-2.5">
          <input type="checkbox" className="mt-1! shrink-0 cursor-pointer" {...register("termsAccepted")} />
          <p className="text-text-secondary text-[11px] leading-relaxed lg:text-[12px]">
            {t.termsText1}
            <a href="#" className="text-brand-hover! hover:text-brand-primary! transition-colors">
              {t.termsLink}
            </a>{" "}
            {t.termsText2}
            <a href="#" className="text-brand-hover! hover:text-brand-primary! transition-colors">
              {t.termsLink2}
            </a>{" "}
            {t.termsText3}
          </p>
        </div>
        {errors.termsAccepted?.message && (
          <span className="text-status-error ml-6 block text-[10px] font-medium lg:text-[11px]">
            {translateError(errors.termsAccepted.message, lang)}
          </span>
        )}
      </div>

      <button
        type="submit"
        className="border-text-primary/80 from-brand-gradient-start to-brand-gradient-end w-full cursor-pointer rounded-sm border bg-linear-to-r p-3 text-[14px] font-bold text-white shadow-lg transition-all hover:opacity-95 active:scale-[0.995]"
      >
        {t.orderNow}
      </button>

      <span className="text-text-secondary mt-8 block text-center text-[13px] font-bold lg:absolute lg:right-1/2 lg:bottom-5 lg:mt-0 lg:translate-x-1/2">
        {t.satisfaction}
      </span>
    </section>
  );
};

export default OrderSummary;
