
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anime2,} from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface SettingsFormProps {
  data: Anime2
}
const formSchema = z.object({
  title: z.string().min(1).nullable().optional(),
});

type KarakterFormValues = z.infer<typeof formSchema>;

const KarakterForm: React.FC<SettingsFormProps> = ({ data }) => {
  const form = useForm<KarakterFormValues>({
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
      const response = await fetch(`/api/nimes/${params.animeId}/title`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Terjadi error pada server di method Delete anime");
      }
      if (response.ok) {
        toast.success("Data Anime Berhasil dihapus");
        router.refresh();
        router.push("/admin/dashboard");
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
      const response = await fetch(`/api/nimes/${params.animeId}/title`, {
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
        toast.success("Judul Anime berhasil diubah");
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
      <div className="p-5 flex items-center justify-between">
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
          className="space-y-8 w-full"
        >
          <div className="grid gird-cols-3 gap-8">
            {/* Karakter Anime name */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Judul Anime</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Title Anime"
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
            {/* Karakter Anime Cover */}

          </div>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

export default KarakterForm;
