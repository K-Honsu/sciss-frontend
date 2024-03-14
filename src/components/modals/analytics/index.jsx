import { useEffect, useRef } from "react";

function Analytics({ops}) {
  return (
    <>
      <ChartF />
    </>
  );
}
function ChartF() {
  const ref = useRef()
  useEffect(() => {
    const ctx = ref.current
    const getLabels = () => {
      currDay = Date.now()
      //for (i = 0;)
    }
    const data =  {
      labels: ['Monday', 'Tue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
        borderColor: '#009254',
      }]
    }
    const config = {
      type: 'line',
      data: data,
    };
    const chartInstance = new Chart(ctx, {
      ...config,
      options: {
        animation: {
          duration: 2000,
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    console.log(chartInstance)
    return () => {
      chartInstance.destroy()
    }
  }, [])
  return (
    <canvas ref={ref}></canvas>
  );
}

export default Analytics;