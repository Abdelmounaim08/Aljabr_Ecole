import React, { useEffect } from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { HiOutlineCheckCircle } from 'react-icons/hi';

import { fetchPaidMonths, filterUnpaidMonths } from '../actions/AuthActions';
import AdminLayout from './AdminLayout';
import { useState } from 'react';

const StudentDetails = () => {
 
  
 /* useEffect(() => {
    if (student) {
      dispatch(fetchPaidMonths(student.CNE));
      dispatch(filterUnpaidMonths(student.monthsList, student.paidMonths));
    }
  }, [dispatch, student]);*/

  const Paid = (
    <p className='flex items-center gap-1'>
      Paid <HiOutlineCheckCircle className='w-5 h-5 text-green-500' />
    </p>
  );

  const Unpaid = (
    <p className='flex items-center gap-1'>
      Unpaid < RiCloseCircleLine className='w-5 h-5 text-red-500' />
    </p>
  );
 
  return (
    <AdminLayout>
      <div className='mt-6 px-6'>
        <h2 className='text-2xl font-semibold mb-4'>{student && student.name}</h2>
        {student && (
          <>
            <p className='p-1'>Email: {student && student.email}</p>
           
            <table className='md:min-w-full w-auto divide-y overflow-x-auto overflow-hidden divide-gray-200 mt-4'>
              <thead className='bg-gray-200'>
                <tr>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase'>
                    Month
                  </th>
                  <th scope='col' className='px-6 py-3 text-left text-xs font-medium uppercase'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {student.monthsList.map((month) => (
                  <tr key={month}>
                    <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>{month}</td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                      {student.paidMonths[month] ? Paid : Unpaid}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default StudentDetails;