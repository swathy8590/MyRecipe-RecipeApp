


export default function Home() {
    return (
        <>


            <div className="bg-gray-200 w-full h-screen flex items-center">


                <div className="w-[70%] mx-auto  p-5 bg-white text-left border-solid border-gray-100 rounded-xl h-[70%] drop-shadow-lg  flex gap-5">
                    <div className="w-[50%] h-full bg-green-100"></div>
                    <div className="flex flex-col ps-10 pt-16 w-[50%]">
                        <h1 className=" text-2xl font-semibold  text-gray-800 ps-20 pb-5">Reset  Password</h1>

                        <form>
                            <div className="pb-8 ">
                                <input
                                    type="password"
                                    required
                                    placeholder="Password"
                                    className="border-solid border-green-300 border-[1px] w-[75%] h-[44px] rounded-lg px-4"
                                />
                            </div>

                            <div className="pb-8 ">
                                <input
                                    type="password"
                                    required
                                    placeholder="Conform Password"
                                    className="border-solid border-green-300 border-[1px] w-[75%] h-[44px] rounded-lg px-4"
                                />
                            </div>


                            <div>
                                <button
                                    className="border-solid border-gray-300 border-[1px] w-[75%] h-[44px] rounded-lg bg-green-600 text-white"
                                >submit</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}