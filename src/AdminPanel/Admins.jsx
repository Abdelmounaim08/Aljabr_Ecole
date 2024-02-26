import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { HiOutlineSearch } from 'react-icons/hi';
import PopUpModal from '../assets/PopUpModal';
import uuid from 'react-uuid';
import axiosInstance from '../API/Axios';
import { useSelector } from 'react-redux';

const Admins = () => {
  // Helper function to format the date in a human-readable format
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: 'numeric', month: 'short', year: '2-digit' };
    return date.toLocaleString('en-US', options).split(' ').join(' ');
  };
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  //console.log(role)
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [userList, setUserList] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [ecole, setecole] = useState([]);
  const [demande, setDemande] = useState([]);
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Handling search
  useEffect(() => {
    if (searchInput === '') {
      setFilteredUsers(userList);
    } else {
      setFilteredUsers(
        userList.filter((user) =>
          user.name.toLowerCase().includes(searchInput)
        )
      );
    }
  }, [searchInput, userList]);
  useEffect(()=>{
    axiosInstance
    .get('/ecoles')
    .then((response) => {
        setecole(response.data);
      
     // console.log(niveau);
    })
    .catch((error) => {
      //console.error(error);
    });
  },[]);
 
  // Handle closing and opening modals
  const handleModalClose = (confirmed) => {
    setOpenModal(false);
    if (confirmed) {
      const updatedUserList = userList.filter(
        (user) => user.name !== userToDelete.name
      );
      setUserList(updatedUserList);
    }
    setUserToDelete(null);
  };

  const handleSearch = (e) => {
    setSearchInput(e.target.value.toLowerCase());
  };

  // Handle which user to delete
  
    const handleDeleteClick = async (id) => {
      try {
        await axiosInstance.delete(`/users/delete/${id}`);
        setFilteredUsers((prevStudents) =>
          prevStudents.filter((student) => student.id !== id)
        );
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('/user');
        setUserList(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [handleDeleteClick]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  return (
    <>
      <AdminLayout>
        <div className="min-h-screen px-6">
          <div className="md:flex justify-between text-center items-center grid-cols-1">
            <div className="text-2xl font-semibold text-center tracking-wide">Admin</div>
            <div className="rounded-lg p-4 md:flex md:justify-end justify-center  items-center md:gap-4 ">
              {/* Search Input */}
              <div className='relative mt-6 flex items-center'>
              <div className='absolute inset-y-0 left-0 flex items-center md:pl-3 pointer-events-none'>
                <HiOutlineSearch className='w-5 h-5 text-gray-500 dark:text-gray-400' />
              </div>
              <input
                type='search'
                id='default-search'
                onChange={(e) => setSearchInput(e.target.value.toLowerCase())}
                className='w-46 pl-10 pr-4 py-2  rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50'
                placeholder='Search by name...'
              />
            </div>
            </div>
          </div>
          {/* Table */}
          <div className="shadow-md bg-white rounded-lg">
            <div className="overflow-auto">
              <div className="min-w-full md:inline-block align-middle overflow-auto grid grid-cols-1 md:grid-cols-1 md:w-full">
                <div className=" w-full">
                  <table className="min-w-full divide-y overflow-auto divide-gray-200">
                    <thead>
                      <tr className="bg-gray-200">
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase"
                        >
                          Ecole
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase"
                        >
                          Created At
                       </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase">
                           </th>
                        <th scope="col" className="relative px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentUsers.map((user) => (
                        <tr
                          key={uuid()}
                          className="bg-white divide-y divide-gray-200"
                        >
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ecole.find((c) => c.id === user.id_ecole)?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(user.created_at)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
  disabled={role === "Admin"}
  onClick={() => handleDeleteClick(user.id)}
  className={role === "Admin" ? "text-gray-400 cursor-not-allowed" : "text-red-500 hover:text-red-700"}
>
  Delete
</button>
        </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Pagination */}
          <div className="flex justify-between text-center items-center mt-4">
            <div>
              <span className="text-sm text-gray-700">
                Showing {startIndex + 1} to{' '}
                {Math.min(endIndex, filteredUsers.length)} of{' '}
                {filteredUsers.length} entries
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
                disabled={endIndex >= filteredUsers.length}
                className="px-2 py-1 text-sm rounded-md bg-blue-500 text-white disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
         
        </div>

      </AdminLayout>
      {/* Modal */}
      {openModal && (
        <PopUpModal
          title="Delete User"
          description={`Are you sure you want to delete the user ${userToDelete?.name}?`}
          onModalClose={handleModalClose}
        />
      )}
    </>
  );
};

export default Admins;
//