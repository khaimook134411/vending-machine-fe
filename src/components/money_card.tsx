import Button from "./button";

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
    <div className="w-full bg-white p-4 rounded-lg ">
      <p className="text-xs">{title}</p>
      <div className="flex gap-4 justify-between items-center">
        <div className="w-full flex flex-col items-center justify-center">
          <img src={image} alt="" className="h-10" />
        </div>
        <div className="flex gap-1 items-center">
          <Button text="-" config="fill-secondary" onClick={onClickMinus} />
          <p className="font-black w-7 text-center">{amount}</p>
          <Button text="+" config="fill-secondary" onClick={onClickPlus} />
        </div>
      </div>
    </div>
  );
}
