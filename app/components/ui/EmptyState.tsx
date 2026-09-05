type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  className = "",
}: EmptyStateProps) {
  return (
    <div
      className={`flex min-h-32 flex-col items-center justify-center px-4 text-center ${className}`}
      role="status"
    >
      <p className="text-sm font-medium text-neutral-700">{title}</p>
      {description && (
        <p className="mt-1 text-xs text-neutral-500">{description}</p>
      )}
    </div>
  );
}
