interface BadgeProps {
  text: string;
  state: "standard" | "active";
  onClick?: () => void;
}

export default function Badge({
  text,
  state = "standard",
  onClick = () => {},
}: BadgeProps) {
  return (
    <button
      className={`text-primary text-sm px-2 py-1 rounded-2xl cursor-pointer ${
        state === "active" ? "bg-primary text-white" : "bg-[#e5e5e5]"
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
