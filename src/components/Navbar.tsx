"use client";

import { FaShirt } from "react-icons/fa6";

import Link from "next/link";

import { useConsumer } from "../app/context/ConsumerContext";

import { Button } from "./ui/button";

export default function Navbar() {
  const { isLogged } = useConsumer();

  return (
    <nav className="h-14 w-full bg-primary flex items-center justify-center gap-3">
      <div className="justify-self-center">
        <Link href="/" className="flex items-center justify-center gap-3">
          <FaShirt color="#fff" size={24} />
          <p className="text-white font-bold text-2xl">Roupa Roupousa</p>
        </Link>
      </div>

      <div className="justify-self-end">
        {!isLogged ? (
          <Link href="/login">Login</Link>
        ) : (
          <Button onClick={() => console.log("LOGOUT")}>Logout</Button>
        )}
      </div>
    </nav>
  );
}
