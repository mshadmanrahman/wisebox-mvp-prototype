import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Building, 
  Plus, 
  Upload, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  FileText,
  MapPin,
  Bell,
  User,
  Settings,
  LogOut
} from "lucide-react";

const Dashboard = () => {
  const [user] = useState({
    name: "Ahmed Rahman",
    email: "ahmed.rahman@email.com",
    location: "Toronto, Canada"
  });

  const [properties] = useState([
    {
      id: 1,
      name: "Family Home - Dhaka",
      type: "Residential",
      address: "Dhanmondi, Dhaka",
      status: "compliant",
      documents: 8,
      expiringDocs: 0,
      lastUpdated: "2 days ago"
    },
    {
      id: 2,
      name: "Commercial Plot - Chittagong",
      type: "Commercial",
      address: "Agrabad, Chittagong",
      status: "warning",
      documents: 5,
      expiringDocs: 2,
      lastUpdated: "1 week ago"
    }
  ]);

  const [recentActivity] = useState([
    { action: "Document uploaded", item: "Property Tax Receipt", time: "2 hours ago", type: "success" },
    { action: "Consultation booked", item: "Will Planning Session", time: "1 day ago", type: "info" },
    { action: "Reminder sent", item: "Khajna Payment Due", time: "3 days ago", type: "warning" }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant": return "default";
      case "warning": return "secondary";
      case "critical": return "destructive";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant": return CheckCircle;
      case "warning": return AlertTriangle;
      case "critical": return AlertTriangle;
      default: return FileText;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-primary-glow">
                <Building className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold">WiseBox Dashboard</h1>
                <p className="text-sm text-muted-foreground">Property Management Platform</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-muted-foreground">{user.location}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name.split(' ')[0]}!</h2>
          <p className="text-muted-foreground">Manage your properties and stay compliant from anywhere</p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Button variant="hero" className="h-auto p-6 flex-col space-y-2">
            <Plus className="h-6 w-6" />
            <span>Add Property</span>
          </Button>
          <Button variant="elegant" className="h-auto p-6 flex-col space-y-2">
            <Upload className="h-6 w-6" />
            <span>Upload Document</span>
          </Button>
          <Button variant="secondary" className="h-auto p-6 flex-col space-y-2">
            <Calendar className="h-6 w-6" />
            <span>Book Consultation</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{properties.length}</div>
              <p className="text-xs text-success">+1 this month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Compliant Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">1</div>
              <p className="text-xs text-muted-foreground">50% compliance rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Expiring Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">2</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Consultations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Scheduled this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Properties List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Your Properties
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New
                  </Button>
                </CardTitle>
                <CardDescription>
                  Manage and monitor your property portfolio
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {properties.map((property) => {
                  const StatusIcon = getStatusIcon(property.status);
                  return (
                    <div key={property.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                            <Building className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{property.name}</h3>
                            <p className="text-sm text-muted-foreground flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {property.address}
                            </p>
                          </div>
                        </div>
                        <Badge variant={getStatusColor(property.status)}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {property.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Documents</p>
                          <p className="font-medium">{property.documents} files</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Expiring Soon</p>
                          <p className="font-medium text-warning">{property.expiringDocs} docs</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Updated</p>
                          <p className="font-medium">{property.lastUpdated}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-border">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Compliance Progress</span>
                          <span className="text-sm font-medium">75%</span>
                        </div>
                        <Progress value={75} className="mt-1" />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Alerts */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 text-sm">
                    <div className={`h-2 w-2 rounded-full mt-2 ${
                      activity.type === 'success' ? 'bg-success' :
                      activity.type === 'warning' ? 'bg-warning' : 'bg-primary'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-muted-foreground truncate">{activity.item}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-warning">Urgent Alerts</CardTitle>
                <CardDescription>Items requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <AlertTriangle className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium">Khajna Payment Due</p>
                      <p className="text-sm text-muted-foreground">Commercial Plot - Chittagong</p>
                      <p className="text-xs text-warning">Due in 5 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg border border-warning/20">
                    <FileText className="h-5 w-5 text-warning" />
                    <div className="flex-1">
                      <p className="font-medium">Document Expiring</p>
                      <p className="text-sm text-muted-foreground">Property Tax Certificate</p>
                      <p className="text-xs text-warning">Expires in 2 weeks</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;