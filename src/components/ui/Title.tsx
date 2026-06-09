import { cn } from "@utils/cn";

interface TitleProps extends React.ComponentProps<"h3"> {
  title: string;
  note?: string;
}

const Title = ({ title, note, className, ...props }: TitleProps) => {
  return (
    <h3 className={cn("text-text-secondary mb-1.5 text-[10px] font-semibold", className)} {...props}>
      {title}{" "}
      {note && (
        <span className="text-text-primary">
          (preferably <span className="font-semibold underline">{note})</span>
        </span>
      )}
    </h3>
  );
};

export default Title;
