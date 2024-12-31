"use client";

import Badge from "@/components/badge";
import Button from "@/components/button";
import MoneyCard from "@/components/money_card";
import { Order } from "@/data/model/order";
import { Money, Product } from "@/data/model/product";
import { Client } from "@/data/sources/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const money = [
  {
    id: "coin_1",
    value: "1",
    image: "/coin_1.jpg",
  },
  {
    id: "coin_5",
    value: "5",
    image: "/coin_5.jpg",
  },
  {
    id: "coin_10",
    value: "10",
    image: "/coin_10.jpg",
  },
  {
    id: "bank_20",
    value: "20",
    image: "/bank_20.jpg",
  },
  {
    id: "bank_50",
    value: "50",
    image: "/bank_50.jpg",
  },
  {
    id: "bank_100",
    value: "100",
    image: "/bank_100.jpg",
  },
  {
    id: "bank_500",
    value: "500",
    image: "/bank_500.jpg",
  },
  {
    id: "bank_1000",
    value: "1000",
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
  const [product, setProduct] = useState<Product | undefined>(undefined);
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

    const fetchProduct = async () => {
      if (order?.product_id) {
        const fetchedProduct = await client.getProductById(order?.product_id);
        setProduct(fetchedProduct as Product);
      }
    };

    fetchOrder();
    fetchProduct();
  }, [orderNumber, order?.product_id]);

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

  const payOrder = async () => {
    if (!orderNumber) return;

    await client.completeOrder({
      id: orderNumber,
      receive: balance,
    });

    router.push("/");
  };

  return (
    <>
      {" "}
      <div className="bg-[#e7e7e8] p-4 w-full h-screen flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <p className="text-secondary font-semibold">
            Order number: #{orderNumber}
          </p>
          <div>
            <Badge text={order?.status ?? ""} config="fill-primary" />
          </div>
        </div>
        <p className="font-semibold">Payment Method: Cash</p>
        <div className="tablet:grid tablet:grid-cols-2 tablet:gap-2">
          <div className="pb-2 flex flex-col gap-2">
            {money.slice(0, 4).map((coin) => (
              <MoneyCard
                key={coin.id}
                title={`฿${coin.value}`}
                image={coin.image}
                amount={balance[coin.id as keyof Money]}
                onClickMinus={() => decreaseAmount(coin.id as keyof Money)}
                onClickPlus={() => increaseAmount(coin.id as keyof Money)}
              />
            ))}
          </div>
          <div className="pb-2 flex flex-col gap-2">
            {money.slice(4).map((coin) => (
              <MoneyCard
                key={coin.id}
                title={`฿${coin.value}`}
                image={coin.image}
                amount={balance[coin.id as keyof Money]}
                onClickMinus={() => decreaseAmount(coin.id as keyof Money)}
                onClickPlus={() => increaseAmount(coin.id as keyof Money)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="fixed bg-white shadow-md bottom-0 w-full flex flex-col gap-4 h-fit border p-4 rouneded-lg">
        <div className="flex justify-between">
          <p>
            Total :{" "}
            <span className="text-lg text-primary font-semibold">
              ฿{order?.total}
            </span>
          </p>
          <p>Balance: ฿{totalBalance}</p>
        </div>
        <div className="flex gap-4 ">
          <Button
            text="Cancel Order"
            width="w-full"
            config="outline-secondary"
            onClick={cancleOrder}
          />
          <Button text="Place Order" width="w-full" onClick={payOrder} />
        </div>
      </div>
    </>
  );
}

// <div className="p-4">
//     <div className="flex gap-4">
//       <img
//         src={product?.image_uri ? product?.image_uri : "/placeholder.png"}
//         alt=""
//         className={`${
//           product?.image_uri ? "w-40 h-40 object-cover object-center" : "p-4"
//         } `}
//       />

//       <div>
//         <p>Order number: {orderNumber}</p>
//         <p>{product?.title}</p>
//         <Badge text={order?.status ?? ""} config="fill-secondary" />
//         <p>Status: {order?.status}</p>
//         <p>total: {order?.total}</p>
//         <p>quantity: {order?.quantity}</p>
//       </div>
//     </div>
//     <p>Pay</p>
//     <p>Your Balance: {totalBalance} Baht</p>
//     <div className="p-4 grid grid-cols-4 gap-4">
//       {money.map((coin) => (
//         <MoneyCard
//           key={coin.id}
//           title={coin.title}
//           image={coin.image}
//           amount={balance[coin.id as keyof Money]}
//           onClickMinus={() => decreaseAmount(coin.id as keyof Money)}
//           onClickPlus={() => increaseAmount(coin.id as keyof Money)}
//         />
//       ))}
//     </div>
//     <div className="flex gap-4">
//       <Button
//         text="Cancel"
//         width="w-full"
//         config="fill-critical"
//         onClick={cancleOrder}
//       />
//       <Button text="Pay" width="w-full" onClick={payOrder} />
//     </div>
//   </div>
