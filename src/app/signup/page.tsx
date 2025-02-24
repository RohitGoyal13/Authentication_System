"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function Signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try{
            setLoading(true);
           const response = await axios.post("/api/users/signup", user);
           console.log("Signup success", response.data);

           toast.success("Signup successful! Redirecting to login page");

           router.push("/login");

        }catch(error:any){
            console.log("Signup failed:", error.message);

            toast.error(error.message);
        }
        finally{
            setLoading(false); 
        }
    }

    useEffect( () => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false);
    }else{
        setButtonDisabled(true);
    }
}, [user]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-orange-500">
            <div className="bg-gray-400 shadow-lg rounded-2xl p-8 w-96">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">{loading ? "Processing": "Signup"}</h1>
                <hr className="mb-6 border-gray-300" />

                <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                    Username
                </label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    id="username"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                />

                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                    Email
                </label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    id="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                />

                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                    Password
                </label>
                <input
                    className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="password"
                    id="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                />

                <button
                    onClick={onSignup}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                >
                    {buttonDisabled ? "No Signup" : "Signup"}
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 font-semibold hover:underline">
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}
