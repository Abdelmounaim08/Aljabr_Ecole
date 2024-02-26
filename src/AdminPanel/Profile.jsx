import React, { useState, useEffect } from 'react';
import { adminData } from '../assets/dummyDaata'; // Import the adminData array
import AdminLayout from './AdminLayout';
import axiosInstance from '../API/Axios';
import { useSelector, useDispatch } from 'react-redux';

const Profile = () => {
  const loggedInAdmin = adminData[0];
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const InfUser = useSelector(state => state.auth.user);
  const error = useSelector(state => state.auth.error);
  const [message, setmessage] = useState(null);
  
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: InfUser.user.name,
    email: InfUser.user.email,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axiosInstance
      .put(`/users/${InfUser.user.id}`, formData)
      .then((response) => {
        setmessage(response.data.message);
        //console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.error('Error', error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <AdminLayout>
      <div className="rounded-lg p-4 shadow px-6 pt-6 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full"
                required
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
            
            >
              Save Changes
            </button>
          </div>
          <div>
            {message  ? (
              <p className="px-4 py-2 w-full font-bold text-center text-green-600">
                {message}
              </p>
            ) : (
              null
            )}
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default Profile;
 