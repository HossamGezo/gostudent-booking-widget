import { cn } from "@utils/cn";
import { PLAN_MONTHS } from "@constants/pricing";

const OrderSummary = () => {
  return (
    <section className="bg-background-overview relative col-span-1 p-5 lg:col-span-5 lg:p-8">
      <h3 className="mb-6 text-[12px] font-bold">ORDER OVERVIEW</h3>
      <div className="mb-3.5 grid grid-cols-3">
        {PLAN_MONTHS.map((month) => (
          <button
            key={month.value}
            className={cn(
              "text-text-secondary border-border-default hover:border-brand-hover relative col-span-1 -mt-px -ml-px flex cursor-pointer items-center border bg-white p-3 text-[10px] transition-colors duration-100 hover:z-10 focus:z-10",

              month.value === 6 && "border-brand-primary hover:border-brand-primary relative z-20",
            )}
          >
            {month.label}
          </button>
        ))}
      </div>
      <div className="mb-10 flex items-center gap-2">
        <button className="bg-background border-toggle-inactive relative h-4 w-7 cursor-pointer rounded-4xl border">
          <span className="bg-toggle-inactive absolute top-1/2 left-0.5 h-3 w-3 -translate-y-1/2 rounded-full"></span>
        </button>
        <p className="text-[11px] font-bold">Pay in advance - EXTRA 5% DISCOUNT</p>
      </div>
      <div className="border-b-text-inverse mb-3.5 flex flex-col gap-3.5 border-b-2 pb-5">
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>NUMBER OF SESSIONS P.M.</span>
          <span className="text-text-primary font-bold">8</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>REGULAR PRICE</span>
          <span className="text-text-primary font-bold line-through">29.60€</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[11px]">
          <span>YOUR PRICE</span>
          <span className="text-text-primary font-bold">28.40€</span>
        </div>
        <div className="text-status-success flex items-center justify-between text-[11px]">
          <span className="text-[11px] font-semibold">DISCOUNT -4 %</span>
          <span className="text-[16px] font-bold">-9.60€</span>
        </div>
      </div>

      <div className="mb-3.5 flex flex-col gap-3.5">
        <div className="text-text-secondary flex items-center justify-between text-[12px]">
          <span>Setup fee</span>
          <span className="text-brand-gradient-start text-[16px] font-extrabold">0.00 €</span>
        </div>
        <div className="text-text-secondary flex items-center justify-between text-[12px]">
          <span>TOTAL P.M.</span>
          <span className="text-brand-gradient-start text-[16px] font-extrabold">227.20€</span>
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
