import { useState } from "react";
import { Menu, X, Search, User, Leaf } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CartButton } from "./CartButton";
export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  return <nav className="bg-background/95 backdrop-blur-sm border-b border-botanical/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-botanical animate-float" />
            <span className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Plantify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-foreground hover:text-botanical transition-colors duration-300 ${location.pathname === "/" ? "text-botanical font-medium" : ""}`}>
              Home
            </Link>
            <Link to="/terrariums" className={`text-foreground hover:text-botanical transition-colors duration-300 ${location.pathname === "/terrariums" ? "text-botanical font-medium" : ""}`}>
              Terrariums
            </Link>
            
            <Link to="/about" className={`text-foreground hover:text-botanical transition-colors duration-300 ${location.pathname === "/about" ? "text-botanical font-medium" : ""}`}>
              About
            </Link>
            <a href="#contact" className="text-foreground hover:text-botanical transition-colors duration-300">
              Contact
            </a>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover:bg-botanical-light hover:text-botanical rounded-xl">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-botanical-light hover:text-botanical rounded-xl">
              <User className="h-5 w-5" />
            </Button>
            <CartButton />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="hover:bg-botanical-light rounded-xl">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden pb-4 animate-slide-up">
            <div className="flex flex-col space-y-3 pt-4 border-t border-botanical/10">
              <Link to="/" className={`text-foreground hover:text-botanical transition-colors duration-300 py-2 ${location.pathname === "/" ? "text-botanical font-medium" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/terrariums" className={`text-foreground hover:text-botanical transition-colors duration-300 py-2 ${location.pathname === "/terrariums" ? "text-botanical font-medium" : ""}`} onClick={() => setIsMenuOpen(false)}>
                Terrariums
              </Link>
              <a href="#categories" className="text-foreground hover:text-botanical transition-colors duration-300 py-2">
                Categories
              </a>
              <Link to="/about" className={`text-foreground hover:text-botanical transition-colors duration-300 py-2 ${location.pathname === "/about" ? "text-botanical font-medium" : ""}`} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <a href="#contact" className="text-foreground hover:text-botanical transition-colors duration-300 py-2">
                Contact
              </a>
              <div className="flex items-center space-x-4 pt-4 border-t border-botanical/10">
                <Button variant="ghost" size="icon" className="hover:bg-botanical-light hover:text-botanical">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="hover:bg-botanical-light hover:text-botanical">
                  <User className="h-5 w-5" />
                </Button>
                <CartButton />
              </div>
            </div>
          </div>}
      </div>
    </nav>;
};