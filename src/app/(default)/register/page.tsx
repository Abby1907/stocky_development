"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    async function handleRegister (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await fetch ("/api/register", {
            method: "POST",
            headers: {
                contentType: "application/json"
            },
            body: JSON.stringify({name, email, password, confirmPassword})
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status) {
                toast.success("Register Succesful.")
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
                translate-x-[-50%] sm:w-[500px] sm:h-[550px] bg-black p-4 text-white
                w-[400px] h-auto mt-10"
        >
          <div className="mb-6">
                <h1 className="text-3xl font-bold text-center">Sign Up</h1>
                <hr className="mt-2"></hr>
            </div>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-2">
              <label>Name</label>
              <Input required type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
              <label>Email</label>
              <Input required type="email" placeholder="Enter your Email ID" value={email} onChange={(e) => setEmail(e.target.value)} />
              <label>Password</label>
              <Input required type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>Confirm Password</label>
              <Input required type="password" placeholder="Re-enter password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              <Button type="submit" variant="secondary">Register</Button>
            </div>
            <p className="text-center mt-4">Already have an account? <Link href="/login" className="underline">Login</Link></p>
            <p className="text-center mt-4">After registration user verification will be done within 24 hours to enable login</p>
          </form>
        <Toaster position="bottom-center" />
        </div>
      </>
    );
}