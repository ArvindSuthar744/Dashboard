import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const data = {
    labels: ['Tech', 'Motors', 'FMGC','Pharma'],
    datasets: [
      {
        data: [250, 50, 100, 150],
        backgroundColor: ['rgba(221, 39, 97, 0.6)', 'rgba(54,162,235,0.6)', 'rgba(100, 100, 100, 0.6)','rgba(100, 138, 56, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Bar Chart Example",
      },
    },
  };

  return (
    <>
      <div className='w-64 absolute overflow-hidden top-7 translate-y-[-25px] translate-x-[20px]'>
      <Pie data={data}  options={options} />
      </div>
    </>
  );  
};

export default PieChartComponent;