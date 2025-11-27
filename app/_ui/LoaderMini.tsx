type LoaderProps = {
  size?: number;
  color?: string;
  thickness?: number;
};

export default function LoaderMini({
  size = 48,
  color = "#ef5a22",
  thickness = 3,
}: LoaderProps) {
  return (
    <span
      className="inline-block rounded-full animate-spin box-border"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderWidth: `${thickness}px`,
        borderStyle: "solid",
        borderColor: `${color} transparent transparent transparent`,
      }}
    />
  );
}
