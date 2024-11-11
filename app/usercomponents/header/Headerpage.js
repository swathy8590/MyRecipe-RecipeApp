import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Headerpage({ loginToggle, signUpToggle }) {
    const { data, status } = useSession();
    const router = useRouter();

    const logoutFn = () => {

        signOut({ redirect: false }).then(() => {
            router.push("/landingpage");
        });
    }
    return (

        <>
            <header className="flex justify-between bg-white items-center px-5 py-3">
                <div className="text-2xl font-bold">
                    <span className="text-gray-800">MY</span><span className="text-red-500">Recipe</span>
                </div>
                <nav className="flex space-x-6 font-semibold">
                    <a href="#" className="text-gray-700">Home</a>
                    <a href="#" className="text-gray-700">Recipe</a>
                    <a href="#" className="text-gray-700">Add Recipe</a>
                    <a href="#" className="text-gray-700">Blog</a>
                    <a href="#" className="text-gray-700">About us</a>
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


