import React from 'react';
import Chart from 'react-apexcharts';

export const UsersChart = ({ usersCount, usersDate }) => {
    const chartData = {
        series: [
            {
                name: "Users",
                data: usersCount || [],
            },
        ],
        options: {
            chart: {
                height: 110,
                type: "area",
                foreColor: "#fff",
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },
            colors: ["#fff"],
            stroke: {
                curve: "smooth",
                width: 2,
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    // gradientToColors: ["#F87171"],
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0,
                    stops: [0, 100],
                },
            },
            grid: {
                show: false,
            },
            dataLabels: {
                enabled: false,
            },
            markers: {
                size: 4,
                colors: ["#F87171"],
                strokeColors: "#fff",
                strokeWidth: 1,
            },
            xaxis: {
                type: "datetime",
                categories: usersDate,
                labels: {
                    show: false,
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
                },
                x: {
                    format: "MMM dd, HH:mm",
                },
                y: {
                    formatter: (val) => `${val}`,
                },
            },
        },
    };

    return (
        usersCount && usersCount.length > 0 && <Chart options={chartData.options} series={chartData.series} type="area" height={110} />
    );
};
