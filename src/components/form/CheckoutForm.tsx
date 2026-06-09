import { COUNTRIES } from "@constants/countries";
import { DEFAULT_SESSIONS_COUNT, MONTHLY_SESSIONS_OPTIONS } from "@constants/pricing";

import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Title from "@components/ui/Title";
import PhoneInput from "@components/form/PhoneInput";
import CardDetailsInput from "@components/form/CardDetailsInput";

const CheckoutForm = () => {
  return (
    <section className="bg-text-inverse relative col-span-1 p-5 lg:col-span-6 lg:p-8">
      <div className="mb-5 flex flex-col items-center justify-center">
        <h2 className="text-[15px] font-bold lg:text-[18px]">Registration & Booking at GoStudent</h2>
        <p className="text-[12px] font-extralight lg:text-[13px]">The leading platform for online tutoring.</p>
      </div>
      <form className="flex flex-col gap-6.5">
        <div>
          <Title title={"LOGIN PHONE NUMBER"} note={"preferably the student's"} />
          <PhoneInput />
        </div>

        <div>
          <Title title={"CONTACT PHONE NUMBER"} note={"preferably the parent's"} />
          <PhoneInput />
        </div>

        <div>
          <Title title={"CONTACT EMAIL ADDRESS"} note={"preferably the parent's"} />
          <Input />
        </div>

        <div>
          <Title title={"CONTACT NAME"} />
          <Input />
        </div>

        <div>
          <Title title={"BILLING ADDRESS"} />
          <div className="flex flex-col gap-6.5">
            <div className="flex gap-4">
              <Input placeholder="Address" className="w-3/4" />
              <Input placeholder="Nr" className="w-1/4" />
            </div>
            <div className="flex gap-4">
              <Input placeholder="Postal code" className="w-1/3" />
              <Input placeholder="City" className="w-1/3" />
              <Select className="border-border-default border">
                <option selected disabled>
                  Country
                </option>
                {COUNTRIES.map((country) => (
                  <option key={country.code} value={country.name}>
                    <span>{country.name}</span>
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        <div>
          <Title title={"MONTHLY SESSIONS"} />
          <Select className="border-border-default w-full border py-3">
            {MONTHLY_SESSIONS_OPTIONS.map((session) => (
              <option key={session.value} value={session.label} selected={session.value == DEFAULT_SESSIONS_COUNT}>
                <span>{session.label}</span>
              </option>
            ))}
          </Select>
        </div>

        <div className="flex flex-col">
          <Title title={"SELECT PAYMENT METHOD"} />
          <label
            htmlFor="sepa"
            className="border-border-default flex cursor-pointer items-center gap-2.5 rounded-[3px] rounded-b-none border border-b-0 px-1.5 pt-3 pb-1.5"
          >
            <input type="radio" name="payment" id="sepa" />
            <img src="./sepa.svg" alt="Payment Methods" className="h-3 w-auto" />
          </label>
          <div className="border-border-default rounded-[3px] rounded-t-none border p-1.5 pb-10">
            <label htmlFor="visa" className="mb-2 flex cursor-pointer items-center gap-1.5">
              <input type="radio" name="payment" id="visa" defaultChecked />
              <img src="./payment-methods.svg" alt="Payment Methods" className="h-5.5 w-auto" />
            </label>
            <div className="flex flex-col gap-2">
              <Input placeholder="Card holder" />
              <CardDetailsInput />
            </div>
          </div>
        </div>
      </form>
      <span className="text-text-secondary mt-2 block text-[9px] italic lg:absolute lg:bottom-2 lg:mt-0 lg:text-left">
        100% secure payment. All data is encrypted.
      </span>
    </section>
  );
};

export default CheckoutForm;
