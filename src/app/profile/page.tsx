"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details from API (assuming JWT auth or session storage)
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/users/profile");
        setUser(response.data);
      } catch (error: any) {
        toast.error("Failed to fetch profile");
         
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    try {
      await axios.post("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error("Logout failed");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-96">
        <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>
        <hr className="mb-6" />

        <p className="text-lg">
          <strong>Name:</strong> {user.name}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email}
        </p>

        <button
          onClick={handleLogout}
          className="mt-6 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
