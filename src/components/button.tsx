import classNames from "classnames";

export interface ButtonProps {
  text: string;
  state?: "standard" | "disabled";
  config?:
    | "fill-primary"
    | "fill-secondary"
    | "fill-critical"
    | "outline-primary"
    | "outline-secondary";
  width?: string;
  rounded?: string;
  onClick?: () => void;
}

export default function Button({
  text,
  state = "standard",
  config = "fill-primary",
  width = "w-fit",
  rounded = "rounded-lg",
  onClick,
}: ButtonProps) {
  const buttonClasses = classNames("py-2 px-4", width, rounded, {
    "cursor-not-allowed opacity-50": state === "disabled",
    "bg-primary text-white": config === "fill-primary",
    "bg-secondary text-black": config === "fill-secondary",
    "bg-red-500 text-white": config === "fill-critical",
    "border border-primary text-primary bg-transparent":
      config === "outline-primary",
    "border border-secondary text-secondary bg-transparent":
      config === "outline-secondary",
  });

  return (
    <button
      className={buttonClasses}
      onClick={state === "disabled" ? undefined : onClick}
      disabled={state === "disabled"}
    >
      {text}
    </button>
  );
}
