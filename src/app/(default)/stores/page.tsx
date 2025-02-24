"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "../components/dashboard/Navbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Loader from "../components/loader/Loader";
interface StoreArray {
    _id: string;
    store_name: string;
    address: string;
    store_type: string;
    employee_number: string;
    gst_number: string;
    store_id: string;
    user_id: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
interface Store {
    _id: string;
    store_name: string;
    address: string;
    data?: StoreArray[];
}

export default function Stores() {
    const [stores, setStores] = useState<Store[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        async function getStores () {
            try {
                setIsLoading(true);
                const {data} = await axios.get("/api/stores");
                setStores(data.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        }
        getStores();
    },[]);
    return (
        <>
            <Navbar />
            {isLoading && <Loader />}
            <div className="flex sm:flex-row gap-4 p-4 flex-col items-center justify-center">
                {stores?.length === 0 ?
                <> 
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold text-center text-red-600">No Stores Found !</CardTitle><hr />
                        </CardHeader>
                        <CardContent></CardContent>
                        <CardFooter className="justify-center">
                            <Link href={"/create-store"}>
                                <Button className="w-[100px]">Create Store</Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </>
                 :
                    stores?.map((store: Store, index: number) => {
                    return (
                        <Card key={index} className="w-[400px]">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold text-center">{store.store_name}</CardTitle><hr />
                                <CardDescription className="text-center">{store.address}</CardDescription>
                            </CardHeader>
                            <CardContent></CardContent>
                            <CardFooter className="justify-center">
                                <Link href={`/stores/${store._id}`}>
                                    <Button className="w-full">View Details</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </>
    );
}