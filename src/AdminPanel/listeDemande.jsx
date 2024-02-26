import React, { useState, useEffect } from 'react';
import AdminLayout from './AdminLayout';
import { HiOutlineSearch } from 'react-icons/hi';
import PopUpModal from '../assets/PopUpModal';
import uuid from 'react-uuid';
import axiosInstance from '../API/Axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck ,faTrash} from '@fortawesome/free-solid-svg-icons'

const ListDemande = () => {
  // Helper function to format the date in a human-readable format
 
  const InfUser = useSelector(state => state.auth.user);
  const role = InfUser.user.role;
  const [demande, setDemande] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredDemande, setFilteredDemande] = useState([]);
  useEffect(() => {
    const filtered = demande.filter((demande) =>
      demande.name.toLowerCase().includes(searchInput)
    );
    setFilteredDemande(filtered);
  }, [searchInput, demande]);
  useEffect(()=>{
    axiosInstance
    .get('/showRequests')
    .then((response) => {
        setDemande(response.data);
        setFilteredDemande(response.data);
     // console.log(niveau);
    })
    .catch((error) => {
      console.error(error);
    });
  },[]);
  const fetchData = () => {
    axiosInstance
      .get('/showRequests')
      .then((response) => {
        setDemande(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
    const handleApproveRequest = async (userId) => {
        try {
          await axiosInstance.post(`/registration-requests/${userId}`);
          fetchData();
          console.log('validé');
          
        } catch (error) {
          console.error('Une erreur s\'est produite :', error);
        }
      };
      const handleDeleteClick = async (userId) => {
        try {
          await axiosInstance.delete(`demandes/delete/${userId}`);
          fetchData();
          console.log("supprime");
          
        } catch (error) {
          console.error('Une erreur s\'est produite :', error);
        }
      };
  return (
<>
      <AdminLayout>
      <div className="min-h-screen px-6">
          <div className="md:flex justify-between text-center items-center grid-cols-1">
            <div className="text-2xl font-semibold text-center tracking-wide">liste des demandes</div>
            <div className="rounded-lg p-4 md:flex md:justify-end justify-center  items-center md:gap-4 ">
              {/* Search Input   */}
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

          <div>
          <div className="shadow-md bg-white rounded-lg">
  <div className="overflow-auto">
    <div className="min-w-full md:inline-block align-middle overflow-auto grid grid-cols-1 md:grid-cols-1 md:w-full">
      <div className="w-full">
        <table className="min-w-full divide-y overflow-auto divide-gray-200">
          <thead>
            <tr className="bg-gray-200">
             
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                Name
              </th>
             
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                Mail
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                Contact
              </th>
             
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                Admin Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                Admin Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase">
                Action
              </th>
             
            </tr>
          </thead>
          <tbody>
          {filteredDemande.map((user,i) => (
            <tr key={i} className="bg-white divide-y divide-gray-200">
              
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.name}
              </td>
             
             
             
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.mail}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.contact}
              </td>
              
              
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.nameAdmin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.emailAdmin}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className='flex space-x-6'>  <button onClick={() => handleApproveRequest(user.id)}  className='text-green-400 dark:text-blue-400 hover:underline'>
                <FontAwesomeIcon icon={faCheck} />
                </button>
                <button   onClick={() => handleDeleteClick(user.id)}  className='text-red-600  dark:text-blue-400 hover:underline'>
                <FontAwesomeIcon icon={faTrash} />
                </button> </div>
              </td>
             
              
            </tr> ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

          </div>
          

          </div>
        
        </AdminLayout> 
        
        
</>
  )
}
export default ListDemande