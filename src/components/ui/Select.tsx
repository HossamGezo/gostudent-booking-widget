import { cn } from "@utils/cn";

interface SelectProps extends React.ComponentProps<"select"> {
  children: React.ReactNode;
}

const Select = ({ children, className, ...props }: SelectProps) => {
  return (
    <select
      className={cn(
        "bg-background-overview text-text-secondary h-[42px] w-1/3 rounded-[3px] border border-transparent px-1.5 text-[10px] outline-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
};

export default Select;
