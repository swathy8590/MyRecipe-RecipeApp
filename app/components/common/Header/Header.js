"use client";

import { Bars3Icon, EyeDropperIcon, ListBulletIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Logout from "../logout/Logout";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function Header({ children }) {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname(); // usePathname instead of pathname
    const { data, status } = useSession();

    const openFn = () => {
        setOpen(!open);
    };

    useEffect(() => {
        if (status === "unauthenticated" && data === null) {
            router.push("/admin/login");
        }
    }, [status, data, router]);

    if (status === "authenticated" && data.user.role === "admin") {
        const getButtonStyle = (path) =>
            pathname === path ? "bg-[#3f506e]" : "hover:bg-[#313a48]";

        return (
            <>
                <div className={`min-h-screen flex flex-col bg-[#1D222B] ${open ? "w-[80%]" : "w-full"} absolute ${open ? "left-[290px]" : "left-0"} transition-all duration-300`}>
                    <header className="bg-[#212631] p-4 shadow-lg h-[50px]">
                        <div className={`fixed inset-y-0 left-0 transform ${open ? "translate-x-0" : "-translate-x-full"} w-[20%] bg-gray-800 text-white transition-transform duration-300 ease-in-out z-50`}>
                            <div className="p-4 text-lg font-medium text-center">
                                <Link href="/dashboard">
                                    <span className="text-gray-100 text-lg">MY</span>
                                    <span className="text-red-500 text-lg font-medium">Recipe</span>
                                </Link>
                            </div>
                            <div className="p-2 text-base font-medium">
                                <Link href="/recipelist">
                                    <button className={`w-full ps-4 py-1 rounded  flex ${getButtonStyle("/recipelist")}`}>
                                        <ListBulletIcon className="size-5 me-2" />
                                        RecipeList
                                    </button>
                                </Link>
                            </div>
                            <div className="ps-2 text-base font-medium">
                                <Link href="/ingredients">
                                    <button className={`w-full ps-4 py-1 rounded flex ${getButtonStyle("/ingredients")}`}>
                                        <EyeDropperIcon className="size-5 me-2" />
                                        Ingredients
                                    </button>
                                </Link>
                            </div>
                            <div className="p-2 text-base font-medium">
                                <Link href="/categories">
                                    <button className={`w-full ps-4 py-1 rounded flex ${getButtonStyle("/categories")}`}>
                                        <Squares2X2Icon className="size-5 me-2" />
                                        Categories
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <button className="absolute left-10 text-white" onClick={openFn}>
                            <Bars3Icon className="size-6 text-blue-500" />
                        </button>
                        <Logout />
                    </header>
                    <div className="p-5">
                        {children}
                    </div>
                </div>
            </>
        );
    }
}
