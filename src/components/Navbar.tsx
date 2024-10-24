"use client";

import { useEffect } from "react";
import { FaShirt } from "react-icons/fa6";
import Link from "next/link";
import { useConsumer } from "../app/context/ConsumerContext";
import { Button } from "./ui/button";

export default function Navbar() {
  const { isLogged, consumerInfo, setIsLogged, setConsumerInfo } =
    useConsumer();

  useEffect(() => {
    const savedConsumer = localStorage.getItem("savedConsumer");
    if (savedConsumer) {
      const parsedData = JSON.parse(savedConsumer);
      setConsumerInfo(parsedData);
      setIsLogged(parsedData.isLogged);
    }
  }, [setConsumerInfo, setIsLogged]);

  const handleLogout = () => {
    setIsLogged(false);
    setConsumerInfo({});
    localStorage.removeItem("savedConsumer");
    window.location.href = "/";
  };

  return (
    <nav className="h-14 w-full bg-primary flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3">
        <FaShirt className="text-white" size={24} />
        <p className="text-white font-bold text-xl sm:text-2xl">
          Roupa Roupousa
        </p>
      </Link>

      <div className="flex items-center gap-4">
        {isLogged ? (
          <>
            <span className="text-white hidden sm:inline">
              Olá, {consumerInfo.name}
            </span>
            <Button onClick={handleLogout} variant="secondary" size="sm">
              Logout
            </Button>
          </>
        ) : (
          <Button asChild variant="secondary" size="sm">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
