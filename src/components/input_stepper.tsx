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
    <div className="flex items-center border border-secondary rounded">
      <Button
        text="-"
        size="s"
        config="plain-secondary"
        onClick={decreaseAmount}
      />
      <div className="border-x border-secondary w-7 h-7 flex items-center justify-center">
        <p className="text-center">{amount}</p>
      </div>
      <Button
        text="+"
        size="s"
        config="plain-secondary"
        onClick={increaseAmount}
      />
    </div>
  );
}
