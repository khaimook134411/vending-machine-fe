interface ItemCardProps {
  title: string;
  description?: string;
  price: number;
  imgUri?: string;
}

export default function ItemCard({
  title,
  description,
  price,
  imgUri,
}: ItemCardProps) {
  return (
    <div className="rounded-2xl p-4 px-4 bg-primary flex flex-col items-center justify-center overflow-hidden">
      {/* <div
        className="w-48 h-48  transition-transform "
        style={{
          backgroundImage: imgUri
            ? `url(${imgUri})`
            : `url("/placeholder.png")`,
        }}
      ></div> */}
      <img
        src={imgUri ? imgUri : "/placeholder.png"}
        alt=""
        className="w-48 h-48 object-cover object-center hover:scale-105 transition-transform"
      />

      <div className="w-full flex justify-between">
        <p className="text-lg font-semibold py-1">{title}</p>
        <p className="py-1 text-xl font-medium">{price} Baht</p>
      </div>
      <p className="w-full text-xs">{description}</p>
    </div>
  );
}
