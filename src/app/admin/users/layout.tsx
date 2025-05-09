import { AuthSession } from "@/libs/session";
import { redirect } from "next/navigation";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({
  children,

}: LayoutProps) {
  const session = await AuthSession();
  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="admin bg-[#121212] text-white min-h-screen">
      {children}
    </div>
  );
}
