/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { useSession } from "next-auth/react";


export default function Login() {
  const Router = useRouter();
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

  const { data: session } = useSession();
  const OauthGoogle = async () => {
    await signIn("google",{callbackUrl:"/"})
  };
  const OauthGithub = async () => {
    await signIn("github",{callbackUrl:"/"})
  };
  const HandleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError("");
  };
  const HandlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    setPasswordError("");
  };

  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (response?.error) {
        toast.error("Email atau Password Salah");
      } else {
        toast.success("Berhasil Login");
        Router.push("/");
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };
  if (session) {
    Router.push("/")
  }
  return (
    <div className="p-4 sm:p-9 items-center flex justify-center">
      <form
        className="flex flex-col gap-10 w-[400px] bg-white rounded-md p-8 shadow-lg "
        onSubmit={HandleSubmit}
      >
        <div className="w-full flex items-center gap-1">
          <h1 className="text-2xl font-bold">SignIn To</h1>
          <p className="text-xl font-semibold text-red-600">Quatronime</p>
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          <p className="text-[13px] text-gray-600 font-semibold">
            Sign In With
          </p>
          <div className="flex w-full">
            <Button
              className="w-1/2 bg-transparent border text-black hover:bg-gray-200"
              onClick={OauthGithub}
              type="button"
            >
              <FaGithub size={40} />
              <p>Github</p>
            </Button>
            <Button
              className="w-1/2 bg-transparent border text-black hover:bg-gray-200"
              onClick={OauthGoogle}
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
            className="max-w-[350px] h-12"
            onChange={HandleEmail}
            value={email}
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
            className="max-w-[350px] h-12"
            onChange={HandlePassword}
            value={password}
            required
          />
          <div className="flex w-full justify-between items-center">
            <div className="w-1/2 gap-2 items-center flex">
              <Checkbox
                id="check"
                checked={isChecked}
                onCheckedChange={(checked) =>
                  setIsChecked(checked === "indeterminate" ? false : checked)
                }
              />
              <Label className="text-[13px]" htmlFor="check">
                Show Passsword
              </Label>
            </div>
            <p className="text-red-600 text-[13px] font-semibold self-start">
              {passwordError}
            </p>
            <Link
              className="text-[13px] hover:underline"
              href={"/auth/forgotPassword"}
            >
              Forgot your Password?
            </Link>
          </div>
        </div>
        <Button className="w-full bg-red-600 hover:bg-red-400 " type="submit">
          <p>SignIn</p>
        </Button>
        <div className="text-[13px] text-gray-600 font-semibold flex w-full justify-center gap-1 items-center">
          <p>Don't have an account?</p>
          <Link
            href={"/auth/signUp"}
            className="text-[#9e1313] hover:underline"
          >
            SignUp
          </Link>
        </div>
      </form>
    </div>
  );
}