"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast, { Toast } from 'react-hot-toast';
import { log } from 'console';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
    const [user, setUser] = useState({
        username : "",
        email : "",
        password : "",
    })

    const [buttonDisabled, setButtonDisabled] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const onSignup = async () => {
        try {
            setLoading(true)
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup Sucessfull", response.data);
            toast.success("Signup Sucessfull");
            setLoading(false);
            router.push('/login');

        } catch (error) {
            console.log("Signup failed", error);
            toast.error("Signup failed", error);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false)
        }
        else {
            setButtonDisabled(true)
        }
    },[user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input className='text-black' type="text" id='username' value={user.username} onChange={(event) => {
                setUser({...user, username: event.target.value }) 
            }} placeholder="Username" />

        <label htmlFor="email">Email</label>
            <input className='text-black' type="email" id='email' value={user.email} onChange={(event) => {
                setUser({...user, email: event.target.value }) 
            }} placeholder="email" />

        <label htmlFor="password">Password</label>
            <input className='text-black' type="password" id='password' value={user.password} onChange={(event) => {
                setUser({...user, password: event.target.value }) 
            }} placeholder="Password" />

        <button className='bg-green-700 p-2 border-1 rounded-md mt-5' onClick={onSignup}>{buttonDisabled ? "No signup" : "Signup"}</button>

        </div>
    )
}
