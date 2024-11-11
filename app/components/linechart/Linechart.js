"use client"


import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

export const Linechart = ({ count, date }) => {
    // const [chartCount, setChartCount] = useState()

    // useEffect(() => {
    //     axios.get("/api/recipechart").then((response) => {

    //         response && setChartCount(response.data.data)
    //     }
    //     )
    // }, [])

    // const count = chartCount && chartCount.count
    // const date = chartCount && chartCount.date.map(i => moment(i).toISOString())


    // const recipeTotal = count && count.reduce((prev, current) => prev + current, 0)



    const chartData = {
        series: [
            {
                name: "recipes",
                data: count && count || [],
            },
        ],
        options: {
            chart: {
                height: 200,
                type: "area",
                foreColor: "#ccc",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },

            },
            colors: ["#A78BFA"],
            stroke: {
                curve: "smooth",
                width: 2,
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    gradientToColors: ["#1a1c24"],
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100],
                },
            },
            grid: {
                borderColor: "#2D2F36",
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: false,
                    },
                },
            },
            dataLabels: {
                enabled: false,
            },
            xaxis: {
                type: "datetime",
                categories: date,
                labels: {
                    show: false
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
            },
            yaxis: {
                labels: {
                    show: false,
                },
            },
            tooltip: {
                theme: "dark",
                style: {
                    fontSize: "12px",
                    fontFamily: undefined,
                },
                x: {
                    format: "MMM dd, HH:mm:ss",
                },
                marker: {
                    show: false,
                },
                y: {
                    formatter: (val) => `${val}`,
                },
            },
        },
    };

    return (

        count && count.length > 0 && <Chart options={chartData && chartData.options} series={chartData && chartData.series} type="area" height={110} />

    );
};