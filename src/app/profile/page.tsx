"use client";
import axios from "axios";
import Link from "next/link";
import {toast} from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
 

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => { 
        try{
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        }catch(error:any){
            console.log("Logout failed:", error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async () => {
       const res =  await axios.get("/api/users/me");
        console.log(res.data);
        setData(res.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center
                         min-h-screen py-2">
            <h1 className="text-4xl font-bold">Profile</h1>
            <hr />
            <p className="bg-red-400">Profile Page</p>
            <h2 className="m-3 p-3 rounded bg-green-600">{data === 'nothing' ? "Nothing" : <Link
            href={`/profile/${data}`}>{data}
            </Link>}</h2>
            <hr />
            <button
            onClick={logout}
            className="m-3 bg-blue-500 hover:bg-blue-700
             text-white font-bold py-2 px-4 rounded"
            >Logout
            </button>

            <button
            onClick={getUserDetails}
            className="m-3 bg-purple-500 hover:bg-purple-700
             text-white font-bold py-2 px-4 rounded"
            >GetDetails
            </button>
        </div>
    );
}