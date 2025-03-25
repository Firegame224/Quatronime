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
import { User } from "@prisma/client";
import { Trash2Icon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import UserPopover from "./user-popover";


interface UsersFormProps {
  data: User;
}
const formSchema = z.object({
  role: z.string().min(1).optional(),
});

type KarakterFormValues = z.infer<typeof formSchema>;

const UsersForm: React.FC<UsersFormProps> = ({ data }) => {
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
      const response = await fetch(`/api/users/${params.userId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      });
      if (!response.ok) {
        toast.error("Terjadi error pada server di method Delete user");
      }
      if (response.ok) {
        toast.success("Data user Berhasil dihapus");
        router.refresh();
        router.push("/admin/users");
      }
    } catch (error) {
      console.error("Error di method Delete User" + error);
    } finally {
      setIsLoading(false);
    }
  };
  const onSubmit = async (data: KarakterFormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${params.userId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Gagal mengubah role user");
      }
      if (response.ok) {
        toast.success("Role User berhasil diubah");
        router.refresh();
        router.push(`/admin/users`);
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
        <HeadingNav title="Settings" description="Manage user settings" />
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
            {/* User Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="max-w-[200px] flex flex-col gap-1">
                  <FormLabel>Role user</FormLabel>
                  <FormControl>
                    <UserPopover sellectedRole={field.value ? field.value : ""} onSelect={field.onChange}/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Save */}
          </div>
          <Button disabled={isLoading} type="submit">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
};

export default UsersForm;
