
export default function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="animate-pulse rounded-lg bg-white p-6">
          <div className="flex min-h-48 flex-col">
            <div className="mb-3 h-6 w-3/4 rounded bg-surface-low" />

            <div className="space-y-2">
              <div className="h-4 w-full rounded bg-surface-low" />
              <div className="h-4 w-5/6 rounded bg-surface-low" />
              <div className="h-4 w-2/3 rounded bg-surface-low" />
            </div>

            <div className="mt-auto pt-6">
              <div className="mb-2 h-3 w-16 rounded bg-surface-low" />
              <div className="h-4 w-24 rounded bg-surface-low" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
