// just pass the "w-" and "h-" or any additional className like "rounded-" etc

export default function Skeleton({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-neutral-200 ${className}`} />;
}
