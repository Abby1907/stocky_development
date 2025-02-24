"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Navbar() {
    return (
      <div className="p-4 bg-black text-white font-semibold flex ">
        <Link href={"/dashboard"}>
          <h1 className="cursor-pointer">Home</h1>
        </Link>
        <div className="flex grow justify-end gap-4">
              {/* <Link href={"/api/logout"}> */}
                <Button className="w-[100px]" variant={"destructive"} onClick={async () => {
                  const res = await fetch("/api/logout", {method: "GET"});
                  if(res.redirected) {
                      window.location.href = res.url;
                  }
              }}>
                Logout
              </Button>
              {/* </Link> */}
        </div>
      </div>
    );
}