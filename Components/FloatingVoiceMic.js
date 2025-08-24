import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, X, Volume2, Copy, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InvokeLLM } from "@/integrations/Core";

export default function FloatingVoiceMic({ isDarkMode = true }) {
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  
  const recognitionRef = useRef(null);
  const synthRef = useRef(null);

  useEffect(() => {
    // Check if speech recognition is supported
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setIsSupported(false);
      return;
    }

    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = 'en-US';

    // Initialize speech synthesis
    synthRef.current = window.speechSynthesis;

    const recognition = recognitionRef.current;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
      setTranscript("Listening...");
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript || "Listening...");

      if (finalTranscript) {
        processVoiceCommand(finalTranscript);
      }
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsListening(false);
      console.error('Speech recognition error:', event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const processVoiceCommand = async (command) => {
    setIsProcessing(true);
    setResponse("");

    try {
      const result = await InvokeLLM({
        prompt: `You are a helpful AI assistant for TruthTrack, an advanced misinformation detection platform. 

TruthTrack Features:
- Trending Search: Real-time monitoring of viral misinformation across social platforms
- AI Image Detection: Advanced deepfake and photo manipulation detection  
- Voice Assistant: AI-powered voice authentication and synthetic speech detection
- Article Tag: Comprehensive fact-checking with source verification and bias detection
- Template Share: Community-driven templates and frameworks for detection workflows
- FAQs: Knowledge base with expert guidance and best practices

User's voice command: "${command}"

Please provide a helpful, concise response (max 2-3 sentences) about TruthTrack features or general assistance. If they're asking about a specific feature, explain how to use it. If they're asking a general question, provide useful information. Keep responses friendly and informative.`,
        response_json_schema: {
          type: "object",
          properties: {
            response: { type: "string" },
            suggested_action: { type: "string" },
            relevant_feature: { type: "string" }
          }
        }
      });

      setResponse(result.response || "I'm here to help with TruthTrack features. Try asking about our AI detection tools!");
      
      // Speak the response
      if (synthRef.current && result.response) {
        const utterance = new SpeechSynthesisUtterance(result.response);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;
        synthRef.current.speak(utterance);
      }

    } catch (error) {
      console.error('Error processing voice command:', error);
      const fallbackResponse = getFallbackResponse(command);
      setResponse(fallbackResponse);
      
      // Speak fallback response
      if (synthRef.current) {
        const utterance = new SpeechSynthesisUtterance(fallbackResponse);
        utterance.rate = 0.9;
        synthRef.current.speak(utterance);
      }
    }

    setIsProcessing(false);
  };

  const getFallbackResponse = (command) => {
    const lowerCommand = command.toLowerCase();
    
    if (lowerCommand.includes('image') || lowerCommand.includes('photo') || lowerCommand.includes('deepfake')) {
      return "Use our AI Image Detection to analyze photos for deepfakes and manipulation. Just upload an image and get instant results with 99% accuracy!";
    } else if (lowerCommand.includes('trending') || lowerCommand.includes('viral') || lowerCommand.includes('social')) {
      return "Check our Trending Search to monitor viral misinformation across social platforms in real-time. Search any topic for instant analysis!";
    } else if (lowerCommand.includes('article') || lowerCommand.includes('news') || lowerCommand.includes('fact')) {
      return "Our Article Tag feature provides comprehensive fact-checking with source verification. Just paste a URL or text to analyze credibility!";
    } else if (lowerCommand.includes('template') || lowerCommand.includes('share')) {
      return "Browse Template Share for community-verified detection frameworks. Download templates and share your own resources!";
    } else if (lowerCommand.includes('voice') || lowerCommand.includes('audio')) {
      return "The Voice Assistant can detect synthetic speech and voice cloning. Upload audio files for authentication analysis!";
    } else {
      return "I'm your TruthTrack assistant! Ask me about image detection, trending misinformation, fact-checking, or any of our AI-powered tools.";
    }
  };

  const startListening = () => {
    if (!isSupported) {
      setError("Speech recognition is not supported in this browser.");
      setIsExpanded(true);
      return;
    }

    // Prevent starting if already listening or recognition object is not ready
    if (isListening || !recognitionRef.current) {
      return;
    }

    try {
      setIsExpanded(true);
      setTranscript("");
      setResponse("");
      setError("");
      recognitionRef.current.start();
    } catch (err) {
      // Catch potential errors if the state is somehow out of sync or API fails
      console.error("Error starting speech recognition:", err);
      setError("Could not start listening. Please try again.");
      setIsListening(false); // Reset state
    }
  };

  const stopListening = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
    }
  };

  const resetConversation = () => {
    setTranscript("");
    setResponse("");
    setError("");
    setIsProcessing(false);
  };

  const speakResponse = () => {
    if (synthRef.current && response) {
      synthRef.current.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(response);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthRef.current.speak(utterance);
    }
  };

  if (!isSupported) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          disabled
          className="w-14 h-14 rounded-full shadow-lg bg-gray-400 cursor-not-allowed"
        >
          <Mic className="w-6 h-6 text-white" />
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Floating Mic Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
            isListening
              ? "bg-red-500 hover:bg-red-600 animate-pulse"
              : isProcessing
              ? "bg-orange-500 hover:bg-orange-600"
              : isDarkMode
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isListening ? (
            <MicOff className="w-6 h-6 text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white" />
          )}
        </Button>
      </div>

      {/* Expanded Voice Interface */}
      {isExpanded && (
        <div className="fixed bottom-24 right-6 z-40 max-w-sm">
          <Card className={`shadow-xl border ${
            isDarkMode 
              ? "bg-gray-900 border-gray-700" 
              : "bg-white border-gray-200"
          }`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}>
                    TruthTrack Assistant
                  </h3>
                  {isListening && (
                    <Badge className="bg-red-100 text-red-800 animate-pulse">
                      Listening
                    </Badge>
                  )}
                  {isProcessing && (
                    <Badge className="bg-orange-100 text-orange-800">
                      Processing
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsExpanded(false)}
                  className={isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Error Display */}
              {error && (
                <div className={`p-3 rounded-lg mb-3 bg-red-50 border border-red-200`}>
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}
              
              {/* Transcript Display */}
              {transcript && !error && (
                <div className={`p-3 rounded-lg mb-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}>
                    You said:
                  </p>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    {transcript}
                  </p>
                </div>
              )}

              {/* Response Display */}
              {response && (
                <div className={`p-3 rounded-lg mb-3 ${
                  isDarkMode ? "bg-blue-900/30 border border-blue-700/30" : "bg-blue-50 border border-blue-200"
                }`}>
                  <p className={`text-sm font-medium ${
                    isDarkMode ? "text-blue-400" : "text-blue-600"
                  }`}>
                    TruthTrack Assistant:
                  </p>
                  <p className={`text-sm mt-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {response}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={speakResponse}
                      className="p-1 h-auto"
                    >
                      <Volume2 className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={copyResponse}
                      className="p-1 h-auto"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Processing Indicator */}
              {isProcessing && (
                <div className="flex justify-center mb-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}

              {/* Default Instructions */}
              {!transcript && !response && !error && (
                <div className={`p-3 rounded-lg mb-3 ${
                  isDarkMode ? "bg-gray-800" : "bg-gray-50"
                }`}>
                  <p className={`text-sm ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}>
                    Click the mic and ask about TruthTrack features, image detection, fact-checking, or any questions!
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button
                  onClick={isListening ? stopListening : startListening}
                  disabled={isProcessing}
                  className={`flex-1 ${
                    isListening
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                  size="sm"
                >
                  {isListening ? (
                    <>
                      <MicOff className="w-3 h-3 mr-1" />
                      Stop
                    </>
                  ) : (
                    <>
                      <Mic className="w-3 h-3 mr-1" />
                      {response ? "Ask Again" : "Start"}
                    </>
                  )}
                </Button>
                
                {(transcript || response) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetConversation}
                    className={`px-3 ${
                      isDarkMode 
                        ? "border-gray-700 text-gray-300 hover:bg-gray-800"
                        : "border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                )}
              </div>

              {/* Quick Actions */}
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <p className={`text-xs mb-2 ${
                  isDarkMode ? "text-gray-400" : "text-gray-500"
                }`}>
                  Try asking:
                </p>
                <div className="grid grid-cols-2 gap-1">
                  {[
                    "How do I detect deepfakes?",
                    "Check trending topics",
                    "Analyze this article",
                    "Help with fact-checking"
                  ].map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="ghost"
                      size="sm"
                      onClick={() => processVoiceCommand(suggestion)}
                      disabled={isProcessing || isListening}
                      className={`text-xs p-1 h-auto ${
                        isDarkMode 
                          ? "text-gray-400 hover:text-gray-200 hover:bg-gray-800"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                      }`}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
