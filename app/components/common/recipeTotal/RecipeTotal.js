"use client"

import React, { useEffect, useState } from 'react'
import { Linechart } from '../../linechart/Linechart'
import axios from 'axios'
import moment from 'moment'

export const RecipeTotal = () => {
    const [chartCount, setChartCount] = useState()

    useEffect(() => {
        axios.get("/api/recipechart").then((response) => {
            response && setChartCount(response.data.data)
        })
    }, [])

    const count = chartCount && chartCount.count
    const date = chartCount && chartCount.date.map(i => moment(i).toISOString())

    const recipeTotal = count && count.reduce((prev, current) => prev + current, 0)

    return (
        <div
            className="bg-gradient-to-r   from-[#363466] to-[#26254d] py-4 ps-6 rounded-lg shadow-lg h-[200px] text-white"
        >
            <h3 className="text-3xl font-bold">{recipeTotal}</h3>
            <p className="text-lg">
                Total Recipes
            </p>
            <Linechart count={count} date={date} />
        </div>
    )
}
