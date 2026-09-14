import circleCheck from "@/assets/icons/circle-check.svg";
import circleEmpty from "@/assets/icons/circle-empty.svg";
import Image from "next/image";

type PasswordRequirementsProps = {
  minLength: boolean;
  hasLetterAndDigit: boolean;
  special: boolean;
};

function PasswordRequirements({
  minLength,
  hasLetterAndDigit,
  special,
}: PasswordRequirementsProps) {
  const requirements = [
    {
      valid: minLength,
      text: "At least 8 characters",
    },
    {
      valid: hasLetterAndDigit,
      text: "One uppercase, lowercase, and digit",
    },
    {
      valid: special,
      text: "One special character",
    },
  ];

  return (
    <div className="mb-6 flex flex-col gap-[7.5px] rounded-lg bg-surface-highest p-4">
      <ul id="password-requirements" aria-live="polite">
        {requirements.map((requirement) => (
          <li key={requirement.text} className="flex gap-2">
            <Image src={requirement.valid ? circleCheck : circleEmpty} alt="" />

            <p className="text-[11px] text-[#434654]">{requirement.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PasswordRequirements;
