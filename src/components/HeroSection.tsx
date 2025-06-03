
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden min-h-screen">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left Content */}
          <div className="text-left">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Now live in 38 Districs of Bihar
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
              <span className="block">India's Largest</span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                Intra-City Logistics
              </span>
              <span className="block">Platform</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed max-w-xl">
              Move anything, anywhere within the city at the tap of a button
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Book Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-4 text-lg rounded-xl shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Download App
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10M+</div>
                <div className="text-blue-200 text-sm">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50K+</div>
                <div className="text-blue-200 text-sm">Driver Partners</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">35+</div>
                <div className="text-blue-200 text-sm">Districts</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://img.freepik.com/free-vector/loaders-carrying-armchair-boxes-new-house_74855-14095.jpg?semt=ais_hybrid&w=740"
                alt="Delivery Partner with package"
                className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
