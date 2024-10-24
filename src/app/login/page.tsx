"use client";

import { FormEvent, useState } from "react";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { useConsumer } from "../context/ConsumerContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setIsLoading } = useConsumer();

  const handleEmailChange = (event: InputEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;

    setEmail(value);
  };

  const handlePasswordChange = (event: InputEvent) => {
    const element = event.currentTarget as HTMLInputElement;
    const value = element.value;

    setPassword(value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    if (email.length && password.length) {
      try {
        // setIsLoading(true);

        const url = `http://localhost:3004/users/login`;

        let loginResult = await fetch(url, {
          method: "POST",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        });

        let parsedLogin = await loginResult.json();

        console.log("parsedLogin");
        console.log(parsedLogin);
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-[500px] mx-auto py-40 flex flex-col gap-3">
      <h1>Faça o Seu Login</h1>
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

        <Button>Login</Button>
      </form>
    </div>
  );
}
