import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <section className="container md:flex justify-center items-center gap-4">
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[180px] w-[250px] bg-red-300 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[180px] w-[250px] bg-red-300 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[180px] w-[250px] bg-red-300 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
      <div className="flex flex-col space-y-3 ">
        <Skeleton className="h-[180px] w-[250px] bg-red-300 rounded-xl" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[250px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    </section>
  );
}
