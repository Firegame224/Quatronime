"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

export default function FormEmailUsers() {
  const [formData, setFormData] = useState({
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const onChangeHandler = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const HandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch(`/api/send-email`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          message: formData.message,
          fromEmail: session?.user.email,
        }),
      });
      if (!response.ok) {
        toast.error("Gagal mengirim email");
      }
      if (response.ok) {
        toast.success("Email berhasil di kirim");
        setFormData({ message: "" });
        router.push("/");
      }
    } catch (error) {
      toast.error("Error Terjadi di catch email sender" + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full h-full justify-center flex">
      <form
        className="flex flex-col gap-10 w-[400px] bg-white rounded-md p-8 shadow-lg "
        onSubmit={HandleSubmit}
      >
        <div className="w-full flex items-center gap-1">
          <h1 className="text-xl font-bold">Kirim Pesan ke admin</h1>
          <p className="text-xl font-semibold text-red-600">Quatronime</p>
        </div>
        <div className="w-full flex flex-col gap-3 items-center">
          <section className="w-full h-20 bg-red-600 flex items-center gap-3 p-3 rounded-md justify-center">
            <Image
              src={
                session?.user.image
                  ? session?.user.image
                  : "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
              }
              className="rounded-full"
              width={70}
              height={70}
              alt="Belum kerender"
            />
            <div className="flex flex-col w-full h-full justify-center">
              {session?.user.name ? (
                <p className="text-white font-semibold">
                  {session?.user.name ? session.user.name : session?.user.email}
                </p>
              ) : (
                <div className="w-24 h-4 bg-gray-500 font-semibold animate-pulse"></div>
              )}
              <p className="text-xs text-gray-200">
                {new Date().toLocaleDateString()}
              </p>
            </div>
          </section>
          <Label htmlFor="input1" className="self-start">
            Pesan
          </Label>
          <Textarea
            id="input1"
            name="message"
            className="max-w-[350px] h-12"
            onChange={onChangeHandler}
            value={formData.message}
          />
        </div>
        <Button
          className="w-full items-center bg-red-600 hover:bg-red-400 "
          type="submit"
        >
          {isLoading ? (
            <FaSpinner className="w-6 h-6 animate-spin" />
          ) : (
            <>
              Kirim <Send className="w-6 h-6" />
            </>
          )}
        </Button>
      </form>
    </div>
  );
}