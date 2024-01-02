import React, { useState, useEffect } from "react";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const SalesChart = ({ data }) => {
  const [currentView, setCurrentView] = useState("year");
  const [chartData, setChartData] = useState([]);
  const cntrRef = React.useRef(null);

  useEffect(() => {
    const filterDataByView = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      let filteredData = [];

      switch (currentView) {
        case "month":
          const currentMonth = today.getMonth() + 1; // Adding 1 because month index starts from 0

          data.forEach((item) => {
            const itemDate = new Date(item.date.split("T")[0]); // Extracting date part
            const itemYear = itemDate.getFullYear();
            const itemMonth = itemDate.getMonth() + 1; // Adding 1 because month index starts from 0
            if (itemYear === currentYear && itemMonth === currentMonth) {
              filteredData.push(item);
            }
          });
          break;
        case "week":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - 6); // Start of the week (last 7 days)
          filteredData = data.filter((item) => {
            const itemDate = new Date(item.date.split("T")[0]); // Extracting date part
            return itemDate >= startOfWeek && itemDate <= today;
          });
          break;

        case "year":
          filteredData = data.filter((item) => {
            const itemDate = new Date(item.date.split("T")[0]); // Extracting date part
            return itemDate.getFullYear() === currentYear;
          });
          break;
          case 'previousYears':
            const yearsMap = new Map();
          
            data.forEach(item => {
              const itemDate = new Date(item.date.split('T')[0]); // Extracting date part
              const itemYear = itemDate.getFullYear();
              const count = item.count;
          
              if (yearsMap.has(itemYear)) {
                const currentTotal = yearsMap.get(itemYear).total + count;
                const currentCount = yearsMap.get(itemYear).count + 1;
                yearsMap.set(itemYear, {
                  total: currentTotal,
                  count: currentCount,
                });
              } else {
                yearsMap.set(itemYear, { total: count, count: 1 });
              }
            });
          
            filteredData = Array.from(yearsMap).map(([year, { total, count }]) => ({
              date: year.toString(),
              count: Math.ceil(total / count),
            }));
            break;
          

        default:
          filteredData = data;
      }

      setChartData(filteredData);
    };

    filterDataByView();
  }, [currentView, data]);

  const handleViewChange = (e) => {
    setCurrentView(e.target.value);
  };

  return (
    <div
      style={{ backgroundColor: "white", padding: "20px" }}
      className=" shadow-lg rounded-lg mb-5"
      ref={cntrRef}
    >
      <div style={{ marginBottom: "20px" }} className=" font-semibold text-lg">
        <label htmlFor="viewSelect" style={{ marginRight: "10px" }}>
          Select View:
        </label>
        <select id="viewSelect" value={currentView} onChange={handleViewChange}>
          <option value="month">Month</option>
          <option value="week">Week</option>
          <option value="year">Year</option>
          <option value="previousYears">All</option>
        </select>
      </div>

      <AreaChart width={cntrRef?.current?.clientWidth -50 } height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
        <defs>
          <linearGradient id="colorFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ffe1e6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#e94560" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis  />
        <Tooltip />
       
        <Area
          type="monotoneX"
          dataKey="count"
          stroke="#e94560"
          fill="#ffe1e6"
          fillOpacity={0.6}
          dot={{ stroke: '#e94560', strokeWidth: 2}}
        />
      </AreaChart>
    </div>
  );
};

export default SalesChart;
