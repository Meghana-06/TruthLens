
import React, { useState, useEffect } from "react";
import { TrendingUp, Search, Clock, Globe, AlertTriangle, CheckCircle, Zap, Download, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/integrations/Core";

const trendingArticles = [
  {
    id: 1,
    title: "Dogecoin News Today: BlockDAG Presale Hits $380M as Dogecoin, Hyperliquid, and Pepe Drive 2025 Crypto Trends",
    category: "Cryptocurrency",
    date: "August 24, 2025",
    riskLevel: "medium",
    views: "2.4M",
    trend: "+15%",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/56e931208_BeigeandBlackVintageNewsInstagramPost.png",
    summary: "Analysis of cryptocurrency market trends and BlockDAG presale performance",
    factCheck: "Partially verified - requires further investigation"
  },
  {
    id: 2,
    title: "Microsoft Boss Troubled by Rise in Reports of 'AI Psychosis'",
    category: "Technology",
    date: "August 24, 2025",
    riskLevel: "high",
    views: "1.8M",
    trend: "+22%",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/39303067c_BeigeandBlackVintageNewsInstagramPost1.png",
    summary: "Investigation into AI-related psychological concerns and their implications",
    factCheck: "Under investigation - multiple sources required"
  },
  {
    id: 3,
    title: "Punjab Entrepreneur's 'Female Girls' Video Caption Sparks Meme Fest",
    category: "Social Media",
    date: "August 24, 2025",
    riskLevel: "low",
    views: "1.2M",
    trend: "+8%",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7e57268b9_BeigeandBlackVintageNewsInstagramPost2.png",
    summary: "Social media trend analysis and viral content evaluation",
    factCheck: "Verified - authentic social media content"
  },
  {
    id: 4,
    title: "Nifty Ends Week in Green; Aug 26 & 28 Key Dates to Watch for Possible Reversals, Says Harshubh Shah",
    category: "Finance",
    date: "August 24, 2025",
    riskLevel: "low",
    views: "900K",
    trend: "+5%",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/396810ab4_BeigeandBlackVintageNewsInstagramPost3.png",
    summary: "Financial market analysis and expert predictions for upcoming trading sessions",
    factCheck: "Expert opinion - market analysis verified"
  }
];

const initialTrendingTopics = [
  {
    id: 1,
    topic: "AI Deepfake Celebrities",
    searches: "2.4M",
    trend: "+15%",
    risk: "high",
    category: "Technology"
  },
  {
    id: 2,
    topic: "Vaccine Misinformation",
    searches: "1.8M",
    trend: "+8%",
    risk: "medium",
    category: "Health"
  },
  {
    id: 3,
    topic: "Climate Change Denial",
    searches: "1.2M",
    trend: "-3%",
    risk: "low",
    category: "Environment"
  },
  {
    id: 4,
    topic: "Election Fraud Claims",
    searches: "900K",
    trend: "+22%",
    risk: "high",
    category: "Politics"
  }
];

export default function TrendingSearch({ isDarkMode = false }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [trendingTopics, setTrendingTopics] = useState(initialTrendingTopics);
  const [liveStats, setLiveStats] = useState({
    monitoring: "24/7",
    analyzed: "12.5M",
    flags: "8,340",
    accuracy: "99.7%"
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        ...prev,
        analyzed: `${(parseFloat(prev.analyzed.replace('M', '')) + 0.1).toFixed(1)}M`,
        flags: `${parseInt(prev.flags.replace(',', '')) + Math.floor(Math.random() * 10) + 1}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setSearchResults(null);
    
    try {
      const result = await InvokeLLM({
        prompt: `Analyze the following topic for misinformation patterns and provide a detailed assessment: "${searchQuery}". 
        
        Provide analysis on:
        1. Current misinformation trends related to this topic
        2. Risk level (high/medium/low)
        3. Common false narratives
        4. Fact-checking resources
        5. Social media presence and viral potential
        
        Focus on real, current information and provide actionable insights for fact-checkers.`,
        add_context_from_internet: true,
        response_json_schema: {
          type: "object",
          properties: {
            risk_level: { type: "string", enum: ["high", "medium", "low"] },
            confidence_score: { type: "number" },
            misinformation_trends: { type: "array", items: { type: "string" } },
            fact_check_status: { type: "string" },
            viral_potential: { type: "string" },
            recommendations: { type: "array", items: { type: "string" } },
            related_keywords: { type: "array", items: { type: "string" } },
            source_credibility: { type: "string" }
          }
        }
      });

      setSearchResults(result);
    } catch (error) {
      console.error('Search analysis failed:', error);
      setSearchResults({
        risk_level: "medium",
        confidence_score: 95,
        misinformation_trends: ["Unable to fetch real-time data"],
        fact_check_status: "Analysis unavailable",
        viral_potential: "Unknown",
        recommendations: ["Manual verification recommended"],
        related_keywords: [searchQuery],
        source_credibility: "Unknown"
      });
    }
    
    setIsSearching(false);
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high": return "bg-red-100 text-red-700 border-red-200";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case "high": return <AlertTriangle className="w-4 h-4" />;
      case "medium": return <Clock className="w-4 h-4" />;
      case "low": return <CheckCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const downloadArticle = (article) => {
    const content = `TRENDING TOPIC ANALYSIS
=====================

Title: ${article.title}
Category: ${article.category}
Date: ${article.date}
Risk Level: ${article.riskLevel.toUpperCase()}
Views: ${article.views}
Trend: ${article.trend}

Summary:
${article.summary}

Fact-Check Status:
${article.factCheck}

---
Generated by TruthTrack AI
Contact: teamcodehustlers@gmail.com
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.title.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}_analysis.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const bgClass = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" 
    : "bg-gradient-to-br from-gray-50 via-white to-red-50";
  
  const cardClass = isDarkMode 
    ? "border-gray-700/50 bg-gray-900/50 backdrop-blur-sm shadow-lg"
    : "border-0 bg-white/90 backdrop-blur-sm shadow-lg";

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const subtextClass = isDarkMode ? "text-gray-300" : "text-gray-600";


  return (
    <div className={`min-h-screen ${bgClass} py-12`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium mb-6 ${
            isDarkMode 
              ? 'bg-red-600/20 border border-red-500/30 text-red-400'
              : 'bg-red-50 border border-red-200 text-red-600'
          }`}>
            <TrendingUp className="w-4 h-4" />
            <span>Real-time Analysis</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
            <span className={isDarkMode ? "text-red-400" : "text-red-600"}>Trending Search</span>
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${subtextClass}`}>
            Monitor viral content and detect trending misinformation patterns in real-time 
            across social media platforms with advanced AI analysis.
          </p>
        </div>

        {/* Search Section */}
        <Card className={`mb-12 ${cardClass}`}>
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search for trending topics, keywords, or claims..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  className={`pl-10 py-6 text-lg border-0 transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white focus:bg-gray-700 placeholder:text-gray-500'
                      : 'bg-gray-50 focus:bg-white placeholder:text-gray-400 focus:border-red-500'
                  }`}
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching || !searchQuery.trim()}
                className={`px-8 py-6 text-lg rounded-lg ${
                  isDarkMode
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                }`}
              >
                {isSearching ? (
                  <>
                    <Zap className="w-4 h-4 mr-2 animate-pulse" />
 