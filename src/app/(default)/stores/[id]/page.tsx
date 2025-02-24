"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../../components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import toast, { Toaster } from "react-hot-toast";
import { DataTable } from "@/components/data-table";
import { createColumns } from "./columns";
import Loader from "../../components/loader/Loader";

interface Store {
    _id: string;
    store_name: string;
    address: string;
    gst_number: string;
    isActive: boolean;
    user_id: string;
    createdAt: string;
    updatedAt: string;
    store_id: string;
    store_type: string;
    employee_number: string;
    __v: number;
}
interface Data {
    message: string;
    status: boolean;
    data: Store;
}

export default function Store () {
    const [isLoading, setIsLoading] = useState(false);
    const [productName, setProductName] = useState("");
    const [productQuantity, setProductQuantity] = useState(0);
    const [isCreateStock, setIsCreateStock] = useState(false);
    const [isviewStock, setIsViewStock] = useState(true);
    const params = useParams();
    const [store, setStore] = useState<Data>({} as Data);
    const [stock, setStock] = useState([]);

    // FOR STOCK IN MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [newQuantity, setNewQuantity] = useState(0);
    const [singleProductName, setSingleProductName] = useState("");
    const [productId, setProductId] = useState("");

    // FOR THE STOCK OUT MODAL
    const [isOpenOut, setIsOpenOut] = useState(false);
    const [newQuantityOut, setNewQuantityOut] = useState(0);
    const [singleProductNameOut, setSingleProductNameOut] = useState("");
    const [productIdOut, setProductIdOut] = useState("");

    useEffect(() => {
        async function getStore () {
            try {
                const storeID = params.id;
                setIsLoading(true);
                const { data } = await axios.get(`/api/stores/${storeID}`);
                setStore(data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        }
        getStore();

        async function getStock() {
            try {
                const storeID = params.id;
                setIsLoading(true);
                const { data } = await axios.get(`/api/get-stock/${storeID}`);
                if (data.status) {
                    setStock(data.data);
                    setIsLoading(false);
                    toast.success(data.message);
                } else {
                    setIsLoading(false);
                    toast.error(data.message);
                }
            } catch (error) {
                setIsLoading(false);
                console.log(error);
                toast.error("Something went wrong");
            }
        }
        // if (isviewStock) {
            getStock();
        // }
    }, [params.id]);

    async function handleNewItemCreate () {
        try {
            const storeID = params.id;
            const { data } = await axios.post("/api/create-new-stock", {
                productName,
                productQuantity,
                storeID,
            });
            if (data.status) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    const columns = createColumns({ isOpen, setIsOpen, newQuantity, setNewQuantity, singleProductName, setSingleProductName, productId, setProductId, isOpenOut, setIsOpenOut, newQuantityOut, setNewQuantityOut, singleProductNameOut, setSingleProductNameOut, productIdOut, setProductIdOut });
    return (
      <>
        <Navbar />
        {isLoading && <Loader />}
        <div className="p-4">
          <div className="flex sm:flex-row gap-4 p-4 flex-col items-center justify-center">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {store.data?.store_name}
                </CardTitle>
                <hr />
                <CardDescription className="text-center">
                  {store.data?.address}
                </CardDescription>
                <CardDescription className="text-center">
                  {store.data?.gst_number}
                </CardDescription>
                <hr />
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex gap-4 sm:justify-end justify-center">
                <Button
                  className=""
                  onClick={() => {
                    setIsCreateStock(false);
                    setIsViewStock(true);
                  }}
                >
                  View Stock
                </Button>
                <Button
                  className=""
                  variant={"active"}
                  onClick={() => {
                    setIsCreateStock(true);
                    setIsViewStock(false);
                  }}
                >
                  Create New Stock
                </Button>
              </CardFooter>
            </Card>
            <Toaster position="bottom-center" />
          </div>

          {isCreateStock ? (
            <div className="flex sm:flex-row gap-2 p-4 flex-col items-center justify-center bg-black text-white rounded-xl w-full">
              <form onSubmit={handleNewItemCreate}>
                <div className="flex flex-col gap-2 font-semibold sm:flex-row sm:w-[1000px] w-[400px]">
                  <label className="w-1/2">Product Name</label>
                  <Input
                    required
                    type="text"
                    placeholder="Enter the product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <label className="w-1/2">Product Quantity</label>
                  <Input
                    required
                    type="number"
                    placeholder="Enter the product quantity"
                    value={productQuantity}
                    onChange={(e) => setProductQuantity(Number(e.target.value))}
                  />
                  <Button type="submit" variant="active" className="text-xl">
                    Create
                  </Button>
                </div>
              </form>
            </div>
          ) : null}

          {isviewStock ? (
            <div className="p-4">
              <DataTable columns={columns} data={stock} />
            </div>
          ) : null}
        </div>
      </>
    );
}