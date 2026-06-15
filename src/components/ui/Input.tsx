import { cn } from "@utils/cn";

const Input = ({ className, ref, ...props }: React.ComponentProps<"input">) => {
  return (
    <input
      ref={ref}
      className={cn(
        "bg-background-overview border-border-default focus:border-border-focus placeholder:text-text-primary/60 text-text-primary h-10.5 w-full rounded-[3px] border px-2.5 text-[10px] transition-colors placeholder:text-[10px]",
        className,
      )}
      {...props}
    />
  );
};

export default Input;
