"use client";

import { Product } from "@/data/model/product";
import { Client } from "@/data/sources/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// http://localhost:4000/order?product_id=67727e9a98024e81678ccb45
export default function Order() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("product_id");
  const client = new Client();

  const [product, setProduct] = useState<Product | undefined>(undefined);

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
    <div className="bg-background h-full flex gap-4 p-4">
      <div className="bg-primary h-full rounded-lg">
        <div className="w-40 h-40 flex justify-center items-center overflow-hidden rounded-lg">
          <img
            src={product?.image_uri ? product?.image_uri : "/placeholder.png"}
            alt=""
            className={`${
              product?.image_uri
                ? "w-48 h-48 object-cover object-center hover:scale-105 transition-transform"
                : "p-4"
            } `}
          />
        </div>
      </div>
      <div>
        <p>eieie {productId}</p>
        <p>{product?.title}</p>
        <p>{product?.description}</p>
        <p>stock : {product?.quantity}</p>
      </div>
    </div>
  );
}
