
"use client";

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
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anime2,} from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import GenresToggle from "./ui/toggle-genres";

interface SettingsFormProps {
  data: Anime2
}
const formSchema = z.object({
  genres: z.string().array().optional(), // array
});

type GenresFormValues = z.infer<typeof formSchema>;

const GenresForm: React.FC<SettingsFormProps> = ({ data }) => {
  const form = useForm<GenresFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: data,
  });
  const params = useParams();
  const router = useRouter();
  const [isopen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/nimes/${params.animeId}/genres`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Terjadi error pada server di method Genre Anime");
      }
      if (response.ok) {
        toast.success("Genre Berhasil dihapus");
        router.refresh();
        router.push(`/admin/dashboard/${params.animeId}`);
      }
    } catch (error) {
      console.error("Error di method Delete Genre" + error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: GenresFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/nimes/${params.animeId}/genres`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Terjadi error di server");
      }
      if (response.ok) {
        toast.success("Genre Anime berhasil ditambahkan");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi error di server" + error);
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
      <div className="p-5 flex items-center justify-between w-full">
        <HeadingNav title="Settings" description="Manage Anime settings" />
        <Button
          variant={"destructive"}
          size={"icon"}
          onClick={() => {
            setIsOpen(true);
          }}
          disabled={isLoading}
        >
          <Trash2Icon />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full p-5 bg-gray-100 h-full"
        >
          <div className="grid gird-cols-3 gap-8 ">
            {/* Karakter Anime name */}
            <FormField
              control={form.control}
              name="genres"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Pilih Genre Anime</FormLabel>
                  <FormControl>
                    <GenresToggle onSelect={field.value ? field.value : []} setOnSelect={field.onChange}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={isLoading} type="submit" className="bg-[#E50914] hover:bg-red-400">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

export default GenresForm;
