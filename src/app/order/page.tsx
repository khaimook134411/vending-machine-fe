"use client";

import { Product } from "@/data/model/product";
import { Client } from "@/data/sources/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Order() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product_id");
  const client = new Client();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [amount, setAmount] = useState<number>(1);

  const onClickCheckout = async () => {
    const res = await client.createOrder({
      product_id: productId as string,
      quantity: amount,
    });

    router.push(`/order/${res.id}`);
  };

  const increaseAmount = () => {
    setAmount(amount + 1);
  };

  const decreaseAmount = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (productId) {
        const fetchedProduct = await client.getProductById(productId);
        setProduct(fetchedProduct as Product);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white w-full h-full flex flex-col gap-4">
      <div className="grid grid-cols-2">
        <button
          className="fixed top-4 left-4 w-fit border-4 bg-[#e5e5e5] py-2 px-4 rounded-full"
          onClick={() => {
            router.push("/");
          }}
        >
          Back to Menu
        </button>
        <img
          src={product?.image_uri ? product?.image_uri : "/placeholder.png"}
          alt=""
          className={`${
            product?.image_uri
              ? "w-full h-full object-cover object-center"
              : "p-4"
          } `}
        />
        <div className="p-4 flex flex-col gap-4 justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex gap-7 items-center">
              <button
                className="w-full h-10 bg-[#e5e5e5] p-2 rounded"
                onClick={decreaseAmount}
              >
                -
              </button>
              <p className="font-black">{amount}</p>
              <button
                className="w-full h-10 bg-[#e5e5e5] p-2 rounded"
                onClick={increaseAmount}
              >
                +
              </button>
            </div>
            <p className="text-xl font-bold">{product?.title}</p>
            <p>{product?.description}</p>
            <p>available stock : {product?.quantity}</p>
            <p></p>
          </div>

          <button
            className="w-full h-20 bg-[#e5e5e5] p-2 rounded"
            onClick={onClickCheckout}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
