"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface ActivateEmployeeDialogProps {
  isDeactivateOpen: boolean;
  setIsDeactivateOpen: (open: boolean) => void;
  employeeId: string;
  employeeEmail: string;
}

const DeactivateEmployeeDialogBox: React.FC<ActivateEmployeeDialogProps> =
  React.memo(
    ({ isDeactivateOpen, setIsDeactivateOpen, employeeId, employeeEmail }) => {
      const handleDeactivation = async () => {
        try {
          fetch("/api/deactivate",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ employeeId }),
            }
          )
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (data.status) {
              toast.success(data.message);
              setIsDeactivateOpen(false);
            } else {
              toast.error(data.message);
            }
          })
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }
      }
      return (
        <>
          <Dialog
            open={isDeactivateOpen}
            onOpenChange={(open) => setIsDeactivateOpen(open)}
          >
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Do you want to De-activate ?</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleDeactivation}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-baseline gap-4">
                    <Input type="hidden" value={employeeId} />
                    <Input
                      type="text"
                      className="col-span-4"
                      value={employeeEmail}
                      disabled
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="button" onClick={() => setIsDeactivateOpen(false)} className="mr-2">Cancel</Button>
                  <Button type="submit" variant={"destructive"}>
                    Deactivate
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Toaster />
        </>
      );
    }
  );
  DeactivateEmployeeDialogBox.displayName = "DeactivateEmployeeDialogBox";
export default DeactivateEmployeeDialogBox;
