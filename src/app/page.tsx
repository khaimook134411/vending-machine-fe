"use client";

import Badge from "@/components/badge";
import ItemCard from "@/components/item_card";
import { Product } from "@/data/model/product";
import { Client } from "@/data/sources/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export interface Category {
  id: string;
  title: string;
  description: string;
  deleted: boolean;
}

export default function Home() {
  const client = new Client();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [fetchedCategories, fetchedProducts] = await Promise.all([
        client.getCategories(),
        client.getProducts(),
      ]);
      setCategories(fetchedCategories as Category[]);
      setProducts(fetchedProducts as Product[]);
    };

    fetchData();
  }, []);

  const onCategoryClick = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredProducts = useMemo(() => {
    if (selectedCategories.length === 0) return products;
    return products.filter((product) =>
      selectedCategories.includes(product.category_id ?? "")
    );
  }, [products, selectedCategories]);

  return (
    <div className="w-full h-screen p-4 flex flex-col gap-4">
      <div className="py-4 flex items-center gap-4">
        <img src="/logo.png" alt="logo" />
        <p className="font-semibold text-2xl">
          Best <span className="text-primary">Coffee</span> in Town
        </p>
      </div>

      {/* Category Selection */}
      <div className="flex flex-wrap gap-4 px-2.5">
        <Badge
          text="All"
          config={
            selectedCategories.length === 0 ? "fill-primary" : "outline-primary"
          }
          onClick={() => setSelectedCategories([])} // Deselect all categories
        />
        {categories.map((category) => (
          <Badge
            key={category.id}
            text={category.title}
            config={
              selectedCategories.includes(category.id)
                ? "fill-primary"
                : "outline-primary"
            }
            onClick={() => onCategoryClick(category.id)}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {filteredProducts.map((product) => (
          <ItemCard
            key={product.id}
            title={product.title}
            description={product.description}
            price={product.price}
            imgUri={product.image_uri}
            state={product.deleted ? "disabled" : "standard"}
            onClick={() => {
              router.push(`/order?product_id=${product.id}`);
            }}
          />
        ))}
      </div>
    </div>
  );
}
