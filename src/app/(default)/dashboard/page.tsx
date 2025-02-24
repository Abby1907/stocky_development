"use client";
import { Button } from "@/components/ui/button";
import Navbar from "../components/dashboard/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../components/loader/Loader";
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [totalStock, setTotalStock] = useState(0);
  const [totalStores, setTotalStores] = useState(0);
  const [activeStores, setActiveStores] = useState(0);
  const [inactiveStores, setInactiveStores] = useState(0);
  const [totalStockAlerts, setTotalStockAlerts] = useState(0);
  const [alertValue, setAlertValue] = useState(0);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [role, setRole] = useState("");

  interface Store {
    _id: string;
    address: string;
    employee_number: string;
    gst_number: string;
    isActive: boolean;
    store_id: string;
    store_name: string;
    store_type: string;
    user_id: string;
    createdAt: string;
    updatedAt: string;
  }
  useEffect(() => {
    async function getTotalStocks() {
      try {
        setIsLoading(true);
        const res = await fetch("/api/get-user-data", { method: "GET" });
        const data = await res.json();
        if (data.status) {
          setIsLoading(false);
          const activeStores = data.stores.filter(
            (store: Store) => store.isActive === true
          );
          const inactiveStores = data.stores.filter(
            (store: Store) => store.isActive === false
          );
          setActiveStores(activeStores.length);
          setInactiveStores(inactiveStores.length);
          setTotalStores(data.stores.length);
          setTotalStock(data.products.length);
          setTotalStockAlerts(data.alertProducts.length);
          setTotalEmployees(data.employees.length);
          setAlertValue(data.alertValue);
          setRole(data.role);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Something went wrong");
      }
    }
    getTotalStocks();
  }, [role]);

  return (
    <>
      <Navbar />
      {/* Header */}
      {isLoading && <Loader />}
      <header className="bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      </header>
      <main className="p-6">
        <div className={`grid gap-6 md:grid-cols-4`}>
          {/* Card 1 */}
          <Link href="/stores">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <h2 className="text-lg font-semibold text-gray-700">
                Total Products
              </h2>
              <p className="mt-2 text-2xl font-bold text-blue-600">
                {totalStock}
              </p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/stores">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Stores
                </h2>
                <h3 className="text-md font-semibold text-gray-700">
                  Active Stores
                </h3>
                <h3 className="text-md font-semibold text-gray-700">
                  Inactive Stores
                </h3>
              </div>
              <div className="flex justify-between">
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {totalStores}
                </p>
                <p className="mt-2 text-xl font-bold text-blue-600">
                  {activeStores}
                </p>
                <p className="mt-2 text-xl font-bold text-red-600">
                  {inactiveStores}
                </p>
              </div>
              {/* <p className="mt-2 text-2xl font-bold text-blue-600">{totalStores}</p>
            <h2 className="text-lg font-semibold text-gray-700">Active Stores</h2>
            <p className="mt-2 text-2xl font-bold text-blue-600">{activeStores}</p> */}
            </div>
          </Link>
          {/* Card 3 */}
          <Link href="/stock-alerts">
            <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition cursor-pointer">
              <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-gray-700">
                  Stock Alerts
                </h2>
                <h2 className="text-lg font-semibold text-gray-700">
                  Current Alert Value
                </h2>
              </div>
              <div className="flex justify-between">
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {totalStockAlerts}
                </p>
                <p className="mt-2 text-2xl font-bold text-red-600">
                  {alertValue}
                </p>
              </div>
            </div>
          </Link>
          {/* Card 4 */}
          {role === "root" && (
            <Link href="/employee-details">
              <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-lg font-semibold text-gray-700">
                  Total Employees
                </h2>
                <p className="mt-2 text-2xl font-bold text-blue-600">
                  {totalEmployees}
                </p>
              </div>
            </Link>
          )}
        </div>
      </main>
      <div className="flex sm:flex-row gap-4 p-4 flex-col items-center justify-center">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Stores
            </CardTitle>
            <hr />
            <CardDescription className="text-center">
              Create your store for individuals places and stocks.
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex gap-4">
            <Link href={"/stores"} className="w-full">
              <Button className="w-full">View Store</Button>
            </Link>
            {role === "root" || role === "manager" ? (
              <Link href={"/create-store"} className="w-full">
                <Button className="w-full">Create Store</Button>
              </Link>
            ) : (
              <></>
            )}
          </CardFooter>
        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Price List
            </CardTitle>
            <hr />
            <CardDescription className="text-center">
              Create your products price list
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex gap-4">
            <Button className="w-full">View Price list</Button>
            {role === "root" && (
              <Button className="w-full">Create Price list</Button>
            )}
          </CardFooter>
        </Card>
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-center">
              Generate Bill
            </CardTitle>
            <hr />
            <CardDescription className="text-center">
              Generate GST Bill as PDF
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter className="flex gap-4">
            <Button className="w-1/2">View Bills</Button>
            <Link href={"/generate-bill"}>
              <Button className="w-full">Generate Bills</Button>
            </Link>
          </CardFooter>
        </Card>

        {role === "root" && (
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-center">
                Create Employee
              </CardTitle>
              <hr />
              <CardDescription className="text-center">
                Add your organization employees
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex gap-4">
            <Link href="/employee-details">
              <Button className="w-full">View Employees</Button>
            </Link>
              <Link href={"/create-employees"} className="w-full">
                <Button className="w-full">Create Employees</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  );
}
