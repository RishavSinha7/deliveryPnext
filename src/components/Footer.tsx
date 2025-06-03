
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <span className="text-2xl font-bold">Delivery Partner</span>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              India's largest intra-city logistics platform. Move anything, anywhere within the city at the tap of a button.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-400 rounded-lg flex items-center justify-center transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-700 rounded-lg flex items-center justify-center transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">City Trucks</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">City Bikes</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Packers & Movers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">For Enterprise</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Intercity</a></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="text-xl font-bold mb-6">Company</h3>
            <ul className="space-y-4">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Careers</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Press</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors font-medium">Partner with us</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-500 flex-shrink-0 mr-3 mt-1" />
                <span className="text-gray-300 leading-relaxed">
                  Delivery Partner Headquarters<br />
                  2nd Floor, Ajanta Tower<br />
                  Bailley Road, Patna<br />
                  Bihar 800014
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-blue-500 flex-shrink-0 mr-3" />
                <span className="text-gray-300 font-medium">+91 7292929292</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-blue-500 flex-shrink-0 mr-3" />
                <span className="text-gray-300 font-medium">support@deliverypartner.in</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; 2023 Delivery Partner. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
