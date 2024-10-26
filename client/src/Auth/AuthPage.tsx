import { useState, useEffect } from 'react'
import { SignIn, SignUp, useUser } from '@clerk/clerk-react'
import axios from 'axios'

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<'signin' | 'signup'>('signin')
  const { user } = useUser()

  useEffect(() => {
    const handleSignUpComplete = async () => {
      try {
        if (user) {
          await axios.post('http://localhost:5000/users', {
            clerkId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.primaryEmailAddress,
          })
          console.log('User signed up and added to the database!')
        }
      } catch (err) {
        console.error('Error during sign-up:', err)
      }
    }

    if (user) {
      handleSignUpComplete()
    }
  }, [user])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A3A2A] p-4">


      <div className="text-white text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome to <span className="text-[#ADFF2F]">Ledger</span>Dary </h1>
        <p className="text-xl">Simplify your billing process with our easy-to-use tool</p>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex text-sm font-medium text-center text-gray-500 border-b border-gray-200">
          <button
            className={`flex-1 inline-block p-4 ${
              activeTab === 'signin'
                ? 'text-[#0A3A2A] border-b-2 border-[#0A3A2A] active'
                : 'hover:text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('signin')}
          >
            Sign In
          </button>
          <button
            className={`flex-1 inline-block p-4 ${
              activeTab === 'signup'
                ? 'text-[#0A3A2A] border-b-2 border-[#0A3A2A] active'
                : 'hover:text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveTab('signup')}
          >
            Sign Up
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'signin' ? (
            <SignIn 
              appearance={{
                elements: {
                  formButtonPrimary: 
                    'bg-[#0A3A2A] hover:bg-[#0A3A2A]/80 text-sm normal-case',
                },
              }}
            />
          ) : (
            <SignUp 
              appearance={{                
                elements: {
                  formButtonPrimary: 
                    'bg-[#0A3A2A] hover:bg-[#0A3A2A]/80 text-sm normal-case',
                },
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}