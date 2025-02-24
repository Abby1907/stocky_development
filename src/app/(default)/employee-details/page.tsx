"use client";

import { DataTable } from "@/components/employee/data-table";
import Navbar from "../components/dashboard/Navbar";
import { createColumns } from "./columns";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import toast, { Toaster } from "react-hot-toast";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [isActivateOpen, setIsActivateOpen] = useState(false);
  const [isDeactivateOpen, setIsDeactivateOpen] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeData, setEmployeeData] = useState([]);
  useEffect(() => {
    async function getEmployeeData () {
      type formatedData = {
        _id: string;
        email: string;
        role: string;
        isActive: string;
      }
      try {
        setIsLoading(true);
        fetch("/api/get-employee-data", { method: "GET" })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          if (data.status) {
            toast.success(data.message);
            const formatedData = data.data.map((item: formatedData) => {
              return {
                _id: item._id,
                email: item.email,
                role: (item.role).toUpperCase(),
                isActive: item.isActive ? "Active" : "Inactive",
              }
            })
            setEmployeeData(formatedData);
          } else {
            toast.error(data.message);
          }
        })
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
    getEmployeeData();
  }, []);
  const columns = createColumns({
    isActivateOpen,
    setIsActivateOpen,
    isDeactivateOpen,
    setIsDeactivateOpen,
    employeeId,
    setEmployeeId,
    employeeEmail,
    setEmployeeEmail,
  });
  return (
    <>
      <Navbar />
      {isLoading && <Loader />}
      <header className="flex bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Employee Details</h1>
      </header>
      <div className="px-6 py-4">
        <DataTable columns={columns} data={employeeData} />
      </div>
      <Toaster />
    </>
  );
}
