import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface StockInDialogProps {
    isOpenOut: boolean;
    setIsOpenOut: (open: boolean) => void;
    singleProductNameOut: string;
    newQuantityOut: number;
    setNewQuantityOut: (quantity: number) => void;
    productIdOut: string
  }
const StockOutDialogBox: React.FC<StockInDialogProps> = React.memo(({ isOpenOut, setIsOpenOut, singleProductNameOut, newQuantityOut, setNewQuantityOut, productIdOut }) => {

  async function stockInSubmitHandler() { // e: React.FormEvent<HTMLFormElement>
    // e.preventDefault();
    try {
      const response = await axios.post("/api/stock-out", {
        productId: productIdOut,
        quantity: newQuantityOut
      })
      if (response.status === 200) {
        toast.success("Stock In Successfull");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
    return (
      <Dialog open={isOpenOut} onOpenChange={(open) => setIsOpenOut(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock Out</DialogTitle>
            <DialogDescription>
              Make changes to your stock here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={stockInSubmitHandler}>
              <Input type="hidden" value={productIdOut} />
              <label htmlFor="name" className="font-semibold">
                Product Name
              </label>
              <Input
                disabled
                readOnly
                id="name"
                value={singleProductNameOut}
                className="col-span-3"
              />
              <label htmlFor="quantity" className="font-semibold">
                Quantity
              </label>
              <Input
                id="quantity"
                value={newQuantityOut}
                onChange={(e) => setNewQuantityOut(Number(e.target.value))}
                className="col-span-3"
              />
              <Button type="submit"
                className="mt-4"
              >
                Save
              </Button>
            </form>
          </div>
        </DialogContent>
        <Toaster position="bottom-center"/>
      </Dialog>
    );
});
StockOutDialogBox.displayName = "StockOutDialogBox";
export default StockOutDialogBox;