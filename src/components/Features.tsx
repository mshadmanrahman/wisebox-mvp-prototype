import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  MapPin, 
  Calendar, 
  Shield, 
  Bell, 
  CreditCard,
  Users,
  TrendingUp,
  CheckCircle
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: FileText,
      title: "Smart Document Management",
      description: "Upload, categorize, and track property documents with AI-powered OCR and validation. Get alerts for expiring documents.",
      status: "Available",
      color: "text-success"
    },
    {
      icon: MapPin,
      title: "Property Monitoring",
      description: "GPS-enabled property tracking with inspection image uploads and geofencing alerts for unauthorized access.",
      status: "Available",
      color: "text-success"
    },
    {
      icon: Calendar,
      title: "Legal Consultations",
      description: "Book free or paid legal consultations with qualified professionals. Integrated Calendly and Google Meet support.",
      status: "Available", 
      color: "text-success"
    },
    {
      icon: Shield,
      title: "Digital Will Creation",
      description: "Step-by-step wizard to create and manage digital wills with heir management and asset distribution planning.",
      status: "Beta",
      color: "text-warning"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Customizable alerts for document expiries, tax deadlines, legal updates, and property-related notifications.",
      status: "Available",
      color: "text-success"
    },
    {
      icon: CreditCard,
      title: "Flexible Payments",
      description: "Subscription plans and one-time payments for legal services. Secure Stripe integration with invoice history.",
      status: "Available",
      color: "text-success"
    },
    {
      icon: TrendingUp,
      title: "Property Valuation",
      description: "AI-driven property valuations with market trends and investment recommendations for informed decisions.",
      status: "Coming Soon",
      color: "text-muted-foreground"
    },
    {
      icon: Users,
      title: "Family Collaboration",
      description: "Share property access with family members and collaborate on document management and decision making.",
      status: "Coming Soon", 
      color: "text-muted-foreground"
    }
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Available":
        return "default";
      case "Beta":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">
            <CheckCircle className="h-3 w-3 mr-1" />
            Platform Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Manage Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools designed specifically for Non-Resident Bangladeshis to manage ancestral properties with confidence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="rounded-xl border border-white/10 p-6" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  <Badge variant={getStatusVariant(feature.status)} className="text-xs">
                    {feature.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;