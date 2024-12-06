"use client"


import React, { useEffect, useState } from 'react'
import Headerpage from '../header/Headerpage'
import Loginpage from '../loginpage/Loginpage'
import { SignUp } from '../userSignup/SignUp'
import { useSession } from 'next-auth/react'



const Mainpage = ({ login, setLogin, setsignup, signup }) => {

    const { data, status } = useSession();


    const loginToggle = () => {
        setLogin(true)
    }

    const signUpToggle = () => {
        setsignup(true)
    }
    useEffect(() => {


        if (data?.user?.role !== "user" || data === null ||
            status === "unauthenticated") { setLogin(true) }
    }, [status])
    return (
        <div><Headerpage loginToggle={loginToggle} signUpToggle={signUpToggle} />
            {login && <Loginpage setLogin={setLogin} />}

            {signup && <SignUp setsignup={setsignup} />}
        </div>
    )
}

export default Mainpage