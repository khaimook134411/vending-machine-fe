import Button from "./button";
import InputStepper from "./input_stepper";

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
    <div className="bg-white w-full p-4 rounded-lg ">
      <div className="flex gap-4 justify-between items-center">
        <img src={image} alt="" className="h-12 tablet:h-24" />
        <div className="flex items-center gap-6">
          <p className="text-xs text-secondary">{title}</p>
          <InputStepper
            amount={amount}
            decreaseAmount={onClickMinus}
            increaseAmount={onClickPlus}
          />
        </div>
      </div>
    </div>
  );
}
