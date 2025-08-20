import React, { useState, useEffect } from 'react';
import { Lock, Crown, CheckCircle, Clock, Star } from 'lucide-react';

// --- Data Structure ---
// To fix the build error with dynamic imports, we'll use a single data object.
// In your actual project, you can create separate files like `frontend.js`, `backend.js`
// in a `roadmaps` folder, and then create an `index.js` file to import and export them all like this.

const frontendRoadmap = {
  name: "Frontend Developer",
  modules: [
    {
      title: "Module 1: Core Fundamentals",
      description: "The absolute basics required for any web developer.",
      subTopics: [
        { id: "html_structure", name: "HTML Page Structure", isEssential: true, resource: { name: "MDN: HTML Basics", url: "#" } },
        { id: "css_selectors", name: "CSS Selectors & Properties", isEssential: true, resource: { name: "MDN: CSS First Steps", url: "#" } },
        { id: "js_variables", name: "JavaScript Variables & Data Types", isEssential: true, resource: { name: "MDN: JavaScript First Steps", url: "#" } },
        { id: "html_semantic", name: "Semantic HTML Tags", isEssential: false, resource: { name: "MDN: Semantic HTML", url: "#" } },
      ]
    },
    {
      title: "Module 2: Advanced CSS & Layouts",
      description: "Go beyond the basics to create complex, responsive designs.",
      subTopics: [
        { id: "css_flexbox", name: "Flexbox", isEssential: true, resource: { name: "CSS-Tricks: A Complete Guide to Flexbox", url: "#" } },
        { id: "css_grid", name: "CSS Grid", isEssential: false, resource: { name: "CSS-Tricks: A Complete Guide to Grid", url: "#" } },
        { id: "css_animations", name: "Keyframe Animations", isEssential: false, resource: { name: "MDN: Using CSS animations", url: "#" } }
      ]
    }
  ]
};

const backendRoadmap = {
    name: "Backend Developer",
    modules: [
        {
            title: "Module 1: Language Fundamentals (Node.js)",
            description: "Master the runtime and core concepts.",
            subTopics: [
                { id: "node_runtime", name: "Node.js Runtime & Event Loop", isEssential: true, resource: { name: "Node.js Docs", url: "#" } },
                { id: "node_async", name: "Asynchronous Programming", isEssential: true, resource: { name: "MDN: Async JS", url: "#" } },
                { id: "node_npm", name: "NPM & Package Management", isEssential: true, resource: { name: "NPM Docs", url: "#" } },
            ]
        }
    ]
};

// This object simulates importing from an index file.
const allRoadmaps = {
    frontend: frontendRoadmap,
    backend: backendRoadmap,
    // You can add fullstack, devops, and ml here later
};


const RoadmapDisplay = ({ domain, isPremium }) => {
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This effect now synchronously gets the data instead of using a dynamic import.
    // This resolves the build error.
    if (domain) {
      setLoading(true);
      setError(null);
      
      const data = allRoadmaps[domain];
      
      if (data) {
        setRoadmapData(data);
      } else {
        setError(`Could not find a roadmap for "${domain}". Please select another domain.`);
      }
      
      setLoading(false);
    }
  }, [domain]); // Re-run this effect whenever the domain prop changes

  // --- Render States ---
  if (loading) {
    return <div className="text-center p-10 text-white">Loading Roadmap...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">{error}</div>;
  }

  if (!roadmapData) {
    return <div className="text-center p-10 text-gray-400">Please select a domain to see the roadmap.</div>;
  }

  // --- The Main Component JSX ---
  return (
    <div className="space-y-8">
      {roadmapData.modules.map((module, moduleIndex) => {
        // This is the core logic to create the free roadmap from the premium one
        const essentialTopics = module.subTopics.filter(topic => topic.isEssential);
        const premiumTopicsCount = module.subTopics.length - essentialTopics.length;
        
        const topicsToShow = isPremium ? module.subTopics : essentialTopics;

        // Don't render a module for free users if it has no essential topics
        if (!isPremium && essentialTopics.length === 0) {
          return null;
        }

        return (
          <div key={moduleIndex} className="bg-white/5 p-6 rounded-lg border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
            <p className="text-gray-400 mb-6 text-sm">{module.description}</p>
            
            <ul className="space-y-4">
              {topicsToShow.map((topic) => (
                <li key={topic.id} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-white font-medium">{topic.name}</p>
                    {isPremium && topic.resource && (
                       <a href={topic.resource.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                         {topic.resource.name}
                       </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {/* This is the "teaser" for free users */}
            {!isPremium && premiumTopicsCount > 0 && (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center space-x-4">
                <Crown className="w-6 h-6 text-yellow-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-yellow-300">
                    + {premiumTopicsCount} more premium topics in this module.
                  </p>
                  <p className="text-sm text-yellow-400">Upgrade to unlock in-depth content and curated resources.</p>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RoadmapDisplay;
