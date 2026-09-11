type AlertProps = {
  message: string;
};

export default function Alert({ message }: AlertProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="rounded-lg mb-6 border border-error/20 bg-error/5 px-4 py-3 text-sm text-error"
    >
      {message}
    </div>
  );
}