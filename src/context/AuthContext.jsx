import { createContext,useContext,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AuthContext =createContext({});
export const AutProvider=({children})=>{
    const [user,setUser ]=useState(null) ;
    const csrf = () =>axios.get("/sanctum/csrf-cookie");
    const getUser = async ()=>{
        const{ data}=await axios.get('http://localhost:8000/api/user');
        setUser(data);
    }
}