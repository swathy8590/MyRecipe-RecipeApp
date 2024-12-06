"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { UsersChart } from '../../usersChart/UsersChart';
import { Linechart } from '../../linechart/Linechart';
import { ColumnChart } from '../../columnchart/ColumnChart';


export default function TotalUsers() {
    const [users, setUser] = useState(null);

    useEffect(() => {

        axios.get("/api/usersChart")
            .then(response => {
                if (response && response.data && response.data.data) {
                    setUser(response.data.data);
                }
            })
            .catch(error => console.error("Error fetching users data:", error));

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


