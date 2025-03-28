'use client';
import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useRouter } from 'next/navigation';

import { Mail, Lock, Leaf } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (error) {
      setError(`Google login failed: ${error.message}`);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-center space-x-3">
          <Leaf className="text-green-600 w-10 h-10" />
          <h1 className="text-3xl font-bold text-green-800">SwapEnv</h1>
        </div>
        <p className="text-center text-gray-600">
          Welcome back! Reduce e-waste, one swap at a time.
        </p>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin} 
            className="flex items-center justify-center w-full gap-3 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            
            <span className="font-medium">Continue with Google</span>
          </button>

          <div className="flex items-center">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
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

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" />
              <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 pl-10 pr-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            <div className="flex justify-between items-center">
              <a href="/forgot-password" className="text-sm text-green-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button 
              type="submit"
              className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700 transition"
            >
              Log In
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-600">
          Dont have an account? {' '}
          <a href="/auth/signup" className="text-green-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}