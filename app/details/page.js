"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Phone, Mail } from "lucide-react";

export default function Details() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim() || !phone.trim() || !email.trim()) {
      setError('All fields are required');
      return;
    }

    // Add any additional validation here
    router.push('/dashboard');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-800">Complete Your Profile</h1>
          <p className="text-gray-600">Help us personalize your SwapEnv experience</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name Field */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
          >
            Complete Profile
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          We'll use this information to enhance your swapping experience
        </p>
      </div>
    </div>
  );
}