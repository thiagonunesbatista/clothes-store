"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConsumer } from "../../context/ConsumerContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [showResetNumberInput, setShowResetNumberInput] = useState(false);
  const [resetNumber, setResetNumber] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setIsLoading, setConsumerInfo, setIsLogged } = useConsumer();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleConfirmPassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  const handleCodeSubmit = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();

    if (
      resetNumber.length &&
      newPassword.length &&
      newPassword === confirmPassword
    ) {
      try {
        setIsLoading(true);

        const url = `http://localhost:3004/users/reset-password`;

        const resetResult = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            recoveryCode: resetNumber,
            newPassword,
          }),
        });

        if (resetResult.ok) {
          window.location.href = "/login";
        } else {
          alert("Reset Failed");
        }
      } catch (error) {
        console.error(error);
        alert("An error occurred during login.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResetSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (email.length) {
      try {
        setIsLoading(true);

        const url = `http://localhost:3004/users/request-reset`;

        let resetResult = await fetch(url, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        });

        let parsedReset = await resetResult.json();

        if (resetResult.ok) {
          setShowResetNumberInput(true);
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

  const handleResetNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setResetNumber(event.target.value);
  };

  return (
    <div className="max-w-[500px] mx-auto py-40 flex flex-col gap-3">
      <h1>Reset Password</h1>

      {showResetNumberInput ? (
        <form className="flex flex-col gap-5">
          <Input
            type="text"
            placeholder="Digite o código de recuperação de email"
            value={resetNumber}
            onChange={handleResetNumberChange}
          />

          <Input
            type="password"
            placeholder="Digite a nova senha"
            value={newPassword}
            onChange={handleNewPassword}
          />

          <Input
            type="password"
            placeholder="Confirme nova senha"
            value={confirmPassword}
            onChange={handleConfirmPassword}
          />

          <Button onClick={handleCodeSubmit}>Validar código</Button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} className="flex flex-col gap-8">
          <Input
            type="email"
            placeholder="Digite seu Email"
            value={email}
            onChange={handleEmailChange}
          />

          <Button type="submit">Resetar Senha</Button>
        </form>
      )}
    </div>
  );
}
