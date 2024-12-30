"use client";
import { useEffect, useState } from "react";

export function useFetch<T>(
  fetchFunction: () => Promise<T | undefined>
): [T | undefined, () => void] {
  const [data, setData] = useState<T | undefined>(undefined);

  const fetchData = async () => {
    const response = await fetchFunction();

    setData(response);
  };

  useEffect(() => {
    if (!data) {
      fetchData();
    }
  }, [fetchFunction]);

  return [data, fetchData];
}
