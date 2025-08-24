import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Shield, TrendingUp, Image, Mic, FileText, Share2, HelpCircle, Mail, Menu, X, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingVoiceMic from "../components/FloatingVoiceMic";

const navigationItems = [
  { title: "Trending Search", url: createPageUrl("TrendingSearch"), icon: TrendingUp },
  { title: "AI Image Detection", url: createPageUrl("ImageDetection"), icon: Image },
  { title: "Voice Assistant", url: createPageUrl("VoiceAssistant"), icon: Mic },
  { title: "Article Tag", url: createPageUrl("ArticleTag"), icon: FileText },
  { title: "Template Share", url: createPageUrl("TemplateShare"), icon: Share2 },
  { title: "FAQs", url: createPageUrl("FAQs"), icon: HelpCircle },
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('truthtrack-theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage when changed
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('truthtrack-theme', newTheme ? 'dark' : 'light');
  };

  const themeClasses = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white"
    : "bg-gradient-to-br from-gray-50 via-white to-blue-50 text-gray-900";

  return (
    <div className={`min-h-screen ${themeClasses}`}>
      <style>
        {`
          :root {
            --primary-blue: ${isDarkMode ? '#60a5fa' : '#3b82f6'};
            --light-blue: ${isDarkMode ? '#1e40af' : '#dbeafe'};
            --soft-gray: ${isDarkMode ? '#111827' : '#f8fafc'};
            --medium-gray: ${isDarkMode ? '#6b7280' : '#64748b'};
            --dark-gray: ${isDarkMode ? '#1f2937' : '#334155'};
            --accent-purple: #8b5cf6;
          }
          
          .glass-effect {
            backdrop-filter: blur(10px);
            background: ${isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'};
            border: 1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
          }
          
          .gradient-text {
            background: linear-gradient(135deg, #60a5fa, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
        `}
      </style>

      {/* Top Navigation Bar */}
      <div className={`${isDarkMode ? 'bg-black/50' : 'bg-white/50'} backdrop-blur-sm border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} py-3`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-8 overflow-x-auto">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                to={item.url}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                  isDarkMode 
                    ? 'text-gray-300 hover:text-blue-400 hover:bg-blue-600/20'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`glass-effect border-b ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} sticky top-0 z-50`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to={createPageUrl("Dashboard")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-lg">C</span>
              </div>
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>CodeHustlers</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                    location.pathname === item.url
                      ? isDarkMode 
                        ? "bg-blue-600/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-blue-600/20"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
              
              {/* Theme Toggle Button */}
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                    : 'border-gray-300 bg-white text-gray-600 hover:bg-gray-50'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              <Button
                onClick={toggleTheme}
                variant="outline"
                size="sm"
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'border-gray-600 bg-gray-800 text-gray-300'
                    : 'border-gray-300 bg-white text-gray-600'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <button 
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Open mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className={`fixed left-0 top-0 h-full w-80 border-r p-6 ${
            isDarkMode 
              ? 'bg-gray-900 border-gray-700' 
              : 'bg-white border-gray-200'
          }`} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-8">
              <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Menu</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`p-2 rounded-lg ${
                  isDarkMode 
                    ? 'bg-gray-800 text-gray-300 hover:text-white'
                    : 'bg-gray-100 text-gray-600 hover:text-gray-900'
                }`}
                aria-label="Close mobile menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    location.pathname === item.url
                      ? isDarkMode 
                        ? "bg-blue-600/30 text-blue-400"
                        : "bg-blue-50 text-blue-600"
                      : isDarkMode
                        ? "text-gray-300 hover:text-blue-400 hover:bg-blue-600/20"
                        : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 relative">
        {children && typeof children === 'object' && React.isValidElement(children) 
          ? React.cloneElement(children, { isDarkMode })
          : children
        }
        
        {/* Floating Voice Mic Component - Fully Functional */}
        <FloatingVoiceMic isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <footer className={`${isDarkMode ? 'bg-black/50' : 'bg-white/50'} border-t ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'} mt-16`}>
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold gradient-text">TruthTrack</span>
              </div>
              <p className={`leading-relaxed ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Advanced AI-powered misinformation detection and verification platform.
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
              <div className="space-y-2">
                {navigationItems.slice(0, 3).map((item) => (
                  <Link
                    key={item.title}
                    to={item.url}
                    className={`block transition-colors duration-200 ${
                      isDarkMode 
                        ? 'text-gray-400 hover:text-blue-400'
                        : 'text-gray-600 hover:text-blue-600'
                    }`}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Connect With Us</h3>
              <a
                href="mailto:teamcodehustlers@gmail.com"
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isDarkMode 
                    ? 'bg-blue-600/20 text-blue-400 hover:bg-blue-600/30'
                    : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                }`}
              >
                <Mail className="w-4 h-4" />
                <span>teamcodehustlers@gmail.com</span>
              </a>
            </div>
          </div>
          
          <div className={`border-t mt-8 pt-6 text-center ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>© 2025 CodeHustlers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}