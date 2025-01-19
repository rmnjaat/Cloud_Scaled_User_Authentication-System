import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import { handleError, handleSucess } from "../Utils";
import {ToastContainer} from 'react-toastify'
const Home = () =>{

    const [loggedInUser , setloggedInUser] = useState('');
    const [products , setProducts] =  useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        setloggedInUser( localStorage.getItem('loggedInUser'));
    },[])

    const handleLogout = (e) =>{
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        handleSucess("User Logged Out");
        setTimeout(()=>{
                navigate('/login')
        },1000)

    }


    const fetchProducts= async ()=>{
        try{
            const url = `${import.meta.env.VITE_URL}/products`;
            const headers={
                headers:{
                    'Authorization':localStorage.getItem('token')
                }
            }
            const response = await fetch(url ,headers);
            const result = await response.json();
            setProducts(result);
        }
        catch(err){
            handleError(err);
        }
    }
    useEffect(()=>{
        fetchProducts()
    },[])

    return (
        <div>
            <h1>{loggedInUser}</h1>
            <button onClick={handleLogout}> Logout</button>
            <div>
                {
                  products &&  products.map((item , index)=>(
                        <ul key={index}>
                            <span>{item.name}: {item.price}</span>
                        </ul>
                    ))
                }
            </div>
            <ToastContainer/> 
        </div>
    )


} 

export default Home;