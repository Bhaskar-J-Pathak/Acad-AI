import React, { useState } from 'react'
import { 
  X, 
  Check, 
  Star, 
  Video, 
  Users, 
  Clock, 
  Award,
  Zap,
  MessageCircle
} from 'lucide-react'

interface CourseModalProps {
  isOpen: boolean
  onClose: () => void
  onPurchase: (version: 'standard' | 'pro') => void
}

export const CourseModal: React.FC<CourseModalProps> = ({ isOpen, onClose, onPurchase }) => {
  const [selectedVersion, setSelectedVersion] = useState<'standard' | 'pro'>('standard')

  if (!isOpen) return null

  const standardFeatures = [
    'Complete Frontend Development Curriculum',
    'HTML5, CSS3, JavaScript ES6+',
    'React & Next.js Mastery',
    'Tailwind CSS & Framer Motion',
    'GSAP Animations',
    'DevOps Fundamentals',
    'Real-world Projects',
    'Industry-aligned Content',
    'Lifetime Access',
    'Certificate of Completion'
  ]

  const proFeatures = [
    ...standardFeatures,
    '1-on-1 Video Doubt Solving Sessions',
    'Personal Mentor Assignment',
    'Priority Support',
    'Career Guidance Sessions',
    'Interview Preparation',
    'Portfolio Review'
  ]

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card-gradient rounded-2xl border border-accent-primary/20 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card-gradient border-b border-accent-primary/20 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold font-playfair text-text-light">Frontend Development</h2>
            <p className="text-text-secondary">Master modern web development from zero to hero</p>
          </div>
          <button
            onClick={onClose}
            className="text-text-secondary hover:text-text-light p-2 hover:bg-secondary-dark rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Course Overview */}
          <div className="mb-8">
            {/* Hero Image */}
            <div className="mb-6 overflow-hidden rounded-2xl">
              <img 
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop"
                alt="Frontend Development Course"
                className="w-full h-64 object-cover"
              />
            </div>
            
            <div className="bg-secondary-dark rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-text-light mb-4">What You'll Master</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center animate-pulse">
                      <Video className="w-4 h-4 text-blue-400" />
                    </div>
                    <span className="text-text-light">Interactive Video Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center animate-pulse">
                      <Zap className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-text-light">Hands-on Projects</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center animate-pulse">
                      <Award className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-text-light">Industry Certification</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center animate-pulse">
                      <Clock className="w-4 h-4 text-orange-400" />
                    </div>
                    <span className="text-text-light">Self-paced Learning</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center animate-pulse">
                      <Users className="w-4 h-4 text-pink-400" />
                    </div>
                    <span className="text-text-light">Community Support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center animate-pulse">
                      <Star className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-text-light">Job-ready Skills</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-text-secondary text-lg">
                This comprehensive course is designed to take you from beginner to job-ready frontend developer. 
                Learn the exact skills that top companies are hiring for in 2025.
              </p>
            </div>
          </div>

          {/* Version Selection */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Standard Version */}
            <div 
              className={`bg-secondary-dark rounded-xl p-6 border-2 cursor-pointer transition-all duration-300 ${
                selectedVersion === 'standard' 
                  ? 'border-accent-primary shadow-lg shadow-accent-primary/20 transform scale-105' 
                  : 'border-transparent hover:border-accent-primary/50 hover:transform hover:scale-102'
              }`}
              onClick={() => setSelectedVersion('standard')}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-light">Standard</h3>
                <div className="w-6 h-6 rounded-full border-2 border-accent-primary flex items-center justify-center">
                  {selectedVersion === 'standard' && (
                    <div className="w-3 h-3 bg-accent-primary rounded-full"></div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-text-light">$99</span>
                  <span className="text-text-secondary line-through">$199</span>
                </div>
                <p className="text-text-secondary text-sm">One-time payment • Lifetime access</p>
              </div>

              <div className="space-y-3 mb-6">
                {standardFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => onPurchase('standard')}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 ${
                  selectedVersion === 'standard'
                    ? 'bg-button-gradient text-white hover:shadow-lg hover:shadow-accent-primary/20'
                    : 'bg-accent-primary/20 text-text-light hover:bg-accent-primary/30'
                }`}
              >
                Get Standard Access
              </button>
            </div>

            {/* Pro Version */}
            <div 
              className={`bg-secondary-dark rounded-xl p-6 border-2 cursor-pointer transition-all duration-500 relative ${
                selectedVersion === 'pro' 
                  ? 'border-accent-primary shadow-lg shadow-accent-primary/20 transform scale-105' 
                  : 'border-transparent hover:border-accent-primary/50 hover:transform hover:scale-102'
              }`}
              onClick={() => setSelectedVersion('pro')}
            >
              {/* Popular Badge */}
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-button-gradient text-white px-4 py-1 rounded-full text-xs font-semibold">
                  MOST POPULAR
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-text-light">Pro</h3>
                <div className="w-6 h-6 rounded-full border-2 border-accent-primary flex items-center justify-center">
                  {selectedVersion === 'pro' && (
                    <div className="w-3 h-3 bg-accent-primary rounded-full"></div>
                  )}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-text-light">$199</span>
                  <span className="text-text-secondary line-through">$399</span>
                </div>
                <p className="text-text-secondary text-sm">One-time payment • Lifetime access</p>
              </div>

              <div className="space-y-3 mb-6">
                {proFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span className={`text-sm ${
                      index >= standardFeatures.length ? 'text-text-light font-medium' : 'text-text-secondary'
                    }`}>
                      {feature}
                    </span>
                    {index >= standardFeatures.length && (
                      <MessageCircle className="w-4 h-4 text-accent-primary" />
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => onPurchase('pro')}
                className={`w-full py-3 rounded-lg font-semibold transition-all duration-500 transform hover:scale-105 ${
                  selectedVersion === 'pro'
                    ? 'bg-button-gradient text-white hover:shadow-lg hover:shadow-accent-primary/20'
                    : 'bg-accent-primary/20 text-text-light hover:bg-accent-primary/30'
                }`}
              >
                Get Pro Access
              </button>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-8 text-center">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-1">30-Day Money Back Guarantee</p>
              <p className="text-text-secondary text-sm">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}