"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { ColumnChart } from '../../columnchart/ColumnChart';
// import ColumnChart from '../../columnchart/ColumnChart';


export const ReviewTotal = () => {
    const [review, setReview] = useState(null);

    useEffect(() => {

        axios.get("/api/reviewchart")
            .then(response => {
                if (response && response.data && response.data.data) {
                    setReview(response.data.data);
                }
            })
            .catch(error => console.error("Error fetching review data:", error));

    }, []);

    const reviewDate = review?.date || [];
    const reviewCount = review?.count || [];

    const reviewTotal = reviewCount.reduce((prev, current) => prev + current, 0);

    return (
        <div className="bg-gradient-to-r from-[#6C63FF] to-[#3B3B98] px-5 pt-4 rounded-lg shadow-lg h-[200px] text-white">
            <h3 className="text-3xl font-bold">{reviewTotal}</h3>
            <p className="text-lg">Total reviews</p>
            <ColumnChart reviewCount={reviewCount} reviewDate={reviewDate} />
        </div>
    );
};

