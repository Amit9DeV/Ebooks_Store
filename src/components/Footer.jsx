import React from "react";
import { Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h2 className="text-xl md:text-2xl font-bold">📚 BookStore</h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Your one-stop destination for digital books and learning resources.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h6 className="text-base md:text-lg font-semibold">Quick Links</h6>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">FAQs</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Blog</a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h6 className="text-base md:text-lg font-semibold">Support</h6>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary transition-colors">Cookie Policy</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h6 className="text-base md:text-lg font-semibold">Newsletter</h6>
            <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
            <form className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-10 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 ring-primary/20 outline-none"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t dark:border-gray-800 mt-8 md:mt-12 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-600 dark:text-gray-300 text-sm text-center sm:text-left">
              © {new Date().getFullYear()} BookStore. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary text-sm transition-colors">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary text-sm transition-colors">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-primary dark:text-gray-300 dark:hover:text-primary text-sm transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
