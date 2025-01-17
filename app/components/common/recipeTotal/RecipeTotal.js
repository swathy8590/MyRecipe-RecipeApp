"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Linechart } from '../../linechart/Linechart';





export const RecipeTotal = () => {
    const [chartCount, setChartCount] = useState(null);

    useEffect(() => {

        axios.get("/api/recipechart")
            .then(response => {
                if (response && response.data && response.data.data) {
                    setChartCount(response.data.data);
                }
            })
            .catch(error => console.error("Error fetching chart data:", error));

    }, []);

    const count = chartCount?.count || [];
    const date = chartCount?.date?.map(i => moment(i).toISOString()) || [];

    const recipeTotal = count.reduce((prev, current) => prev + current, 0);

    return (
        <div className="bg-gradient-to-r from-[#363466] to-[#26254d] py-4 ps-6 rounded-lg shadow-lg h-[200px] text-white">
            <h3 className="text-3xl font-bold">{recipeTotal}</h3>
            <p className="text-lg">Total Recipes</p>
            <Linechart count={count} date={date} />
        </div>
    );
};


