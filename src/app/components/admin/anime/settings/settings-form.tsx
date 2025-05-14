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
import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { Anime2 } from "@prisma/client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TypePopover from "./ui/type-popover";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import StatusPopover from "./ui/status-popover";
import { Trash2Icon } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";
import HeadingNav from "@/components/ui/heading";

interface InformationsFormProps {
  data: Anime2;
}

const formSchema = z.object({
  title: z.string().min(1).nullable().optional(),
  imageUrl: z.string().nullable().optional(),
  synopsis: z.string().nullable().optional(),
  ranking: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  source: z.string().nullable().optional(),
  score: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  type: z.string().nullable().optional(),
  episodes: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  aired: z.string().nullable().optional(),
  popularity: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  members: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  favorites: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z.number().optional()
  ),
  status: z.string().nullable().optional(),
  trailer: z.string().nullable().optional(),
});

type InformationValues = z.infer<typeof formSchema>;

const InformationForm: React.FC<InformationsFormProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<InformationValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title ?? "",
      imageUrl: data?.imageUrl ?? "",
      synopsis: data?.synopsis ?? "",
      ranking: data?.ranking ?? 0,
      source: data?.source ?? "",
      score: data?.score ?? 0,
      type: data?.type ?? "",
      episodes: data?.episodes ?? 0,
      aired: data?.aired ?? "",
      popularity: data?.popularity ?? 0,
      members: data?.members ?? 0,
      favorites: data?.favorites ?? 0,
      status: data?.status ?? "",
      trailer: data?.trailer ?? "",
    },
  });
  const params = useParams();
  const router = useRouter();
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
        router.push(`/admin/`);
      }
    } catch (error) {
      console.error("Error di method Delete anime" + error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSubmit = async (values: InformationValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/nimes/${params.animeId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        toast.error("Terjadi error di server !response.ok");
      }
      if (response.ok) {
        toast.success("Informasi Anime berhasil diubah");
        router.refresh();
      }
    } catch (error) {
      toast.error("Telah Terjadi error di catch handle Submit" + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <div className="flex-col justify-center h-full md:justify-end gap-4 items-center md:grid md:grid-cols-2 w-full">
        <div className="w-full md:w-1/2 items-center justify-center md:self-start flex flex-col gap-3">
        <HeadingNav title="Settings" description="Manage Anime settings" />
          <Image
            src={
              data?.imageUrl ||
              "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
            }
            alt={data?.title}
            className="w-full h-auto object-cover"
            width={250}
            height={250}
          />
          <Label>Anime Cover/Image</Label>
        </div>
        <div className="w-full max-w-2xl">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-10 max-w-2xl items-center flex-1"
            >
              <div className="flex gap-4 items-center justify-between relative">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Judul</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Judul Anime"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button
                  variant={"destructive"}
                  type="button"
                  size={"icon"}
                  onClick={() => {
                    setIsOpen(true);
                  }}
                  className="absolute right-0 bottom-0"
                  disabled={isLoading}
                >
                  <Trash2Icon />
                </Button>
              </div>
              <div className="flex gap-4 flex-col">
                {/* Synopsis Input*/}
                <FormField
                  control={form.control}
                  name="synopsis"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sinopsis</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Masukan Sinopsis Anime"
                          disabled={isLoading}
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full h-[100px] resize-none"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Episode Input*/}
                <FormField
                  control={form.control}
                  name="episodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Episodes</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Jumlah Episodes"
                          type="number"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Ranking Input*/}
                <FormField
                  control={form.control}
                  name="ranking"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ranking</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Ranking Anime"
                          type="number"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Score Input*/}
                <FormField
                  control={form.control}
                  name="score"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Score</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Score Anime"
                          type="number"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Popularity Input*/}
                <FormField
                  control={form.control}
                  name="popularity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Popularity</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Popularity Anime"
                          type="number"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Favorites Input*/}
                <FormField
                  control={form.control}
                  name="favorites"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Favorites</FormLabel>
                      <FormControl>
                        <Input
                          disabled
                          type="number"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Aired Input*/}
                <FormField
                  control={form.control}
                  name="aired"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aired</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Aired (Rilis-Tamat) Anime"
                          type="text"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Source Input*/}
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Diadaptasi dari ?"
                          type="text"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Members Input*/}
                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Members</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Members Anime"
                          type="number"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Trailer Input*/}
                <FormField
                  control={form.control}
                  name="trailer"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trailer Url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukan Link Trailer Anime"
                          type="text"
                          {...field}
                          value={field.value ? field.value : ""}
                          className="min-w-[200px] md:w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {/* Type Input*/}
                <div className="grid grid-cols-2 gap-2 md:gap-2 md:grid-cols-3 justify-center items-center">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem className="max-w-[200px] flex flex-col gap-1">
                        <FormLabel>Type</FormLabel>
                        <FormControl>
                          <TypePopover
                            sellectedType={field.value ? field.value : ""}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                        <Label className="text-xs md:text-[13px] text-center">
                          {field.value
                            ? `Type yg dipilih adalah ${field.value}`
                            : "Belum ada Type yg dipilih"}
                        </Label>
                      </FormItem>
                    )}
                  />
                  {/* status Popover*/}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem className="max-w-[200px] flex flex-col gap-1">
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <StatusPopover
                            sellectedStatus={field.value ? field.value : ""}
                            onSelect={field.onChange}
                          />
                        </FormControl>
                        <Label className="text-xs md:text-[13px] text-center">
                          {field.value
                            ? `Status yg dipilih adalah ${field.value}`
                            : "Belum ada Status yg dipilih"}
                        </Label>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem className="max-w-[200px] flex flex-col">
                        <FormLabel>Cover Anime Image</FormLabel>
                        <FormControl>
                          <UploadImg
                            disabled={isLoading}
                            onChange={(url) => field.onChange(url)}
                            onRemove={() => field.onChange("")}
                            value={field.value ? [field.value] : []}
                          />
                        </FormControl>
                        <Label className="text-xs md:text-[13px] text-center">
                          Upload Image disini
                        </Label>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? "Loading..." : "Simpan"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default InformationForm;
