import React, { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    id: 1,
    question: "How accurate is TruthLens AI detection?",
    answer: "TruthLens achieves 99.2% accuracy in detecting manipulated content through advanced deep learning algorithms. Our system is continuously trained on the latest misinformation patterns and validated against real-world datasets.",
    category: "accuracy"
  },
  {
    id: 2,
    question: "What types of misinformation can TruthLens detect?",
    answer: "TruthLens can identify deepfakes, manipulated images, synthetic voices, fabricated articles, and coordinated inauthentic behavior across multiple platforms. We support analysis of text, images, audio, and video content.",
    category: "detection"
  },
  {
    id: 3,
    question: "How fast is the analysis process?",
    answer: "Most content analysis is completed within 2-5 seconds. Complex multimedia content may take up to 30 seconds. Our real-time monitoring systems process millions of posts continuously.",
    category: "performance"
  },
  {
    id: 4,
    question: "Is my uploaded content stored or shared?",
    answer: "No, we prioritize your privacy. Uploaded content is analyzed in real-time and immediately deleted from our servers. We don't store, share, or use your content for training without explicit consent.",
    category: "privacy"
  },
  {
    id: 5,
    question: "Can TruthLens integrate with existing workflows?",
    answer: "Yes, we offer comprehensive APIs and integrations with popular content management systems, social media platforms, and news organizations. Our enterprise solutions include custom integration support.",
    category: "integration"
  },
  {
    id: 6,
    question: "What languages does TruthLens support?",
    answer: "TruthLens supports content analysis in over 50 languages, including English, Spanish, French, German, Chinese, Japanese, Arabic, and many others. Our multilingual AI models ensure consistent accuracy across languages.",
    category: "features"
  },
  {
    id: 7,
    question: "How do you handle false positives?",
    answer: "Our system includes confidence scoring and human review workflows for edge cases. Users can report false positives, which helps us continuously improve our algorithms. We also provide detailed analysis breakdowns for transparency.",
    category: "accuracy"
  },
  {
    id: 8,
    question: "Is there a free tier available?",
    answer: "Yes, we offer a free tier with 100 analyses per month. This includes basic detection features for images and text. Paid plans unlock advanced features, higher limits, and priority support.",
    category: "pricing"
  }
];

const categories = [
  { key: "all", label: "All Questions" },
  { key: "accuracy", label: "Accuracy & Performance" },
  { key: "detection", label: "Detection Capabilities" },
  { key: "privacy", label: "Privacy & Security" },
  { key: "integration", label: "Integration & APIs" },
  { key: "features", label: "Features & Support" },
  { key: "pricing", label: "Pricing & Plans" }
];

export default function FAQs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (id) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-blue-600 font-medium mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Help Center</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Find answers to common questions about TruthLens AI-powered 
            misinformation detection platform.
          </p>
        </div>

        {/* Search */}
        <Card className="mb-8 border-0 bg-white/80 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search frequently asked questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg border-0 bg-gray-50 focus:bg-white transition-colors duration-200"
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category.key}
              variant={selectedCategory === category.key ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.key)}
              className={`rounded-full ${
                selectedCategory === category.key
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "hover:bg-blue-50 hover:text-blue-600"
              }`}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <Card key={faq.id} className="border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleExpanded(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-lg text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedItems.has(faq.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                
                {expandedItems.has(faq.id) && (
                  <div className="px-6 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredFAQs.length === 0 && (
          <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-50 rounded-full flex items-center justify-center">
                <HelpCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or browse different categories.
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Contact CTA */}
        <Card className="mt-12 border-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Our support team is here to help you get the most out of TruthLens.
            </p>
            <Button
              className="bg-white text-blue-600 hover:bg-gray-50 font-semibold"
            >
              Contact Support
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}