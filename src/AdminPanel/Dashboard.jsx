import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Chart from 'chart.js/auto';
import axiosInstance from '../API/Axios';
import AdminLayout from './AdminLayout';
import PopUpModal from '../assets/PopUpModal';
import uuid from 'react-uuid';

const monthsOfYear = [
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

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [paidPercentage, setPaidPercentage] = useState(0);
  const [unpaidPercentage, setUnpaidPercentage] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState('');
  const id = useSelector((state) => state.auth.user.user.id_ecole);
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  const monthsOfYear = [
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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axiosInstance.get('/paiment');
        setPayments(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayments();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        let response;
        if (role === 'Admin') {
          response = await axiosInstance.get('/eleve');
          const filteredStudents = response.data.filter(student => student.id_ecole === id);
          setStudents(filteredStudents);
        } else {
          response = await axiosInstance.get('/eleve');
          setStudents(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchStudents();
  }, [id, role]);

  useEffect(() => {
    let total = 0;
    let paid = 0;
    let unpaid = 0;

    payments.forEach(payment => {
      const student = students.find(student => student.CNE === payment.CNE);
      if (student) {
        total += payment.montant;
        if (payment.mois === selectedMonth) {
          paid++;
        }
      }
    });

    unpaid = students.length - paid;

    setTotalAmount(total);
    setPaidCount(paid);
    setUnpaidCount(unpaid);

    const paidPercentage = (paid / students.length) * 100;
    const unpaidPercentage = (unpaid / students.length) * 100;
    setPaidPercentage(paidPercentage);
    setUnpaidPercentage(unpaidPercentage);
  }, [payments, selectedMonth, students]);
 
    const chartRef = useRef(null);
  
    useEffect(() => {
      const chartOptions = {
        type: 'pie',
        data: {
          labels: ['Paiements payés', 'Paiements impayés'],
          datasets: [
            {
              data: [paidPercentage, unpaidPercentage],
              backgroundColor: ['#34D399', '#F87171'],
            },
          ],
        },
      };
  
      const myChart = new Chart(chartRef.current, chartOptions);
  
      return () => {
        myChart.destroy();
      };
    }, [paidPercentage, unpaidPercentage]);

    const chartReff = useRef(null);
    const studentsCount=students.length;
    //console.log(studentsCount)
    useEffect(() => {
      const chartOptions = {
        type: 'bar',
        data: {
          labels: [  'la Somme en DH'],
          datasets: [
            {
              label: 'Quantité',
              data: [totalAmount],
              backgroundColor: ['#60A5FA', '#34D399'],
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        },
      };
  
      const myChart = new Chart(chartReff.current, chartOptions);
  
      return () => {
        myChart.destroy();
      };
    }, [totalAmount]);
  return (
    <AdminLayout>

      <div className="w-full h-full" >
        <div className="p-4 w-full h-auto">
          <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1> 
          </div> <div className="relative flex"> 
          <div className="mt-2 pb-1 pl-80 right-10 relative ml-auto md:gap-4 gap-1"> 
          <label className="block mb-1 text-sm font-medium text-gray-700">Filtrer par mois</label> 
          <select className="block w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-blue-500" onChange={(e) => setSelectedMonth(e.target.value)} > <option value="">Tous les mois</option> {monthsOfYear.map((month, idx) => (<option key={idx} value={month}> {month} </option>))} </select>
           </div> 
           </div>
            <div className="bg-gray-100 p-4  shadow rounded">
               <h2 className="text-lg font-bold mb-2">Statistiques</h2> 
                <div className="grid grid-cols-2 md:gap-4 gap-1"> 
                <div className="bg-blue-100 p-4 rounded-lg">
                   <h3 className="text-xl font-semibold mb-1">Nombre d'élèves</h3> 
                   <p className="text-gray-600">{studentsCount}</p> 
                   </div> 
                   <div className="bg-green-100 p-4 rounded-lg"> 
                   <h3 className="text-xl font-semibold mb-1">Nombre de paiements payés</h3>
                    <p className="text-gray-600">{paidCount}</p>
                     <p className="text-gray-600" style={{ fontSize: '14px' }}> Pourcentage de paiements payés: <span style={{ fontWeight: 'bold' }} className="text-green-700">{paidPercentage.toFixed(2)}%</span> </p> 
                     </div> <div className="bg-red-100 p-4 rounded-lg"> 
                     <h3 className="text-xl font-semibold mb-1">Nombre de paiements impayés</h3>
                      <p className="text-gray-600">{unpaidCount}</p>
                       <p className="text-gray-600" style={{ fontSize: '14px' }}> Pourcentage de paiements impayés: 
                       <span style={{ fontWeight: 'bold' }} className="text-red-800">{unpaidPercentage.toFixed(2)}%</span>
                        </p>
                         </div>
                          <div className="bg-yellow-100 p-4 rounded-lg"> 
                         <h3 className="text-xl font-semibold mb-1">Somme des montants de paiement</h3>
                          <p className="text-gray-600">{totalAmount} DH</p> 
                          </div> 
                          </div> 
                          <div className="  relative items-center md:flex  grid space-x-22 "> 
                           <div className=" md:w-120 h-100 p-4 w-80 md:m-8 md:ml-12">  <canvas ref={chartReff} /> </div> 
                          <div className="w-80 h-80  p-2 md:pr-12 md:ml-48 ">  
                           <canvas ref={chartRef} /> </div> 
                          </div> 
                          </div> 
                          
                           </div> 

                           </AdminLayout>
  );
};

export default Dashboard;
/*useEffect(() => {
   let chartInstance = null;
   if (chartRef.current) {
     const ctx = chartRef.current.getContext('2d');
     const labels = ['Payés', 'Impayés'];
     const data = [paidCount, unpaidCount];
     const backgroundColors = ['#36A2EB', '#FF6384'];

     // Destroy previous chart instance if it exists
     if (chartInstance) {
       chartInstance.destroy();
     }

     chartInstance = new Chart(ctx, {
       type: 'bar',
       data: {
         labels: labels,
         datasets: [
           {
             data: data,
             backgroundColor: backgroundColors,
           },
         ],
       },
       options: {
         responsive: true,
         scales: {
           y: {
             beginAtZero: true,
           },
         },
       },
     });
   }
 }, [paidCount, unpaidCount]);<canvas ref={chartRef} id="paymentChart" />
*/