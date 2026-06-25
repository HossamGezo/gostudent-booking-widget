import { cn } from "@utils/cn";

interface SelectProps extends React.ComponentProps<"select"> {
  children: React.ReactNode;
}

const Select = ({ children, className, ref, ...props }: SelectProps) => {
  return (
    <select
      ref={ref}
      className={cn(
        "bg-background-overview text-text-primary/60 h-10.5 w-1/3 rounded-[3px] border border-transparent px-1.5 text-[10px]",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
