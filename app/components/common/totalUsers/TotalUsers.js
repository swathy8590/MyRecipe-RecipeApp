"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';



const UsersChart = dynamic(() => import('../../usersChart/UsersChart').then((mod) => mod.UsersChart), { ssr: false });


export const TotalUsers = () => {
    const [users, setUser] = useState(null);

    useEffect(() => {
        // Ensure client-side data fetching
        if (typeof window !== 'undefined') {
            axios.get("/api/usersChart")
                .then(response => {
                    if (response && response.data && response.data.data) {
                        setUser(response.data.data);
                    }
                })
                .catch(error => console.error("Error fetching users data:", error));
        }
    }, []);

    // Safely handle undefined users data
    const usersDate = users?.date || [];
    const usersCount = users?.count || [];
    const usersTotal = usersCount.reduce((prev, current) => prev + current, 0);

    return (
        <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-lg shadow-lg h-[200px] text-white flex flex-col">
            <h3 className="text-3xl font-bold">{usersTotal}</h3>
            <p className="text-lg flex items-center gap-2">Users</p>
            <UsersChart usersDate={usersDate} usersCount={usersCount} />
        </div>
    );
};
