import { cn } from "@utils/cn";

interface TitleProps extends React.ComponentProps<"h3"> {
  title: string;
  note?: string;
  lang?: "en" | "ar";
}

const Title = ({ title, note, lang = "en", className, ...props }: TitleProps) => {
  const preferablyText = lang === "ar" ? "يفضل" : "preferably";

  return (
    <h3 className={cn("text-text-secondary mb-1.5 text-[10px] font-semibold", className)} {...props}>
      {title}{" "}
      {note && (
        <span className="text-text-primary font-normal">
          ({preferablyText} <span className="font-semibold underline">{note}</span>)
        </span>
      )}
    </h3>
  );
};

export default Title;
