"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    // Fetch token from URL when the component loads
    useEffect(() => {
        const urlToken = new URLSearchParams(window.location.search).get("token");
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    // Verify user email when token is set
    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            console.log("Email verification successful", response.data);
        } catch (err) {
            setError("Invalid or expired token.");
            console.error("Verification failed", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `Token: ${token}` : "No token found"}
            </h2>

            {verified ? (
                <div className="mt-4">
                    <h2 className="text-2xl text-green-600">Email Verified Successfully!</h2>
                    <Link href="/login">
                        <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Login</button>
                    </Link>
                </div>
            ) : error ? (
                <div className="mt-4">
                    <h2 className="text-2xl bg-red-500 text-white p-2">Verification Failed</h2>
                    <p>{error}</p>
                </div>
            ) : (
                <p className="text-gray-600 mt-4">Verifying...</p>
            )}
        </div>
    );
}
