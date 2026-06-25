import { useState, useEffect } from "react";
import { sweetAlert } from "@utils/sweetAlert";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { DEFAULT_PLAN_MONTHS, DEFAULT_SESSIONS_COUNT } from "@constants/pricing";
import { translations } from "@constants/translations";

import { bookingSchema, type BookingFormData } from "@utils/validationSchema";

import CheckoutForm from "@components/form/CheckoutForm";
import OrderSummary from "@components/form/OrderSummary";

const App = () => {
  const [lang, setLang] = useState<"en" | "ar">((sessionStorage.getItem("lang") as "en" | "ar") || "en");

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    sessionStorage.setItem("lang", lang);
  }, [lang]);

  const savedFormLocal = JSON.parse(sessionStorage.getItem("savedForm") || "null");

  const { subscribedMonths, payInAdvance, ...safeSavedData } = savedFormLocal || {};

  const [selectedMonths, setSelectedMonths] = useState<number>(Number(subscribedMonths) || DEFAULT_PLAN_MONTHS);
  const [isPayInAdvance, setIsPayInAdvance] = useState<boolean>(Boolean(payInAdvance) || false);

  // --- React Hook Form Logic
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<BookingFormData>({
    mode: "onBlur",
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      loginPhoneCountry: "+971",
      loginPhone: "",
      contactPhoneCountry: "+971",
      contactPhone: "",
      email: "",
      name: "",
      address: "",
      nr: "",
      postalCode: "",
      city: "",
      sessions: Number(DEFAULT_SESSIONS_COUNT),
      country: "",
      paymentMethod: "visa",
      cardHolder: "",
      cardNumber: "",
      expiryAndCvc: "",
      termsAccepted: false,
      ...safeSavedData,
    },
  });

  const savedForm = watch();

  const sessionsCount = savedForm.sessions || DEFAULT_SESSIONS_COUNT;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { cardHolder, cardNumber, expiryAndCvc, ...safeSavedDataLocal } = savedForm;

  useEffect(() => {
    sessionStorage.setItem(
      "savedForm",
      JSON.stringify({ ...safeSavedDataLocal, subscribedMonths: selectedMonths, payInAdvance: isPayInAdvance }),
    );
  }, [isPayInAdvance, safeSavedDataLocal, savedForm, selectedMonths]);

  const onSubmit = async (data: BookingFormData) => {
    const FormData = {
      ...data,
      subscribedMonths: selectedMonths,
      payInAdvance: isPayInAdvance,
    };

    console.log("Form Submitted Successfully:", FormData);

    sessionStorage.removeItem("savedForm");

    reset({
      loginPhoneCountry: "+971",
      loginPhone: "",
      contactPhoneCountry: "+971",
      contactPhone: "",
      email: "",
      name: "",
      address: "",
      nr: "",
      postalCode: "",
      city: "",
      country: "",
      sessions: DEFAULT_SESSIONS_COUNT,
      paymentMethod: "visa",
      cardHolder: "",
      cardNumber: "",
      expiryAndCvc: "",
      termsAccepted: false,
    });

    setSelectedMonths(DEFAULT_PLAN_MONTHS);
    setIsPayInAdvance(false);

    sweetAlert(lang, "success");
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
            className="cursor-pointer appearance-none border-none bg-transparent px-1 text-center text-[20px]"
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "ar")}
          >
            <option value="en">🇬🇧</option>
            <option value="ar">🇦🇪</option>
          </select>
        </div>
      </header>

      <main className="bg-background flex min-h-screen items-center justify-center py-8">
        <div className="custom-container w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border-border-default mx-auto grid max-w-202.5 grid-cols-1 overflow-hidden rounded-lg border shadow-sm lg:grid-cols-11"
          >
            <CheckoutForm register={register} errors={errors} lang={lang} />

            <OrderSummary
              sessionsCount={sessionsCount}
              register={register}
              errors={errors}
              lang={lang}
              selectedMonths={selectedMonths}
              setSelectedMonths={setSelectedMonths}
              isPayInAdvance={isPayInAdvance}
              setIsPayInAdvance={setIsPayInAdvance}
            />
          </form>
        </div>
      </main>
    </>
  );
};

export default App;
