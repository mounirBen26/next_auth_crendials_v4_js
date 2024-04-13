"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {signIn} from "next-auth/react"

export default function Register() {

    const [data, setData] = useState({
        email:"", password:""
});
    const router = useRouter();

    const handlesubmit = async (e) => {
        e.preventDefault();
        signIn('credentials',{
            ...data,
            redirect:false
        })
        console.log('icicicicicc')
        router.push('/dashboard')
        
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 flex-col">
            <h1 className="text-2xl font-bold mb-4 ">Login</h1>
            <form onSubmit={handlesubmit}  method="post" className="flex flex-col gap-0  w-1/3">
                <div className="border border-gray-300  rounded-md">
                <input value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} type="email" placeholder=" Email" className="h-8 px-3 w-full  focus:outline-blue-500"/>
                <input value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} type="password" placeholder=" Password" className="h-8 px-3 w-full focus:outline-blue-500"/>
                </div>
                <p className="text-gray-800 text-sm my-3">Don't have an account? <Link href="/register" className="hover:text-red-500 hover:font-bold text-blue-600 font-bold">Register</Link></p>
                <button className="mt-4 h-9 bg-cyan-600 hover:bg-blue-700 text-white  py-2 px-2 rounded-md" type="submit">Login</button>
            </form>
        </div>
    )
}