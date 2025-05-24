"use client";
import TableQuery from "@/components/TableQuery";
import ColumnsTableProducts from "@/configurations/columns/ColumnsTableProducts";
import { useAsyncList } from "@react-stately/data";
import React, { useState } from "react";

const FormProducts = () => {
  const [isLoading, setIsLoading] = useState(true);

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch("https://dummyjson.com/products", {
        signal,
      });
      let json = await res.json();

      setIsLoading(false);

      return {
        items: json.products,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });
  return (
    <TableQuery
      titleTable="Products List"
      sorting={list}
      isLoading={isLoading}
      columns={ColumnsTableProducts}
      // height="200px"
    />
  );
};

export default FormProducts;
