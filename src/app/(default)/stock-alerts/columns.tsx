"use client"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type AlertProduct = {
  _id: string
  productName: string
  quantity: number
  storeName: string
  address: string
}

export const createColumns =(): ColumnDef<AlertProduct>[] => 
  [
    {
      accessorKey: "productName",
      header: "Product Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
    },
    {
      accessorKey: "storeName",
      header: "Store Name",
    },
    {
      accessorKey: "address",
      header: "Store Address",
    },
  ]
