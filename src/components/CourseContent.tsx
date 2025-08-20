import React, { useState } from 'react'
import { 
  ChevronDown, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Clock, 
  FileText,
  Code,
  Palette,
  Zap,
  Globe,
  Server,
  Layers
} from 'lucide-react'

interface CourseContentProps {
  courseVersion: 'standard' | 'pro'
  onBack: () => void
}

interface Topic {
  id: string
  title: string
  icon: React.ReactNode
  duration: string
  lessons: Lesson[]
  completed?: boolean
}

interface Lesson {
  id: string
  title: string
  duration: string
  type: 'video' | 'article' | 'quiz'
  completed?: boolean
  videoUrl?: string
}

export const CourseContent: React.FC<CourseContentProps> = ({ courseVersion, onBack }) => {
  const [expandedTopics, setExpandedTopics] = useState<string[]>(['intro'])
  const [currentLesson, setCurrentLesson] = useState<string | null>('intro-video')

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev => 
      prev.includes(topicId) 
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    )
  }

  const courseTopics: Topic[] = [
    {
      id: 'intro',
      title: 'Course Introduction',
      icon: <Play className="w-5 h-5" />,
      duration: '15 min',
      lessons: [
        {
          id: 'intro-video',
          title: '1-on-1 Course Introduction',
          duration: '15 min',
          type: 'video',
          videoUrl: 'https://tavus.daily.co/c49c70cf88f8b4d0'
        }
      ]
    },
    {
      id: 'html',
      title: 'HTML5 Fundamentals',
      icon: <Code className="w-5 h-5" />,
      duration: '3 hours',
      lessons: [
        { id: 'html-1', title: 'HTML Structure & Semantics', duration: '25 min', type: 'video' },
        { id: 'html-2', title: 'Forms & Input Elements', duration: '30 min', type: 'video' },
        { id: 'html-3', title: 'Accessibility Best Practices', duration: '20 min', type: 'video' },
        { id: 'html-4', title: 'HTML5 APIs', duration: '35 min', type: 'video' },
        { id: 'html-quiz', title: 'HTML Knowledge Check', duration: '10 min', type: 'quiz' }
      ]
    },
    {
      id: 'css',
      title: 'CSS3 & Modern Styling',
      icon: <Palette className="w-5 h-5" />,
      duration: '4 hours',
      lessons: [
        { id: 'css-1', title: 'CSS Fundamentals & Selectors', duration: '30 min', type: 'video' },
        { id: 'css-2', title: 'Flexbox & Grid Layout', duration: '45 min', type: 'video' },
        { id: 'css-3', title: 'Responsive Design Principles', duration: '40 min', type: 'video' },
        { id: 'css-4', title: 'CSS Animations & Transitions', duration: '35 min', type: 'video' },
        { id: 'css-5', title: 'CSS Variables & Custom Properties', duration: '25 min', type: 'video' },
        { id: 'css-quiz', title: 'CSS Mastery Quiz', duration: '15 min', type: 'quiz' }
      ]
    },
    {
      id: 'javascript',
      title: 'JavaScript ES6+',
      icon: <Zap className="w-5 h-5" />,
      duration: '6 hours',
      lessons: [
        { id: 'js-1', title: 'JavaScript Fundamentals', duration: '40 min', type: 'video' },
        { id: 'js-2', title: 'ES6+ Features & Syntax', duration: '50 min', type: 'video' },
        { id: 'js-3', title: 'DOM Manipulation', duration: '45 min', type: 'video' },
        { id: 'js-4', title: 'Async JavaScript & Promises', duration: '55 min', type: 'video' },
        { id: 'js-5', title: 'Fetch API & AJAX', duration: '35 min', type: 'video' },
        { id: 'js-6', title: 'Error Handling & Debugging', duration: '30 min', type: 'video' },
        { id: 'js-quiz', title: 'JavaScript Assessment', duration: '20 min', type: 'quiz' }
      ]
    },
    {
      id: 'gsap',
      title: 'GSAP Animations',
      icon: <Zap className="w-5 h-5" />,
      duration: '2 hours',
      lessons: [
        { id: 'gsap-1', title: 'GSAP Basics & Timeline', duration: '30 min', type: 'video' },
        { id: 'gsap-2', title: 'Advanced Animations', duration: '40 min', type: 'video' },
        { id: 'gsap-3', title: 'ScrollTrigger Plugin', duration: '35 min', type: 'video' },
        { id: 'gsap-project', title: 'Animation Project', duration: '15 min', type: 'article' }
      ]
    },
    {
      id: 'react',
      title: 'React Development',
      icon: <Layers className="w-5 h-5" />,
      duration: '8 hours',
      lessons: [
        { id: 'react-1', title: 'React Fundamentals & JSX', duration: '45 min', type: 'video' },
        { id: 'react-2', title: 'Components & Props', duration: '50 min', type: 'video' },
        { id: 'react-3', title: 'State & Event Handling', duration: '55 min', type: 'video' },
        { id: 'react-4', title: 'React Hooks Deep Dive', duration: '60 min', type: 'video' },
        { id: 'react-5', title: 'Context API & State Management', duration: '45 min', type: 'video' },
        { id: 'react-6', title: 'React Router & Navigation', duration: '40 min', type: 'video' },
        { id: 'react-7', title: 'Performance Optimization', duration: '35 min', type: 'video' },
        { id: 'react-quiz', title: 'React Mastery Test', duration: '25 min', type: 'quiz' }
      ]
    },
    {
      id: 'tailwind',
      title: 'Tailwind CSS',
      icon: <Palette className="w-5 h-5" />,
      duration: '2 hours',
      lessons: [
        { id: 'tailwind-1', title: 'Tailwind Setup & Configuration', duration: '25 min', type: 'video' },
        { id: 'tailwind-2', title: 'Utility Classes & Responsive Design', duration: '35 min', type: 'video' },
        { id: 'tailwind-3', title: 'Custom Components & Plugins', duration: '30 min', type: 'video' },
        { id: 'tailwind-4', title: 'Dark Mode & Theming', duration: '20 min', type: 'video' }
      ]
    },
    {
      id: 'framer',
      title: 'Framer Motion',
      icon: <Zap className="w-5 h-5" />,
      duration: '3 hours',
      lessons: [
        { id: 'framer-1', title: 'Framer Motion Basics', duration: '30 min', type: 'video' },
        { id: 'framer-2', title: 'Page Transitions & Animations', duration: '40 min', type: 'video' },
        { id: 'framer-3', title: 'Gesture Animations', duration: '35 min', type: 'video' },
        { id: 'framer-4', title: 'Advanced Animation Patterns', duration: '45 min', type: 'video' }
      ]
    },
    {
      id: 'nextjs',
      title: 'Next.js Framework',
      icon: <Globe className="w-5 h-5" />,
      duration: '5 hours',
      lessons: [
        { id: 'next-1', title: 'Next.js Fundamentals', duration: '40 min', type: 'video' },
        { id: 'next-2', title: 'Pages & Routing', duration: '45 min', type: 'video' },
        { id: 'next-3', title: 'API Routes & Server-side Rendering', duration: '50 min', type: 'video' },
        { id: 'next-4', title: 'Static Site Generation', duration: '35 min', type: 'video' },
        { id: 'next-5', title: 'Deployment & Optimization', duration: '40 min', type: 'video' },
        { id: 'next-quiz', title: 'Next.js Assessment', duration: '20 min', type: 'quiz' }
      ]
    },
    {
      id: 'devops',
      title: 'DevOps Fundamentals',
      icon: <Server className="w-5 h-5" />,
      duration: '3 hours',
      lessons: [
        { id: 'devops-1', title: 'Version Control with Git', duration: '35 min', type: 'video' },
        { id: 'devops-2', title: 'CI/CD Pipelines', duration: '40 min', type: 'video' },
        { id: 'devops-3', title: 'Docker Basics', duration: '45 min', type: 'video' },
        { id: 'devops-4', title: 'Cloud Deployment (Vercel, Netlify)', duration: '30 min', type: 'video' },
        { id: 'devops-5', title: 'Monitoring & Performance', duration: '20 min', type: 'video' }
      ]
    }
  ]

  const currentLessonData = courseTopics
    .flatMap(topic => topic.lessons)
    .find(lesson => lesson.id === currentLesson)

  const totalLessons = courseTopics.reduce((acc, topic) => acc + topic.lessons.length, 0)
  const completedLessons = courseTopics.reduce((acc, topic) => 
    acc + topic.lessons.filter(lesson => lesson.completed).length, 0
  )

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 p-4 lg:p-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onBack}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
            >
              ← Back to Courses
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-neutral-900">Frontend Development</h1>
              <p className="text-neutral-600 text-sm">
                {courseVersion === 'pro' ? 'Pro Version' : 'Standard Version'} • {totalLessons} lessons
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-neutral-900 font-semibold">{Math.round((completedLessons / totalLessons) * 100)}% Complete</p>
            <div className="w-32 bg-neutral-200 rounded-full h-2 mt-1">
              <div 
                className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedLessons / totalLessons) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar - Course Content */}
        <div className="w-80 bg-white border-r border-neutral-200 h-screen overflow-y-auto shadow-lg">
          <div className="p-4">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">Course Content</h2>
            <div className="space-y-2">
              {courseTopics.map((topic) => (
                <div key={topic.id} className="border border-neutral-200 rounded-lg">
                  <button
                    onClick={() => toggleTopic(topic.id)}
                    className="w-full flex items-center justify-between p-3 hover:bg-neutral-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-primary-600">{topic.icon}</div>
                      <div className="text-left">
                        <p className="text-neutral-900 font-medium text-sm">{topic.title}</p>
                        <p className="text-neutral-600 text-xs">{topic.duration}</p>
                      </div>
                    </div>
                    {expandedTopics.includes(topic.id) ? (
                      <ChevronDown className="w-4 h-4 text-neutral-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-neutral-600" />
                    )}
                  </button>
                  
                  {expandedTopics.includes(topic.id) && (
                    <div className="border-t border-neutral-200">
                      {topic.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          onClick={() => setCurrentLesson(lesson.id)}
                          className={`w-full flex items-center space-x-3 p-3 hover:bg-neutral-100 transition-colors ${
                            currentLesson === lesson.id ? 'bg-primary-100' : ''
                          }`}
                        >
                          <div className="flex-shrink-0">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-success-600" />
                            ) : lesson.type === 'video' ? (
                              <Play className="w-4 h-4 text-neutral-600" />
                            ) : lesson.type === 'quiz' ? (
                              <FileText className="w-4 h-4 text-neutral-600" />
                            ) : (
                              <FileText className="w-4 h-4 text-neutral-600" />
                            )}
                          </div>
                          <div className="flex-1 text-left">
                            <p className="text-neutral-900 text-sm">{lesson.title}</p>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-3 h-3 text-neutral-600" />
                              <span className="text-neutral-600 text-xs">{lesson.duration}</span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {currentLessonData ? (
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">{currentLessonData.title}</h2>
                <div className="flex items-center space-x-4 text-neutral-600">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{currentLessonData.duration}</span>
                  </div>
                  <span className="capitalize">{currentLessonData.type}</span>
                </div>
              </div>

              {/* Video Player */}
              {currentLessonData.type === 'video' && (
                <div className="bg-black rounded-lg overflow-hidden mb-6">
                  {currentLessonData.videoUrl ? (
                    <iframe
                      src={currentLessonData.videoUrl}
                      className="w-full h-96 lg:h-[500px]"
                      frameBorder="0"
                      allow="camera; microphone; fullscreen; display-capture; autoplay"
                    />
                  ) : (
                    <div className="w-full h-96 lg:h-[500px] flex items-center justify-center">
                      <div className="text-center">
                        <Play className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                        <p className="text-neutral-900 text-lg">Video Coming Soon</p>
                        <p className="text-neutral-600">This lesson will be available shortly</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Lesson Description */}
              <div className="bg-white rounded-lg p-6 border border-neutral-200 shadow-lg">
                <h3 className="text-lg font-bold text-neutral-900 mb-3">About This Lesson</h3>
                <p className="text-neutral-600 leading-relaxed">
                  {currentLessonData.id === 'intro-video' 
                    ? "Welcome to the Frontend Development course! In this personal introduction video, you'll get to know your instructor and understand exactly what you'll be learning throughout this comprehensive program. This 1-on-1 style conversation will set the foundation for your learning journey."
                    : "This lesson covers essential concepts and practical skills that you'll need to master as a frontend developer. Follow along with the video and practice the techniques shown."
                  }
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <Play className="w-16 h-16 text-primary-600 mx-auto mb-4" />
                <p className="text-neutral-900 text-lg">Select a lesson to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}