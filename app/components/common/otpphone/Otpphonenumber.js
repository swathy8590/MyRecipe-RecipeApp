


export default function Otpphonenumber() {

    return (


        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
            <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-xl">
                <h2 className="text-2xl font-semibold mb-4">Enter your phone number to sent the verification OTP </h2>
                <form >
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Phone number</label>
                        <input
                            type=" tel"
                            name="Phone number"
                            className="w-full border border-gray-300 rounded-lg p-3"
                            required
                            placeholder="Enter Your Phone Number"
                        />
                    </div>


                    <div className="flex justify-end space-x-2">

                        <button
                            type="submit"
                            // onClick={() => setEditIndex(null)}
                            className="bg-green-600 hover:bg-green-800 text-white px-4 py-2 rounded-lg transition"
                        >
                            Sent OTP
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}