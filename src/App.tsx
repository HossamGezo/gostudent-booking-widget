// --- Custom Components

import CheckoutForm from "@components/form/CheckoutForm";
import OrderSummary from "@components/form/OrderSummary";

// --- Main Component

const App = () => {
  return (
    <>
      <header className="py-4">
        <div className="custom-container flex items-center justify-end gap-3.5">
          <span className="text-text-primary cursor-pointer text-[10px] font-medium transition-colors select-none">
            All advantages
          </span>

          <div className="bg-border-default h-3.5 w-px"></div>

          <select className="text-text-primary cursor-pointer border-none bg-transparent pr-1 text-[14px] outline-hidden">
            <option value="🇬🇧">🇬🇧</option>
            <option value="🇸🇦">🇸🇦</option>
          </select>
        </div>
      </header>
      <main className="bg-background flex min-h-screen items-center justify-center">
        <div className="custom-container">
          <div className="border-border-default mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-lg border shadow-sm lg:grid-cols-11">
            {/* LEFT COLUMN: Registration & Billing Form */}
            <CheckoutForm />

            {/* RIGHT COLUMN: Order Overview & Package Selector */}
            <OrderSummary />
          </div>
        </div>
      </main>
    </>
  );
};

export default App;
