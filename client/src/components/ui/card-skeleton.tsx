import { Card, CardContent } from "@/components/ui/card";

export function CardSkeleton() {
  return (
    <Card className="hover:shadow-md transition duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <div className="h-24 w-24 rounded-full bg-gray-200 animate-pulse" />
          <div className="mt-4 h-5 bg-gray-200 rounded animate-pulse w-24" />
          <div className="mt-2 h-4 bg-gray-200 rounded animate-pulse w-36" />
        </div>
        <div className="mt-6 flex space-x-3">
          <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse" />
          <div className="flex-1 h-10 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </CardContent>
    </Card>
  );
}

export function CardSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array(8).fill(0).map((_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
