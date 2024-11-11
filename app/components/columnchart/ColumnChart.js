"use client"


import React from 'react'
import Chart from 'react-apexcharts'

export const ColumnChart = ({ reviewCount, reviewDate }) => {

    const dateArray = reviewDate && reviewDate.map((val) => [`${val}`])
    const chartData = {
        series: [{
            name: "Reviews",
            data: reviewCount || []
        }],
        options: {
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
            chart: {
                height: 350,
                type: 'bar',
                // events: {
                //     click: function (chart, w, e) {
                //         // console.log(chart, w, e)
                //     }
                // },
                toolbar: {
                    show: false
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories:
                    dateArray
                ,

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
        }
    };
    return (
        <div>


            {reviewCount && reviewCount.length > 0 && <Chart options={chartData && chartData.options} series={chartData && chartData.series} type="bar" height={125} />}


        </div>
    )
}
