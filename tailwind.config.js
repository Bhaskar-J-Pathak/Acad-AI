/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        colors: {
          // Primary Brand Colors
          primary: {
            50: '#f0f9ff',
            100: '#e0f2fe',
            200: '#bae6fd',
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
            800: '#075985',
            900: '#0c4a6e',
            950: '#082f49',
          },
          
          // Secondary Purple Colors
          secondary: {
            50: '#faf5ff',
            100: '#f3e8ff',
            200: '#e9d5ff',
            300: '#d8b4fe',
            400: '#c084fc',
            500: '#a855f7',
            600: '#9333ea',
            700: '#7c3aed',
            800: '#6b21a8',
            900: '#581c87',
            950: '#3b0764',
          },
          
          // Neutral Grays
          neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#e5e5e5',
            300: '#d4d4d4',
            400: '#a3a3a3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
            950: '#0a0a0a',
          },
          
          // Success Colors
          success: {
            50: '#f0fdf4',
            100: '#dcfce7',
            200: '#bbf7d0',
            300: '#86efac',
            400: '#4ade80',
            500: '#22c55e',
            600: '#16a34a',
            700: '#15803d',
            800: '#166534',
            900: '#14532d',
          },
          
          // Warning Colors
          warning: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            300: '#fcd34d',
            400: '#fbbf24',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
            800: '#92400e',
            900: '#78350f',
          },
          
          // Error Colors
          error: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
          
          // Dark Theme Colors
          dark: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
            950: '#020617',
          },
        },
        fontFamily: {
          'poppins': ['Poppins', 'sans-serif'],
          'lato': ['Lato', 'sans-serif'],
          'source': ['Source Sans Pro', 'sans-serif'],
          'playfair': ['Playfair Display', 'serif'],
        },
        backgroundImage: {
          'gradient-primary': 'linear-gradient(135deg, #0ea5e9 0%, #a855f7 100%)',
          'gradient-secondary': 'linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)',
          'gradient-accent': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
          'gradient-dark': 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          'gradient-light': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          'gradient-success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
          'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          'gradient-error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        },
        animation: {
          'fade-in-up': 'fadeInUp 0.8s ease-out',
          'fade-in-left': 'fadeInLeft 0.8s ease-out',
          'fade-in-right': 'fadeInRight 0.8s ease-out',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'float': 'float 6s ease-in-out infinite',
          'float-delayed': 'float 6s ease-in-out infinite 2s',
          'float-slow': 'float 8s ease-in-out infinite',
          'spin-slow': 'spin 3s linear infinite',
          'count-up': 'countUp 2s ease-out',
          'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite alternate',
        },
        keyframes: {
          fadeInUp: {
            '0%': { opacity: '0', transform: 'translateY(30px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          fadeInLeft: {
            '0%': { opacity: '0', transform: 'translateX(-30px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          fadeInRight: {
            '0%': { opacity: '0', transform: 'translateX(30px)' },
            '100%': { opacity: '1', transform: 'translateX(0)' },
          },
          float: {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
          countUp: {
            '0%': { opacity: '0', transform: 'scale(0.5)' },
            '100%': { opacity: '1', transform: 'scale(1)' },
          },
          bounceGentle: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          glow: {
            '0%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.3)' },
            '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.4)' },
          },
        },
        boxShadow: {
          'glow-primary': '0 0 20px rgba(14, 165, 233, 0.3)',
          'glow-secondary': '0 0 20px rgba(168, 85, 247, 0.3)',
          'glow-success': '0 0 20px rgba(34, 197, 94, 0.3)',
          'glow-warning': '0 0 20px rgba(245, 158, 11, 0.3)',
          'glow-error': '0 0 20px rgba(239, 68, 68, 0.3)',
        },
      },
    },
    plugins: [],
  };