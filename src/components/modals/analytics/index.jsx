import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  ComposedChart,
  Bar,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { usebackendStore } from "../../../store/store";
import { baseUrl } from "../../../config";

function Analytics() {
  const [chartData, setChartData] = useState([]);
  const accessToken = usebackendStore((store) => store.accessToken);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/link/status/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const hitsByMonth = {};
        response.data.hits.forEach((hit) => {
          const month = new Date(hit.createdAt).toLocaleDateString("en-US", {
            month: "short",
          });
          hitsByMonth[month] = (hitsByMonth[month] || 0) + 1;
        });

        // Create an array of objects for each month and its number of clicks
        const months = Array.from({ length: 12 }, (_, index) => {
          const monthName = new Date(null, index).toLocaleDateString("en-US", {
            month: "short",
          });
          return {
            month: monthName,
            numOfClicks: hitsByMonth[monthName] || 0,
          };
        });

        setChartData(months);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, accessToken]);

  return (
    <ResponsiveContainer>
      {/* <ComposedChart data={chartData}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="numOfClicks" fill="#8884d8" />
      </ComposedChart> */}
      <ComposedChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="numOfClicks" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="numOfClicks" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="numOfClicks" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>

    /* 
    
<ComposedChart width={730} height={250} data={data}>
  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />
  <Legend />
  <CartesianGrid stroke="#f5f5f5" />
  <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
  <Bar dataKey="pv" barSize={20} fill="#413ea0" />
  <Line type="monotone" dataKey="uv" stroke="#ff7300" />
</ComposedChart>

    */
  );
}

export default Analytics;
