import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export const AuthSession = async () => {
    const Usersession = await getServerSession(authOptions)
    return Usersession?.user
}

