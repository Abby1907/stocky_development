import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface StockInDialogProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    singleProductName: string;
    newQuantity: number;
    setNewQuantity: (quantity: number) => void;
    productId: string
  }
const StockInDialogBox: React.FC<StockInDialogProps> = React.memo(({ isOpen, setIsOpen, singleProductName, newQuantity, setNewQuantity, productId }) => {

  async function stockInSubmitHandler() { // e: React.FormEvent<HTMLFormElement>
    // e.preventDefault();
    try {
      const response = await axios.post("/api/stock-in", {
        productId: productId,
        quantity: newQuantity
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
      <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Stock In</DialogTitle>
            <DialogDescription>
              Make changes to your stock here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <form onSubmit={stockInSubmitHandler}>
              <Input type="hidden" value={productId} />
              <label htmlFor="name" className="font-semibold">
                Product Name
              </label>
              <Input
                disabled
                readOnly
                id="name"
                value={singleProductName}
                className="col-span-3"
              />
              <label htmlFor="quantity" className="font-semibold">
                Quantity
              </label>
              <Input
                id="quantity"
                value={newQuantity}
                onChange={(e) => setNewQuantity(Number(e.target.value))}
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
StockInDialogBox.displayName = "StockInDialogBox";
export default StockInDialogBox;