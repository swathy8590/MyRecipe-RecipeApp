"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { UsersChart } from '../../usersChart/UsersChart';

export const TotalUsers = () => {
    const [users, setUser] = useState();

    useEffect(() => {
        axios.get("/api/usersChart").then((response) =>
            setUser(response.data.data)
        );
    }, []);

    const usersDate = users && users.date;
    const usersCount = users && users.count;
    const usersTotal = usersCount && usersCount.reduce((prev, current) => prev + current, 0);

    return (
        <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-lg shadow-lg h-[200px] text-white flex flex-col ">
            <h3 className="text-3xl font-bold">{usersTotal}</h3>
            <p className="text-lg flex items-center gap-2">
                Users
            </p>
            <UsersChart usersDate={usersDate} usersCount={usersCount} />
        </div>
    );
};
