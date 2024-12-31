import Button from "./button";

export interface InputStepperProps {
  amount: number;
  increaseAmount: () => void;
  decreaseAmount: () => void;
}

export default function InputStepper({
  amount,
  increaseAmount,
  decreaseAmount,
}: InputStepperProps) {
  return (
    <div className="flex gap-4 items-center">
      <Button text="-" config="outline-secondary" onClick={decreaseAmount} />
      <p className="text-lg text-secondary font-semibold">{amount}</p>
      <Button text="+" config="outline-secondary" onClick={increaseAmount} />
    </div>
  );
}
