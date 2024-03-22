import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import axios from "axios";
import { useParams } from "react-router-dom";
import { usebackendStore } from "../../../store/store";
import { baseUrl } from "../../../config";

function Analytics() {
  const [chartData, setChartData] = useState(null);
  const accessToken = usebackendStore((store) => store.accessToken);
  const ref = useRef();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/link/status/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = response.data;
        const totalCount = data.totalCount;
        const labels = data.hits.map((hit) => hit.createdAt);
        const chartData = {
          labels: labels,
          datasets: [
            {
              label: "Hits",
              data: Array(labels.length).fill(totalCount),
              borderWidth: 1,
              borderColor: "#009254",
            },
          ],
        };
        setChartData(chartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData) {
      const ctx = ref.current;
      const config = {
        type: "line",
        data: chartData,
        options: {
          animation: {
            duration: 2000,
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      };
      const chartInstance = new Chart(ctx, config);

      return () => {
        chartInstance.destroy();
      };
    }
  }, [chartData]);

  return <canvas ref={ref}></canvas>;
}

export default Analytics;
