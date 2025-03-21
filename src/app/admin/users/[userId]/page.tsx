import HeadingNav from "@/components/ui/heading";
import UsersForm from "../components/ui/user-settings-form";
import Link from "next/link";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";

interface UsersPageProps {
  params: { userId: string };
}
export default async function UserSettingPage({ params }: UsersPageProps) {
  const userId = params.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return (
    <div className="w-full min-h-screen items-center p-5">
      <div className="w-full flex justify-between items-center">
        <HeadingNav title="User Setting" description="Setting User data" />
        <Link
          href="/admin/users"
          className={
            "hover:underline text-[#9e1313] dark:hover:text-white transition duration-500 ease-in-out"
          }
        >
          Back
        </Link>
      </div>
      <div className="w-full">
        <UsersForm data={user as User} />
      </div>
    </div>
  );
}
