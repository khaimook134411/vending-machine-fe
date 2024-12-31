interface ItemCardProps {
  title: string;
  description?: string;
  price: number;
  imgUri?: string;
  state?: "standard" | "disabled";
  onClick?: () => void;
}

export default function ItemCard({
  title,
  description,
  price,
  imgUri,
  state = "standard",
  onClick,
}: ItemCardProps) {
  return (
    <div
      className={`flex flex-col w-[20rem] relative max-w-[50%] items-center justify-start px-2.5 pb-5 gap-1 ${
        state === "disabled" ? "opacity-50" : "cursor-pointer"
      }`}
      onClick={state === "disabled" ? undefined : onClick}
    >
      <div className="w-full h-50 flex justify-center items-center overflow-hidden rounded-lg">
        <img
          src={imgUri ? imgUri : "/placeholder.png"}
          alt=""
          className={`w-full h-full object-cover object-center aspect-square ${
            imgUri && state === "standard"
              ? "hover:scale-105 transition-transform"
              : ""
          } `}
        />
      </div>

      <div className="w-full flex flex-col gap-1">
        <p className="py-1 text-base font-semibold truncate flex-1">{title}</p>
        <div className="w-full flex justify-between items-center border-r border-[#bcbcbc]">
          <p className="px-1 text-xs font-bold text-[#222]">Price</p>
          <p className="px-1 text-xs text-[#666]">{price} Baht</p>
        </div>
        <div className="h-[4.25rem] overflow-hidden">
          <p className="py-1 text-sm line-clamp-2">{description}</p>
        </div>
      </div>
    </div>
  );
}
