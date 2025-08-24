import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Shield, 
  TrendingUp, 
  Image, 
  Mic, 
  FileText, 
  Share2, 
  HelpCircle,
  ArrowRight,
  CheckCircle,
  Zap,
  Globe,
  Users,
  Activity
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const toolCards = [
  {
    title: "Trending Search",
    description: "Real-time monitoring of viral misinformation across social platforms with AI-powered pattern recognition",
    icon: TrendingUp,
    url: createPageUrl("TrendingSearch"),
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-600/20",
    textColor: "text-blue-400",
    features: ["Live social monitoring", "Viral content detection", "Misinformation alerts"]
  },
  {
    title: "AI Image Detection",
    description: "Advanced deepfake and manipulation detection using computer vision and neural networks",
    icon: Image,
    url: createPageUrl("ImageDetection"),
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-600/20",
    textColor: "text-purple-400",
    features: ["Deepfake detection", "Photo manipulation analysis", "Metadata verification"]
  },
  {
    title: "Voice Assistant",
    description: "AI-powered voice authentication and synthetic speech detection with voiceprint analysis",
    icon: Mic,
    url: createPageUrl("VoiceAssistant"),
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-600/20",
    textColor: "text-green-400",
    features: ["Voice cloning detection", "Audio authenticity", "Real-time analysis"]
  },
  {
    title: "Article Tag",
    description: "Comprehensive fact-checking with source verification, bias detection, and credibility scoring",
    icon: FileText,
    url: createPageUrl("ArticleTag"),
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-600/20",
    textColor: "text-orange-400",
    features: ["Fact verification", "Source credibility", "Bias analysis"]
  },
  {
    title: "Template Share",
    description: "Community-driven templates and frameworks for standardized misinformation detection workflows",
    icon: Share2,
    url: createPageUrl("TemplateShare"),
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-600/20",
    textColor: "text-pink-400",
    features: ["Verified templates", "Community resources", "Workflow automation"]
  },
  {
    title: "FAQs",
    description: "Comprehensive knowledge base with answers to common questions about AI detection methods",
    icon: HelpCircle,
    url: createPageUrl("FAQs"),
    color: "from-gray-500 to-gray-600",
    bgColor: "bg-gray-600/20",
    textColor: "text-gray-400",
    features: ["Expert guidance", "Best practices", "Technical documentation"]
  }
];

const liveStats = [
  {
    icon: Activity,
    title: "Live Analysis",
    value: "2.4M",
    description: "Content pieces analyzed today",
    change: "+12%"
  },
  {
    icon: Shield,
    title: "Detection Rate",
    value: "99.3%",
    description: "AI accuracy in real-time",
    change: "+0.2%"
  },
  {
    icon: Globe,
    title: "Global Coverage",
    value: "150+",
    description: "Countries monitored",
    change: "Live"
  },
  {
    icon: Users,
    title: "Active Users",
    value: "45K",
    description: "Fact-checkers worldwide",
    change: "+8%"
  }
];

export default function Dashboard({ isDarkMode = true }) {
  const bgClass = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" 
    : "bg-gradient-to-br from-gray-50 via-white to-blue-50";
  
  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const subtextClass = isDarkMode ? "text-gray-300" : "text-gray-600";
  const cardClass = isDarkMode 
    ? "border-gray-700/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50" 
    : "border-gray-200/50 bg-white/80 backdrop-blur-sm hover:bg-white/90";

  return (
    <div className={`min-h-screen ${bgClass}`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20">
        <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20' : 'bg-gradient-to-r from-blue-100/30 via-purple-100/30 to-pink-100/30'}`}></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium mb-8 ${
              isDarkMode 
                ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
                : 'bg-blue-50 border border-blue-200 text-blue-600'
            }`}>
              <Shield className="w-4 h-4" />
              <span>Advanced AI Detection Platform</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">TruthTrack</span>
            </h1>
            
            <p className={`text-xl md:text-2xl mb-8 leading-relaxed ${subtextClass}`}>
              Combat misinformation with cutting-edge AI technology. Real-time detection, 
              analysis, and verification of <span className="text-blue-400 font-semibold">digital content authenticity</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to={createPageUrl("TrendingSearch")}>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg rounded-xl">
                  Start Detection
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("FAQs")}>
                <Button variant="outline" className={`px-8 py-6 text-lg rounded-xl border-2 ${
                  isDarkMode 
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}>
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Live Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {liveStats.map((stat, index) => (
                <div key={index} className={`text-center p-4 rounded-xl border ${
                  isDarkMode 
                    ? 'bg-white/5 backdrop-blur-sm border-white/10'
                    : 'bg-white/60 backdrop-blur-sm border-gray-200/50'
                }`}>
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className={`text-2xl font-bold mb-1 ${textClass}`}>{stat.value}</div>
                  <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{stat.description}</div>
                  <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Tools Dashboard */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textClass}`}>
              AI Detection Suite
            </h2>
            <p className={`text-xl max-w-2xl mx-auto ${subtextClass}`}>
              Professional-grade tools for comprehensive misinformation detection and analysis
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {toolCards.map((tool, index) => (
              <Link key={index} to={tool.url} className="group">
                <Card className={`border ${cardClass} hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 h-full transition-all duration-300`}>
                  <CardContent className="p-8 h-full flex flex-col">
                    <div className={`w-16 h-16 ${tool.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                      <tool.icon className={`w-8 h-8 ${tool.textColor}`} />
                    </div>
                    
                    <h3 className={`text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors duration-200 ${textClass}`}>
                      {tool.title}
                    </h3>
                    
                    <p className={`leading-relaxed mb-6 flex-grow ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {tool.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, idx) => (
                        <div key={idx} className={`flex items-center gap-2 text-sm ${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-blue-400 font-medium group-hover:gap-3 gap-2 transition-all duration-200">
                      <span>Launch Tool</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Real-time Features */}
      <section className={`py-20 ${isDarkMode ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10' : 'bg-gradient-to-r from-blue-50 to-purple-50'}`}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className={`rounded-3xl p-12 border ${
            isDarkMode 
              ? 'bg-gradient-to-r from-gray-900/80 to-black/80 backdrop-blur-sm border-gray-700/50 text-white'
              : 'bg-gradient-to-r from-white/80 to-gray-50/80 backdrop-blur-sm border-gray-200/50 text-gray-900'
          }`}>
            <div className="flex items-center justify-center gap-2 mb-6">
              <Zap className="w-6 h-6 text-yellow-400" />
              <span className="font-semibold text-yellow-400">Real-time Processing</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Next-Gen Detection
            </h2>
            
            <p className={`text-xl mb-8 leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Advanced machine learning algorithms provide instant analysis with industry-leading 
              accuracy for deepfakes, synthetic media, and misinformation campaigns.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={createPageUrl("Contact")}>
                <Button className={`px-8 py-6 text-lg rounded-xl font-semibold ${
                  isDarkMode 
                    ? 'bg-white text-gray-900 hover:bg-gray-100'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}>
                  Get Professional Access
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("ImageDetection")}>
                <Button variant="outline" className={`px-8 py-6 text-lg rounded-xl font-semibold border-2 ${
                  isDarkMode 
                    ? 'border-white text-white hover:bg-white/10'
                    : 'border-gray-900 text-gray-900 hover:bg-gray-900/5'
                }`}>
                  Try Live Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}