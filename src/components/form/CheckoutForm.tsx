import type { UseFormRegister, FieldErrors } from "react-hook-form";

import { COUNTRIES } from "@constants/countries";
import { MONTHLY_SESSIONS_OPTIONS } from "@constants/pricing";
import { translations, translateError } from "@constants/translations";

import { type BookingFormData } from "@utils/validationSchema";

import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Title from "@components/ui/Title";
import PhoneInput from "@components/form/PhoneInput";
import CardDetailsInput from "@components/form/CardDetailsInput";

import sepaIcon from "../../../public/sepa.svg";
import visaIcon from "../../../public/payment-methods.svg";

// --- ErrorMsg Costum Component

const ErrorMsg = ({ msg, lang }: { msg?: string; lang: "en" | "ar" }) => {
  if (!msg) return null;
  return <span className="text-status-error mt-1.5 block text-[10px] font-medium">{translateError(msg, lang)}</span>;
};

interface CheckoutFormProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
  lang: "en" | "ar";
}

const CheckoutForm = ({ register, errors, lang }: CheckoutFormProps) => {
  const t = translations[lang];

  return (
    <section className="bg-text-inverse relative col-span-1 p-5 lg:col-span-6 lg:px-12 lg:py-8">
      <div className="mb-5 flex flex-col items-center justify-center text-center">
        <h2 className="text-[15px]! font-bold! lg:text-[18px]!">{t.title}</h2>
        <p className="text-[12px] font-extralight lg:text-[13px]">{t.subtitle}</p>
      </div>

      <div className="flex flex-col gap-7">
        {/* --- Phone Inputs --- */}
        <div>
          <Title title={t.loginPhone} note={t.loginPhoneNote} lang={lang} />
          <PhoneInput countryName="loginPhoneCountry" phoneName="loginPhone" register={register} autoFocus />
          <ErrorMsg msg={errors.loginPhone?.message} lang={lang} />
        </div>

        <div>
          <Title title={t.contactPhone} note={t.contactPhoneNote} lang={lang} />
          <PhoneInput countryName="contactPhoneCountry" phoneName="contactPhone" register={register} />
          <ErrorMsg msg={errors.contactPhone?.message} lang={lang} />
        </div>

        {/* --- Basic Inputs --- */}
        <div>
          <Title title={t.email} note={t.emailNote} lang={lang} />
          <Input type="email" {...register("email")} />
          <ErrorMsg msg={errors.email?.message} lang={lang} />
        </div>

        <div>
          <Title title={t.contactName} />
          <Input {...register("name")} />
          <ErrorMsg msg={errors.name?.message} lang={lang} />
        </div>

        <div>
          <Title title={t.billingAddress} />
          <div className="flex flex-col gap-6.5">
            <div className="flex gap-4">
              <div className="w-[80%]">
                <Input placeholder={t.address} {...register("address")} />
                <ErrorMsg msg={errors.address?.message} lang={lang} />
              </div>
              <div className="w-[20%]">
                <Input placeholder={t.nr} {...register("nr")} />
                <ErrorMsg msg={errors.nr?.message} lang={lang} />
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-1/3">
                <Input placeholder={t.postalCode} {...register("postalCode")} />
                <ErrorMsg msg={errors.postalCode?.message} lang={lang} />
              </div>
              <div className="w-1/3">
                <Input placeholder={t.city} {...register("city")} />
                <ErrorMsg msg={errors.city?.message} lang={lang} />
              </div>
              <div className="w-1/3">
                <Select className="border-border-default w-full border" {...register("country")}>
                  <option value="" disabled>
                    {t.country}
                  </option>
                  {COUNTRIES.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Select>
                <ErrorMsg msg={errors.country?.message} lang={lang} />
              </div>
            </div>
          </div>
        </div>

        {/* --- Monthly Sessions --- */}
        <div>
          <Title title={t.monthlySessions} />
          <Select
            className="border-border-default w-full border py-3"
            {...register("sessions", { valueAsNumber: true })}
          >
            {MONTHLY_SESSIONS_OPTIONS.map((session) => (
              <option key={session.value} value={session.value}>
                {lang === "ar" ? `${session.value} حصص` : session.label}
              </option>
            ))}
          </Select>
        </div>

        {/* --- Payment Methods --- */}
        <div className="flex flex-col">
          <Title title={t.paymentMethod} />

          <label
            htmlFor="sepa"
            className="border-border-default flex cursor-pointer items-center gap-2.5 rounded-[3px] rounded-b-none border border-b-0 px-1.5 pt-3 pb-1.5"
          >
            <input type="radio" value="sepa" id="sepa" {...register("paymentMethod")} />
            <img src={sepaIcon} alt="SEPA" className="h-3 w-auto" />
          </label>

          <div className="border-border-default rounded-[3px] rounded-t-none border p-1.5 pb-10">
            <label htmlFor="visa" className="mb-2 flex cursor-pointer items-center gap-1.5">
              <input type="radio" value="visa" id="visa" {...register("paymentMethod")} />
              <img src={visaIcon} alt="Visa/Mastercard" className="h-5.5 w-auto" />
            </label>

            <div className="flex flex-col gap-2">
              <Input placeholder={t.cardHolder} {...register("cardHolder")} />
              <ErrorMsg msg={errors.cardHolder?.message} lang={lang} />

              <CardDetailsInput register={register} errors={errors} lang={lang} />
            </div>
          </div>
        </div>
      </div>

      <span className="text-text-secondary mt-2 block text-[9px] italic lg:absolute lg:bottom-2 lg:mt-0 ltr:lg:left-12 rtl:lg:right-12">
        {t.securePayment}
      </span>
    </section>
  );
};

export default CheckoutForm;
