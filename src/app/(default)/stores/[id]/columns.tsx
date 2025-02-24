"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import React from "react"

import StockInDialogBox from "../../components/dialogbox/StockInDialogBox"
import StockOutDialogBox from "../../components/dialogbox/StockOutDialogBox"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  _id: string
  productName: string
  quantity: number
  modifiedBy: string
  lastUpdatedAt: string
  updatedAtTime: string
}

export const createColumns =({
  isOpen,
  setIsOpen,
  newQuantity,
  setNewQuantity,
  singleProductName,
  setSingleProductName,
  productId,
  setProductId,

  isOpenOut,
  setIsOpenOut,
  newQuantityOut,
  setNewQuantityOut,
  singleProductNameOut,
  setSingleProductNameOut,
  productIdOut,
  setProductIdOut
}: {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  newQuantity: number
  setNewQuantity: (quantity: number) => void
  singleProductName: string,
  setSingleProductName: (name: string) => void
  productId: string
  setProductId: (id: string) => void

  isOpenOut: boolean
  setIsOpenOut: (open: boolean) => void
  newQuantityOut: number
  setNewQuantityOut: (quantity: number) => void
  singleProductNameOut: string,
  setSingleProductNameOut: (name: string) => void
  productIdOut: string
  setProductIdOut: (id: string) => void
}): ColumnDef<Product>[] => 
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
      accessorKey: "modifiedBy",
      header: "Modified By",
    },
    {
      accessorKey: "updatedAt",
      header: "Last Update Date"
    },
    {
      accessorKey: "updatedAtTime",
      header: "Last Update Time"
    },
    {
        id: "actions",
        cell: ({ row }) => {
          const product = row.original
          return (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpen(true);
                      setSingleProductName(product.productName);
                      setProductId(product._id);
                    }}
                  >
                    Stock In
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setIsOpenOut(true);
                      setSingleProductNameOut(product.productName);
                      setProductIdOut(product._id);
                    }}
                  >
                    Stock Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <StockInDialogBox
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                singleProductName={singleProductName}
                newQuantity={newQuantity}
                setNewQuantity={setNewQuantity}
                productId={productId}
              />
              <StockOutDialogBox
                isOpenOut={isOpenOut}
                setIsOpenOut={setIsOpenOut}
                singleProductNameOut={singleProductNameOut}
                newQuantityOut={newQuantityOut}
                setNewQuantityOut={setNewQuantityOut}
                productIdOut={productIdOut}
              />
            </>
          );
      },
    }
  ]
