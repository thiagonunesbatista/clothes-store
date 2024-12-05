"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConsumer } from "../context/ConsumerContext";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsLoading, setConsumerInfo, setIsLogged } = useConsumer();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (email.length && password.length) {
      try {
        setIsLoading(true);

        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/login`;

        let loginResult = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        let parsedLogin = await loginResult.json();

        if (loginResult.ok) {
          setConsumerInfo(parsedLogin);
          setIsLogged(true);
          localStorage.setItem(
            "savedConsumer",
            JSON.stringify({
              ...parsedLogin,
              isLogged: true,
            })
          );
          window.location.href = "/";
        } else {
          alert("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred during login.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-[500px] mx-auto py-40 flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Faça o Seu Login</h1>

      <form className="flex gap-4 flex-col" onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Digite seu Email"
          value={email}
          onChange={handleEmailChange}
        />

        <Input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={handlePasswordChange}
        />

        <Button type="submit">Login</Button>
      </form>

      <Link href="/login/reset-password">Esqueci a Senha</Link>
    </div>
  );
}
