
import { Button } from "@/components/ui/button";
import { Download, Star, Shield, Clock } from 'lucide-react';

const DownloadAppSection = () => {
  return (
    <section id="bikes" className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <Download className="w-4 h-4 mr-2" />
              Download Now
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Get the Delivery Partner App
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                for seamless booking
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Book, track, and manage all your logistics needs on the go. Available for iOS and Android devices with live tracking and instant notifications.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center text-white">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">4.8★ Rating</div>
                  <div className="text-blue-200 text-sm">50K+ Reviews</div>
                </div>
              </div>
              <div className="flex items-center text-white">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">100% Safe</div>
                  <div className="text-blue-200 text-sm">Secure Payments</div>
                </div>
              </div>
              <div className="flex items-center text-white">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold">24/7 Support</div>
                  <div className="text-blue-200 text-sm">Always Available</div>
                </div>
              </div>
            </div>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-xl">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download for iOS
              </Button>
              <Button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold text-lg transform hover:scale-105 transition-all duration-200 shadow-xl">
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Get it on Google Play
              </Button>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="relative">
            <div className="relative z-10 mx-auto max-w-sm">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-[3rem] p-4 shadow-2xl">
                <div className="bg-white rounded-[2.5rem] overflow-hidden">
                  <img 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Delivery Partner App interface" 
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 -left-4 w-16 h-16 bg-blue-400 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DownloadAppSection;
