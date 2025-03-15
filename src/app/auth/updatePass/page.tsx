"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { z } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";

export default function PasswordUpdate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [password, setPassword] = useState<string>("");
  const passwordSchema = z
    .string()
    .min(8, "Password minimal 8 karakter")
    .max(20, "Password maksimal 20 karakter");
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const handlePassword = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const validatePassword = passwordSchema.safeParse(password);
      if (!validatePassword.success) {
        setErrorPassword(validatePassword.error.issues[0].message);
      }
      setErrorPassword("");
      const response = await fetch("/api/auth/forgotPass", {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      if (!response.ok) {
        toast.error("Terjadi Error di server")
      }
      if (response.ok) {
        toast.success("Password berhasil diganti")
        router.push("/auth/signIn");
      }
    } catch (error) {
      console.error(error);
      alert("Error mungkin telah terjadi");
    }
  };
  return (
    <div className="p-4 sm:p-9flex justify-center items-center">
      <form
        className="flex flex-col gap-6 w-[400px] bg-white rounded-md p-8 shadow-lg"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold">Change Password</h1>
        <p className="text-sm text-gray-500">
          Email: {email || "Tidak ditemukan"}
        </p>

        <Label htmlFor="password">Password Baru</Label>
        <Input
          id="password"
          type={isChecked ? "text" : "password"}
          placeholder="Masukkan password baru"
          value={password}
          onChange={handlePassword}
          className="h-12"
        />
        <div className=" gap-2 items-center flex w-full">
          <Checkbox
            id="check"
            className="self-start"
            checked={isChecked}
            onCheckedChange={(checked) =>
              setIsChecked(checked === "indeterminate" ? false : checked)
            }
          />
          <Label className="text-[13px]" htmlFor="check">
            Show Passsword
          </Label>
        </div>
        <p className="text-red-600 text-sm">{errorPassword}</p>

        <Button type="submit" className="w-full bg-red-600 hover:bg-red-400">
          Update Password
        </Button>
      </form>
    </div>
  );
}
