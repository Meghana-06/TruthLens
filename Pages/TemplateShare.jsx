import React, { useState } from "react";
import { Share2, Download, Heart, Eye, Star, Plus, Filter, Linkedin, Twitter, Instagram, Facebook } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const articleTemplates = [
  {
    id: 1,
    title: "Cryptocurrency Analysis Template",
    description: "Template for analyzing cryptocurrency news and market trends with fact-checking guidelines",
    category: "Cryptocurrency",
    author: "TruthTrack Team",
    downloads: 2847,
    likes: 189,
    views: 5240,
    rating: 4.9,
    verified: true,
    tags: ["Crypto", "Blockchain", "Market Analysis"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/56e931208_BeigeandBlackVintageNewsInstagramPost.png",
    content: "Dogecoin News Today: BlockDAG Presale Hits $380M as Dogecoin, Hyperliquid, and Pepe Drive 2025 Crypto Trends"
  },
  {
    id: 2,
    title: "AI Technology Report Template",
    description: "Framework for analyzing AI-related news and technological developments",
    category: "Technology",
    author: "AI Ethics Foundation",
    downloads: 1892,
    likes: 134,
    views: 3180,
    rating: 4.7,
    verified: true,
    tags: ["AI", "Technology", "Ethics"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/39303067c_BeigeandBlackVintageNewsInstagramPost1.png",
    content: "Microsoft Boss Troubled by Rise in Reports of 'AI Psychosis'"
  },
  {
    id: 3,
    title: "Social Media Trend Analysis",
    description: "Template for evaluating viral social media content and meme phenomena",
    category: "Social Media",
    author: "Digital Culture Lab",
    downloads: 1654,
    likes: 98,
    views: 2890,
    rating: 4.6,
    verified: false,
    tags: ["Social Media", "Viral Content", "Memes"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/7e57268b9_BeigeandBlackVintageNewsInstagramPost2.png",
    content: "Punjab Entrepreneur's 'Female Girls' Video Caption Sparks Meme Fest"
  },
  {
    id: 4,
    title: "Financial Market Report Template",
    description: "Comprehensive template for stock market analysis and financial predictions",
    category: "Finance",
    author: "Market Analysis Institute",
    downloads: 1432,
    likes: 87,
    views: 2120,
    rating: 4.8,
    verified: true,
    tags: ["Finance", "Stock Market", "Analysis"],
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/396810ab4_BeigeandBlackVintageNewsInstagramPost3.png",
    content: "Nifty Ends Week in Green; Aug 26 & 28 Key Dates to Watch for Possible Reversals, Says Harshubh Shah"
  }
];

const categories = ["All", "Cryptocurrency", "Technology", "Social Media", "Finance", "Healthcare", "Education"];

export default function TemplateShare({ isDarkMode = false }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  const filteredTemplates = articleTemplates.filter(template => {
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedTemplates = [...filteredTemplates].sort((a, b) => {
    switch (sortBy) {
      case 'popular': return b.downloads - a.downloads;
      case 'rating': return b.rating - a.rating;
      case 'recent': return b.id - a.id;
      default: return 0;
    }
  });

  const shareTemplate = (template, platform) => {
    const url = window.location.href;
    const text = `Check out this "${template.title}" template on TruthTrack!`;
    
    const shareUrls = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      instagram: '#'
    };
    
    if (shareUrls[platform] && shareUrls[platform] !== '#') {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    } else if (platform === 'instagram') {
      alert("Instagram sharing is not supported directly from the browser. Please share manually.");
    }
  };

  const downloadTemplate = (template) => {
    const content = `ARTICLE TEMPLATE
================

Title: ${template.title}
Description: ${template.description}
Author: ${template.author}
Category: ${template.category}
Tags: ${template.tags.join(', ')}

Content Sample:
${template.content}

FACT-CHECKING GUIDELINES:
- Verify source credibility
- Cross-reference multiple sources
- Check for manipulation indicators
- Analyze bias and context
- Document findings thoroughly

CONTACT INFORMATION:
Email: teamcodehustlers@gmail.com
Website: TruthTrack AI Platform

---
Template downloaded from TruthTrack
© 2025 CodeHustlers - All rights reserved
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${template.title.replace(/[^a-zA-Z0-9]/g, '_')}_template.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const bgClass = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" 
    : "bg-gradient-to-br from-gray-50 via-white to-pink-50";
  
  const cardClass = isDarkMode 
    ? "border border-gray-700/50 bg-gray-900/50 backdrop-blur-sm shadow-lg"
    : "border-0 bg-white/80 backdrop-blur-sm shadow-lg";

  const textClass = isDarkMode ? "text-white" : "text-gray-900";

  return (
    <div className={`min-h-screen ${bgClass} py-12`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium mb-6 ${
            isDarkMode 
              ? 'bg-pink-600/20 border border-pink-500/30 text-pink-400'
              : 'bg-pink-50 text-pink-600'
          }`}>
            <Share2 className="w-4 h-4" />
            <span>Community Resources</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
            Template Share
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Access community-verified templates, frameworks, and resources for 
            misinformation detection and fact-checking workflows.
          </p>
        </div>

        {/* Search and Filters */}
        <Card className={`mb-8 ${cardClass}`}>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search templates, frameworks, and resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`py-3 text-lg border-0 transition-colors duration-200 ${
                    isDarkMode 
                      ? 'bg-gray-800 text-white focus:bg-gray-700 placeholder:text-gray-500'
                      : 'bg-gray-50 focus:bg-white placeholder:text-gray-400'
                  }`}
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-4 py-3 rounded-lg border focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                    isDarkMode 
                      ? 'border-gray-600 bg-gray-800 text-white'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="recent">Most Recent</option>
                </select>
                
                <Button className={`${
                  isDarkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-600 hover:bg-pink-700"
                }`}>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full ${
                selectedCategory === category
                  ? isDarkMode ? "bg-pink-600 hover:bg-pink-700 text-white" : "bg-pink-600 hover:bg-pink-700"
                  : isDarkMode 
                    ? "border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                    : "hover:bg-pink-50 hover:text-pink-600"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {sortedTemplates.map((template) => (
            <Card key={template.id} className={`${cardClass} transition-all duration-300 hover:-translate-y-1 h-full`}>
              <div className="relative">
                <img
                  src={template.image}
                  alt={template.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {template.verified && (
                  <Badge className="absolute top-4 right-4 bg-blue-100 text-blue-800 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className={`text-lg font-semibold leading-tight ${textClass}`}>
                    {template.title}
                  </CardTitle>
                </div>
                <Badge variant="outline" className={isDarkMode ? "bg-gray-800 text-gray-300 border-gray-700" : "bg-gray-50"}>
                  {template.category}
                </Badge>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className={`text-sm leading-relaxed line-clamp-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {template.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className={`text-xs ${
                      isDarkMode ? "bg-gray-800 text-gray-400 border-gray-700" : "bg-gray-100 text-gray-600"
                    }`}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  <span>by {template.author}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span>{template.rating}</span>
                  </div>
                </div>
                
                <div className={`flex items-center justify-between text-sm border-t pt-3 ${
                  isDarkMode ? 'text-gray-400 border-gray-700' : 'text-gray-500 border-gray-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Download className="w-3 h-3" />
                      <span>{template.downloads}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      <span>{template.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      <span>{template.views}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className={`flex-1 ${
                      isDarkMode ? "bg-pink-600 hover:bg-pink-700" : "bg-pink-600 hover:bg-pink-700"
                    }`}
                    onClick={() => downloadTemplate(template)}
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Download
                  </Button>
                  <Button size="sm" variant="outline" className={`px-3 ${isDarkMode ? 'border-gray-700 text-gray-300 hover:bg-gray-700' : ''}`}>
                    <Heart className="w-3 h-3" />
                  </Button>
                </div>

                {/* Social Media Share Buttons */}
                <div className={`flex justify-center gap-2 pt-2 ${isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'}`}>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => shareTemplate(template, 'linkedin')}
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => shareTemplate(template, 'twitter')}
                  >
                    <Twitter className="w-4 h-4 text-blue-400" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => shareTemplate(template, 'facebook')}
                  >
                    <Facebook className="w-4 h-4 text-blue-700" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className={`p-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                    onClick={() => shareTemplate(template, 'instagram')}
                  >
                    <Instagram className="w-4 h-4 text-pink-600" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className={`${cardClass} text-center`}>
            <CardContent className="p-6">
              <div className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-pink-400" : "text-pink-600"}`}>247</div>
              <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Templates</div>
            </CardContent>
          </Card>
          
          <Card className={`${cardClass} text-center`}>
            <CardContent className="p-6">
              <div className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>12.5K</div>
              <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Downloads</div>
            </CardContent>
          </Card>
          
          <Card className={`${cardClass} text-center`}>
            <CardContent className="p-6">
              <div className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-green-400" : "text-green-600"}`}>3,420</div>
              <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Contributors</div>
            </CardContent>
          </Card>
          
          <Card className={`${cardClass} text-center`}>
            <CardContent className="p-6">
              <div className={`text-2xl font-bold mb-2 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`}>4.9</div>
              <div className={isDarkMode ? "text-gray-400" : "text-gray-600"}>Avg Rating</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}