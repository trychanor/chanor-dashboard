import { Eye } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import Button from "./Button";

type ViewButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label?: string;
  additionalStyles?: string;
};

export default function ViewButton({
  label = "View",
  additionalStyles = "",
  title,
  ...props
}: ViewButtonProps) {
  return (
    <Button
      variant="default"
      title={title ?? label}
      additionalStyles={`shrink-0 px-3 py-2 text-sm ${additionalStyles}`}
      {...props}
    >
      <Eye size={16} />
      {label}
    </Button>
  );
}
