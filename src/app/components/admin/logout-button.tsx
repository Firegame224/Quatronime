"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const HandleActive = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 1000);
  };

  return (
    <div>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={signOut}
      />
      {pathname.startsWith("/users") ? (
        <div className="w-full flex justify-end">
          <Button onClick={HandleActive} className="bg-red-600 hover:bg-red-400">
            <LogOutIcon />
            <h1>Logout</h1>
          </Button>
        </div>
      ) : (
        <Button onClick={HandleActive}>
          <LogOutIcon />
          <h1>Logout</h1>
        </Button>
      )}
    </div>
  );
}

export function AdminLogoutButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const HandleActive = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(true);
    }, 1000);
};
  return (
    <div className="w-full">
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={signOut}
      />
      <Button
        className="flex gap-3 w-full text-md items-center justify-start text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md hover:bg-white/10"
        variant="ghost"
        onClick={HandleActive}
      >
        <LogOutIcon className="w-6 h-6" />
        <p>Logout</p>
      </Button>
    </div>
  );
}
