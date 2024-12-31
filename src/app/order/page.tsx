"use client";

import Button from "@/components/button";
import InputStepper from "@/components/input_stepper";
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
    <div className="bg-[#e7e7e8] w-full h-screen flex flex-col justify-between">
      <div className="p-4 flex flex-col gap-4">
        <Button
          text="< Back to Menu"
          config="plain-primary"
          onClick={() => {
            router.push("/");
          }}
        />
        <div className="p-4 flex flex-col gap-4 bg-white rounded-lg">
          <div className="flex flex-col tablet:flex-row gap-6 items-center justify-between">
            <div className="w-full flex gap-6">
              <img
                src={
                  product?.image_uri ? product?.image_uri : "/placeholder.png"
                }
                alt=""
                className={`${
                  product?.image_uri
                    ? "w-40 h-40 object-cover object-center rounded-lg"
                    : "p-4"
                } `}
              />
              <div>
                <p className="py-1 text-xl font-bold">{product?.title}</p>
                <p className="text-secondary text-sm">
                  available stock : {product?.quantity}
                </p>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <p className="text-lg text-primary font-semibold tablet:pl-4 shrink-0">
                ฿{product?.price}
              </p>
              <InputStepper
                amount={amount}
                increaseAmount={increaseAmount}
                decreaseAmount={decreaseAmount}
              />
            </div>
          </div>
          <div>
            <p className="py-1 text-sm font-semibold">description</p>
            <p>{product?.description}</p>
          </div>
        </div>
      </div>

      <div className="bg-white w-full p-4 flex flex-col tablet:flex-row gap-4 tablet:items-center tablet:justify-end shadow-inner">
        <p>
          Total ({amount} {amount > 1 ? "items" : "item"}) :{" "}
          <span className="text-lg text-primary font-semibold">
            ฿{amount * (product?.price ?? 0)}
          </span>
        </p>
        <Button
          text="Checkout"
          config="fill-primary"
          width="w-full tablet:w-auto"
          onClick={onClickCheckout}
        />
      </div>
    </div>
  );
}
