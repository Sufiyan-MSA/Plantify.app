import { Leaf, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
export const Footer = () => {
  return <footer id="contact" className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-botanical animate-float" />
              <span className="text-2xl font-bold">Plantify</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Creating beautiful terrarium ecosystems that bring nature's wonder into your everyday life. 
              Sustainable, beautiful, and life-enhancing.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-botanical/20 rounded-full flex items-center justify-center hover:bg-botanical transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-botanical/20 rounded-full flex items-center justify-center hover:bg-botanical transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-botanical/20 rounded-full flex items-center justify-center hover:bg-botanical transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-botanical/20 rounded-full flex items-center justify-center hover:bg-botanical transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/" className="text-gray-300 hover:text-botanical transition-colors">Home</Link></li>
              <li><Link to="/terrariums" className="text-gray-300 hover:text-botanical transition-colors">Terrariums</Link></li>
              <li><a href="#categories" className="text-gray-300 hover:text-botanical transition-colors">Categories</a></li>
              <li><Link to="/about" className="text-gray-300 hover:text-botanical transition-colors">About Us</Link></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Care Guides</a></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Custom Orders</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Returns</a></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Size Guide</a></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Track Order</a></li>
              <li><a href="#" className="text-gray-300 hover:text-botanical transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-botanical" />
                <span className="text-gray-300">support@plantify.app</span>
              </div>
              
              
            </div>

            {/* Business Hours */}
            <div className="mt-6">
              <h4 className="font-medium mb-3">Business Hours</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div>Mon - Fri: 9:00 AM - 6:00 PM</div>
                <div>Sat: 10:00 AM - 4:00 PM</div>
                <div>Sun: Closed</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-300 text-sm">© 2025 Plantify.app All rights reserved.</div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-gray-300 hover:text-botanical transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-300 hover:text-botanical transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-300 hover:text-botanical transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};