import classNames from "classnames";

export interface ButtonProps {
  text: string;
  state?: "standard" | "disabled";
  config?:
    | "fill-primary"
    | "fill-secondary"
    | "fill-critical"
    | "outline-primary"
    | "outline-secondary"
    | "plain-primary"
    | "plain-secondary";
  width?: string;
  size?: "s" | "m";
  rounded?: string;
  onClick?: () => void;
}

export default function Button({
  text,
  state = "standard",
  config = "fill-primary",
  width = "w-fit",
  rounded = "rounded-lg",
  size = "m",
  onClick,
}: ButtonProps) {
  const buttonClasses = classNames(width, rounded, {
    "cursor-not-allowed opacity-50": state === "disabled",
    "bg-primary text-white": config === "fill-primary",
    "bg-secondary text-black": config === "fill-secondary",
    "bg-red-500 text-white": config === "fill-critical",
    "border border-primary text-primary bg-transparent":
      config === "outline-primary",
    "border border-secondary text-secondary bg-transparent":
      config === "outline-secondary",
    "text-primary bg-transparent": config === "plain-primary",
    "text-secondary bg-transparent": config === "plain-secondary",
    "h-7 px-2": size === "s",
    "h-12 px-4": size === "m",
  });

  return (
    <button
      className={buttonClasses}
      onClick={state === "disabled" ? undefined : onClick}
      disabled={state === "disabled"}
    >
      <p className="text-md font-semibold">{text}</p>
    </button>
  );
}
