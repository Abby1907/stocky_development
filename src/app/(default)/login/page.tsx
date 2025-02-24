"use client";
import { Input } from "@/components/ui/input";
import Navbar from "../components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/loader/Loader";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        await fetch("/api/login", {
            method: "POST",
            headers: {
                contentType: "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.status) {
                setIsLoading(false);
                toast.success(data.message);
                window.location.href = "/dashboard";
            } else {
                setIsLoading(false);
                toast.error(data.message);
            }
        })
        .catch((error) => {
            setIsLoading(false);
            toast.error(error.message);
        })
    }
    return (
      <>
        <Navbar />
        {isLoading && <Loader />}
        <div
          className="container relative left-[50%] top-[10%] rounded-xl
                translate-x-[-50%] sm:w-[500px] sm:h-[500px] bg-black p-4 text-white
                w-[400px] h-[400px] mt-10"
        >
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-center">Sign In</h1>
                <hr className="mt-2"></hr>
            </div>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-2">
              <label>Email</label>
              <Input
                required
                type="email"
                placeholder="Enter your Email ID"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Password</label>
              <Input
                required
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button type="submit" variant="secondary">
                Login
              </Button>
            </div>
            <p className="text-center mt-4">
              Do not have an account?{" "}
              <Link href="/register" className="underline">
                Sign Up
              </Link>
            </p>
            <p className="text-center mt-2">
              Log in as Employee account? {" "}
              <Link href="/employee-login" className="underline">
                Employee Login
              </Link>
            </p>
          </form>
          <Toaster position="bottom-center" />
        </div>
      </>
    );
}