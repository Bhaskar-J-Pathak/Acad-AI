import React, { useState } from 'react'
import { 
  X, 
  Check, 
  Star, 
  Zap, 
  Crown,
  Shield,
  Target,
  Brain,
  Loader2
} from 'lucide-react'
import { createCheckoutSession } from '../lib/stripe'

interface PremiumUpgradeProps {
  isOpen: boolean
  onClose: () => void
}

export const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      // For now, we'll simulate the upgrade process
      // In production, you'd integrate with Stripe
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Simulate successful payment
      localStorage.setItem('isPremium', 'true')
      window.location.reload()
    } catch (error) {
      console.error('Upgrade failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const freeFeatures = [
    'Basic domain roadmaps',
    'Generic learning paths',
    'Limited resources',
    'Community support'
  ]

  const premiumFeatures = [
    'AI-Hyper Personalized Roadmaps',
    'Real-time Industry Analysis',
    'Personalized Project Suggestions',
    'Advanced Skill Gap Analysis',
    'Priority Support',
    'Exclusive Premium Dashboard',
    'Career Guidance Sessions',
    'Interview Preparation',
    'Portfolio Review & Feedback',
    'Direct Mentor Access'
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 p-6 flex items-center justify-between rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-playfair text-white">Upgrade to Premium</h2>
              <p className="text-white/90">Unlock AI-powered personalized learning</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">
              Transform Your Career with
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                AI-Powered Learning
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get hyper-personalized roadmaps that adapt to your skills, goals, and the latest industry demands
            </p>
          </div>

          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Free Plan */}
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="text-center mb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Free Plan</h4>
                <div className="text-3xl font-bold text-gray-900">₹0</div>
                <p className="text-gray-600">Basic access</p>
              </div>
              
              <div className="space-y-3">
                {freeFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Plan */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200 relative overflow-hidden">
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>MOST POPULAR</span>
                </div>
              </div>

              <div className="text-center mb-6 mt-4">
                <h4 className="text-xl font-bold text-gray-900 mb-2">Premium Plan</h4>
                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">₹199</span>
                  <span className="text-gray-600 line-through">₹999</span>
                </div>
                <p className="text-purple-600 font-medium">80% OFF - Limited Time</p>
              </div>
              
              <div className="space-y-3">
                {premiumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleUpgrade}
                disabled={loading}
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Crown className="w-5 h-5" />
                    <span>Upgrade Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
            <h4 className="text-lg font-bold text-gray-900 mb-4 text-center">Why Premium Users Love Acad AI</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-1">3x Faster Learning</h5>
                <p className="text-gray-600 text-sm">AI eliminates irrelevant content</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-1">95% Job Success</h5>
                <p className="text-gray-600 text-sm">Industry-aligned curriculum</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-semibold text-gray-900 mb-1">Real-time Updates</h5>
                <p className="text-gray-600 text-sm">Always current with trends</p>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-6 text-center">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-700 font-semibold mb-1">30-Day Money Back Guarantee</p>
              <p className="text-green-600 text-sm">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}