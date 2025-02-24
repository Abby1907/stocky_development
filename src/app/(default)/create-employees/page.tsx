"use client";
import { Input } from "@/components/ui/input";
import Navbar from "../components/dashboard/Navbar";
import {  useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/loader/Loader";

export default function CreateEmployees() {
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleCreateEmployee(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
        setIsLoading(true);
        fetch("/api/create-employee",{
            method: "POST",
            headers: {
                contentType: "application/json",
            },
            body: JSON.stringify({ employeeEmail, employeePassword, employeeRole }),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status === true) {
                setIsLoading(false);
                toast.success(data.message);
            } else {
                setIsLoading(false);
                toast.error(data.message);
            }
        })
    } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error("Something went wrong");
    }
    
  }
  return (
    <>
      <Navbar />
      {isLoading && <Loader />}
      <div
        className="container relative left-[50%] top-[50%] rounded-xl
                translate-x-[-50%] sm:w-[500px] sm:h-[500px] bg-black p-4 text-white
                w-[400px] h-[400px] mt-10"
      >
        <div className="p-4 text-center">
          <h1 className="text-2xl font-bold">Create Employees</h1>
        </div>
        <hr></hr>
        <br></br>
        <form onSubmit={handleCreateEmployee}>
          <div className="flex flex-col gap-2">
            <label>Employee&apos;s Email</label>
            <Input
              required
              type="email"
              placeholder="Enter employee's Email ID"
              value={employeeEmail}
              onChange={(e) => setEmployeeEmail(e.target.value)}
            />
            <label>Password</label>
            <Input
              required
              type="password"
              placeholder="Enter Password"
              value={employeePassword}
              onChange={(e) => setEmployeePassword(e.target.value)}
            />
            <label>Select Employee Role</label>
            <Select value={employeeRole} onValueChange={setEmployeeRole}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value="manager" onSelect={() => setEmployeeRole("manager")}>Manager</SelectItem>
                  <SelectItem value="staff" onSelect={() => setEmployeeRole("staff")}>Staff</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit" className="w-full mt-4">
              Create
            </Button>
          </div>
        </form>
        <Toaster position="bottom-center" />
      </div>
    </>
  );
}
