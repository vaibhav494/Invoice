
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Bar, Line } from 'react-chartjs-2'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
//   PointElement,
// } from 'chart.js'

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   LineElement,
//   PointElement,
//   Title,
//   Tooltip,
//   Legend
// )

// // Mock data
// const salesData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [
//     {
//       label: 'Sales',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: 'rgba(75, 192, 192, 0.6)',
//     },
//   ],
// }

// const revenueData = {
//   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
//   datasets: [
//     {
//       label: 'Revenue',
//       data: [65, 59, 80, 81, 56, 55],
//       borderColor: 'rgb(255, 99, 132)',
//       tension: 0.1,
//     },
//   ],
// }

// const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top' as const,
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Bar Chart',
//     },
//   },
// }

// export default function Demo() {
//   return (
//     <div className="min-h-screen bg-gray-100">
//       <main>
//         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//           {/* Summary Cards */}
//           <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Total Sales</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-semibold">$12,345</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Total Revenue</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-semibold">$67,890</p>
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Profit Margin</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-2xl font-semibold">23%</p>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Charts */}
//           <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
//             <Card>
//               <CardHeader>
//                 <CardTitle>Sales Chart</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Bar options={options} data={salesData} />
//               </CardContent>
//             </Card>
//             <Card>
//               <CardHeader>
//                 <CardTitle>Revenue Chart</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <Line options={options} data={revenueData} />
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }






import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Sales and Revenue Chart',
    },
  },
};

export default function Demo() {
  const [salesData, setSalesData] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [summary, setSummary] = useState({ totalSales: 0, totalRevenue: 0, profitMargin: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [salesResponse, revenueResponse, summaryResponse] = await Promise.all([
          fetch('http://localhost:4000/api/sales'),
          fetch('http://localhost:4000/api/revenue'),
          fetch('http://localhost:4000/api/summary')
        ]);

        const sales = await salesResponse.json();
        const revenue = await revenueResponse.json();
        const summaryData = await summaryResponse.json();

        setSalesData(sales);
        setRevenueData(revenue);
        setSummary(summaryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Sales',
        data: salesData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Revenue',
        data: revenueData,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Total Sales</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${summary.totalSales.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">${summary.totalRevenue.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit Margin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{summary.profitMargin}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Chart */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Sales and Revenue Chart</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar options={options} data={chartData} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}