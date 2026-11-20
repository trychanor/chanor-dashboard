import { FaEye } from "react-icons/fa6";
import { ButtonHTMLAttributes, ReactNode } from "react";
import Button from "./Button";

type ViewButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> & {
  label?: string;
  icon?: ReactNode;
  iconPosition?: "before" | "after";
  additionalStyles?: string;
};

export default function ViewButton({
  label,
  icon = <FaEye size={16} />,
  iconPosition = "before",
  additionalStyles = "",
  title,
  ...props
}: ViewButtonProps) {
  const buttonLabel = label ?? title ?? "View";

  return (
    <Button
      variant="default"
      title={title ?? buttonLabel}
      additionalStyles={`shrink-0 px-3 py-2 text-sm ${additionalStyles}`}
      {...props}
    >
      {iconPosition === "before" && icon}
      {buttonLabel}
      {iconPosition === "after" && icon}
    </Button>
  );
}
