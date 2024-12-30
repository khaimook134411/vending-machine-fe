export interface MoneyCardProps {
  title: string;
  image: string;
  amount: number;
  onClickMinus: () => void;
  onClickPlus: () => void;
}

export default function MoneyCard({
  title,
  image,
  amount,
  onClickMinus,
  onClickPlus,
}: MoneyCardProps) {
  return (
    <div className="w-full h-30 flex gap-4 bg-white p-4 rounded-lg justify-between items-center">
      <div className="w-full h-30 flex items-center justify-center">
        <img src={image} alt="" className="h-20" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-1 items-center">
          <button
            className="w-7 h-7 bg-[#e5e5e5] p-2 rounded flex justify-center items-center"
            onClick={onClickMinus}
          >
            -
          </button>
          <p className="font-black w-7 text-center">{amount}</p>
          <button
            className="w-7 h-7 bg-[#e5e5e5] p-2 rounded flex justify-center items-center"
            onClick={onClickPlus}
          >
            +
          </button>
        </div>
        <p className="text-xs text-end">{title}</p>
      </div>
    </div>
  );
}
