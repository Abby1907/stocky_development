"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/dashboard/Navbar";

export default function CreateStore() {
    const [storeName, setStoreName] = useState("");
    const [address, setAddress] = useState("");
    const [storeType, setStoreType] = useState("");
    const [employeeNumber, setEmployeeNumber] = useState("");
    const [gstNumber, setGstNumber] = useState("");
    const [storeID, setStoreId] = useState("");
    async function handleCreateStore (e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();
      await fetch("/api/create-store", {
        method: "POST",
        headers: {
          contentType: "application/json",
        },
        body: JSON.stringify({ storeName, address, storeType, employeeNumber, gstNumber, storeID }),
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      })
    }
    return (
      <>
      <Navbar />
        <div
          className="container relative left-[50%] top-[10%] rounded-xl
                translate-x-[-50%] sm:w-[500px] sm:h-[600px] bg-black p-4 text-white
                w-[400px] h-auto mt-1"
        >
          <div className="mb-6">
                <h1 className="text-3xl font-bold text-center">Create a new store</h1>
                <hr className="mt-2"></hr>
            </div>
          <form onSubmit={handleCreateStore}>
            <div className="flex flex-col gap-2 font-semibold">
              <label>Store Name</label>
              <Input required type="text" placeholder="Enter your store name" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              <label>Store Address</label>
              <Input required type="text" placeholder="Enter your store address" value={address} onChange={(e) => setAddress(e.target.value)} />
              <label>Store Type</label>
              <Input required type="text" placeholder="Enter your store type" value={storeType} onChange={(e) => setStoreType(e.target.value)} />
              <label>Number of employee</label>
              <Input required min={0} type="number" placeholder="Enter the number of employees associated with your store" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
              <label>GST Number</label>
              <Input type="text" placeholder="Enter the GST Number of your store" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} />
              <label>Store ID</label>
              <Input required type="text" placeholder="Enter the your store ID" value={storeID} onChange={(e) => setStoreId(e.target.value)} />
              <Button type="submit" variant="secondary" className="text-xl">Create</Button>
              
            </div>
          </form>
        <Toaster position="bottom-center" />
        </div>
      </>
    );
}