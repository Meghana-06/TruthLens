
import React, { useState } from "react";
import { Mail, MessageCircle, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { SendEmail } from "@/integrations/Core";

export default function Contact({ isDarkMode = true }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await SendEmail({
        to: "teamcodehustlers@gmail.com",
        subject: `TruthTrack Contact: ${formData.subject}`,
        body: `
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent from TruthTrack Contact Form
Contact: teamcodehustlers@gmail.com
        `,
        from_name: formData.name
      });
      
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      // Optionally, add user feedback for error
    }
    
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      description: "Get in touch via email",
      contact: "teamcodehustlers@gmail.com",
      color: "text-blue-400",
      action: () => window.open("mailto:teamcodehustlers@gmail.com")
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Available 24/7",
      color: "text-green-400"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak with our experts",
      contact: "+1 (555) 123-4567",
      color: "text-purple-400"
    },
    {
      icon: MapPin,
      title: "Office Location",
      description: "Visit our headquarters",
      contact: "San Francisco, CA",
      color: "text-orange-400"
    }
  ];

  const bgClass = isDarkMode 
    ? "bg-gradient-to-br from-gray-900 via-black to-gray-800" 
    : "bg-gradient-to-br from-gray-50 via-white to-blue-50";
  
  const cardClass = isDarkMode 
    ? "border-gray-700/50 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50"
    : "border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 shadow-lg";

  const textClass = isDarkMode ? "text-white" : "text-gray-900";
  const subtextColorClass = isDarkMode ? "text-gray-300" : "text-gray-600";
  const subsubtextColorClass = isDarkMode ? "text-gray-400" : "text-gray-700";
  const labelColorClass = isDarkMode ? "text-gray-300" : "text-gray-700";
  const inputBgClass = isDarkMode ? "bg-gray-800/50 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500";
  const buttonOutlineClass = isDarkMode ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white" : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900";

  return (
    <div className={`min-h-screen ${bgClass} py-12`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium mb-6 ${
            isDarkMode 
              ? 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
              : 'bg-blue-50 border border-blue-200 text-blue-600'
          }`}>
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${textClass}`}>
            Connect With Us
          </h1>
          
          <p className={`text-xl max-w-2xl mx-auto leading-relaxed ${subtextColorClass}`}>
            Have questions about TruthTrack? Need support or want to learn more about our 
            AI-powered misinformation detection tools? We're here to help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <h2 className={`text-2xl font-bold mb-6 ${textClass}`}>Get In Touch</h2>
            
            {contactInfo.map((info, index) => (
              <Card 
                key={index} 
                className={`${cardClass} transition-all duration-300 cursor-pointer`} 
                onClick={info.action ? info.action : undefined} // Only add onClick if action exists
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isDarkMode ? 'bg-gray-800/50 border-gray-700/50' : 'bg-gray-50 border-gray-200'
                    }`}>
                      <info.icon className={`w-6 h-6 ${info.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold mb-1 ${textClass}`}>{info.title}</h3>
                      <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{info.description}</p>
                      <p className={`font-medium ${info.color}`}>{info.contact}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className={cardClass}>
              <CardHeader>
                <CardTitle className={`text-2xl font-bold ${textClass}`}>
                  Send Us a Message
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center ${
                      isDarkMode ? 'bg-green-600/20 border border-green-500/30' : 'bg-green-100 border border-green-300'
                    }`}>
                      <CheckCircle className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
                    </div>
                    <h3 className={`text-2xl font-bold mb-2 ${textClass}`}>Message Sent!</h3>
                    <p className={`${subtextColorClass} mb-6`}>
                      Thank you for contacting us. We'll get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setSubmitted(false)}
                      variant="outline"
                      className={buttonOutlineClass}
                    >
                      Send Another Message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${labelColorClass}`}>
                          Full Name *
                        </label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          placeholder="Enter your full name"
                          className={`py-3 ${inputBgClass} focus:border-blue-500`}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className={`text-sm font-medium ${labelColorClass}`}>
                          Email Address *
                        </label>
                        <Input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          placeholder="Enter your email"
                          className={`py-3 ${inputBgClass} focus:border-blue-500`}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${labelColorClass}`}>
                        Subject *
                      </label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder="What's this about?"
                        className={`py-3 ${inputBgClass} focus:border-blue-500`}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className={`text-sm font-medium ${labelColorClass}`}>
                        Message *
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className={`resize-none ${inputBgClass} focus:border-blue-500`}
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 py-6 text-lg"
                    >
                      {isSubmitting ? (
                        "Sending Message..."
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
 