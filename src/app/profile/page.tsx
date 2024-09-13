"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState();

  const getUserData = async () => {
    try {
      const response = await axios.post('api/users/me');
      console.log(response.data.data._id);
      setData(response.data.data._id);
    } catch (error) {
      console.log('Failed to fetch user data', error);
      toast.error('Failed to fetch user data');
    }
  };

  const logOut = async () => {
    try {
      await axios.get('api/users/logout');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      console.log('Failed to log out', error);
      toast.error('Failed to log out');
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile Page</h1>
      <h2>
        {data === undefined ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}
      </h2>
      <hr />
      <button onClick={logOut} className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Logout
      </button>
      <button onClick={getUserData} className='bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
        Get User Details
      </button>
    </div>
  );
}
