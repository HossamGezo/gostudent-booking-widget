import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { type BookingFormData } from "@utils/validationSchema";

interface CardDetailsInputProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

const CardDetailsInput = ({ register, errors }: CardDetailsInputProps) => {
  return (
    <div className="flex flex-col">
      <div className="bg-background-overview border-border-default focus-within:border-border-focus flex h-10.5 items-center rounded-[3px] border transition-colors">
        {/* Left Side: SVG Icon */}
        <div className="flex h-full items-center justify-center pr-1 pl-1.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="50 120 300 190"
            className="h-3.5 w-auto opacity-70 select-none"
          >
            <g id="Credit-Card">
              <rect x="50" y="120" width="300" height="190" rx="18" fill="#d2d7df" />
              <rect x="80" y="155" width="50" height="40" rx="6" fill="#ffffff" />
              <g fill="#9aa2b1">
                <rect x="80" y="235" width="45" height="10" rx="3" />
                <rect x="140" y="235" width="45" height="10" rx="3" />
                <rect x="200" y="235" width="45" height="10" rx="3" />
                <rect x="260" y="235" width="45" height="10" rx="3" />
              </g>
            </g>
          </svg>
        </div>

        {/* Card Number Input Field */}
        <input
          type="text"
          placeholder="Card number"
          className="placeholder:text-text-secondary text-text-primary h-full w-3/5 bg-transparent text-[10px] outline-hidden placeholder:text-[10px]"
          {...register("cardNumber")}
        />

        {/* Expiry Date & CVC Field */}
        <input
          type="text"
          placeholder="MM / YY CVC"
          className="placeholder:text-text-secondary text-text-primary h-full w-2/5 bg-transparent pr-1 text-right text-[10px] outline-hidden placeholder:text-right placeholder:text-[10px]"
          {...register("expiryAndCvc")}
        />
      </div>

      {/* Errors */}
      {errors.cardNumber?.message && (
        <span className="text-status-error mt-1 block text-[10px] font-medium">{errors.cardNumber.message}</span>
      )}
      {errors.expiryAndCvc?.message && (
        <span className="text-status-error mt-1 block text-[10px] font-medium">{errors.expiryAndCvc.message}</span>
      )}
    </div>
  );
};

export default CardDetailsInput;
