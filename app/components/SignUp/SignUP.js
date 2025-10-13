'use client'
import React, { use, useState } from 'react'
import { useEffect } from 'react'
import Image from 'next/image'

const SignUP = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [signUpResponse, setSignUpResponse] = useState(null)

  // Mock sign up handler
  const handleSignUp = async(e) => {
    e.preventDefault()
    const url = "http://127.0.0.1:5000/api/signUp"
    const options = {email, password}
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
    })
    const data = await response.json()
    console.log(data)
    setSignUpResponse(data)
  }

  useEffect(() => {
    if (signUpResponse) {
      if (signUpResponse.status === 'ok') {
        alert('Sign up successful!')
      } else {
        alert('Sign up failed. Please try again.')
      }
    }
  }, [signUpResponse])

  // Mock Google sign up handler
  const handleGoogleSignUp = () => {
    // Add your Google sign up logic here
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white border border-orange-300 rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-orange-500 mb-2 text-center">Create your account</h1>
        <p className="text-gray-600 mb-6 text-center">Sign up to start editing images with Fire Dragon!</p>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSignUp}>
          <input
            type="text"
            placeholder="Username"
            className="px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-3 rounded-lg shadow hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="w-full flex items-center my-6">
          <hr className="flex-grow border-gray-200" />
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-200" />
        </div>
        <button
          type="button"
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center gap-2 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
        >
          <Image
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            alt="Google"
            className="h-5 w-5"
          />
          <span className="text-gray-700 font-medium">Sign up with Google</span>
        </button>
        <p className="mt-6 text-sm text-gray-500 text-center">
          Already have an account? <a href="/SignIn" className="text-orange-500 hover:underline">Sign In</a>
        </p>
      </div>
    </div>
  )
}

export default SignUP
