import ItemCard from "@/components/item_card";

export default function Home() {
  return (
    <div className="bg-[#ffffff] p-4 flex flex-col gap-4">
      <p className="font-semibold text-2xl text-[#000]">Best Coffe in Town </p>
      <div className="grid grid-cols-4 gap-4">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <ItemCard
              key={i}
              title={`Item ${i}`}
              description="eieie"
              price={20}
              imgUri="https://www.starbucks.co.th/stb-media/2020/08/32.Classic-Chocolate1080-600x600.png"
            />
          ))}
      </div>
    </div>
  );
}
