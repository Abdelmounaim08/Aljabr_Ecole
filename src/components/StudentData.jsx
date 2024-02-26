
import React, { useEffect, useState } from 'react';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaidMonths, filterUnpaidMonths } from '../actions/AuthActions';
import axios from 'axios';
import axiosInstance from '../API/Axios';


const StudentData = () => {
  const dispatch = useDispatch();
  const student = useSelector((state) => state.auth.eleve);
  const paidMonths = useSelector((state) => state.auth.paidMonths);
  const[ok,setOK]=useState(null);
  const allMonths=useSelector((state) => state.auth.allMonths);
   const unpaidMonths=useSelector((state) => state.auth.unpaidMonths);
   const handlePayer = async (event, month) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('CNE', student.CNE);

      const year = new Date().getFullYear();
      const monthIndex = allMonths.findIndex((m) => m === month)+1;
      //console.log(monthIndex);
      //console.log(allMonths);
      const date = new Date(year, monthIndex, 1);
      const formattedDate = date.toISOString().split('T')[0];

      formData.append('moisPaiment', formattedDate);

      const response = await axiosInstance.post('/paiment', formData);
      setOK('ok');
      n
      //console.log(response.data);
      // Traiter la réponse de l'API
      // ...
    } catch (error) {
      console.error(error); // Gérer les erreurs
    }
  };

  useEffect(() => {
    if (student && student.CNE) {
      // Fetch the paid months from the API
      dispatch(fetchPaidMonths(student.CNE));
    }
   //console.log(paidMonths);
  }, [student, dispatch,ok]);

  //paidMonths.map(item => console.log(item.mois));

  useEffect(() => {
    if (allMonths && paidMonths) {
      dispatch(filterUnpaidMonths(allMonths, paidMonths.map(item => item.mois)));
    }
  }, [allMonths, paidMonths,ok, dispatch]);

  const paid = (
    <div className='flex items-center justify-center gap-1'>
      Paid <AiFillCheckCircle className='text-green-600' />
    </div>
  );

  const unpaid = (
    <div className='flex items-center justify-center  gap-1 space-x-8'>
      Unpaid <AiFillCloseCircle className='text-red-500' />
      <button className='py-1 px-3 cursor-pointer border bg-green-400 rounded-md' onClick={(event) => (event, month)}>Pay</button>
    </div>
  );

  if (!student) {
    return null; // Add loading indicator or placeholder if student data is not available yet
  }

  return (
    <div className="min-h-full flex flex-col justify-center py-6  md:py-8 sm:p-6 lg:p-8">
  <div className="sm:mx-auto sm:w-full w-75 sm:max-w-md">
    <h2 className="mt-2 text-center text-3xl font-extrabold text-indigo-900">Student Information</h2>
    <div className="mt-4 bg-gray-50 shadow sm:rounded-lg">
      <div className="p-4 sm:p-6">
        <div className="space-y-4 pl-6 ">
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Code Massar:</strong> {student.CNE}
          </p>
          <p>
            <strong>Date of Birth:</strong> {student.dateNaissance}
          </p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm text-left text-black dark:text-gray-400 border-collapse">
            <thead className="bg-gray-300 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 font-semibold">Month</th>
                <th className="text-center px-4 py-3 font-semibold">Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {unpaidMonths &&
                unpaidMonths.map((month, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-800">{month}</td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
                      {unpaidMonths.includes(month) ? (
                        <div className="flex items-center space-x-3 justify-center gap-2">
                          Unpaid <AiFillCloseCircle className="text-red-500" />
                          <button className="py-1 px-6 border bg-green-400 text-white  hover:bg-green-800  rounded-md" onClick={(event) => handlePayer(event, month)}>
                            Pay
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1">
                          Paid <AiFillCheckCircle className="text-green-600" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default StudentData;
 