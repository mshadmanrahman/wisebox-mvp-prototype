import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Building, Plus, Search, Bell, User, ChevronLeft, ChevronRight, FileText, Settings, MessageSquare, BarChart3, Calendar as CalendarIcon, Clock, MapPin, TrendingUp, TrendingDown, ExternalLink, Home, Receipt, Users, ScrollText, Map, Compass, Gavel, Video, Languages, Shield, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentDate] = useState(new Date());
  const [selectedConsultationDate, setSelectedConsultationDate] = useState<number>(10);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 0)); // January 2025
  const [activeTab, setActiveTab] = useState('snapshot');
  
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
    setSelectedConsultationDate(1); // Reset selection when changing months
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  // Generate calendar days for the current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of month and how many days in month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay(); // 0 = Sunday
    
    // Get previous month's last few days
    const prevMonth = new Date(year, month - 1, 0);
    const daysInPrevMonth = prevMonth.getDate();
    
    const days = [];
    
    // Add previous month's trailing days
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        isNextMonth: false
      });
    }
    
    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isNextMonth: false
      });
    }
    
    // Add next month's leading days to complete the grid
    const remainingSlots = 42 - days.length; // 6 weeks × 7 days
    for (let day = 1; day <= remainingSlots && days.length < 42; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }
    
    return days;
  };

  // Mock data for the exact layout
  const netWorthData = [{
    id: "PROP-2024-001",
    name: "Purbanchal Plot 17, Road 8, Block F",
    type: "Land",
    value: "$400,024.92",
    change: "+4.5% YoY",
    isPositive: true
  }, {
    id: "PROP-2024-002",
    name: "House 17, Road 14, Sector 13, Uttara",
    type: "Apartment",
    value: "$90,952.52",
    change: "-1.3% YoY",
    isPositive: false
  }];

  // Mock data for properties, documents, and services
  const mockProperties = [
    {
      id: "PROP-2024-001",
      name: "Purbanchal Plot 17, Road 8, Block F",
      type: "Land",
      value: "$400,024.92",
      location: "Purbanchal, Dhaka",
      status: "Verified",
      documentsUploaded: 6,
      totalDocuments: 8
    },
    {
      id: "PROP-2024-002", 
      name: "House 17, Road 14, Sector 13, Uttara",
      type: "Apartment",
      value: "$90,952.52",
      location: "Uttara, Dhaka",
      status: "Pending Verification",
      documentsUploaded: 4,
      totalDocuments: 8
    }
  ];

  const mockDocuments = [
    { id: "deed-001", name: "Deed (দলিল)", property: "Purbanchal Plot", status: "uploaded", uploadDate: "2024-01-15" },
    { id: "khajna-001", name: "Khajna Receipt (খাজনা রসিদ)", property: "Purbanchal Plot", status: "uploaded", uploadDate: "2024-01-10" },
    { id: "naamjari-001", name: "Naam Jari/Mutation (নাম জারি/মিউটেশন)", property: "Purbanchal Plot", status: "uploaded", uploadDate: "2024-01-08" },
    { id: "porcha-001", name: "Porcha (পর্চা)", property: "Purbanchal Plot", status: "missing", uploadDate: null },
    { id: "deed-002", name: "Deed (দলিল)", property: "Uttara House", status: "uploaded", uploadDate: "2024-01-12" },
    { id: "survey-002", name: "Survey (সার্ভে)", property: "Uttara House", status: "missing", uploadDate: null }
  ];

  const mockServices = [
    {
      id: "translation",
      name: "Document Translation",
      description: "Professional translation of legal documents",
      icon: Languages,
      price: "৳500 - ৳2000",
      category: "Documents"
    },
    {
      id: "verification",
      name: "Property Verification",
      description: "Comprehensive property verification service",
      icon: Shield,
      price: "৳5000 - ৳15000",
      category: "Verification"
    },
    {
      id: "free-consultation",
      name: "Free Consultation",
      description: "30-minute video call with legal expert",
      icon: Video,
      price: "Free",
      category: "Consultation"
    },
    {
      id: "paid-consultation",
      name: "Premium Consultation",
      description: "60-minute detailed legal consultation",
      icon: Video,
      price: "৳3000",
      category: "Consultation"
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
    <div className="min-h-screen text-foreground" style={{
      background: 'linear-gradient(180deg, #001731 0%, #002B5E 100%)'
    }}>
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
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
              <div 
                className="h-9 px-3 py-1 rounded-lg border inline-flex items-center gap-1 w-64"
                style={{ 
                  background: 'rgba(255, 255, 255, 0.05)',
                  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                  borderColor: 'rgba(255, 255, 255, 0.15)'
                }}
              >
                <Search className="h-4 w-4" style={{ color: '#A3A3A3' }} />
                <span 
                  className="text-sm"
                  style={{ 
                    color: '#A3A3A3',
                    fontFamily: 'IBM Plex Sans',
                    fontWeight: 400,
                    lineHeight: '20px'
                  }}
                >
                  Search...
                </span>
              </div>
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
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-medium bg-transparent hover:bg-white/10 ${
                activeTab === 'snapshot' ? 'text-white' : 'text-gray-500 hover:text-white'
              }`}
              onClick={() => setActiveTab('snapshot')}
            >
              <BarChart3 className={`h-4 w-4 mr-3 ${activeTab === 'snapshot' ? 'text-white' : 'text-gray-500'}`} />
              Snapshot
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-normal bg-transparent hover:bg-white/10 ${
                activeTab === 'properties' ? 'text-white' : 'text-gray-500 hover:text-white'
              }`}
              onClick={() => setActiveTab('properties')}
            >
              <Building className={`h-4 w-4 mr-3 ${activeTab === 'properties' ? 'text-white' : 'text-gray-500'}`} />
              My Properties
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-normal bg-transparent hover:bg-white/10 ${
                activeTab === 'documents' ? 'text-white' : 'text-gray-500 hover:text-white'
              }`}
              onClick={() => setActiveTab('documents')}
            >
              <FileText className={`h-4 w-4 mr-3 ${activeTab === 'documents' ? 'text-white' : 'text-gray-500'}`} />
              Documents
            </Button>
            <Button 
              variant="ghost" 
              className={`w-full justify-start font-normal bg-transparent hover:bg-white/10 ${
                activeTab === 'services' ? 'text-white' : 'text-gray-500 hover:text-white'
              }`}
              onClick={() => setActiveTab('services')}
            >
              <Settings className={`h-4 w-4 mr-3 ${activeTab === 'services' ? 'text-white' : 'text-gray-500'}`} />
              Services
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-transparent hover:text-white group">
              <BarChart3 className="h-4 w-4 mr-3 text-gray-500 group-hover:text-white" />
              Accounting
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-transparent hover:text-white group">
              <FileText className="h-4 w-4 mr-3 text-gray-500 group-hover:text-white" />
              Compliance
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-500 font-normal bg-transparent hover:bg-transparent hover:text-white group">
              <Settings className="h-4 w-4 mr-3 text-gray-500 group-hover:text-white" />
              More
            </Button>
          </nav>

          <div className="mt-8">
            <Button 
              variant="outline" 
              className="w-full text-[#002B5E] border-gray-200 bg-gray-50 hover:bg-[#002B5E] hover:text-white hover:border-[#002B5E] group"
              onClick={() => window.location.href = '/add-property'}
            >
              <Plus className="h-4 w-4 mr-2 group-hover:text-white" />
              New Property
            </Button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'snapshot' && (
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
                      <button 
                        className="h-8 px-3 py-2 bg-slate-50 shadow-sm rounded-lg border border-gray-200 inline-flex justify-center items-center gap-2"
                        style={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}
                      >
                        <span className="text-xs font-medium leading-4" style={{ color: '#002B5E', fontFamily: 'IBM Plex Sans' }}>
                          Request Appraisal
                        </span>
                        <ExternalLink className="h-4 w-4" style={{ color: '#002B5E' }} />
                      </button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm font-medium text-slate-900">
                      <div>Property</div>
                      <div className="text-right">Estimated Value</div>
                    </div>
                    {netWorthData.map((property, index) => (
                      <div 
                        key={index} 
                        className="grid grid-cols-2 gap-4 py-3 border-t border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors rounded-lg px-2"
                        onClick={() => navigate(`/property/${property.id}`)}
                      >
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
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Property Facts Card */}
                <div className="mt-6 rounded-xl border border-white/10 p-6" style={{
                  height: '298px',
                  background: '#001731',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}>
                  {/* Header */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-[#FAFAFA]">Property Facts</span>
                      <div className="flex items-center space-x-2">
                        <button className="p-2">
                          <ChevronLeft className="h-4 w-4 text-white" />
                        </button>
                        <button className="p-2">
                          <ChevronRight className="h-4 w-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-[#A3A3A3]">Purbanchal Plot 17, Road 8, Block F</p>
                  </div>
                  
                  {/* Content Grid */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-white">Ownership Initiation</p>
                        <p className="text-sm text-[#4cdff2]">{propertyFacts.ownership.date}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Taxation</p>
                        <p className="text-sm text-[#4cdff2]">{propertyFacts.taxation.status}</p>
                        <p className="text-xs text-[#A3A3A3]">Khazna payed on</p>
                        <p className="text-xs text-[#A3A3A3]">{propertyFacts.taxation.lastPaid}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-white">Owner</p>
                        <p className="text-sm text-[#4cdff2]">{propertyFacts.ownership.owner}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">Document status</p>
                        <p className="text-sm text-[#4cdff2]">{propertyFacts.documents.uploaded}</p>
                        <p className="text-xs text-[#A3A3A3]">{propertyFacts.documents.status}</p>
                        <div className="flex space-x-2">
                          <button 
                            className="mt-2 px-3 py-1 text-xs border border-white/20 rounded-md text-white hover:bg-white/10"
                            onClick={() => window.location.href = '/property/PROP-2024-001'}
                          >
                            View Details
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </button>
                          <button className="mt-2 px-3 py-1 text-xs border border-white/20 rounded-md text-white hover:bg-white/10">
                            Verify Documents
                            <ExternalLink className="h-3 w-3 ml-1 inline" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="space-y-6">
                {/* Upcoming Fees Card */}
                <div className="rounded-xl border border-white/10 p-6" style={{
                  background: '#001731',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                }}>
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-[#FAFAFA]">Upcoming fees</span>
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-2">
                    <div className="text-2xl font-bold text-white">$830</div>
                    <div className="text-sm text-red-400">৳101,294.11</div>
                    <div className="text-xs text-[#A3A3A3]">Khazna due on September 20, 2025</div>
                  </div>
                </div>

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
                      <button 
                        onClick={() => navigateMonth('prev')}
                        className="w-8 h-8 p-2.5 rounded-lg flex items-center justify-center absolute left-0 hover:bg-white/10"
                      >
                        <ChevronLeft className="h-4 w-4 text-white" />
                      </button>
                      <button 
                        onClick={() => navigateMonth('next')}
                        className="w-8 h-8 p-2.5 rounded-lg flex items-center justify-center absolute right-0 hover:bg-white/10"
                      >
                        <ChevronRight className="h-4 w-4 text-white" />
                      </button>
                      <span className="text-sm font-medium text-white mx-auto">{formatMonth(currentMonth)}</span>
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
                        {generateCalendarDays().map((dayObj, index) => {
                          const isSelected = dayObj.isCurrentMonth && selectedConsultationDate === dayObj.day;
                          
                          return (
                            <button 
                              key={index}
                              onClick={() => dayObj.isCurrentMonth && setSelectedConsultationDate(dayObj.day)}
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={isSelected ? { background: 'white' } : {}}
                              disabled={!dayObj.isCurrentMonth}
                            >
                              <span 
                                className="text-sm font-normal leading-5"
                                style={{ 
                                  color: isSelected 
                                    ? '#001731' 
                                    : dayObj.isCurrentMonth 
                                      ? 'white' 
                                      : '#A3A3A3' 
                                }}
                              >
                                {dayObj.day}
                              </span>
                            </button>
                          );
                        })}
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
          )}
          
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">My Properties</h2>
              <div className="grid gap-4">
                {mockProperties.map((property) => (
                  <Card 
                    key={property.id} 
                    className="bg-white border border-border cursor-pointer hover:shadow-lg transition-shadow"
                    onClick={() => navigate(`/property/${property.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900">{property.name}</h3>
                          <p className="text-sm text-slate-600">{property.type} • {property.location}</p>
                          <p className="text-xl font-bold text-slate-900 mt-2">{property.value}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={property.status === 'Verified' ? 'default' : 'secondary'}>
                            {property.status}
                          </Badge>
                          <p className="text-sm text-slate-600 mt-2">
                            {property.documentsUploaded}/{property.totalDocuments} Documents
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">All Documents</h2>
              <div className="grid gap-4">
                {mockDocuments.map((doc) => (
                  <Card key={doc.id} className="bg-white border border-border">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            doc.status === 'uploaded' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {doc.status === 'uploaded' ? (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            ) : (
                              <FileText className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-900">{doc.name}</h3>
                            <p className="text-sm text-slate-600">{doc.property}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={doc.status === 'uploaded' ? 'default' : 'destructive'}>
                            {doc.status === 'uploaded' ? 'Uploaded' : 'Missing'}
                          </Badge>
                          {doc.uploadDate && (
                            <p className="text-sm text-slate-600 mt-1">{doc.uploadDate}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white">Available Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockServices.map((service) => (
                  <Card key={service.id} className="bg-white border border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-slate-900">{service.name}</h3>
                          <p className="text-sm text-slate-600 mb-2">{service.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline">{service.category}</Badge>
                            <p className="font-medium text-slate-900">{service.price}</p>
                          </div>
                          <Button 
                            className="w-full mt-4" 
                            onClick={() => {
                              if (service.id.includes('consultation')) {
                                // For consultations, could integrate with video call service
                                alert(`Booking ${service.name} - Video consultation feature coming soon!`);
                              } else {
                                alert(`Requesting ${service.name} - Service booking feature coming soon!`);
                              }
                            }}
                          >
                            {service.id.includes('consultation') ? 'Schedule Call' : 'Request Service'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
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
    </div>
  );
};

export default Dashboard;