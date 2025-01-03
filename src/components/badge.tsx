import classNames from "classnames";

interface BadgeProps {
  text: string;
  config?:
    | "fill-primary"
    | "fill-secondary"
    | "fill-critical"
    | "fill-success"
    | "outline-primary"
    | "outline-secondary";
  onClick?: () => void;
}

export default function Badge({
  text,
  config = "fill-primary",
  onClick = () => {},
}: BadgeProps) {
  const buttonClasses = classNames("py-1 px-4 rounded-full", {
    "bg-primary text-white": config === "fill-primary",
    "bg-secondary text-black": config === "fill-secondary",
    "bg-red-500 text-white": config === "fill-critical",
    "border border-primary text-primary bg-transparent":
      config === "outline-primary",
    "border border-secondary text-secondary bg-transparent":
      config === "outline-secondary",
  });

  return (
    <button className={buttonClasses} onClick={onClick}>
      <p className="text-sm font-semibold">{text}</p>
    </button>
  );
}
