import { useState, useEffect } from "react";
import Swal from "sweetalert2";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DEFAULT_SESSIONS_COUNT } from "@constants/pricing";
import { translations } from "@constants/translations";

import { bookingSchema, type BookingFormData } from "@utils/validationSchema";

import CheckoutForm from "@components/form/CheckoutForm";
import OrderSummary from "@components/form/OrderSummary";

const App = () => {
  const [sessionsCount, setSessionsCount] = useState<number>(DEFAULT_SESSIONS_COUNT);
  const [lang, setLang] = useState<"en" | "ar">((localStorage.getItem("lang") as "en" | "ar") || "en");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    localStorage.setItem("lang", lang);
  }, [lang]);

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
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

    Swal.fire({
      title: lang === "ar" ? "تم تسجيل الحجز بنجاح!" : "Booking Registered Successfully!",
      icon: "success",
      iconColor: "#5168ee",
      color: "#4c4c4c",
      background: "#ffffff",
      padding: "3rem",
      timer: 3000,
      showConfirmButton: false,
      timerProgressBar: true,

      willOpen: () => {
        const progressBar = Swal.getTimerProgressBar();
        if (progressBar) {
          progressBar.style.backgroundColor = "#5168ee";
        }
      },
    });

    reset();
  };

  const t = translations[lang];

  return (
    <>
      <header className="py-5">
        <div className="custom-container flex items-center justify-end gap-3.5">
          <span className="text-text-primary cursor-pointer text-[12px] font-medium transition-colors select-none">
            {t.allAdvantages}
          </span>

          <div className="bg-border-default h-3.5 w-px"></div>

          <select
            className="cursor-pointer appearance-none border-none bg-transparent px-1 text-center text-[20px] outline-hidden"
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "ar")}
          >
            <option value="en">🇬🇧</option>
            <option value="ar">🇸🇦</option>
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
              lang={lang}
            />

            <OrderSummary sessionsCount={sessionsCount} register={register} errors={errors} lang={lang} />
          </form>
        </div>
      </main>
    </>
  );
};

export default App;
