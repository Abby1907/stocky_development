"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "../components/dashboard/Navbar";
import { useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast, { Toaster } from "react-hot-toast";
interface BillTemplate {
  _id: string;
  companyName: string;
  // Add other properties as needed
}
export default function GenerateBill() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [date, setDate] = useState<Date>();
  const [open, setOpen] = useState(false);
  const [sGst, setSGst] = useState("");
  const [cGst, setCGst] = useState("");
  const [iGst, setIGst] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [companyName, setCompanyName] = useState("");
  const [companyGstin, setCompanyGstin] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [prefixBillNumber, setPrefixBillNumber] = useState("");
  const [billTemplateData, setBilltemplateData] = useState<BillTemplate[]>([]);
  const [selectedBillTemplate, setSelectedBilltemplate] = useState("");
  const indianStates = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  useEffect(() => {
    async function getUserDetails() {
      setIsLoading(true);
      fetch("/api/generate-bill", {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setIsLoading(false);
          if (data.status) {
            console.log(data);
            setBilltemplateData(data.billTemplateData);
            if (data.role === "root") {
              setDisabled(false);
            } else {
              setDisabled(true);
            }
          }
        })
        .catch((error) => {
          setIsLoading(false);
          toast.error("Something went wrong!");
        });
    }
    getUserDetails();
  }, []);

  async function handleBillTemplateSubmit() {
    setIsLoading(true);
    fetch("/api/create-bill-template", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({
        companyName: companyName,
        companyGstin: companyGstin,
        companyAddress: companyAddress,
        prefixBillNumber: prefixBillNumber,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        if (data.status) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Internal server error!");
      });
  }
  return (
    <>
      <Navbar />
      {isLoading && <Loader />}
      <header className="flex bg-white shadow px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-800">Generate Bill</h1>
        <div className="flex grow justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"active"} disabled={disabled}>
                Generate Bill Template
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create Bill Template</DialogTitle>
                <DialogDescription>
                  Create your bill template. Click save when you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBillTemplateSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid items-baseline gap-4">
                    <Label htmlFor="value" className="text-left">
                      Company Name
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      required
                    />
                    <Label htmlFor="value" className="text-left">
                      Company GSTIN/UIN
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter Company GST Number"
                      value={companyGstin}
                      onChange={(e) => setCompanyGstin(e.target.value)}
                      required
                    />
                    <Label htmlFor="value" className="text-left">
                      Company Address
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter Company Full Address"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      required
                    />
                    <Label htmlFor="value" className="text-left">
                      Invoice Prefix
                    </Label>
                    <Input
                      type="text"
                      placeholder="Enter Company Bill Prefix"
                      value={prefixBillNumber}
                      onChange={(e) => setPrefixBillNumber(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <div className="container flex flex-col mt-4 bg-white w-[800px] px-6 py-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800">Biller Details</h2>
        <hr />
        <div className="py-2">
          <Label>Select Bill Template</Label>
          <div className="w-[100%]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedBillTemplate || "Select Bill Template"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 max-h-[300px] overflow-y-auto"
                align="start" // Aligns dropdown to the left of button
              >
                <DropdownMenuLabel>Select Bill Template</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={selectedBillTemplate}
                  onValueChange={setSelectedBilltemplate}
                >
                  {billTemplateData.map((template) => (
                    <DropdownMenuRadioItem key={template._id} id={template._id} value={template.companyName}>
                      {template.companyName}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Label>Customer Name / Company Name</Label>
          <Input required placeholder="Enter Customer Name or Company Name" />
          <Label>GSTIN No</Label>
          <Input required placeholder="Enter Customer's GST No" />
          <Label>Address</Label>
          <Input required placeholder="Enter Customer's Address" />
          <Label>City</Label>
          <Input required placeholder="Enter Customer's City" />

          {/* <Label>State</Label> */}
          <Label>ZIP Code</Label>
          <div className="flex gap-4">
            <Input required placeholder="Enter Customer's ZIP" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  {selectedState || "Select State"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-64 max-h-[300px] overflow-y-auto"
                align="start" // Aligns dropdown to the left of button
              >
                <DropdownMenuLabel>Select State</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup
                  value={selectedState}
                  onValueChange={setSelectedState}
                >
                  {indianStates.map((state) => (
                    <DropdownMenuRadioItem key={state} value={state}>
                      {state}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* <Label>Bill Date</Label> */}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                  onClick={() => setOpen(true)}
                >
                  <CalendarIcon />
                  <span>{date ? date.toLocaleDateString() : "Bill Date"}</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Label>Phone Number</Label>
          <Input placeholder="Enter Customer's Phone Number" />

          <h2 className="text-xl font-bold text-gray-800">Product Details</h2>
          <hr />
          <Label>Product Name</Label>
          <Input required placeholder="Enter Product Name" />
          <Label>Quantity</Label>
          <Input required placeholder="Enter Quantity" />
          <Label>HSN Code</Label>
          <Input required placeholder="Enter HSN Code" />
          <Label>Selling Price</Label>
          <Input required placeholder="Enter Selling Price With GST" />
          <div className="flex gap-4 mt-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{sGst ? `${sGst}%` : "S-GST"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select S-GST</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sGst} onValueChange={setSGst}>
                  <DropdownMenuRadioItem value="2.5">
                    2.5%
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="6">6%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="9">9%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="14">14%</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{cGst ? `${cGst}%` : "C-GST"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select C-GST</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={cGst} onValueChange={setCGst}>
                  <DropdownMenuRadioItem value="2.5">
                    2.5%
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="6">6%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="9">9%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="14">14%</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{iGst ? `${iGst}%` : "I-GST"}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Select I-GST</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={iGst} onValueChange={setIGst}>
                  <DropdownMenuRadioItem value="5">5%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="12">12%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="18">18%</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="28">28%</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}
