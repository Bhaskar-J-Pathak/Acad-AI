import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { 
  Home, 
  Map, 
  Award, 
  User, 
  LogOut, 
  GraduationCap,
  Menu,
  X,
  Crown,
  Code,
  Server,
  Layers,
  Cloud,
  Brain,
  ChevronRight,
  Target,
  Zap,
  Star,
  CheckCircle
} from 'lucide-react'
import { PremiumUpgrade } from './PremiumUpgrade'
import { DomainPage } from './DomainPage'

type TabType = 'home' | 'domains' | 'certificates' | 'profile'
type DomainType = 'frontend' | 'backend' | 'fullstack' | 'devops' | 'ml' | null

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [selectedDomain, setSelectedDomain] = useState<DomainType>(null)
  const [isPremium, setIsPremium] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is premium
    const premiumStatus = localStorage.getItem('isPremium') === 'true'
    setIsPremium(premiumStatus)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  const handleDomainClick = (domain: DomainType) => {
    setSelectedDomain(domain)
  }

  const handleBackToDomains = () => {
    setSelectedDomain(null)
    setActiveTab('domains')
  }

  const sidebarItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'domains', label: 'Domains', icon: Map },
    { id: 'certificates', label: 'Certificates', icon: Award },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  const domains = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Master modern web interfaces with React, Vue, and cutting-edge frameworks',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Build scalable server-side applications and robust APIs',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      id: 'fullstack',
      title: 'Full Stack Development',
      description: 'Complete end-to-end development mastery',
      icon: Layers,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      id: 'devops',
      title: 'DevOps Engineering',
      description: 'Master deployment, CI/CD, and cloud infrastructure',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
    {
      id: 'ml',
      title: 'Machine Learning',
      description: 'Build intelligent systems with AI and data science',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    }
  ]

  // If viewing a specific domain, show that page
  if (selectedDomain) {
    return (
      <DomainPage 
        domain={selectedDomain}
        isPremium={isPremium}
        onBack={handleBackToDomains}
        onUpgrade={() => setShowUpgrade(true)}
      />
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="space-y-6">
            {/* Welcome Section */}
            <div className={`${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl p-6 border shadow-lg`}>
              {/* Hero Image */}
              <div className="mb-6 overflow-hidden rounded-xl">
                <img 
                  src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop"
                  alt="Learning Journey"
                  className="w-full h-32 object-cover"
                />
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h2 className={`text-2xl font-bold font-playfair ${isPremium ? 'text-purple-900' : 'text-gray-900'}`}>
                      Welcome back, {user?.email?.split('@')[0] || 'Learner'}!
                    </h2>
                    {isPremium && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        <Crown className="w-4 h-4" />
                        <span>Premium</span>
                      </div>
                    )}
                  </div>
                  <p className={isPremium ? 'text-purple-700' : 'text-gray-600'}>
                    {isPremium ? 'Your AI-powered learning journey continues' : 'Continue your learning journey'}
                  </p>
                </div>
                <div className={`w-16 h-16 ${isPremium ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/25' : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/25'} rounded-full flex items-center justify-center shadow-lg`}>
                  {isPremium ? <Crown className="w-8 h-8 text-white" /> : <GraduationCap className="w-8 h-8 text-white" />}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className={`${isPremium ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg p-4`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${isPremium ? 'bg-purple-200' : 'bg-blue-100'} rounded-lg flex items-center justify-center`}>
                      <Map className={`w-5 h-5 ${isPremium ? 'text-purple-600' : 'text-blue-600'}`} />
                    </div>
                    <div>
                      <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm`}>Domains Available</p>
                      <p className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} text-xl font-bold`}>5</p>
                    </div>
                  </div>
                </div>
                
                <div className={`${isPremium ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg p-4`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${isPremium ? 'bg-green-200' : 'bg-green-100'} rounded-lg flex items-center justify-center`}>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm`}>Roadmaps Created</p>
                      <p className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} text-xl font-bold`}>0</p>
                    </div>
                  </div>
                </div>
                
                <div className={`${isPremium ? 'bg-purple-100' : 'bg-gray-100'} rounded-lg p-4`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${isPremium ? 'bg-pink-200' : 'bg-purple-100'} rounded-lg flex items-center justify-center`}>
                      <Award className={`w-5 h-5 ${isPremium ? 'text-pink-600' : 'text-purple-600'}`} />
                    </div>
                    <div>
                      <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm`}>Certificates</p>
                      <p className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} text-xl font-bold`}>0</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Domain */}
            <div className={`${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl p-6 border shadow-lg`}>
              <h3 className={`text-xl font-bold ${isPremium ? 'text-purple-900' : 'text-gray-900'} mb-4`}>
                {isPremium ? 'AI-Recommended Domain' : 'Popular Domain'}
              </h3>
              <div 
                className={`${isPremium ? 'bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200' : 'bg-gray-100 hover:bg-gray-200'} rounded-lg p-4 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-lg`}
                onClick={() => handleDomainClick('frontend')}
              >
                <div className="mb-4 overflow-hidden rounded-lg">
                  <img 
                    src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600&h=300&fit=crop"
                    alt="Frontend Development"
                    className="w-full h-32 object-cover"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-lg`}>
                      <Code className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} font-semibold`}>Frontend Development</h4>
                      <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm`}>
                        {isPremium ? 'AI-personalized roadmap ready' : 'Master modern web interfaces'}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        {isPremium ? (
                          <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                            <Crown className="w-3 h-3" />
                            <span>Premium Ready</span>
                          </span>
                        ) : (
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">Popular Choice</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 ${isPremium ? 'text-purple-600' : 'text-gray-600'}`} />
                </div>
              </div>
            </div>

            {/* Learning Path */}
            <div className={`${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl p-6 border shadow-lg`}>
              <h3 className={`text-xl font-bold ${isPremium ? 'text-purple-900' : 'text-gray-900'} mb-4`}>
                {isPremium ? 'Your AI-Powered Journey' : 'Suggested Learning Path'}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 py-2">
                  <div className={`w-8 h-8 ${isPremium ? 'bg-purple-200' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                    <Target className={`w-4 h-4 ${isPremium ? 'text-purple-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <p className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} text-sm font-medium`}>
                      {isPremium ? 'AI Analysis: Choose your domain' : 'Choose your domain'}
                    </p>
                    <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-xs`}>
                      {isPremium ? 'AI will analyze your background and goals' : 'Select from 5 available domains'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 py-2 opacity-50">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Zap className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} text-sm`}>
                      {isPremium ? 'Get hyper-personalized roadmap' : 'Generate basic roadmap'}
                    </p>
                    <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-xs`}>
                      {isPremium ? 'Tailored to your exact skill level and goals' : 'Generic roadmap for beginners'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 py-2 opacity-50">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-gray-400" />
                  </div>
                  <div>
                    <p className={`${isPremium ? 'text-purple-900' : 'text-gray-900'} text-sm`}>
                      {isPremium ? 'Track progress with AI insights' : 'Follow the roadmap'}
                    </p>
                    <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-xs`}>
                      {isPremium ? 'Real-time adjustments based on your progress' : 'Self-paced learning'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'domains':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold font-playfair ${isPremium ? 'text-purple-900' : 'text-gray-900'}`}>
                {isPremium ? 'AI-Powered Domains' : 'Available Domains'}
              </h2>
              <div className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm`}>
                5 domains available
              </div>
            </div>

            {!isPremium && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Crown className="w-6 h-6 text-purple-600" />
                    <div>
                      <h3 className="font-bold text-purple-900">Unlock Premium Features</h3>
                      <p className="text-purple-700 text-sm">Get AI-personalized roadmaps for just ₹199</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUpgrade(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Upgrade Now
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {domains.map((domain) => {
                const IconComponent = domain.icon
                return (
                  <div
                    key={domain.id}
                    className={`${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 hover:border-purple-300 hover:shadow-purple-500/20' : 'bg-white border-gray-200 hover:border-gray-300'} rounded-2xl p-6 border hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:scale-105 group`}
                    onClick={() => handleDomainClick(domain.id as DomainType)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${domain.color} rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      {isPremium && (
                        <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs">
                          <Crown className="w-3 h-3" />
                          <span>AI Ready</span>
                        </div>
                      )}
                    </div>
                    
                    <h3 className={`text-lg font-bold ${isPremium ? 'text-purple-900' : 'text-gray-900'} mb-2`}>
                      {domain.title}
                    </h3>
                    <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm mb-4`}>
                      {domain.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-sm`}>
                          {isPremium ? 'AI-Personalized' : 'Popular'}
                        </span>
                      </div>
                      <ChevronRight className={`w-4 h-4 ${isPremium ? 'text-purple-600' : 'text-gray-600'} group-hover:translate-x-1 transition-transform duration-300`} />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )

      case 'certificates':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold font-playfair ${isPremium ? 'text-purple-900' : 'text-gray-900'}`}>
              My Certificates
            </h2>
            
            <div className="text-center py-12">
              <div className={`w-16 h-16 ${isPremium ? 'bg-purple-100' : 'bg-gray-100'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <Award className={`w-8 h-8 ${isPremium ? 'text-purple-600' : 'text-gray-600'}`} />
              </div>
              <h3 className={`text-xl font-bold ${isPremium ? 'text-purple-900' : 'text-gray-900'} mb-2`}>
                No Certificates Yet
              </h3>
              <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} mb-6`}>
                {isPremium ? 'Complete your AI-personalized roadmaps to earn certificates' : 'Complete domain roadmaps to earn certificates'}
              </p>
              <button 
                onClick={() => setActiveTab('domains')}
                className={`${isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-purple-500/25' : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:shadow-blue-500/25'} text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-300`}
              >
                Explore Domains
              </button>
            </div>
          </div>
        )

      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold font-playfair ${isPremium ? 'text-purple-900' : 'text-gray-900'}`}>
              Profile Settings
            </h2>
            
            <div className={`${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl p-6 border shadow-lg`}>
              <div className="flex items-center space-x-4 mb-6">
                <div className={`w-16 h-16 ${isPremium ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-purple-500/25' : 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-blue-500/25'} rounded-full flex items-center justify-center shadow-lg`}>
                  {isPremium ? <Crown className="w-8 h-8 text-white" /> : <User className="w-8 h-8 text-white" />}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className={`text-xl font-bold ${isPremium ? 'text-purple-900' : 'text-gray-900'}`}>
                      {user?.email?.split('@')[0] || 'User'}
                    </h3>
                    {isPremium && (
                      <div className="flex items-center space-x-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        <Crown className="w-4 h-4" />
                        <span>Premium User</span>
                      </div>
                    )}
                  </div>
                  <p className={isPremium ? 'text-purple-700' : 'text-gray-600'}>{user?.email}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className={`block ${isPremium ? 'text-purple-900' : 'text-gray-900'} text-sm font-medium mb-2`}>
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className={`w-full px-4 py-3 ${isPremium ? 'bg-purple-100 border-purple-300 text-purple-900' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg`}
                  />
                </div>
                
                <div>
                  <label className={`block ${isPremium ? 'text-purple-900' : 'text-gray-900'} text-sm font-medium mb-2`}>
                    Account Type
                  </label>
                  <input
                    type="text"
                    value={isPremium ? 'Premium' : 'Free'}
                    disabled
                    className={`w-full px-4 py-3 ${isPremium ? 'bg-purple-100 border-purple-300 text-purple-900' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg`}
                  />
                </div>
                
                <div>
                  <label className={`block ${isPremium ? 'text-purple-900' : 'text-gray-900'} text-sm font-medium mb-2`}>
                    Member Since
                  </label>
                  <input
                    type="text"
                    value={new Date(user?.created_at || '').toLocaleDateString()}
                    disabled
                    className={`w-full px-4 py-3 ${isPremium ? 'bg-purple-100 border-purple-300 text-purple-900' : 'bg-gray-100 border-gray-300 text-gray-900'} border rounded-lg`}
                  />
                </div>

                {!isPremium && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowUpgrade(true)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <Crown className="w-5 h-5" />
                      <span>Upgrade to Premium</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`min-h-screen ${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gray-50'} text-gray-900 font-source`}>
      {/* Premium Upgrade Modal */}
      <PremiumUpgrade 
        isOpen={showUpgrade}
        onClose={() => setShowUpgrade(false)}
      />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 ${isPremium ? 'bg-gradient-to-b from-purple-900 to-pink-900' : 'bg-white'} border-r ${isPremium ? 'border-purple-700' : 'border-gray-200'} z-50 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0 shadow-xl`}>
        <div className="p-6">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className={`w-8 h-8 ${isPremium ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-gradient-to-br from-blue-500 to-cyan-500'} rounded-lg flex items-center justify-center shadow-lg`}>
              {isPremium ? <Crown className="w-5 h-5 text-white" /> : <GraduationCap className="w-5 h-5 text-white" />}
            </div>
            <span className={`text-xl font-bold font-playfair ${isPremium ? 'text-white' : 'text-gray-900'}`}>
              Acad AI {isPremium && <span className="text-purple-300">Pro</span>}
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as TabType)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeTab === item.id
                      ? isPremium 
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                      : isPremium
                        ? 'text-purple-200 hover:text-white hover:bg-purple-800/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Sign Out */}
          <div className="absolute bottom-6 left-6 right-6">
            <button
              onClick={handleSignOut}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isPremium 
                  ? 'text-purple-200 hover:text-white hover:bg-red-600/20'
                  : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Bar */}
        <div className={`${isPremium ? 'bg-gradient-to-r from-purple-900 to-pink-900 border-purple-700' : 'bg-white border-gray-200'} border-b px-4 py-4 lg:px-8 shadow-sm`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className={`lg:hidden ${isPremium ? 'text-white' : 'text-gray-900'} p-2 hover:bg-gray-100 rounded-lg`}
              >
                <Menu className="w-6 h-6" />
              </button>
              <div>
                <h1 className={`text-xl font-bold ${isPremium ? 'text-white' : 'text-gray-900'} capitalize`}>
                  {activeTab}
                </h1>
                <p className={`${isPremium ? 'text-purple-200' : 'text-gray-600'} text-sm`}>
                  {activeTab === 'home' && (isPremium ? 'Your AI-powered learning dashboard' : 'Your learning dashboard')}
                  {activeTab === 'domains' && (isPremium ? 'AI-personalized domain roadmaps' : 'Explore available domains')}
                  {activeTab === 'certificates' && 'View your achievements'}
                  {activeTab === 'profile' && 'Account settings'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <div className="flex items-center space-x-2">
                  <p className={`${isPremium ? 'text-white' : 'text-gray-900'} font-medium`}>
                    {user?.email?.split('@')[0] || 'User'}
                  </p>
                  {isPremium && (
                    <div className="flex items-center space-x-1 bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                      <Crown className="w-3 h-3" />
                      <span>Pro</span>
                    </div>
                  )}
                </div>
                <p className={`${isPremium ? 'text-purple-200' : 'text-gray-600'} text-sm`}>
                  {user?.email}
                </p>
              </div>
              <div className={`w-10 h-10 ${isPremium ? 'bg-gradient-to-br from-purple-400 to-pink-400' : 'bg-gradient-to-br from-blue-500 to-cyan-500'} rounded-full flex items-center justify-center shadow-lg`}>
                {isPremium ? <Crown className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}