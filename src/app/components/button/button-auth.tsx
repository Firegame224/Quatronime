/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useSession } from "next-auth/react";
import LogOutbutton from "./button-dash";
import ButtonSign from "./button-sign";


export default function SessionNav() {
  const { data: session, status } = useSession();

  return (
    <>
      {status === "unauthenticated" ? (
        <ButtonSign />
      ) : (
        <LogOutbutton />
      )}
    </>
  );
}
