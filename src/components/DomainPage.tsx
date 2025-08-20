import React, { useState, useEffect } from 'react'
import { 
  ArrowLeft, 
  Brain, 
  Target, 
  CheckCircle, 
  Clock, 
  Star, 
  Crown,
  Zap,
  Award,
  Code,
  Server,
  Layers,
  Cloud,
  Lock,
  Sparkles
} from 'lucide-react'

interface DomainPageProps {
  domain: 'frontend' | 'backend' | 'fullstack' | 'devops' | 'ml'
  isPremium: boolean
  onBack: () => void
  onUpgrade: () => void
}

interface RoadmapSection {
  id: string
  title: string
  duration: string
  description: string
  topics: RoadmapTopic[]
  isPremium?: boolean
}

interface RoadmapTopic {
  id: string
  title: string
  subtopics: string[]
  priority: 'high' | 'medium' | 'low'
}

export const DomainPage: React.FC<DomainPageProps> = ({ domain, isPremium, onBack, onUpgrade }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [visibleSections, setVisibleSections] = useState<string[]>([])

  const domainConfig = {
    frontend: {
      title: 'Frontend Development',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      description: 'Master modern web interfaces with React, Vue, and cutting-edge frameworks'
    },
    backend: {
      title: 'Backend Development',
      icon: Server,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      description: 'Build scalable server-side applications and robust APIs'
    },
    fullstack: {
      title: 'Full Stack Development',
      icon: Layers,
      color: 'from-purple-500 to-violet-500',
      bgColor: 'from-purple-50 to-violet-50',
      description: 'Complete end-to-end development mastery'
    },
    devops: {
      title: 'DevOps Engineering',
      icon: Cloud,
      color: 'from-orange-500 to-red-500',
      bgColor: 'from-orange-50 to-red-50',
      description: 'Master deployment, CI/CD, and cloud infrastructure'
    },
    ml: {
      title: 'Machine Learning',
      icon: Brain,
      color: 'from-pink-500 to-rose-500',
      bgColor: 'from-pink-50 to-rose-50',
      description: 'Build intelligent systems with AI and data science'
    }
  }

  const config = domainConfig[domain]
  const IconComponent = config.icon

  const loadingSteps = isPremium ? [
    "🤖 AI analyzing your background and goals...",
    "📊 Processing 50,000+ job postings for personalized insights...",
    "🎯 Identifying skills gaps specific to your profile...",
    "⚡ Creating hyper-personalized learning path...",
    "🚀 Optimizing roadmap for your career goals...",
    "✨ Finalizing your AI-powered transformation plan..."
  ] : [
    "🤖 Generating basic roadmap...",
    "📊 Analyzing general market trends...",
    "🎯 Creating standard learning path...",
    "⚡ Preparing generic roadmap...",
    "🚀 Almost ready..."
  ]

  // Sample roadmap data - in real app, this would come from AI
  const getRoadmapSections = (): RoadmapSection[] => {
    const baseSections: RoadmapSection[] = [
      {
        id: 'foundations',
        title: 'Phase 1: Foundations',
        duration: '2-3 months',
        description: isPremium ? 'AI-customized foundation based on your current skill level' : 'Basic foundation for beginners',
        topics: [
          {
            id: 'basics',
            title: isPremium ? 'Personalized Skill Assessment' : 'Basic Concepts',
            priority: 'high',
            subtopics: isPremium ? [
              'AI-powered skill gap analysis',
              'Customized learning objectives',
              'Personalized project recommendations',
              'Industry-specific focus areas'
            ] : [
              'Introduction to concepts',
              'Basic terminology',
              'Getting started guide',
              'Simple exercises'
            ]
          }
        ]
      },
      {
        id: 'intermediate',
        title: 'Phase 2: Intermediate Skills',
        duration: '3-4 months',
        description: isPremium ? 'Advanced concepts tailored to your career goals' : 'Standard intermediate concepts',
        topics: [
          {
            id: 'core-skills',
            title: isPremium ? 'AI-Selected Core Technologies' : 'Core Technologies',
            priority: 'high',
            subtopics: isPremium ? [
              'Technologies chosen based on job market analysis',
              'Personalized difficulty progression',
              'Real-world project simulations',
              'Industry mentor guidance'
            ] : [
              'Standard technology stack',
              'Generic tutorials',
              'Basic projects',
              'Self-paced learning'
            ]
          }
        ]
      }
    ]

    if (isPremium) {
      baseSections.push({
        id: 'advanced',
        title: 'Phase 3: Advanced & Specialization',
        duration: '2-3 months',
        description: 'AI-driven specialization based on your career aspirations',
        isPremium: true,
        topics: [
          {
            id: 'specialization',
            title: 'AI-Recommended Specialization',
            priority: 'high',
            subtopics: [
              'Career-specific advanced topics',
              'Industry-leading practices',
              'Cutting-edge technologies',
              'Portfolio optimization for target roles'
            ]
          }
        ]
      })
    }

    return baseSections
  }

  const roadmapSections = getRoadmapSections()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev < loadingSteps.length - 1) {
          return prev + 1
        } else {
          clearInterval(timer)
          setTimeout(() => setShowRoadmap(true), 1000)
          return prev
        }
      })
    }, isPremium ? 2000 : 1500)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (showRoadmap) {
      roadmapSections.forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, section.id])
        }, index * 800)
      })
    }
  }, [showRoadmap])

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-orange-600 bg-orange-100'
      case 'low': return 'text-green-600 bg-green-100'
    }
  }

  if (!showRoadmap) {
    return (
      <div className={`min-h-screen ${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="mb-8">
            <div className={`w-20 h-20 bg-gradient-to-br ${isPremium ? 'from-purple-500 to-pink-500 shadow-purple-500/25' : config.color + ' shadow-lg'} rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg`}>
              {isPremium ? <Crown className="w-10 h-10 text-white" /> : <IconComponent className="w-10 h-10 text-white" />}
            </div>
            <h2 className={`text-3xl font-bold font-playfair ${isPremium ? 'text-purple-900' : 'text-gray-900'} mb-4`}>
              {isPremium ? 'AI Roadmap Generator' : 'Roadmap Generator'}
            </h2>
            <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} text-lg`}>
              {isPremium 
                ? `Creating your hyper-personalized ${config.title.toLowerCase()} roadmap`
                : `Creating your ${config.title.toLowerCase()} roadmap`
              }
            </p>
          </div>

          <div className={`${isPremium ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl p-8 border shadow-xl`}>
            <div className="space-y-6">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 transition-all duration-500 ${
                    index <= currentStep ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < currentStep 
                      ? 'bg-green-100 text-green-600' 
                      : index === currentStep 
                        ? isPremium 
                          ? 'bg-purple-100 text-purple-600 animate-pulse'
                          : 'bg-blue-100 text-blue-600 animate-pulse'
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className={`text-left ${
                    index <= currentStep 
                      ? isPremium ? 'text-purple-900' : 'text-gray-900'
                      : isPremium ? 'text-purple-600' : 'text-gray-600'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`${isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gradient-to-r from-blue-600 to-cyan-600'} h-2 rounded-full transition-all duration-500`}
                  style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                ></div>
              </div>
              <p className={`text-center ${isPremium ? 'text-purple-700' : 'text-gray-600'} mt-4`}>
                {Math.round(((currentStep + 1) / loadingSteps.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${isPremium ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isPremium ? 'bg-gradient-to-r from-purple-900 to-pink-900 border-purple-700' : 'bg-white border-gray-200'} border-b p-6 shadow-sm`}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className={`${isPremium ? 'text-purple-200 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors flex items-center space-x-2`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Domains</span>
            </button>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className={`text-2xl font-bold font-playfair ${isPremium ? 'text-white' : 'text-gray-900'}`}>
                  {config.title} Roadmap
                </h1>
                {isPremium && (
                  <div className="flex items-center space-x-1 bg-white/20 text-white px-3 py-1 rounded-full text-sm">
                    <Crown className="w-4 h-4" />
                    <span>AI-Personalized</span>
                  </div>
                )}
              </div>
              <p className={`${isPremium ? 'text-purple-200' : 'text-gray-600'}`}>
                {isPremium ? 'Hyper-personalized for your goals' : 'Basic roadmap'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <IconComponent className={`w-6 h-6 ${isPremium ? 'text-purple-200' : 'text-blue-600'}`} />
            <span className={`${isPremium ? 'text-white' : 'text-gray-900'} font-semibold`}>
              {isPremium ? 'AI-Generated' : 'Standard'}
            </span>
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="max-w-6xl mx-auto p-6">
        {!isPremium && (
          <div className="mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Crown className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-purple-900 mb-1">
                      This is a Basic Roadmap
                    </h3>
                    <p className="text-purple-700">
                      Upgrade to get AI-personalized roadmap tailored to your exact needs
                    </p>
                  </div>
                </div>
                <button
                  onClick={onUpgrade}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Upgrade Now</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-8">
          {roadmapSections.map((section, sectionIndex) => (
            <div
              key={section.id}
              className={`transition-all duration-800 transform ${
                visibleSections.includes(section.id)
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <div className={`${isPremium ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl border overflow-hidden shadow-lg ${section.isPremium && !isPremium ? 'opacity-60' : ''}`}>
                {/* Section Header */}
                <div className={`${isPremium ? 'bg-gradient-to-r from-purple-600 to-pink-600' : `bg-gradient-to-r ${config.color}`} p-6 relative`}>
                  {section.isPremium && !isPremium && (
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center space-x-1 bg-black/20 text-white px-3 py-1 rounded-full text-sm">
                        <Lock className="w-4 h-4" />
                        <span>Premium</span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {section.title}
                      </h3>
                      <p className="text-white/80">{section.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2 text-white/90 mb-1">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{section.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-white/90">
                        <Star className="w-4 h-4" />
                        <span className="text-sm">{section.topics.length} Topics</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Topics */}
                <div className="p-6">
                  <div className="grid gap-6">
                    {section.topics.map((topic, topicIndex) => (
                      <div
                        key={topic.id}
                        className={`${isPremium ? 'bg-purple-50 border-purple-200' : 'bg-gray-100 border-gray-200'} rounded-lg p-4 border`}
                        style={{
                          animationDelay: `${(sectionIndex * 800) + (topicIndex * 200)}ms`
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className={`text-lg font-semibold ${isPremium ? 'text-purple-900' : 'text-gray-900'}`}>
                            {topic.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(topic.priority)}`}>
                            {topic.priority === 'high' ? 'Essential' : topic.priority === 'medium' ? 'Important' : 'Nice to Have'}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {topic.subtopics.map((subtopic, subtopicIndex) => (
                            <div
                              key={subtopicIndex}
                              className={`flex items-start space-x-3 ${isPremium ? 'text-purple-700' : 'text-gray-600'}`}
                            >
                              <div className={`w-1.5 h-1.5 ${isPremium ? 'bg-purple-600' : 'bg-blue-600'} rounded-full mt-2 flex-shrink-0`}></div>
                              <span className="text-sm">{subtopic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className={`${isPremium ? 'bg-gradient-to-br from-purple-100 to-pink-100 border-purple-200' : 'bg-white border-gray-200'} rounded-2xl p-8 border shadow-lg`}>
            <h3 className={`text-2xl font-bold font-playfair ${isPremium ? 'text-purple-900' : 'text-gray-900'} mb-4`}>
              {isPremium ? 'Your AI-Powered Journey Awaits' : 'Ready to Get Personalized?'}
            </h3>
            <p className={`${isPremium ? 'text-purple-700' : 'text-gray-600'} mb-6 max-w-2xl mx-auto`}>
              {isPremium 
                ? 'This roadmap is specifically tailored to your background, goals, and the current job market. Start your transformation today!'
                : 'This basic roadmap gives you the foundation, but our AI can create a hyper-personalized path that adapts to your exact needs and goals.'
              }
            </p>
            {!isPremium ? (
              <button
                onClick={onUpgrade}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 mr-4"
              >
                Upgrade to Premium
              </button>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-purple-600">
                <Award className="w-6 h-6" />
                <span className="font-semibold">You're all set with Premium!</span>
              </div>
            )}
            <button
              onClick={onBack}
              className={`${isPremium ? 'border-purple-300 text-purple-700 hover:border-purple-400 hover:bg-purple-50' : 'border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50'} border-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${!isPremium ? 'ml-4' : 'mt-4'}`}
            >
              Back to Domains
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}