import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';

import { useRouter } from 'next/router';
import axiosClient from 'utils/axiosClient';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const dateStringList = ['01/10/2022', '01/11/2022', '01/12/2022', '01/01/2023'];

const LineChart = ({ chartData }) => {
  const router = useRouter();
  const { itemId } = router.query;
  const [prices, setPrices] = useState([]);

  const getChartData = async () => {
    try {
      // body =[{01/12/2022 : priceValue},....]
      const {
        data: { body },
      } = await axiosClient.post(`/item-activities-history`, {
        itemId: +itemId,
        dateStringList,
      });

      const pricesArray = [];

      if (body.length) {
        body.forEach((el) => {
          for (const key in el) {
            pricesArray.push(el[key]);
          }
        });
      }
      setPrices(pricesArray);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!router.isReady) return;
    getChartData();
  }, [router.isReady, itemId]);

  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  var data = {
    labels: dateStringList,
    datasets: [
      {
        label: 'Price History',
        data: prices,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  var options = {
    maintainAspectRatio: false,
    scales: {},
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  };

  return (
    <div>
      <Line data={data} height={400} options={options} />
    </div>
  );
};

export default LineChart;
