"use client";

import { useForm } from "react-hook-form";
import { useNimeModals } from "../../../hooks/use-store-modal";
import Modal from "../ui/modal";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import toast from "react-hot-toast";


export const AnimeModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nimeModals = useNimeModals();
  const formSchema = z.object({
    title: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/nimes", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        toast.error("Terjadi error di server");
      }
      
      const data = await response.json();
      const anime = data.data

      toast.success("Anime berhasil ditambahkan")
      nimeModals.onClose();
      window.location.assign(`/admin/dashboard/${anime.id}`);
   } catch (error) {
      toast.error("Telah Terjadi error di" + error)
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal
      title="Tambah Anime"
      description="Masukan Judul Anime"
      isOpen={nimeModals.isOpen}
      onClose={nimeModals.onClose}
    >
      <div>
        <div className="space-y-4 py-4 pb-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukan Judul Anime" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              ></FormField>
              <div className="pt-4 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  onClick={nimeModals.onClose}
                  className="bg-transparent text-black hover:bg-gray-400"
                  disabled={isLoading}
                  type="button"
                >
                  Batalkan
                </Button>
                <Button variant="default" type="submit" disabled={isLoading}>
                  {isLoading ? "Loading..." : "Tambahkan"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
