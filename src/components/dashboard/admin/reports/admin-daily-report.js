import { Chart } from "primereact/chart";
import React from "react";
import moment from "moment";

const AdminDailyReport = ({ label, data, color }) => {
  if (!data) {
    return null;
  }
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--text-color");
  const textColorSecondary = documentStyle.getPropertyValue(
    "--text-color-secondary"
  );
  const surfaceBorder =
    documentStyle.getPropertyValue("--surface-border");
  const chartData = {
    labels: Object.keys(data).map((date) => moment(date).format("DD MMM YYYY")),
    datasets: [
      {
        color: color,
        borderColor: documentStyle.getPropertyValue(color),
        backgroundColor: documentStyle.getPropertyValue(color),
        data: Object.values(data),
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    aspectRatio: 0.8,
    plugins: {
      legend: false,
    },

    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
          font: {
            weight: 500,
          },
        },
        grid: {
          display: false,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
          drawBorder: false,
        },
      },
    },
  };

  return (
    <div className="cart-wrapper" >
      <Chart type="bar" data={chartData} options={options} className="custom-chart-container" />
    </div>
  );
};

export default AdminDailyReport;
