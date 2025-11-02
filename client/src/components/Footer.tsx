import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="/">
              <span className="font-playfair text-xl font-bold tracking-tight text-white cursor-pointer">AC Post</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400">Creating compelling visual stories</p>
          </div>
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/adrianscarey/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
              <i className="fab fa-linkedin-in text-xl"></i>
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Company Info */}
        <div className="flex flex-col items-center justify-center space-y-3 mt-8 pt-8 border-t border-gray-700/50">
          {/* Company Name */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white tracking-wide">AC POST LLC</h3>
          </div>
          
          {/* Location Tagline */}
          <div className="flex items-center space-x-3 text-sm text-gray-400">
            <span>Made in Brooklyn NY</span>
            <div className="w-px h-4 bg-gray-500"></div>
            <span>Enjoyed Worldwide</span>
          </div>
          
          {/* Contact Link */}
          <div className="mt-2">
            <Link href="/contact">
              <span className="inline-flex items-center space-x-2 px-4 py-2 bg-white hover:bg-white/90 border-2 border-accent hover:border-accent/80 rounded-md text-black hover:text-black transition-all duration-300 cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                <span className="text-sm font-medium">Contact Us</span>
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} AC Post. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}