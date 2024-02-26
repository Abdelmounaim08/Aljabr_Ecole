import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { students } from '../assets/dummyDaata';
import { HiOutlineSearch } from 'react-icons/hi';
import { HiOutlineCheckCircle } from 'react-icons/hi';
import { IoCloseCircleOutline } from 'react-icons/Io5';
import { MdDeleteOutline } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axiosInstance from '../API/Axios';
import { useSelector } from 'react-redux';




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

const Users = () => {
  const id = useSelector(state => state.auth.user.user.id_ecole);
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  const [student, setStudent] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('January');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [moisP, setMoisP] = useState([]);
  const [classe, setclass] = useState([]);
  const [niveau, setNiveau] = useState([]);
  const [selectedclass, setSelectedclass] = useState('');
  const [selectedNV, setSelectedNV] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStudent = filteredStudents.slice(startIndex, endIndex);
  const Paid = (
    <p className='flex items-center gap-1'>
      Paid <HiOutlineCheckCircle className='w-5 h-5 text-green-500' />
    </p>
  );
  const Unpaid = (
    <p className='flex items-center gap-1'>
      Unpaid <IoCloseCircleOutline className='w-5 h-5 text-red-500' />
    </p>
  );
 // console.log(unpaidMonths);
 useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/paiment');
      
      setMoisP(response.data);
      //console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
// ...

useEffect(() => {
  const fetchData = async () => {
    try {
      const [paimentResponse, eleveResponse, classeResponse, niveauResponse] = await Promise.all([
        axiosInstance.get('/paiment'),
        axiosInstance.get('/eleve'),
        axiosInstance.get('/classe'),
        axiosInstance.get('/niveau'),
      ]);

      setMoisP(paimentResponse.data);

      let filteredStudents = eleveResponse.data;

      if (role === 'Admin') {
        filteredStudents = eleveResponse.data.filter((student) => student.id_ecole === id);
      }

      if (selectedNV !== '') {
        filteredStudents = filteredStudents.filter((student) => student.niveau_id == selectedNV);
      }

      if (selectedclass !== '') {
        filteredStudents = filteredStudents.filter((student) => student.class_id == selectedclass);
      }

      if (searchInput !== '') {
        filteredStudents = filteredStudents.filter(
        (student) =>
          student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          student.prenom.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setFilteredStudents(filteredStudents);
      setclass(classeResponse.data);
      setNiveau(niveauResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [id, selectedclass, searchInput, selectedNV, role]);



const handleExport = () => {
  axiosInstance({
    url: '/paiment/template',
    method: 'GET',
    responseType: 'blob',
  })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'PaimentModel.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch((error) => {
      console.error('Error exporting data:', error);
    });
};
  return (
    <>
      <AdminLayout>
        <div className='min-h-screen px-6 w-full md:w-full '>
          <div className=' justify-between items-center md:flex  gap-4 grid grid-cols-1'>
            <div className='text-2xl font-semibold text-center '>
              Students Payment
            </div>
            <div className='rounded-lg p-5 space-x-1  justify-start grid  md:flex md:justify-end  text-center items-center'>
            <div className='flex space-x-6 md:space-x-1'> 
              <div className='relative  mt-6'>
              <div className='absolute inset-y-0 md:left-0 flex items-center pl-3 pointer-events-none'>
                <HiOutlineSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
              </div>
              <input
                type='search'
                id='default-search'
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                className='w-32 md:w-48 sm:w-48 pl-10 pr-4 py-1  rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50'
                placeholder='Search by name...'
              />
            </div>
            <div className='flex flex-col '>
                <label className='mb-1 text-sm'>Filter by month</label>
                <select
                  className=' px-3 text-center py-1 border rounded-md'
                  onClick={(e) => setSelectedMonth(e.target.value)}
                >
                  {monthsOfYear.map((month, idx) => (
                    <option key={idx}>{month}</option>
                  ))}
                </select>
              </div>
              </div>
            <div className='flex md:float-left space-x-2  md:space-x-0 relative mt-6  gap-4 '>
              <select
                className=' px-3 w-32  py-1 border rounded-md'
                onChange={(e) => setSelectedclass(e.target.value)}
              >
                <option value=''>Classe</option>
                {classe.map((e, i) => {
                  return (
                    <>
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    </>
                  );
                })}
              </select>
              <select
                className=' px-2 w-32 py-1 border rounded-md'
                onChange={(e) => setSelectedNV(e.target.value)}
              >
                <option value=''>level</option>
                {niveau.map((e, i) => {
                  return (
                    <>
                      <option key={i} value={e.id}>
                        {e.name}
                      </option>
                    </>
                  );
                })}
              </select>
            
              </div>
             
            </div>
          </div>
          {/* Table */}
          <div className='shadow-md bg-white rounded-lg w-full  grid grid-cols-1 md:grid-cols-1 md:w-full'>
            <div className='overflow-x-auto'>
              <div className='min-w-full inline-block align-middle'>
                <div className='overflow-hidden'>
                  <table className='min-w-full divide-y divide-gray-200'>
                    <thead>
                      <tr className='bg-gray-200'>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                          Name
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                          prenom
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                          Email
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                          Tel
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                          Montant
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                         class
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                         niveau
                        </th>
                        <th
                          scope='col'
                          className='px-6 py-3 text-left text-xs font-medium uppercase'
                        >
                          Status
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    
                    <tbody className='divide-y divide-gray-200'>
                      {currentStudent.map((student) => (
                        <tr key={student.email}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                            {/* Wrap the StudentDetails component in a Link */}
                            <Link to={`/Admin/student-details/${student.email}`} >
                              {student.name}
                            </Link>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                            {student.prenom}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                            {student.email}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                            {student.Tel}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                            {student.montant}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                    {classe.filter(e => e.id === student.class_id).map(e => e.name)}
                    </td>
                    <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                    {niveau.filter(e => e.id === student.niveau_id).map(e => e.name)}
                    </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                          {
  moisP.find((mois) => mois.mois === selectedMonth && mois.CNE === student.CNE)
    ? Paid
    : Unpaid
}
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to{' '}
                {Math.min(endIndex, filteredStudents.length)} of{' '}
                {filteredStudents.length} entries
              </span>
            </div>
            <div>
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="px-2 py-1 text-sm rounded-md bg-blue-500 text-white mr-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={endIndex >= filteredStudents.length}
                className="px-2 py-1 text-sm rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
          <div className='space-x-2'>
          <button  className="bg-green-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"> <Link to={'/admin/users/paiment'}>upload</Link></button>
          <button  className="bg-blue-500 hover:bg-blue-800 text-white  py-2 px-3 rounded-lg " onClick={handleExport} >Excel model</button>
          </div> </div>
      </AdminLayout>
    </>
  );
};

export default Users;
/* {filteredStudents.map((student) => (
                        <tr key={student.email}>
                          <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800'>
                            {/* Wrap the StudentDetails component in a Link }
                            <Link to={`/Admin/student-details/${student.email}`}>
                              {student.name}
                            </Link>
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                            {student.email}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800'>
                            {student.paidMonths[selectedMonth]
                              ? Paid
                              : Unpaid}
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-800 flex items-center justify-center gap-2'>
                            <MdDeleteOutline
                              onClick={() => handleDeleteClick(student)}
                              className='w-5 h-5 text-red-500 cursor-pointer'
                            />
                          </td>
                        </tr>
                      ))}*/  
//console.log(student);

/*
useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/eleve');
      let filteredStudents = response.data;

      if (role === 'Admin') {
        filteredStudents = response.data.filter(
          (student) => student.id_ecole === id
        );
      }

      if (selectedNV !== '') {
        filteredStudents = filteredStudents.filter(
          (student) => student.niveau_id == selectedNV
        );
      }

      if (selectedclass !== '') {
        filteredStudents = filteredStudents.filter(
          (student) => student.class_id == selectedclass
        );
      }

      if (searchInput !== '') {
        filteredStudents = filteredStudents.filter((student) =>
          student.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          student.prenom.toLowerCase().includes(searchInput.toLowerCase())
        );
      }

      setFilteredStudents(filteredStudents);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, [id, selectedclass, searchInput, selectedNV]);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/classe');
      const cls = response.data;
      setclass(cls);
      
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/niveau');
      const Nv = response.data;
      setNiveau(Nv);
      //console.log(niveau)
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);
/*useEffect(() => {
  if (searchInput === '') {
    setFilteredStudents(student);
  } else {
    setFilteredStudents(
      student.filter((user) =>
        user.name.toLowerCase().includes(searchInput)
      )
    );
  }
}, [searchInput,student]);*/