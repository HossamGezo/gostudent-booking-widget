import { cn } from "@utils/cn";
import type { BookingFormData } from "@utils/validationSchema";
import { COUNTRIES } from "@constants/countries";
import Select from "@components/ui/Select";
import type { UseFormRegister } from "react-hook-form";

interface PhonInputProps extends React.ComponentProps<"input"> {
  countryName: "loginPhoneCountry" | "contactPhoneCountry";
  phoneName: "loginPhone" | "contactPhone";
  register: UseFormRegister<BookingFormData>;
}

const PhoneInput = ({ countryName, phoneName, register, className, ...props }: PhonInputProps) => {
  return (
    <div className="bg-background-overview border-border-default focus-within:border-border-focus flex h-10.5 items-center rounded-[3px] border transition-colors">
      <Select
        className="h-full w-auto cursor-pointer border-none bg-transparent px-1.5 py-0 font-semibold"
        {...register(countryName)}
      >
        {COUNTRIES.map((country) => (
          <option key={country.code} value={country.dialCode}>
            {country.flag} {country.dialCode}
          </option>
        ))}
      </Select>

      <div className="bg-border-default mx-1 h-4 w-px"></div>

      <input
        type="tel"
        className={cn(
          "placeholder:text-text-primary/60 text-text-primary h-full w-full bg-transparent px-2 py-0 text-[10px] placeholder:text-[10px]",
          className,
        )}
        {...register(phoneName)}
        {...props}
      />
    </div>
  );
};

export default PhoneInput;
