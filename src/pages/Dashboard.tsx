import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { 
  Building, 
  Plus, 
  Search,
  Bell,
  User,
  ChevronLeft,
  ChevronRight,
  FileText,
  Settings,
  MessageSquare,
  BarChart3,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  ExternalLink
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for the exact layout
  const netWorthData = [
    {
      name: "Purbanchal Plot 17, Road 8, Block F",
      type: "Land",
      value: "$400,024.92",
      change: "+4.5% YoY",
      isPositive: true
    },
    {
      name: "House 17, Road 14, Sector 13, Uttara",
      type: "Apartment", 
      value: "$90,952.52",
      change: "-1.3% YoY",
      isPositive: false
    }
  ];

  const propertyFacts = {
    ownership: {
      date: "January 1, 2008",
      owner: "Shadman Sakib, Sabrina Nawrin"
    },
    taxation: {
      status: "Up to date",
      lastPaid: "September 20, 2024"
    },
    documents: {
      uploaded: "4 out 8 Uploaded",
      status: "Your documents are not verified yet."
    }
  };

  if (!user) {
    window.location.href = "/auth";
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Navigation */}
      <header className="border-b border-border bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/6e9b6655-3299-407b-b223-68cb733da78d.png" 
                alt="Wisebox" 
                className="h-8 w-8"
              />
              <span className="text-lg font-semibold">Wisebox</span>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" className="text-sm">Assets</Button>
              <Button variant="ghost" className="text-sm">Communication</Button>
              <Button variant="ghost" className="text-sm">Settings</Button>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">SS</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-border bg-card h-[calc(100vh-73px)] p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Hi Shadman!</h1>
            <p className="text-sm text-muted-foreground">Sunday, July 27</p>
          </div>
          
          <nav className="space-y-2">
            <Button variant="default" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-3" />
              Snapshot
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Building className="h-4 w-4 mr-3" />
              My Properties
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-3" />
              Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              Services
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-3" />
              Accounting
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-3" />
              Compliance
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-3" />
              More
            </Button>
          </nav>

          <div className="mt-8">
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              New Property
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Net Worth Card */}
            <div className="lg:col-span-2">
              <Card className="bg-white border border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-semibold">Net Worth</CardTitle>
                      <p className="text-sm text-muted-foreground">Based on our current valuation data.</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Request Appraisal
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                    <div>Property</div>
                    <div className="text-right">Estimated Value</div>
                  </div>
                  {netWorthData.map((property, index) => (
                    <div key={index} className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                      <div>
                        <p className="font-medium text-foreground">{property.name}</p>
                        <p className="text-sm text-muted-foreground">{property.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{property.value}</p>
                        <p className={`text-sm ${property.isPositive ? 'text-success' : 'text-danger'}`}>
                          {property.change}
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Property Facts Card */}
              <Card className="mt-6 bg-white border border-border">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Property Facts</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Purbanchal Plot 17, Road 8, Block F</p>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Ownership Initiation</p>
                      <p className="text-sm text-primary">{propertyFacts.ownership.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Taxation</p>
                      <p className="text-sm text-primary">{propertyFacts.taxation.status}</p>
                      <p className="text-xs text-muted-foreground">Khazna payed on</p>
                      <p className="text-xs text-muted-foreground">{propertyFacts.taxation.lastPaid}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Owner</p>
                      <p className="text-sm text-primary">{propertyFacts.ownership.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Document status</p>
                      <p className="text-sm text-primary">{propertyFacts.documents.uploaded}</p>
                      <p className="text-xs text-muted-foreground">{propertyFacts.documents.status}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Verify Documents
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Fees Card */}
              <Card className="bg-white border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Upcoming fees</CardTitle>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-foreground">$830</div>
                    <div className="text-sm text-danger">₹101,294.11</div>
                    <div className="text-xs text-muted-foreground">Khazna due on September 20, 2025</div>
                  </div>
                </CardContent>
              </Card>

              {/* Consultation Card */}
              <Card className="bg-white border border-border">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Consultation</CardTitle>
                    <Button variant="ghost" size="icon">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">
                    You have one free consultation left this month. Schedule today to book your spot.
                  </div>
                  
                  {/* Calendar Component */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Button variant="ghost" size="icon">
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="font-medium">January 2025</span>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="w-full"
                    />
                    
                    <div className="text-xs text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-3 w-3" />
                        <span>Time zone</span>
                      </div>
                      <p className="ml-5">Eastern Standard Time</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-4 px-6">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 WiseBox. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">Privacy Policy</Button>
            <Button variant="ghost" size="sm">Terms of Service</Button>
            <Button variant="ghost" size="sm">Help Center</Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;