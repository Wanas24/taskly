"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-slate-900">
              Something went wrong
            </h1>

            <p className="mt-2 text-sm text-slate-600">
              An unexpected error occurred. Please try again.
            </p>

            <button
              type="button"
              onClick={() => reset()}
              className="cursor-pointer mt-6 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}