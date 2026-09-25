import CircleCheck from "@/assets/icons/circle-check.svg";
import CircleEmpty from "@/assets/icons/circle-empty.svg";

import { getPasswordRequirements } from "../schemas/signup.schema";

type PasswordRequirementsProps = {
  password: string;
};

function PasswordRequirements({
  password,
}: PasswordRequirementsProps) {
  const requirements = getPasswordRequirements(password);

  const items = [
    {
      valid: requirements.minLength,
      text: "At least 8 characters",
    },
    {
      valid: requirements.hasLetterAndDigit,
      text: "One uppercase, lowercase, and digit",
    },
    {
      valid: requirements.special,
      text: "One special character",
    },
  ];

  return (
    <div className="mb-6 flex flex-col gap-[7.5px] rounded-lg bg-surface-highest p-4">
      <ul id="password-requirements" aria-live="polite">
        {items.map((item) => (
          <li key={item.text} className="flex gap-2">
            {item.valid ? <CircleCheck /> : <CircleEmpty />}
            <p className="text-[11px] text-[#434654]">
              {item.text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordRequirements;