"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import {z} from "zod"
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function Login() {
    const [email, setEmail] = useState<string>("")
    const emailSchme = z.string().min(1, "Harap isi email").email("Email tidak valid")
    const [errorEmail, setErrorEmail] = useState<string>("")
    const router = useRouter();
    const handleEmail = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        const valEmail = emailSchme.safeParse(value);
        if (!valEmail.success) {
            setErrorEmail(valEmail.error.issues[0].message);
        } else{
        setErrorEmail("");}
    }
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const valEmail = emailSchme.safeParse(email);
        if (!valEmail.success) {
            setErrorEmail(valEmail.error.issues[0].message);
            return;
        } else {
            setErrorEmail("");
        }
        try {
           const response = await fetch("/api/auth/checkMail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body : JSON.stringify({email : email})}
           )
           if (!response.ok) {
            toast.error("Maaf email yg anda masukan mungkin tidak ada")
           }
           if (response.ok) {
            toast.success("Berhasil")
            router.push(`/auth/updatePass?email=${encodeURIComponent(email)}`);
            return response.json();
           }
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <div className=" p-9 items-center flex justify-center">
      <form
        className="flex flex-col gap-10 w-[400px] bg-white rounded-md p-8 shadow-lg "
        onSubmit={handleSubmit}
      >
        <div className="w-full flex items-center gap-1">
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-xl font-semibold text-red-600">Quatronime</p>
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          <Label htmlFor="input" className="self-start">
            Email
          </Label>
          <Input
            id="input"
            placeholder="Masukan Email"
            className="max-w-[350px] h-12"
            onChange={handleEmail}
            value={email}
          />
        <p className="text-red-600 text-[13px] self-start">{errorEmail}</p>
        <Button className="w-full bg-red-600 hover:bg-red-400 " type="submit">
          <p>SignIn</p>
        </Button>
        </div>
      </form>
    </div>
  );
}
