"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FaGithub, FaSpinner } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { z } from "zod";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function Register() {
  const router = useRouter();
  const emailSchme = z
    .string()
    .min(1, "Email Harus Di Isi")
    .email("Email Tidak Valid");
  const passwordSchme = z
    .string()
    .min(8, "Password Minimal 8 Karakter")
    .max(20, "Password Maksimal 20 Karakter");

  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valEmail = emailSchme.safeParse(value);
    setEmail(value);
    if (!valEmail.success) {
      setEmailError(valEmail.error.issues[0].message);
    } else {
      setEmailError("");
    }
  };
  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const valPassword = passwordSchme.safeParse(value);
    setPassword(value);
    if (!valPassword.success) {
      setPasswordError(valPassword.error.issues[0].message);
    } else {
      setPasswordError("");
    }
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const validateEmail = emailSchme.safeParse(email);
      const validatePassword = passwordSchme.safeParse(password);
      if (!validateEmail.success) {
        setEmailError(validateEmail.error.issues[0].message);
      }
      if (!validatePassword.success) {
        setPasswordError(validatePassword.error.issues[0].message);
      }
      if (!validateEmail.success || !validatePassword.success) {
        return;
      }
      const response = await fetch("/api/auth/signUp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      });
      if (!response.ok) {
        toast.error("Email Sudah Terdaftar");
      }
      if (response.ok) {
        router.push("/auth/signIn");
        toast.success("Akun Berhasil Dibuat");
        return response.json();
      }
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setIsLoading(false)
    }
  };
  return (
    <div className="p-4 sm:p-9 items-center flex justify-center">
      <form
        className="flex flex-col gap-10 w-[400px] bg-white rounded-md p-8 shadow-lg "
        onSubmit={HandleSubmit}
      >
        <div className="w-full flex items-center gap-1">
          <h1 className="text-2xl font-bold">SignUp To</h1>
          <p className="text-xl font-semibold text-red-600">Quatronime</p>
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          <p className="text-[13px] text-gray-600 font-semibold">
            Sign Up With
          </p>
          <div className="flex w-full">
            <Button
              className="w-1/2 bg-transparent border text-black hover:bg-gray-200 rounded"
              onClick={() => {
                signIn("github");
              }}
              type="button"
            >
              <FaGithub size={40} />
              <p>Github</p>
            </Button>
            <Button
              className="w-1/2 bg-transparent border text-black hover:bg-gray-200 rounded"
              onClick={() => {
                signIn("google");
              }}
              type="button"
            >
              <FcGoogle size={40} />
              <p>Google</p>
            </Button>
          </div>
          <p className="text-[13px] text-gray-600 font-semibold">Or</p>
          <Label htmlFor="input" className="self-start">
            Email
          </Label>
          <Input
            id="input"
            placeholder="Masukan Email"
            className="max-w-[350px] h-12 rounded"
            onChange={HandleEmail}
            value={email}
            required
          />
          <p className="text-red-600 text-[13px] font-semibold self-start">
            {emailError}
          </p>
          <Label htmlFor="input1" className="self-start">
            Password
          </Label>
          <Input
            id="input1"
            type={isChecked ? "text" : "password"}
            placeholder="Masukan Password"
            className="max-w-[350px] h-12 rounded"
            onChange={HandlePassword}
            value={password}
            required
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
          <p
            className="text-red-
           text-[13px] font-semibold self-start"
          >
            {passwordError}
          </p>
        </div>
        <Button
          className="w-full bg-red-600 hover:bg-red-400 rounded"
          type="submit"
        >
          {isLoading ? <FaSpinner className="animate-spin" size={20}/> : <p>SignUp</p> }
        </Button>
        <div className="text-[13px] text-gray-600 font-semibold flex w-full justify-center gap-1 items-center">
          <p>Have an account?</p>
          <Link
            href={"/auth/signIn"}
            className="text-[#9e1313] hover:underline"
          >
            SignIn
          </Link>
        </div>
      </form>
    </div>
  );
}
