"use client";

import ItemCard from "@/components/item_card";
import { Product } from "@/data/model/product";
import { Client } from "@/data/sources/client";
import { useEffect, useState } from "react";

export default function Home() {
  const client = new Client();

  async function fetchProducts() {
    return await client.getProducts();
  }

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data as Product[]);
      console.log("data: ", data);
    });
  }, [products]);

  return (
    <div className="bg-[#ffffff] p-4 flex flex-col gap-4">
      <p className="font-semibold text-2xl text-[#000]">Best Coffe in Town </p>
      <div className="grid grid-cols-4 gap-4">
        {products.map((product) => (
          <ItemCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imgUri={product.image_uri}
          />
        ))}
      </div>
    </div>
  );
}
