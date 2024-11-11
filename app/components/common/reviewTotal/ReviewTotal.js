"use client"

import React, { useEffect, useState } from 'react'
import { ColumnChart } from '../../columnchart/ColumnChart'
import axios from 'axios'

export const ReviewTotal = () => {
    const [review, setReview] = useState()

    useEffect(() => {
        axios.get("/api/reviewchart").then((response) => setReview(response.data.data)
        )
    }, [])

    const reviewDate = review && review.date
    const reviewCount = review && review.count

    const reviewTotal = reviewCount && reviewCount.reduce((prev, current) => prev + current, 0)
    return (
        <>

            <div className="bg-gradient-to-r from-[#6C63FF] to-[#3B3B98] px-5 pt-4 rounded-lg shadow-lg h-[200px] text-white">
                <h3 className="text-3xl font-bold">
                    {reviewTotal}
                </h3>
                <p className="text-lg">
                    Total reviews
                    {/* <span className=" 135deg, #FFD700, #FFA500 text-red-500">(40.9%)</span> */}
                </p>
                <ColumnChart reviewCount={reviewCount} reviewDate={reviewDate} />
            </div>


        </>
    )
}
