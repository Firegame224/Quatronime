/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { cn } from "../../../../lib/utils";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React from "react";

export default function MainNavAdmin({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const routes = params ? [
    {
      href: `/admin/dashboard/${params.animeId}`,
      label: "Informations",
      active: pathname === `/admin/dashboard/${params.animeId}`,
    },
    {
      href: `/admin/dashboard/${params.animeId}/settings`,
      label: "Settings",
      active: pathname === `/admin/dashboard/${params.animeId}/settings`,
    }, {
      href: `/admin/dashboard/${params.animeId}/karakter`,
      label: "Karakter",
      active: pathname === `/admin/dashboard/${params.animeId}/karakter`,
    }, {
      href: `/admin/dashboard/${params.animeId}/genres`,
      label: "Genres",
      active: pathname === `/admin/dashboard/${params.animeId}/genres`,
    }
  ] : [];
  return (
    <nav className={cn("flex items-center justify-center gap-5 w-full", className)}>
      {routes.map((route) => {
        return (
          <Link
            href={route.href}
            key={route.href}
            className={cn(
              "text-sm font-medium text-gray-500 dark:text-gray-400 transition-colors hover:text-red-500",
              route.active ? "text-red-500 dark:text-white" : "text-gray-500"
            )}
          >
            <p>{route.label}</p>
          </Link>
        );
      })}
    </nav>
  );
}
