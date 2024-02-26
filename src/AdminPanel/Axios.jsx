import axios from "axios";
export default function AuthUser(){
const http=axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true
});
return{
    http
}}