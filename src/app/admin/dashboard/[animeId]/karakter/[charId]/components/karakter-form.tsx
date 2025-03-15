"use client";

import UploadImg from "@/app/components/admin/upload-img";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import HeadingNav from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Karakter } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface KarakterFormProps {
  data: Karakter | null;
}
const formSchema = z.object({
  name: z.string().min(1).nullable().optional(),
  imageUrl: z.string().min(1, "Minimal upload 1 gambar").nullable().optional(),
  role: z.string().min(1).nullable().optional(),
  cover: z.string().min(1).nullable().optional(),
});

type KarakterFormValues = z.infer<typeof formSchema>;

const KarakterForm: React.FC<KarakterFormProps> = ({ data }) => {
  const form = useForm<KarakterFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name ?? "",
      imageUrl: data?.imageUrl ?? "",
      role: data?.role ?? "",
      cover: data?.cover ?? "",
    },
  });
  const params = useParams();
  const router = useRouter();
  const charId = params.charId
  const [isopen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const titleButton = charId ? "Update Data" : "Tambahkan Karakter";
  const animeId = parseInt(params.animeId as string, 10);
  const isi = charId ? "Edit data Karakter" : "Tambah data Karakter"
  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/nimes/${params.animeId}/character/${params.charId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast.error("Terjadi error pada server di method Delete anime");
      }
      if (response.ok) {
        toast.success("Data Anime Berhasil dihapus");
        router.refresh();
        router.push(`/admin/dashboard/${params.animeId}/karakter`);
      }
    } catch (error) {
      console.error("Error di method Delete anime" + error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: KarakterFormValues) => {
    try {
      setIsLoading(true);      
      const method = charId ? "PATCH" : "POST";
      const url = charId
        ? `/api/nimes/${animeId}/character/${charId}`
        : `/api/nimes/${animeId}/character`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Terjadi kesalahan: ${response.statusText}`);
      }
      if (response.ok){
      toast.success("Berhasil menyimpan data karakter");
      router.push(`/admin/dashboard/${animeId}/karakter`);
      }
    } catch (error) {
      toast.error(`Terjadi error di server: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isopen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="p-5 flex items-center justify-between">
        <HeadingNav title="Karakter" description={isi} />
        {charId? <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={isLoading}
        >
          <Trash2Icon />
        </Button>: null}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="grid gird-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Karakter</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nama Karakter"
                      disabled={isLoading}
                      {...field}
                      value={field.value ?? ""}
                      className="max-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role Karakter (MC atau Figuran dll)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Role Karakter"
                      disabled={isLoading}
                      {...field}
                      value={field.value ?? ""}
                      className="max-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Cover */}
            <FormField
              control={form.control}
              name="cover"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover (Voice Actor)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Voice actor"
                      disabled={isLoading}
                      {...field}
                      value={field.value ?? ""}
                      className="max-w-[200px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* image */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image karakter</FormLabel>
                  <FormControl>
                    <UploadImg
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange("")}
                      disabled={isLoading}
                      value={field.value ? [field.value] : []}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit">
            {titleButton}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default KarakterForm;
