import { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DEFAULT_SESSIONS_COUNT } from "@constants/pricing";

import { bookingSchema, type BookingFormData } from "@utils/validationSchema";

import CheckoutForm from "@components/form/CheckoutForm";
import OrderSummary from "@components/form/OrderSummary";

// --- Main Component

const App = () => {
  const [sessionsCount, setSessionsCount] = useState<number>(DEFAULT_SESSIONS_COUNT);

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    mode: "onBlur",
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      loginPhone: "",
      contactPhone: "",
      email: "",
      name: "",
      address: "",
      nr: "",
      postalCode: "",
      city: "",
      country: "",
      paymentMethod: "visa",
      cardHolder: "",
      cardNumber: "",
      expiryAndCvc: "",
      termsAccepted: false,
    },
  });

  const onSubmit = (data: BookingFormData) => {
    console.log("Form Submitted Successfully:", data);
    // TODO --- API Call
    alert("Form submitted! Check console for data.");
  };

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

      <main className="bg-background flex min-h-screen items-center justify-center py-8">
        <div className="custom-container w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-border-default mx-auto grid max-w-4xl grid-cols-1 overflow-hidden rounded-lg border shadow-sm lg:grid-cols-11"
          >
            <CheckoutForm
              sessionsCount={sessionsCount}
              setSessionsCount={setSessionsCount}
              register={register}
              errors={errors}
            />

            <OrderSummary sessionsCount={sessionsCount} register={register} errors={errors} />
          </form>
        </div>
      </main>
    </>
  );
};

export default App;
