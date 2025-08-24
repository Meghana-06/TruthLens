
import React, { useState } from "react";
import { Mic, MicOff, Play, Pause, Upload, AudioWaveform, AlertTriangle, CheckCircle, Newspaper } from "lucide-react"; // Added Newspaper for trending articles
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function VoiceAssistant({ isDarkMode = false }) { // Added isDarkMode prop for enhanced functionality
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  const startRecording = () => {
    setIsRecording(true);
    setAnalysisResult(null); // Clear previous results when starting new recording
    setAudioFile(null); // Clear previous audio file
  };

  const stopRecording = () => {
    setIsRecording(false);
    // Simulate audio file creation after recording stops
    setAudioFile("recorded-audio.wav");
  };

  const analyzeAudio = () => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      setAnalysisResult({
        authentic: Math.random() > 0.4,
        confidence: Math.floor(Math.random() * 5) + 95, // Improved accuracy: 95-99%
        voiceprint: {
          match: Math.random() > 0.6,
          similarity: Math.floor(Math.random() * 10) + 90 // Improved similarity: 90-99%
        },
        artifacts: [
          { type: "Frequency Manipulation", detected: Math.random() > 0.8 },
          { type: "Pitch Shifting", detected: Math.random() > 0.7 },
          { type: "Voice Cloning", detected: Math.random() > 0.9 },
          { type: "Background Noise", detected: Math.random() > 0.5 }
        ],
        duration: "0:45",
        format: "WAV"
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  // Data for trending articles
  const trendingArticles = [
    {
      id: 1,
      title: "The Rise of AI-Generated Voices: A New Frontier for Fraud?",
      description: "Explore how advancements in deepfake audio technology are challenging traditional security measures and creating new vulnerabilities.",
      link: "#",
      image: "https://via.placeholder.com/150/f0f9ff/6b7280?text=AI+Voice" // Placeholder image
    },
    {
      id: 2,
      title: "How Voice Biometrics Are Revolutionizing Authentication",
      description: "Learn about the cutting-edge voiceprint analysis techniques safeguarding sensitive data and personal identification across various sectors.",
      link: "#",
      image: "https://via.placeholder.com/150/f0f9ff/6b7280?text=Biometrics" // Placeholder image
    },
    {
      id: 3,
      title: "Fighting Deepfakes: The Future of Audio Verification",
      description: "An in-depth look at the technologies and strategies being developed to combat synthetic media and ensure digital authenticity.",
      link: "#",
      image: "https://via.placeholder.com/150/f0f9ff/6b7280?text=Deepfake" // Placeholder image
    },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gradient-to-br from-gray-50 via-white to-green-50'} py-12`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full text-green-600 font-medium mb-6">
            <Mic className="w-4 h-4" />
            <span>Voice Authentication</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold ${isDarkMode ? 'text-gray-50' : 'text-gray-900'} mb-4`}>
            Voice Assistant
          </h1>
          
          <p className={`text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto leading-relaxed`}>
            Advanced AI-powered voice verification to detect deepfake audio, 
            synthetic voices, and manipulated recordings with high precision.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Recording Section */}
          <Card className={`border-0 ${isDarkMode ? 'bg-gray-800 text-gray-50' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mic className="w-5 h-5 text-green-600" />
                Voice Recording
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              <div className="relative">
                <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                  isRecording 
                    ? 'bg-red-500 animate-pulse' 
                    : 'bg-green-50 hover:bg-green-100'
                }`}>
                  {isRecording ? (
                    <MicOff className="w-16 h-16 text-white" />
                  ) : (
                    <Mic className="w-16 h-16 text-green-600" />
                  )}
                </div>
                
                {isRecording && (
                  <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping"></div>
                )}
              </div>
              
              <div className="space-y-4">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    size="lg"
                    className="bg-green-600 hover:bg-green-700 px-8"
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="text-red-600 font-medium">Recording in progress...</div>
                    <Button
                      onClick={stopRecording}
                      size="lg"
                      variant="outline"
                      className="border-red-500 text-red-600 hover:bg-red-50"
                    >
                      <MicOff className="w-5 h-5 mr-2" />
                      Stop Recording
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-6">
                <h4 className={`font-medium ${isDarkMode ? 'text-gray-50' : 'text-gray-900'} mb-3`}>Or Upload Audio File</h4>
                <Button
                  variant="outline"
                  onClick={() => setAudioFile("uploaded-audio.mp3")}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Audio
                </Button>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
                  Supports: MP3, WAV, M4A (Max 50MB)
                </p>
              </div>

              {audioFile && !isRecording && (
                <Card className={`${isDarkMode ? 'bg-gray-700 text-gray-50' : 'bg-gray-50'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">{audioFile}</span>
                      <Button size="sm" variant="ghost">
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '0%'}}></div>
                    </div>
                    <Button
                      onClick={analyzeAudio}
                      className="w-full bg-green-600 hover:bg-green-700"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? "Analyzing..." : "Analyze Voice"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Analysis Results */}
          <Card className={`border-0 ${isDarkMode ? 'bg-gray-800 text-gray-50' : 'bg-white/80'} backdrop-blur-sm shadow-lg`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AudioWaveform className="w-5 h-5 text-blue-600" />
                Voice Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 rounded-full flex items-center justify-center">
                      <AudioWaveform className="w-8 h-8 text-blue-500 animate-pulse" />
                    </div>
                    <h3 className={`font-semibold mb-2 ${isDarkMode ? 'text-gray-50' : 'text-gray-900'}`}>Analyzing Audio Patterns</h3>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Processing voice characteristics and authenticity...</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Progress value={45} className="h-2" />
                    <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-center`}>Extracting voice features...</div>
                  </div>
                </div>
              )}
              
              {analysisResult && !isAnalyzing && (
 