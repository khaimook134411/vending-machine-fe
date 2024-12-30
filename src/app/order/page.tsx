"use client";

import Button from "@/components/button";
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
        <div className="fixed top-4 left-4">
          <Button
            text="Back to Menu"
            config="outline-secondary"
            rounded="rounded-full"
            onClick={() => {
              router.push("/");
            }}
          />
        </div>
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
              <Button
                text="-"
                width="w-full"
                config="fill-secondary"
                onClick={decreaseAmount}
              />
              <p className="font-black">{amount}</p>
              <Button
                text="+"
                width="w-full"
                config="fill-secondary"
                onClick={increaseAmount}
              />
            </div>
            <p className="text-xl font-bold">{product?.title}</p>
            <p>{product?.description}</p>
            <p>available stock : {product?.quantity}</p>
            <p></p>
          </div>

          <Button
            text="Checkout"
            width="w-full"
            config="fill-primary"
            onClick={onClickCheckout}
          ></Button>
        </div>
      </div>
    </div>
  );
}
