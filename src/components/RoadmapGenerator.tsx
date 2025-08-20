import React, { useState, useEffect } from 'react'
import { ArrowLeft, Brain, Target, CheckCircle, Clock, Star, X, Zap, Award, Code, Users } from 'lucide-react'

interface RoadmapGeneratorProps {
  onBack: () => void
}

interface RoadmapSection {
  id: string
  title: string
  duration: string
  description: string
  topics: RoadmapTopic[]
}

interface RoadmapTopic {
  id: string
  title: string
  subtopics: string[]
  priority: 'high' | 'medium' | 'low'
}

export const RoadmapGenerator: React.FC<RoadmapGeneratorProps> = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [showRoadmap, setShowRoadmap] = useState(false)
  const [visibleSections, setVisibleSections] = useState<string[]>([])
  const [showUpgradePopup, setShowUpgradePopup] = useState(false)

  const loadingSteps = [
    "🤖 Our AI is analyzing the current market trends...",
    "📊 Processing 10,000+ job postings from top companies...",
    "🎯 Identifying the most in-demand frontend skills...",
    "⚡ Optimizing learning path for maximum job readiness...",
    "🚀 Generating your personalized roadmap...",
    "✨ Almost done! Finalizing your career transformation plan..."
  ]

  const roadmapSections: RoadmapSection[] = [
    {
      id: 'building-blocks',
      title: 'Phase 1: The Building Blocks',
      duration: '1-2 months',
      description: 'This phase covers the absolute essentials. By the end, you\'ll be able to create static web pages.',
      topics: [
        {
          id: 'web-basics',
          title: 'How the Web Works (The Basics)',
          priority: 'high',
          subtopics: [
            'What are websites, browsers, and servers?',
            'What is the internet? (Very high-level)',
            'Understanding URLs',
            'Free Resource Tip: MDN Web Docs (Mozilla Developer Network) - "How the Web Works" series'
          ]
        },
        {
          id: 'html5-basics',
          title: 'HTML5 (Structuring Your Content)',
          priority: 'high',
          subtopics: [
            'What is HTML?',
            'Basic HTML Tags: <html>, <head>, <body>, <h1> to <h6>, <p>, <a>, <img>, <ul>, <ol>, <li>, <div>, <span>',
            'Creating basic lists, links, and images',
            'Free Resource Tip: freeCodeCamp "Responsive Web Design Certification" (first few sections), W3Schools HTML Tutorial'
          ]
        },
        {
          id: 'css3-basics',
          title: 'CSS3 (Styling Your Content)',
          priority: 'high',
          subtopics: [
            'What is CSS?',
            'How to connect CSS to HTML',
            'Basic Selectors (element, class, ID)',
            'Common CSS Properties: color, background-color, font-size, font-family, text-align, width, height, margin, padding, border',
            'Introduction to Layout: The Box Model (understanding margin, border, padding, content)',
            'Basic display properties (block, inline, inline-block)',
            'Free Resource Tip: freeCodeCamp "Responsive Web Design Certification" (CSS sections), CSS-Tricks, Kevin Powell (YouTube channel)'
          ]
        },
        {
          id: 'basic-projects',
          title: 'Basic HTML & CSS Projects (Practice is Key!)',
          priority: 'high',
          subtopics: [
            'Build a simple personal portfolio page',
            'Create a basic blog post layout',
            'Design a simple landing page for an imaginary product',
            'Free Resource Tip: The Odin Project (Foundations course has guided projects), Frontend Mentor (free challenges)'
          ]
        }
      ]
    },
    {
      id: 'interactivity',
      title: 'Phase 2: Adding Interactivity & Collaboration',
      duration: '1-2 months',
      description: 'Once you\'re comfortable with static pages, it\'s time to make them come alive!',
      topics: [
        {
          id: 'javascript-basics',
          title: 'JavaScript (Making Things Interactive)',
          priority: 'high',
          subtopics: [
            'What is JavaScript?',
            'Variables (let, const), Data Types (numbers, strings, booleans)',
            'Operators (arithmetic, comparison, logical)',
            'Conditional Statements (if/else)',
            'Loops (for, while)',
            'DOM Manipulation Basics: Selecting HTML elements (getElementById, querySelector)',
            'Changing text and styles',
            'Responding to user events (e.g., click events)',
            'Free Resource Tip: freeCodeCamp "JavaScript Algorithms and Data Structures Certification", javascript.info, MDN Web Docs JavaScript Guide'
          ]
        },
        {
          id: 'version-control',
          title: 'Version Control Basics (Working with Code)',
          priority: 'high',
          subtopics: [
            'What is Git and why is it used?',
            'Basic Git Commands: git init, git add, git commit, git status, git log',
            'Introduction to GitHub: Creating a repository',
            'Pushing your code to GitHub',
            'Free Resource Tip: GitHub\'s "Hello World" guide, freeCodeCamp Git & GitHub tutorials'
          ]
        },
        {
          id: 'responsive-basics',
          title: 'Responsive Design Basics (Making Websites Look Good Everywhere)',
          priority: 'high',
          subtopics: [
            'Why responsive design is important (mobile phones, tablets, desktops)',
            'Simple Media Queries: Changing styles based on screen width',
            'Basic use of em and rem units for flexible sizing',
            'Free Resource Tip: freeCodeCamp Responsive Web Design section'
          ]
        },
        {
          id: 'intermediate-projects',
          title: 'Intermediate Projects with JavaScript',
          priority: 'high',
          subtopics: [
            'Build a basic to-do list application (add, remove items)',
            'Create a simple calculator',
            'Develop a basic image carousel or gallery',
            'Free Resource Tip: freeCodeCamp projects, JavaScript30 (Wes Bos\'s free vanilla JS course)'
          ]
        }
      ]
    },
    {
      id: 'stepping-up',
      title: 'Phase 3: Stepping Up (Hint for Paid Value!)',
      duration: '1-2 months',
      description: 'This phase introduces you to concepts that are crucial for modern frontend development, laying the groundwork for the more advanced topics in the paid roadmap.',
      topics: [
        {
          id: 'command-line',
          title: 'Command Line Fundamentals',
          priority: 'medium',
          subtopics: [
            'Basic commands (cd, ls/dir, mkdir, touch)',
            'Why the command line is used in development',
            'Free Resource Tip: Codecademy (basic command line course), various quick guides online'
          ]
        },
        {
          id: 'modern-css',
          title: 'Introduction to Modern CSS Layouts',
          priority: 'high',
          subtopics: [
            'Flexbox (More Detail): Aligning and distributing items in a single row or column',
            'This will be a teaser for the advanced CSS Grid covered in the paid tier',
            'Free Resource Tip: Flexbox Froggy (interactive game), CSS-Tricks Flexbox Guide'
          ]
        },
        {
          id: 'apis-intro',
          title: 'Introduction to APIs (Getting Data from the Internet)',
          priority: 'medium',
          subtopics: [
            'What is an API? (Very simple explanation: how websites talk to each other)',
            'How to make a simple fetch request in JavaScript to get public data (e.g., a simple weather API, or a joke API)',
            'Free Resource Tip: MDN Web Docs fetch API guide, free public API lists (e.g., Public APIs GitHub repo)'
          ]
        },
        {
          id: 'portfolio-deployment',
          title: 'Portfolio Refinement & Deployment',
          priority: 'high',
          subtopics: [
            'Review and improve your basic projects',
            'Learn how to deploy a static website using a free service',
            'Free Resource Tip: Netlify, Vercel (free tiers for static sites), GitHub Pages'
          ]
        }
      ]
    }
  ]

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
    }, 2000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (showRoadmap) {
      roadmapSections.forEach((section, index) => {
        setTimeout(() => {
          setVisibleSections(prev => [...prev, section.id])
        }, index * 800)
      })

      // Show upgrade popup after user has viewed the roadmap for a bit
      setTimeout(() => {
        setShowUpgradePopup(true)
      }, 5000)
    }
  }, [showRoadmap])

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-orange-600 bg-orange-100'
      case 'low': return 'text-green-600 bg-green-100'
    }
  }

  const getPriorityLabel = (priority: 'high' | 'medium' | 'low') => {
    switch (priority) {
      case 'high': return 'Essential'
      case 'medium': return 'Important'
      case 'low': return 'Nice to Have'
    }
  }

  if (!showRoadmap) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse shadow-lg shadow-blue-500/25">
              <Brain className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold font-playfair text-gray-900 mb-4">
              AI Roadmap Generator
            </h2>
            <p className="text-gray-600 text-lg">
              Creating your personalized learning path based on 2025 market demands
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-xl">
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
                        ? 'bg-blue-100 text-blue-600 animate-pulse' 
                        : 'bg-gray-200 text-gray-500'
                  }`}>
                    {index < currentStep ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </div>
                  <p className={`text-left ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-600'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / loadingSteps.length) * 100}%` }}
                ></div>
              </div>
               <p className="text-center text-gray-600 mt-4">
                This basic roadmap gives you the foundation, but our premium course offers a personalized, 
                {Math.round(((currentStep + 1) / loadingSteps.length) * 100)}% Complete
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Upgrade Popup */}
      {showUpgradePopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h2 className="text-2xl font-bold font-playfair text-white">Ready for More?</h2>
                <p className="text-white/90">This is just the beginning of your journey</p>
              </div>
              <button
                onClick={() => setShowUpgradePopup(false)}
                className="text-white/80 hover:text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              {/* Alert Box */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-orange-900 mb-1">This is a Basic Roadmap</h3>
                    <p className="text-orange-800 text-sm">
                      What you're viewing is a generic roadmap that covers the basics. While helpful, 
                      it's not personalized to your specific goals, current skill level, or career aspirations.
                    </p>
                  </div>
                </div>
              </div>

              {/* Value Proposition */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Want a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Hyper-Personalized</span> Roadmap?
                </h3>
                <p className="text-gray-600 text-lg">
                  Our AI-powered course creates a learning path tailored specifically to YOU
                </p>
              </div>

              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Brain className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">AI-Personalized Learning</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Adapts to what you already know and only teaches what you need - no fluff, no wasted time
                  </p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Award className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Blockchain Certificates</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Employers can verify your skills in minutes with our blockchain-backed credentials
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Industry-Grade Projects</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Build real projects that impress employers - no more generic to-do lists
                  </p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-orange-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Job-Ready Focus</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Everything you need to land your first job - nothing more, nothing less
                  </p>
                </div>
              </div>

              {/* Comparison */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-3 text-center">Free vs. Premium Roadmap</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-gray-700 mb-2">❌ Free Roadmap (What You're Viewing)</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Generic learning path</li>
                      <li>• Basic project suggestions</li>
                      <li>• No skill assessment</li>
                      <li>• External resources only</li>
                      <li>• No certificates</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-green-700 mb-2">✅ Premium Course</h5>
                    <ul className="text-sm text-green-600 space-y-1">
                      <li>• AI-personalized to your level</li>
                      <li>• Industry-grade projects</li>
                      <li>• Skill gap analysis</li>
                      <li>• Complete course materials</li>
                      <li>• Blockchain certificates</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setShowUpgradePopup(false)
                    onBack()
                  }}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 mb-3"
                >
                  Get Your Personalized Roadmap
                </button>
                <p className="text-gray-500 text-sm">
                  Join thousands who've fast-tracked their careers
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Courses</span>
            </button>
            <div>
              <h1 className="text-2xl font-bold font-playfair text-gray-900">
                Frontend Developer Roadmap 2025
              </h1>
              <p className="text-gray-600">Free Basic Version</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-6 h-6 text-blue-600" />
            <span className="text-gray-900 font-semibold">AI-Generated</span>
          </div>
        </div>
      </div>

      {/* Roadmap Content */}
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8 text-center">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              🎯 Your Basic Learning Journey
            </h2>
            <p className="text-gray-600">
              This is a general roadmap to get you started. For a personalized experience tailored to your specific needs, 
              consider upgrading to our premium course.
            </p>
          </div>
        </div>

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
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
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
                        className="bg-gray-100 rounded-lg p-4 border border-gray-200"
                        style={{
                          animationDelay: `${(sectionIndex * 800) + (topicIndex * 200)}ms`
                        }}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {topic.title}
                          </h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(topic.priority)}`}>
                            {getPriorityLabel(topic.priority)}
                          </span>
                        </div>
                        <div className="space-y-2">
                          {topic.subtopics.map((subtopic, subtopicIndex) => (
                            <div
                              key={subtopicIndex}
                              className="flex items-start space-x-3 text-gray-600"
                            >
                              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <h3 className="text-2xl font-bold font-playfair text-gray-900 mb-4">
              Ready to Take It to the Next Level?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              This basic roadmap gives you the foundation, but our premium course offers a personalized, 
              AI-driven experience that adapts to your specific needs and gets you job-ready faster.
            </p>
            <button
              onClick={() => setShowUpgradePopup(true)}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 mr-4"
            >
              Upgrade to Premium Course
            </button>
            <button
              onClick={onBack}
              className="border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}