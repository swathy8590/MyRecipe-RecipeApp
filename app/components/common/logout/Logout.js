"use client"
import { ArrowRightCircleIcon, ArrowRightStartOnRectangleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();
    const { data, status } = useSession();
    const logoutFn = () => {

        signOut({ redirect: false }).then(() => {
            router.push("/admin/login");
        });
    }

    if (status === "loading") {
        return <div>Loading</div>
    }

    if (!data) {
        router.push("/admin/login")
        return null
    }
    return (
        <>
            <div className="relative group">
                <button onClick={logoutFn}
                    className=" rounded-sm absolute right-5 text-white px-2"

                ><ArrowRightStartOnRectangleIcon className="size-6 text-blue-500" />

                </button>
                <span className="absolute right-[30px] top-5 transform -translate-x-1/2 -translate-y-full mb-2 px-2 py-1 text-xs bg-black text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    LogOut
                </span>
            </div>
        </>
    );

}