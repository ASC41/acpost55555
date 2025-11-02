import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function NavigationMobile() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === "/" && (location === "/" || location === "/selected-works" || location === "/featured-works")) {
      return true;
    }
    return location === path;
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-800 relative z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-white" onClick={closeMenu}>
            AC POST
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="text-white p-2 hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900 border-b border-gray-800 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive("/")
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                Featured Works
              </Link>
              <Link
                href="/short-films"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive("/short-films")
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                Short Films
              </Link>
              <Link
                href="/vfx"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive("/vfx")
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                VFX
              </Link>
              <Link
                href="/about"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive("/about")
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActive("/contact")
                    ? "bg-accent/20 text-accent"
                    : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}