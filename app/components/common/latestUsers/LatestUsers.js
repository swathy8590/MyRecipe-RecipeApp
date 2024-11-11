"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const LatestUsers = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        axios.get("/api/getuser").then((response) => setUser(response.data.data)
        )
    }, [])
    return (
        <>

            <div className="bg-[#212631] h-auto  border-[1px] border-[#ffffff1a] p-4 ">
                <div >
                    <h1 className="text-xl font-semibold  mb-5">Users</h1>
                </div>

                <div className='h-[350px]'>
                    <div className='h-[40px] rounded-t-lg   backdrop-blur-md bg-[#2B3544] ps-5 pt-2 font-medium'>Latest Users</div>
                    {user && user.slice(0, 7).map(
                        (val, indx) => (val.role === "user" &&
                            <div key={indx} className='grid grid-cols-2 text-[13px] bg-[#1F2937]  border-[#2D3747] px-5 pt-5 pb-4  border-b'>

                                <div className=' text-[#8A919E]'> {val.name}</div>
                                <div className='text-[#359a50]'>{val.email}</div>

                            </div>





                        ))}</div>

            </div>



        </>
    )
}
