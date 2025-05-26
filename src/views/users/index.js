"use client";
import TableQuery from "@/components/TableQuery";
import ColumnsTableUsers from "@/configurations/columns/ColumnsTableUsers";
import { useAsyncList } from "@react-stately/data";
import React, { useState } from "react";
import InputItemsProducts from '@/configurations/InputItemsProducts'
const FormUsers = () => {
  const [isLoading, setIsLoading] = useState(true);

  let listUsers = useAsyncList({
    async load({ signal }) {
      let res = await fetch("https://dummyjson.com/users", {
        signal,
      });
      let json = await res.json();

      setIsLoading(false);

      return {
        items: json.users,
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
      titleTable="Accounts Users List"
      sorting={listUsers}
      isLoading={isLoading}
      columns={ColumnsTableUsers}
      inputItemsModal={InputItemsProducts}
        ModalTitle='Add New Account'
        createFunction={null}
      // height="600px"
    />
  );
};

export default FormUsers;
