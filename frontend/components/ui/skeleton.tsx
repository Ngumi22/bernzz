import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("container animate-pulse rounded-sm bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
