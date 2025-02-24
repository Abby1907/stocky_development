"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import toast from "react-hot-toast";

interface ActivateEmployeeDialogProps {
    isActivateOpen: boolean;
    setIsActivateOpen: (open: boolean) => void;
    employeeId: string;
    employeeEmail: string;
  }

const ActivateEmployeeDialogBox: React.FC<ActivateEmployeeDialogProps> = React.memo(({isActivateOpen, setIsActivateOpen, employeeId, employeeEmail}) => {
  const handleActivation = async () => {
    try {
      fetch("/api/activate-employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ employeeId }),
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.status) {
            toast.success(data.message);
            setIsActivateOpen(false);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Something went wrong");
        })
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }  
  return (
        <Dialog open={isActivateOpen} onOpenChange={(open) => setIsActivateOpen(open)}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Do you want to activate ?</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleActivation}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-baseline gap-4">
                    <Input type="hidden" value={employeeId} />
                    <Input type="text" className="col-span-4" value={employeeEmail} disabled/>
                  </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={() => setIsActivateOpen(false)} className="mr-2">Cancel</Button>
                    <Button type="submit" variant={"active"}>Activate</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
    )
});
ActivateEmployeeDialogBox.displayName = "ActivateEmployeeDialogBox";
export default ActivateEmployeeDialogBox;