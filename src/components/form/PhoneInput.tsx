import { cn } from "@utils/cn";
import { COUNTRIES } from "@constants/countries";

import Select from "@components/ui/Select";

const PhoneInput = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <div className="bg-background-overview border-border-default focus-within:border-border-focus flex h-[42px] items-center rounded-[3px] border transition-colors">
      <Select className="h-full w-auto cursor-pointer border-none bg-transparent px-1.5 py-0 font-semibold">
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
          "placeholder:text-text-secondary text-text-primary h-full w-full bg-transparent px-2 py-0 text-[10px] outline-hidden placeholder:text-[10px]",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export default PhoneInput;
