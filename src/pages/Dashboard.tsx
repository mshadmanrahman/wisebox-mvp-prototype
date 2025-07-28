import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Building, Plus, Search, Bell, User, ChevronLeft, ChevronRight, FileText, Settings, MessageSquare, BarChart3, Calendar as CalendarIcon, Clock, MapPin, TrendingUp, TrendingDown, ExternalLink } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
const Dashboard = () => {
  const {
    user
  } = useAuth();
  const [currentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data for the exact layout
  const netWorthData = [{
    name: "Purbanchal Plot 17, Road 8, Block F",
    type: "Land",
    value: "$400,024.92",
    change: "+4.5% YoY",
    isPositive: true
  }, {
    name: "House 17, Road 14, Sector 13, Uttara",
    type: "Apartment",
    value: "$90,952.52",
    change: "-1.3% YoY",
    isPositive: false
  }];
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
  return <div className="min-h-screen text-foreground" style={{
    background: 'linear-gradient(180deg, #001731 0%, #002B5E 100%)'
  }}>
      {/* Top Navigation */}
      <header className="border-b border-border">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <img src="/lovable-uploads/6e9b6655-3299-407b-b223-68cb733da78d.png" alt="Wisebox" className="h-8 w-8" />
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
              <Input placeholder="Search..." className="pl-10 w-64" />
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
        <aside className="w-64 border-r border-border/20 h-[calc(100vh-73px)] p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-1">Hi Shadman!</h1>
            <p className="text-sm text-muted-foreground">Sunday, July 27</p>
          </div>
          
          <nav className="space-y-1">
            <Button variant="ghost" className="w-full justify-start text-[#002B5E] font-medium bg-transparent hover:bg-transparent">
              <BarChart3 className="h-4 w-4 mr-3" />
              Snapshot
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-gray-100">
              <Building className="h-4 w-4 mr-3" />
              My Properties
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-gray-100">
              <FileText className="h-4 w-4 mr-3" />
              Documents
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-gray-100">
              <Settings className="h-4 w-4 mr-3" />
              Services
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-gray-100">
              <BarChart3 className="h-4 w-4 mr-3" />
              Accounting
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-gray-100">
              <FileText className="h-4 w-4 mr-3" />
              Compliance
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-gray-100">
              <Settings className="h-4 w-4 mr-3" />
              More
            </Button>
          </nav>

          <div className="mt-8">
            <Button variant="outline" className="w-full text-[#002B5E] border-gray-200 bg-gray-50 hover:bg-gray-100">
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
                      <CardTitle className="text-lg font-semibold" style={{
                      color: '#002B5E'
                    }}>Net Worth</CardTitle>
                      <p className="text-sm text-neutral-500">Based on our current valuation data.</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Request Appraisal
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm font-medium text-slate-900">
                    <div>Property</div>
                    <div className="text-right">Estimated Value</div>
                  </div>
                  {netWorthData.map((property, index) => <div key={index} className="grid grid-cols-2 gap-4 py-3 border-t border-gray-200">
                      <div>
                        <p className="font-medium text-slate-900">{property.name}</p>
                        <p className="text-sm text-slate-600">{property.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{property.value}</p>
                        <p className={`text-sm ${property.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {property.change}
                        </p>
                      </div>
                    </div>)}
                </CardContent>
              </Card>

              {/* Property Facts Card */}
              <Card className="mt-6 rounded-xl border border-white/10 border-t-white/10" style={{
              height: '298px',
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
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
                      <p className="text-sm text-[#4cdff2]">{propertyFacts.ownership.date}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Taxation</p>
                      <p className="text-sm text-[#4cdff2]">{propertyFacts.taxation.status}</p>
                      <p className="text-xs text-muted-foreground">Khazna payed on</p>
                      <p className="text-xs text-muted-foreground">{propertyFacts.taxation.lastPaid}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-foreground">Owner</p>
                      <p className="text-sm text-[#4cdff2]">{propertyFacts.ownership.owner}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Document status</p>
                      <p className="text-sm text-[#4cdff2]">{propertyFacts.documents.uploaded}</p>
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
              <Card className="rounded-xl border border-white/10 border-t-white/10" style={{
              height: '298px',
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
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
              <div className="rounded-xl border border-white/10 p-6" style={{
                background: '#001731',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
              }}>
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[#FAFAFA]">Consultation</span>
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                
                {/* Description */}
                <div className="mb-4">
                  <span className="text-xs text-[#A3A3A3] font-normal leading-4">
                    You have one free consultation left this month. Schedule today to book your spot.
                  </span>
                </div>

                {/* Custom Calendar */}
                <div className="p-3 rounded-xl border border-white/10" style={{
                  background: '#001731',
                  borderTop: '1px solid #FFFFFF1A'
                }}>
                  {/* Calendar Header */}
                  <div className="flex items-center justify-between mb-4 relative">
                    <button className="w-8 h-8 p-2.5 rounded-lg flex items-center justify-center absolute left-0">
                      <ChevronLeft className="h-4 w-4 text-white" />
                    </button>
                    <button className="w-8 h-8 p-2.5 rounded-lg flex items-center justify-center absolute right-0">
                      <ChevronRight className="h-4 w-4 text-white" />
                    </button>
                    <span className="text-sm font-medium text-white mx-auto">January 2025</span>
                  </div>

                  {/* Calendar Grid */}
                  <div className="space-y-2">
                    {/* Day Headers */}
                    <div className="grid grid-cols-7 gap-0">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
                        <div key={day} className="w-8 h-5 rounded-lg flex items-center justify-center">
                          <span className="text-xs text-[#A3A3A3] font-normal leading-4">{day}</span>
                        </div>
                      ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="grid grid-cols-7 gap-0">
                      {/* Week 1 */}
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-[#A3A3A3] font-normal leading-5">30</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">1</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">2</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">3</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">4</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">5</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">6</span>
                      </button>

                      {/* Week 2 */}
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">7</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">8</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">9</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'white' }}>
                        <span className="text-sm font-normal leading-5" style={{ color: '#001731' }}>10</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">11</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">12</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">13</span>
                      </button>

                      {/* Week 3 */}
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">14</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">15</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">16</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">17</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">18</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">19</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">20</span>
                      </button>

                      {/* Week 4 */}
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">21</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">22</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">23</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#002B5E' }}>
                        <span className="text-sm font-normal leading-5" style={{ color: '#EDEFF7' }}>24</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">25</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">26</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">27</span>
                      </button>

                      {/* Week 5 */}
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">28</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">29</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">30</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-white font-normal leading-5">31</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-[#A3A3A3] font-normal leading-5">1</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-[#A3A3A3] font-normal leading-5">2</span>
                      </button>
                      <button className="w-8 h-8 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-[#A3A3A3] font-normal leading-5">3</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Timezone Section */}
                <div className="px-4 py-2 mt-2">
                  <div className="space-y-1">
                    <span className="text-xs text-[#A3A3A3] font-normal leading-3">Time zone</span>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-[#A3A3A3]" />
                      <span className="text-xs text-[#FAFAFA] font-medium leading-4">Eastern Standard Time</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="py-4 px-6" style={{
      borderTop: '0.5px solid #FFFFFF1A'
    }}>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p style={{
          color: '#6B7280'
        }}>© 2025 WiseBox. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="font-sans font-medium text-xs tracking-normal align-middle" style={{
            color: '#1C70EA'
          }}>Privacy Policy</Button>
            <Button variant="ghost" size="sm" className="font-sans font-medium text-xs tracking-normal align-middle" style={{
            color: '#1C70EA'
          }}>Terms of Service</Button>
            <Button variant="ghost" size="sm" className="font-sans font-medium text-xs tracking-normal align-middle" style={{
            color: '#1C70EA'
          }}>Help Center</Button>
          </div>
        </div>
      </footer>
    </div>;
};
export default Dashboard;