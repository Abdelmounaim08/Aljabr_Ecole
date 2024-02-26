import { useState } from 'react'
import Home from './components/Home'
import OnlinePaimentForm from './components/OnlinePaimentForm';
import StudentData from './components/studentData';
import React, { lazy, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'


import SideBar from './AdminPanel/SideBar';
import Users from './AdminPanel/Users';
import Admins from './AdminPanel/Admins';
import Profile from './AdminPanel/Profile';
import StudentDetails from './AdminPanel/StudentDetails';
import Dashboard from './AdminPanel/Dashboard'
import Login from './AdminPanel/Login';
import Register from './AdminPanel/Register';
import Contact from './components/Contact';
import Add_Ecole from './AdminPanel/Add_Ecole';
import AddEleve from './AdminPanel/AddEleve';
import axios from 'axios';
import Eleves from './AdminPanel/Eleves';
import { UpdateEleves } from './AdminPanel/UpdateEleve';
import FileUploadPaiment from  './AdminPanel/FileUploadPaiment';
import FileUploadEleves from './AdminPanel/fileUploadEleves';
import Demande from './AdminPanel/Demande';
import ListDemande from './AdminPanel/listeDemande';
import Ecoles from './AdminPanel/Ecole';
function App() {
  

  const [studentData, setStudentdata] = useState({})

  const handleStudentData = (data) => {
    setStudentdata(data)
  }
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home/>}></Route>
        <Route path='/paiment-en-ligne' element={<OnlinePaimentForm handleStudentData={handleStudentData}/>}></Route>
        <Route path='/paiment-en-ligne/student' element={<StudentData data={studentData}/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/admin/sideBar' element={<SideBar/>}></Route>
        <Route path='/admin/users' element={<Users/>}></Route>
        <Route path='/admin/dashboard' element={<Dashboard/>}></Route>
        <Route path='/admin/admins' element={<Admins/>}></Route>
        <Route path='/admin/profile' element={<Profile/>}></Route>
         <Route path="/admin/student-details/:email" element={<StudentDetails/>} />
         <Route path="/admin" element={<Login/>} />
         <Route path="/admin/register" element={<Demande/>} />
         <Route path="/admin/addEcole" element={<Add_Ecole/>} />
         <Route path="/admin/demande" element={<ListDemande/>} />
         <Route path="/admin/AddEleve" element={<AddEleve/>} />
         <Route path="/admin/Ecoles" element={<Ecoles/>} />
         <Route path="/admin/students" element={<Eleves/>} />
         <Route path="/admin/eleve/edit/:id" element={<UpdateEleves />} />
         <Route path="/admin/users/paiment" element={<FileUploadPaiment/>}  ></Route>
         <Route path="/admin/students/uploadEleves" element={<FileUploadEleves/>} ></Route>
      </Routes>

    </BrowserRouter>
    </>
  )
}

export default App
