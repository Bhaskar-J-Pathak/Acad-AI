# Acad AI - AI-Powered Learning Platform

A modern, responsive learning platform built with React, TypeScript, and Supabase.

## 🚀 Features

- **4 Comprehensive Courses**: Frontend Development, Machine Learning, Data Analyst, Backend Development
- **AI-Powered Roadmaps**: Personalized learning paths based on industry demands
- **Modern UI/UX**: Beautiful, responsive design with Tailwind CSS
- **Authentication**: Secure user authentication with Supabase
- **Interactive Learning**: Video-based learning with progress tracking
- **Blockchain Certificates**: Verifiable credentials for completed courses

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (Authentication, Database)
- **Build Tool**: Vite
- **Deployment**: Netlify
- **Icons**: Lucide React

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd acad-ai
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

## 🗄️ Database Setup

1. Create a new Supabase project
2. Run the migration file in `supabase/migrations/`
3. Update your environment variables

## 🚀 Deployment

The project is configured for easy deployment on Netlify:

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Auth.tsx        # Authentication component
│   ├── Dashboard.tsx   # Main dashboard
│   ├── LandingPage.tsx # Landing page
│   ├── CourseModal.tsx # Course purchase modal
│   ├── CourseContent.tsx # Course content viewer
│   └── RoadmapGenerator.tsx # AI roadmap generator
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication context
├── lib/               # Utilities
│   └── supabase.ts    # Supabase client
└── main.tsx          # App entry point
```

## 🎨 Courses Available

1. **Frontend Development** - HTML, CSS, JavaScript, React, Next.js
2. **Machine Learning** - Python, TensorFlow, PyTorch, MLOps
3. **Data Analyst** - SQL, Python, Excel, Tableau, Power BI
4. **Backend Development** - APIs, Databases, Authentication, Deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🌐 Live Demo

Visit the live application: [https://acadai.netlify.app](https://acadai.netlify.app)