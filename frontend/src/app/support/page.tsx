"use client";

import { useState } from 'react';
import { Phone, Mail, MessageCircle, Clock, HelpCircle, FileText, Truck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert('Your support request has been submitted successfully! We will get back to you within 24 hours.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const supportOptions = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us for immediate assistance",
      contact: "+91-1800-123-4567",
      availability: "24/7 Available",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us your queries via email",
      contact: "support@deliverypartner.com",
      availability: "Response within 4 hours",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support team",
      contact: "Start Chat",
      availability: "9 AM - 9 PM",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const faqItems = [
    {
      question: "How do I become a delivery partner?",
      answer: "You can sign up through our app, complete the registration process, upload required documents, and start earning after verification."
    },
    {
      question: "What documents do I need?",
      answer: "You need a valid driving license, vehicle registration, Aadhaar card, PAN card, and bank account details."
    },
    {
      question: "How are payments processed?",
      answer: "Payments are processed weekly directly to your registered bank account. You can track earnings in real-time through the app."
    },
    {
      question: "What if I face issues during delivery?",
      answer: "Use the in-app emergency support or call our 24/7 helpline. We provide immediate assistance for any delivery-related issues."
    },
    {
      question: "Can I work part-time?",
      answer: "Yes! You have complete flexibility to choose your working hours and accept deliveries as per your availability."
    }
  ];

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get the support you need to succeed as a delivery partner. We're here to help 24/7.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${option.color} mb-3`}>
                  <option.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{option.title}</CardTitle>
                <CardDescription>{option.description}</CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-semibold text-gray-900 mb-2">{option.contact}</p>
                <Badge variant="secondary" className="text-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {option.availability}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <span>Submit a Support Request</span>
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Brief description of your issue"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your issue in detail..."
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Section */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <HelpCircle className="h-5 w-5 text-blue-600" />
                  <span>Frequently Asked Questions</span>
                </CardTitle>
                <CardDescription>
                  Quick answers to common questions from delivery partners.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-start space-x-2">
                        <Truck className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>{faq.question}</span>
                      </h4>
                      <p className="text-gray-600 ml-6">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>        </div>
      </div>
    </div>
  );
};

export default SupportPage;
