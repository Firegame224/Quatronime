"use client";

import UploadImg from "@/app/components/admin/upload-img";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { ImageDown, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";

interface SettingsUserFormProps {
  data: User;
}

const formSchema = z.object({
  image: z.string().nullable().optional(),
  name: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
});

type SettingsUserValues = z.infer<typeof formSchema>;

const SettingUsersForm: React.FC<SettingsUserFormProps> = ({ data }) => {
  const { data: session, update } = useSession();
  const form = useForm<SettingsUserValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: data?.image ?? "",
      name: data?.name ?? "",
      email: data?.email ?? "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [onChangeImage, setOnChangeImage] = useState(false);

  const handleSubmit = async (values: SettingsUserValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/${session?.user.id}/profile`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Terjadi Kesalahan saat mengubah Profile");
      }
      if (response.ok) {
        const UpdateUser = await response.json();

        await update({
          ...session,
          user: {
            ...session?.user,
            email: UpdateUser.user.email,
            name: UpdateUser.user.name,
            image: UpdateUser.user.image,
          },
        });
        setIsActive(false);
        toast.success("Profile berhasil di ubah");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Telah Terjadi error di catch handle Submit" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key="form"
          initial={{ opacity: 0, scale: 0.9, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="flex-col justify-center h-full gap-2 items-center w-full"
        >
          <div className="w-full justify-center items-center flex">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-14 max-w-2xl items-center flex-1 text-white"
              >
                <div className="flex gap-4 flex-col justify-center items-center">
                  {onChangeImage && isActive ? (
                    <>
                      <motion.div
                        key="UploadImage"
                        initial={{ opacity: 0, scale: 0.9, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="relative"
                      >
                        <FormField
                          control={form.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem className="flex flex-col justify-center w-full items-center">
                              <FormLabel>Image</FormLabel>
                              <FormControl>
                                <UploadImg
                                  disabled={isLoading}
                                  onChange={(url) => field.onChange(url)}
                                  onRemove={() => field.onChange("")}
                                  value={field.value ? [field.value] : []}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <Button
                          type="button"
                          size={"icon"}
                          className="absolute bottom-0 right-0 border-none bg-red-600 shadow-none text-xl hover:bg-red-400 text-white items-center flex rounded-sm "
                          onClick={() => setOnChangeImage(false)}
                        >
                          <X height={20} width={20} />
                        </Button>
                      </motion.div>
                    </>
                  ) : (
                    <>
                      {isActive && (
                        <Button
                          type="button"
                          onClick={() => setOnChangeImage(true)}
                          className="gap-2 border-none bg-red-600 shadow-none text-xl hover:bg-red-400 text-white items-center flex rounded-sm justify-center"
                        >
                          <ImageDown height={20} width={20} />
                          <p className="text-sm">Ganti Gambar</p>
                        </Button>
                      )}
                    </>
                  )}
                  <div className="w-full justify-center items-center gap-2 flex flex-col">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem className="w-[90%] md:w-[40%]">
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Nama Kamu"
                              disabled={!isActive}
                              {...field}
                              value={field.value ? field.value : ""}
                              className="w-full resize-none"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="w-[90%] md:w-[40%]">
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Email kamu"
                              disabled
                              {...field}
                              value={field.value ? field.value : ""}
                              className="w-full resize-none"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-full justify-center items-center gap-2 flex">
                  {isActive ? (
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        className="hover:bg-gray-500"
                        onClick={() => setIsActive(false)}
                      >
                        Batal
                      </Button>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-red-600 hover:bg-red-300"
                      >
                        {isLoading ? "Loading..." : "Simpan"}
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="flex bg-red-600 hover:bg-red-500"
                      onClick={() => setIsActive(true)}
                    >
                      Edit Profil
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default SettingUsersForm;