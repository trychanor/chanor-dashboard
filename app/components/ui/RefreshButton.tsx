import { RotateCw } from "lucide-react";
import { ButtonHTMLAttributes } from "react";
import Button from "./Button";

type RefreshButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label?: string;
  additionalStyles?: string;
};

export default function RefreshButton({
  label = "Refresh",
  additionalStyles = "",
  title,
  ...props
}: RefreshButtonProps) {
  return (
    <Button
      variant="default"
      title={title ?? label}
      additionalStyles={`shrink-0 px-3 py-2 text-sm ${additionalStyles}`}
      {...props}
    >
      <RotateCw size={16} />
      {label}
    </Button>
  );
}
