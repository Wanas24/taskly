import ProjectCardSkeleton from "./ProjectCardSkeleton";

export default function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
}