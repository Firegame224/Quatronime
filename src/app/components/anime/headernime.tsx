import Link from "next/link";
import React from "react";

interface Params {
  Teks: string;
  href: string;
  link: string;
}

export default function Headernime({ Teks, href , link }: Params) {
  return (
    <div className="justify-between items-center flex text-sm md:text-xl font-bold my-5 mx-5 md:mx-28">
      <h1 className="text-[#9e1313] stroke-light-400 stroke-2">{Teks}</h1>
      <Link
        href={link}
        className=" hover:underline text-[#9e1313] dark:hover:text-white transition duration-500 ease-in-out"
      >
        {href}
      </Link>
    </div>
  );
}
