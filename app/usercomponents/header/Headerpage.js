import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Headerpage({ loginToggle, signUpToggle }) {
    const { data, status } = useSession();
    const router = useRouter();

    const logoutFn = () => {

        signOut({ redirect: false }).then(() => {
            router.push("/home");
        });
    }
    return (

        <>
            <header className="flex justify-between bg-white items-center px-5 py-3">
                <div className="text-2xl font-bold">
                    <span className="text-gray-800">MY</span><span className="text-red-500">Recipe</span>
                </div>
                <nav className=" font-semibold">
                    <ul className="flex space-x-6">
                        <li><Link href={"/home"} className='pb-5'>Home</Link></li>
                        <li><Link href={"/recipes"} className='mb-5'> Recipe</Link></li>
                        <li><Link href={"createrecipe/"} className='mb-5'>Add Recipe</Link></li>
                    </ul>
                </nav>
                <div className="flex gap-4">
                    {
                        status === "unauthenticated"
                        && <button className="px-4 py-1  bg-slate-100  text-[#b76c6c]  rounded-md " onClick={loginToggle}>Login</button>}

                    {
                        status === "unauthenticated"
                        && <button className="px-4 py-1 bg-[#b55] text-white rounded-md  " onClick={signUpToggle}>Sign up</button>}

                    {status === "authenticated" && <button className="px-4 py-1 bg-[#b55] text-slate-100 rounded-md  " onClick={logoutFn}>log out</button>}
                </div>
            </header>


        </>
    )
}


