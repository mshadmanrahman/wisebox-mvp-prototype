import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Globe, FileCheck } from "lucide-react";
import heroImage from "@/assets/hero-property.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/95" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <Badge variant="outline" className="mb-6 bg-card/50 backdrop-blur-sm border-primary/20">
            <Shield className="h-3 w-3 mr-1" />
            Trusted by 500+ NRB Property Owners
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
            Manage Your Ancestral Properties
            <span className="block text-primary">From Anywhere in the World</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            WiseBox empowers Non-Resident Bangladeshis to securely manage property documents, 
            monitor compliance, and access legal consultations—all from one trusted platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="hero" size="lg" className="group" onClick={() => window.location.href = '/auth'}>
              Start Managing Properties
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="elegant" size="lg" onClick={() => window.location.href = '/dashboard'}>
              View Demo Dashboard
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:shadow-lg transition-all duration-300">
              <FileCheck className="h-8 w-8 text-success mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Document Management</h3>
              <p className="text-sm text-muted-foreground">Upload, organize, and track all property documents with AI-powered validation</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:shadow-lg transition-all duration-300">
              <Globe className="h-8 w-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Remote Monitoring</h3>
              <p className="text-sm text-muted-foreground">Stay updated on property status and compliance from anywhere globally</p>
            </div>
            
            <div className="bg-card/50 backdrop-blur-sm p-6 rounded-lg border border-border/50 hover:shadow-lg transition-all duration-300">
              <Shield className="h-8 w-8 text-secondary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Legal Support</h3>
              <p className="text-sm text-muted-foreground">Access qualified legal consultations and document verification services</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;