"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import { log } from 'console';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [user, setUser] = useState({
        email : "",
        password : "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onLogin = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/login', user)
            console.log("login Sucessfull", response.data);
            toast.success("login Sucessfull");
            setLoading(false);
            router.push('/profile');

        } catch (error) {
            console.log("Login failed", error);
            toast.error("Login failed", error);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length  ) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Login"}</h1>

        <label htmlFor="email">Email</label>
            <input className='text-black' type="email" id='email' value={user.email} onChange={(event) => {
                setUser({...user, email: event.target.value }) 
            }} placeholder="email" />

        <label htmlFor="password">Password</label>
            <input className='text-black' type="password" id='password' value={user.password} onChange={(event) => {
                setUser({...user, password: event.target.value }) 
            }} placeholder="Password" />

        <button className='bg-green-700 p-2 border-1 rounded-md mt-5' onClick={onLogin}>{buttonDisabled ? "No login" : "Login"}</button>

        </div>
    )
}
