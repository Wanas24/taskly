import Button from "@/components/ui/Button";

type ProjectErrorStateProps = {
  message: string;
  onRetry?: () => void;
};

export default function ProjectErrorState({
  message,
  onRetry,
}: ProjectErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center  px-6 py-16 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <span className="text-2xl text-error">!</span>
      </div>

      <h2 className="text-2xl font-semibold text-slate-dark">
        Something went wrong
      </h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-medium">
        {message}
      </p>

      {onRetry && (
        <Button
          type="button"
          onClick={onRetry}
          className="mt-6"
        >
          Try Again
        </Button>
      )}
    </div>
  );
}