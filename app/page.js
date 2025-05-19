
"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const Page = () => {
    const router = useRouter();

    router.push("/home");
    return (
        <div>page</div>
    )
}

export default Page