import { cn } from "@utils/cn";

const Input = ({ className, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      className={cn(
        "bg-background-overview border-border-default focus:border-border-focus placeholder:text-text-secondary text-text-primary h-[42px] w-full rounded-[3px] border px-2.5 text-[10px] outline-hidden transition-colors placeholder:text-[10px]",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
