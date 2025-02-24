"use client";
import { Button } from "@/components/ui/button";
import Navbar from "../components/dashboard/Navbar";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { DataTable } from "@/components/data-table";
import { createColumns } from "./columns";
import Loader from "../components/loader/Loader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [alertProductData, setAlertProductData] = useState([]);
  const [alertValue, setAlertValue] = useState(0);
  useEffect(() => {
    async function getAlertsData() {
      setLoading(true);
      fetch("/api/alert-stocks", { method: "GET" })
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          if (data.status === false) {
            toast.error(data.message);
          }
          setUserRole(data.data.role);
          if (data.role === "root") {
            setDisabled(false);
          }
          setAlertProductData(data.alertProducts);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          toast.error("Something went wrong");
        });
    }
    getAlertsData();
  }, [userRole]);
  const columns = createColumns();
  async function handleAlertSubmit() {
    fetch("/api/set-alerts", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({ value: alertValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <>
      <Navbar />
      {loading && <Loader />}
      <header className="flex bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Stock Alerts</h1>
        <div className="flex grow justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"active"} disabled={disabled}>
                Create Alerts
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Alerts</DialogTitle>
                <DialogDescription>
                  Make changes to your stock alert value. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAlertSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-baseline gap-4">
                    <Label htmlFor="value" className="text-left">
                      Value
                    </Label>
                    <Input
                      type="number"
                      id="value"
                      value={alertValue}
                      onChange={(e) => setAlertValue(Number(e.target.value))}
                      className="col-span-3"
                      min={0}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Set</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="px-6 py-4">
        <DataTable columns={columns} data={alertProductData} />
      </div>
      <Toaster />
    </>
  );
}
