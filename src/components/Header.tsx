import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Building, Menu, X, FileText, Calendar, Shield } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
            <Building className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            WiseBox
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </a>
          <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            About
          </a>
          <a href="#contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={() => window.location.href = '/auth'}>
            Sign In
          </Button>
          <Button variant="hero" size="sm" onClick={() => window.location.href = '/auth'}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden border-t border-border/40 backdrop-blur",
        isMenuOpen ? "block" : "hidden"
      )}>
        <nav className="container flex flex-col space-y-4 py-4">
          <a href="#features" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <FileText className="h-4 w-4" />
            <span>Features</span>
          </a>
          <a href="#pricing" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Pricing</span>
          </a>
          <a href="#about" className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <Shield className="h-4 w-4" />
            <span>About</span>
          </a>
          <div className="flex flex-col space-y-2 pt-4">
            <Button variant="outline" size="sm" onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
            <Button variant="hero" size="sm" onClick={() => window.location.href = '/auth'}>
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;