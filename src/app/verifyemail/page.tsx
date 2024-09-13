"use client";
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import Link from 'next/link';

export default function verifyEmailPage() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  
  const verifyEmail = async () => {
    try {
      await axios.post("api/verifyEmail", {token});
      setVerified(true);

    } catch (error) {
      setError(error);
      console.log(error.response.data);
      
    }
  }

useEffect(() => {
  const urlToken = window.location.search.split("=")[0];
  setToken(urlToken || '');
  // const {query} = router;
  // const urlToken = query.token;
},[])

useEffect(() => {
  if(token.length > 0){
    verifyEmail();
  }
}, [token])


  return (
    <div className='flex flex-col justify-center items-center min-h-screen py-2'>
      <h1 className='text-4xl'>Verify email</h1>
      <h2 className='p-2 bg-orange-500 text-black'>
        {token ? `${token}` : 'No token'}
      </h2>
      {verified && <h2 className='p-2 bg-green-500 text-white'>Email verified successfully</h2>}
      <Link href={"/login"}>Login</Link>
    </div>
  )
}
