import React, { useState } from "react";
import { FileText, Link, Search, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

export default function ArticleTag() {
  const [analysisMethod, setAnalysisMethod] = useState('url');
  const [inputValue, setInputValue] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const analyzeContent = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAnalysisResult({
        credibility: Math.random() > 0.3 ? 'high' : 'low',
        bias: Math.random() > 0.5 ? 'neutral' : 'biased',
        factuality: Math.floor(Math.random() * 40) + 60,
        source: {
          domain: "example-news.com",
          reputation: Math.random() > 0.4 ? 'trusted' : 'questionable',
          age: "5 years"
        },
        claims: [
          { statement: "Economic growth reached 3.2% this quarter", verified: true, confidence: 95 },
          { statement: "Unemployment rates decreased significantly", verified: true, confidence: 88 },
          { statement: "Policy changes were unanimously supported", verified: false, confidence: 23 }
        ],
        tags: ['Politics', 'Economy', 'Policy', 'Statistics'],
        lastUpdated: "2025-01-01"
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getCredibilityColor = (credibility) => {
    switch (credibility) {
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-medium mb-6">
            <FileText className="w-4 h-4" />
            <span>Fact-Checking Engine</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Article Tag
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive fact-checking and credibility analysis for news articles, 
            blog posts, and online content with source verification.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Input Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="w-5 h-5 text-orange-600" />
                Content Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Method Selection */}
              <div className="flex gap-2">
                <Button
                  variant={analysisMethod === 'url' ? 'default' : 'outline'}
                  onClick={() => setAnalysisMethod('url')}
                  className="flex-1"
                >
                  <Link className="w-4 h-4 mr-2" />
                  URL
                </Button>
                <Button
                  variant={analysisMethod === 'text' ? 'default' : 'outline'}
                  onClick={() => setAnalysisMethod('text')}
                  className="flex-1"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Text
                </Button>
              </div>

              {/* Input Field */}
              {analysisMethod === 'url' ? (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Article URL
                  </label>
                  <Input
                    placeholder="https://example.com/article"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="py-3"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Article Content
                  </label>
                  <Textarea
                    placeholder="Paste the article content here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    rows={8}
                    className="resize-none"
                  />
                </div>
              )}

              <Button
                onClick={analyzeContent}
                disabled={isAnalyzing || !inputValue.trim()}
                className="w-full bg-orange-600 hover:bg-orange-700 py-6 text-lg"
              >
                {isAnalyzing ? "Analyzing Article..." : "Analyze Content"}
              </Button>

              <div className="text-center">
                <p className="text-xs text-gray-500">
                  Analysis includes fact-checking, source verification, and bias detection
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                Analysis Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-orange-500 animate-pulse" />
                    </div>
                    <h3 className="font-semibold mb-2">Fact-Checking in Progress</h3>
                    <p className="text-gray-500 text-sm">Verifying claims and analyzing credibility...</p>
                  </div>
                </div>
              )}
              
              {analysisResult && !isAnalyzing && (
                <div className="space-y-6">
                  {/* Overall Assessment */}
                  <div className="text-center pb-6 border-b">
                    <div className="flex justify-center gap-4 mb-4">
                      <Badge className={getCredibilityColor(analysisResult.credibility)}>
                        {analysisResult.credibility} credibility
                      </Badge>
                      <Badge className={analysisResult.bias === 'neutral' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}>
                        {analysisResult.bias}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Factuality Score</div>
                      <div className="text-3xl font-bold text-gray-900">{analysisResult.factuality}%</div>
                    </div>
                  </div>

                  {/* Source Information */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Source Analysis</h4>
                    <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Domain:</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{analysisResult.source.domain}</span>
                          <ExternalLink className="w-3 h-3 text-gray-400" />
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reputation:</span>
                        <Badge className={analysisResult.source.reputation === 'trusted' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                          {analysisResult.source.reputation}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Domain Age:</span>
                        <span>{analysisResult.source.age}</span>
                      </div>
                    </div>
                  </div>

                  {/* Fact-checked Claims */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Fact-checked Claims</h4>
                    <div className="space-y-3">
                      {analysisResult.claims.map((claim, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="text-sm font-medium flex-1 pr-2">{claim.statement}</p>
                            {claim.verified ? (
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
 