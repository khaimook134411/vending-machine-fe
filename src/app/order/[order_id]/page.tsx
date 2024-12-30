"use client";

import MoneyCard from "@/components/money_card";
import { Order } from "@/data/model/order";
import { Money } from "@/data/model/product";
import { Client } from "@/data/sources/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const money = [
  {
    id: "coin_1",
    title: "1 Baht",
    image: "/coin_1.jpg",
  },
  {
    id: "coin_5",
    title: "5 Baht",
    image: "/coin_5.jpg",
  },
  {
    id: "coin_10",
    title: "10 Baht",
    image: "/coin_10.jpg",
  },
  {
    id: "bank_20",
    title: "20 Baht",
    image: "/bank_20.jpg",
  },
  {
    id: "bank_50",
    title: "50 Baht",
    image: "/bank_50.jpg",
  },
  {
    id: "bank_100",
    title: "100 Baht",
    image: "/bank_100.jpg",
  },
  {
    id: "bank_500",
    title: "500 Baht",
    image: "/bank_500.jpg",
  },
  {
    id: "bank_1000",
    title: "1000 Baht",
    image: "/bank_1000.jpg",
  },
];

export default function Order() {
  const router = useRouter();
  const params = useParams();
  const client = new Client();

  const orderNumber = Array.isArray(params.order_id)
    ? params.order_id[0]
    : params.order_id;

  const [order, setOrder] = useState<Order | undefined>(undefined);
  const [balance, setBalance] = useState<Money>({
    coin_1: 0,
    coin_5: 0,
    coin_10: 0,
    bank_20: 0,
    bank_50: 0,
    bank_100: 0,
    bank_500: 0,
    bank_1000: 0,
  });

  const totalBalance = useMemo(() => {
    return Object.entries(balance).reduce(
      (sum, [key, value]) => sum + value * parseInt(key.replace(/\D/g, ""), 10),
      0
    );
  }, [balance]);

  useEffect(() => {
    if (!orderNumber) return;

    const fetchOrder = async () => {
      const fetchedOrder = await client.getOrderById(orderNumber);
      setOrder(fetchedOrder as Order);
    };

    fetchOrder();
  }, [orderNumber]);

  const increaseAmount = (id: keyof Money) => {
    setBalance((prev) => ({
      ...prev,
      [id]: prev[id] + 1,
    }));
  };

  const decreaseAmount = (id: keyof Money) => {
    setBalance((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] - 1),
    }));
  };

  const cancleOrder = async () => {
    if (!orderNumber) return;

    await client.cancelOrder({
      id: orderNumber,
      refund: balance,
    });

    router.push("/");
  };

  return (
    <div>
      <p>Order number: {orderNumber}</p>
      <p>Status: {order?.status}</p>
      <p>total: {order?.total}</p>
      <p>quantity: {order?.quantity}</p>
      <p>Pay</p>
      <p>Your Balance: {totalBalance} Baht</p>
      <div className="p-4 grid grid-cols-4 gap-4">
        {money.map((coin) => (
          <MoneyCard
            key={coin.id}
            title={coin.title}
            image={coin.image}
            amount={balance[coin.id as keyof Money]}
            onClickMinus={() => decreaseAmount(coin.id as keyof Money)}
            onClickPlus={() => increaseAmount(coin.id as keyof Money)}
          />
        ))}
      </div>
      <div className="flex gap-4">
        <button
          className="w-fit border-4 bg-[#e5e5e5] py-2 px-4 rounded"
          onClick={cancleOrder}
        >
          Cancel
        </button>
        <button
          className="w-fit border-4 bg-[#e5e5e5] py-2 px-4 rounded"
          onClick={() => {}}
        >
          Comfirm
        </button>
      </div>
    </div>
  );
}
