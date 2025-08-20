import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  GraduationCap,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [usePhone, setUsePhone] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const { signUp, signIn, signInWithPhone } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('')
    setMessage('')
  }

  const validateForm = () => {
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return false
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return false
    }
    if (!usePhone && !formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return false
    }
    if (usePhone && formData.phone.length < 10) {
      setError('Please enter a valid phone number')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (isLogin) {
        // Login
        if (usePhone) {
          setError('Phone login not yet available. Please use email to sign in.')
          setLoading(false)
          return
        }
        
        const { data, error } = await signIn(formData.email, formData.password)

        if (error) {
          setError(error.message)
        } else if (data.user) {
          setMessage('Successfully signed in!')
          setTimeout(() => navigate('/dashboard'), 1000)
        }
      } else {
        // Sign up
        const { data, error } = await signUp(
          formData.email, 
          formData.password, 
          usePhone ? formData.phone : undefined
        )

        if (error) {
          setError(error.message)
        } else if (data.user) {
          setMessage('Account created successfully! You can now sign in.')
          setTimeout(() => navigate('/dashboard'), 1000)
        }
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-dark flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl p-8 border border-neutral-200 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold font-playfair text-neutral-900">Instructly</span>
            </div>
            <h2 className="text-2xl font-bold font-playfair text-neutral-900 mb-2">
              {isLogin ? 'Welcome Back' : 'Join Instructly'}
            </h2>
            <p className="text-neutral-600 text-sm">
              {isLogin ? 'Sign in to continue your learning journey' : 'Start your AI-powered learning journey'}
            </p>
          </div>

          {/* Toggle Login/Signup */}
          <div className="flex bg-neutral-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                isLogin 
                  ? 'bg-gradient-primary text-white shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                !isLogin 
                  ? 'bg-gradient-primary text-white shadow-sm' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >a
              Sign Up
            </button>
          </div>

          {/* Toggle Email/Phone */}
          <div className="flex bg-neutral-100 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => setUsePhone(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                !usePhone 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </button>
            <button
              type="button"
              onClick={() => setUsePhone(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                usePhone 
                  ? 'bg-primary-100 text-primary-700' 
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              <Phone className="w-4 h-4" />
              <span>Phone</span>
            </button>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="mb-4 p-3 bg-error-50 border border-error-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-error-600 flex-shrink-0" />
              <span className="text-error-600 text-sm">{error}</span>
            </div>
          )}

          {message && (
            <div className="mb-4 p-3 bg-success-50 border border-success-200 rounded-lg flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-success-600 flex-shrink-0" />
              <span className="text-success-600 text-sm">{message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email/Phone Input */}
            <div>
              <label className="block text-neutral-900 text-sm font-medium mb-2">
                {usePhone ? 'Phone Number' : 'Email Address'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {usePhone ? (
                    <Phone className="h-5 w-5 text-neutral-500" />
                  ) : (
                    <Mail className="h-5 w-5 text-neutral-500" />
                  )}
                </div>
                <input
                  type={usePhone ? 'tel' : 'email'}
                  name={usePhone ? 'phone' : 'email'}
                  value={usePhone ? formData.phone : formData.email}
                  onChange={handleInputChange}
                  placeholder={usePhone ? '+1 (555) 123-4567' : 'you@example.com'}
                  className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-neutral-900 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-neutral-500" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Sign Up Only) */}
            {!isLogin && (
              <div>
                <label className="block text-neutral-900 text-sm font-medium mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-neutral-500" />
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-4 py-3 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-primary text-white py-3 rounded-lg font-semibold hover:shadow-glow-primary transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-neutral-600 text-sm">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}