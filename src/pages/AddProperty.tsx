import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowLeft, MapPin, FileText, Calendar, DollarSign, UserCheck, Clock, Phone, ChevronLeft, ChevronRight, Home, Receipt, Users, Map, Edit, Compass, ScrollText, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
  const [selectedDocumentType, setSelectedDocumentType] = useState("deed");
  const [uploadedFiles, setUploadedFiles] = useState<{[key: string]: File[]}>({});
  const fileInputRefs = useRef<{[key: string]: HTMLInputElement | null}>({});
  const [selectedConsultationDate, setSelectedConsultationDate] = useState<number | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");

  const propertyTypes = [
    "Residential Plot",
    "Commercial Plot", 
    "Agricultural Land",
    "Apartment/Flat",
    "House",
    "Shop/Commercial Space",
    "Industrial Land",
    "Pond/Water Body"
  ];

  const documentTypes = [
    { 
      id: "deed", 
      name: "Deed (দলিল)", 
      description: "Property ownership document",
      fields: ["deedNumber", "registrationDate", "purchaseValue", "currentMarketValue", "registrationOffice"]
    },
    { 
      id: "khajna", 
      name: "Khajna (খাজনা)", 
      description: "Land revenue receipt",
      fields: ["receiptNumber", "expiryDate", "amount", "fiscalYear"]
    },
    { 
      id: "naamjari", 
      name: "Naam Jari (নাম জারি)", 
      description: "Name transfer document",
      fields: ["applicationNumber", "approvalDate", "transferFromName", "transferToName"]
    },
    { 
      id: "porcha", 
      name: "Porcha (পর্চা)", 
      description: "Land ownership record",
      fields: ["porchaNumber", "khatianNumber", "dagNumber", "landArea"]
    },
    { 
      id: "mutation", 
      name: "Mutation (মিউটেশন)", 
      description: "Land record change",
      fields: ["caseNumber", "applicationDate", "approvalDate", "reason"]
    },
    { 
      id: "survey", 
      name: "Survey Settlement (সার্ভে সেটেলমেন্ট)", 
      description: "Land survey document",
      fields: ["surveyNumber", "settlementYear", "landClass", "surveyorName"]
    },
    { 
      id: "will", 
      name: "Will (উইল)", 
      description: "Inheritance document",
      fields: ["willDate", "executorName", "witnessNames", "registrationStatus"]
    },
    { 
      id: "powerOfAttorney", 
      name: "Power of Attorney (পাওয়ার অফ এটর্নি)", 
      description: "Legal authority document",
      fields: ["grantorName", "granteeName", "grantDate", "scope"]
    }
  ];

  const getFieldLabel = (field: string) => {
    const labels: { [key: string]: string } = {
      deedNumber: "Deed Number",
      registrationDate: "Registration Date",
      purchaseValue: "Purchase Value (৳)",
      currentMarketValue: "Current Market Value (৳)",
      registrationOffice: "Registration Office",
      receiptNumber: "Receipt Number",
      expiryDate: "Expiry Date",
      amount: "Amount (৳)",
      fiscalYear: "Fiscal Year",
      applicationNumber: "Application Number",
      approvalDate: "Approval Date",
      transferFromName: "Transfer From (Name)",
      transferToName: "Transfer To (Name)",
      porchaNumber: "Porcha Number",
      khatianNumber: "Khatian Number",
      dagNumber: "Dag Number",
      landArea: "Land Area (decimal)",
      caseNumber: "Case Number",
      applicationDate: "Application Date",
      reason: "Reason for Mutation",
      surveyNumber: "Survey Number",
      settlementYear: "Settlement Year",
      landClass: "Land Class",
      surveyorName: "Surveyor Name",
      willDate: "Will Date",
      executorName: "Executor Name",
      witnessNames: "Witness Names",
      registrationStatus: "Registration Status",
      grantorName: "Grantor Name",
      granteeName: "Grantee Name",
      grantDate: "Grant Date",
      scope: "Scope of Authority"
    };
    return labels[field] || field;
  };

  const getFieldType = (field: string) => {
    if (field.includes("Date") || field.includes("Year")) return "date";
    if (field.includes("Value") || field.includes("Amount") || field.includes("Area")) return "number";
    return "text";
  };

  const getDocumentIcon = (docId: string) => {
    const iconMap: { [key: string]: React.ComponentType<any> } = {
      deed: Home,
      khajna: Receipt,
      naamjari: Users,
      porcha: Map,
      mutation: Edit,
      survey: Compass,
      will: ScrollText,
      powerOfAttorney: Gavel
    };
    return iconMap[docId] || FileText;
  };

  const handleFileUpload = (documentType: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setUploadedFiles(prev => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), ...Array.from(files)]
      }));
    }
  };

  const triggerFileUpload = (documentType: string) => {
    fileInputRefs.current[documentType]?.click();
  };

  const removeFile = (documentType: string, fileIndex: number) => {
    setUploadedFiles(prev => ({
      ...prev,
      [documentType]: prev[documentType]?.filter((_, index) => index !== fileIndex) || []
    }));
  };

  const timeSlots = [
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM", 
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM"
  ];

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
    setSelectedConsultationDate(null);
    setSelectedTimeSlot("");
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay();
    
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
    
    // Add next month's leading days
    const remainingSlots = 42 - days.length;
    for (let day = 1; day <= remainingSlots && days.length < 42; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isNextMonth: true
      });
    }
    
    return days;
  };

  const handleBookConsultation = () => {
    if (!selectedConsultationDate || !selectedTimeSlot) {
      alert("Please select both date and time slot");
      return;
    }
    const selectedDate = `${formatMonth(currentMonth)} ${selectedConsultationDate}`;
    alert(`Consultation booked for ${selectedDate} at ${selectedTimeSlot}`);
  };

  return (
    <div className="min-h-screen text-foreground" style={{
      background: 'linear-gradient(180deg, #001731 0%, #002B5E 100%)'
    }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-white">Add New Property</h1>
              <p className="text-sm text-gray-300">Create a new property record with documents</p>
            </div>
          </div>
          <Button variant="hero" className="bg-primary hover:bg-primary/90">
            Save Property
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Property Details */}
          <div className="space-y-6">
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="propertyName" className="text-white">Property Name</Label>
                  <Input id="propertyName" className="mt-1 bg-white/5 border-white/20 text-white" placeholder="Enter property name" />
                </div>
                
                <div>
                  <Label htmlFor="propertyType" className="text-white">Property Type</Label>
                  <Select>
                    <SelectTrigger className="mt-1 bg-white/5 border-white/20 text-white">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-white/20">
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-white/10">
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address" className="text-white">Address</Label>
                  <div className="relative mt-1">
                    <Input 
                      id="address" 
                      className="bg-white/5 border-white/20 text-white pl-10" 
                      placeholder="Enter property address" 
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Address will be located on Google Maps</p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-white">Description</Label>
                  <Textarea 
                    id="description" 
                    className="mt-1 bg-white/5 border-white/20 text-white" 
                    placeholder="Enter property description"
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-white/5 rounded-lg border border-white/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400">Map will be displayed here</p>
                    <p className="text-xs text-gray-500">Based on entered address</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Upload */}
          <div className="space-y-6">
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Property Documents</CardTitle>
                <p className="text-sm text-gray-300">Upload and manage property-related documents</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Document Type Selection Cards */}
                  <div>
                    <h3 className="text-white font-medium mb-4">Select Document Type</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                      {documentTypes.map((doc) => (
                        <Card
                          key={doc.id}
                          className={`cursor-pointer transition-all duration-200 border-2 ${
                            selectedDocumentType === doc.id
                              ? 'border-primary bg-primary/10'
                              : 'border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30'
                          }`}
                          onClick={() => setSelectedDocumentType(doc.id)}
                        >
                          <CardContent className="p-3">
                            <div className="text-center">
                              {(() => {
                                const IconComponent = getDocumentIcon(doc.id);
                                return (
                                  <IconComponent className={`h-6 w-6 mx-auto mb-2 ${
                                    selectedDocumentType === doc.id ? 'text-primary' : 'text-gray-400'
                                  }`} />
                                );
                              })()}
                              <h4 className={`text-sm font-medium mb-1 ${
                                selectedDocumentType === doc.id ? 'text-primary' : 'text-white'
                              }`}>
                                {doc.name}
                              </h4>
                              <p className="text-xs text-gray-400 leading-tight">
                                {doc.description}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  {/* Selected Document Form */}
                  {(() => {
                    const selectedDoc = documentTypes.find(doc => doc.id === selectedDocumentType);
                    if (!selectedDoc) return null;
                    
                    return (
                      <div className="space-y-4 border border-white/20 rounded-lg p-6 bg-white/5">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-white">{selectedDoc.name}</h3>
                            <p className="text-sm text-gray-400">{selectedDoc.description}</p>
                          </div>
                          <Badge variant="outline" className="text-white border-white/20">
                            Required
                          </Badge>
                        </div>

                        {/* Document Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {selectedDoc.fields.map((field) => (
                            <div key={field}>
                              <Label htmlFor={field} className="text-white text-sm">
                                {getFieldLabel(field)}
                              </Label>
                              <Input 
                                id={field}
                                type={getFieldType(field)}
                                className="mt-1 bg-white/5 border-white/20 text-white"
                                placeholder={`Enter ${getFieldLabel(field).toLowerCase()}`}
                              />
                            </div>
                          ))}
                        </div>

                        {/* File Upload */}
                        <div className="border-2 border-dashed border-white/20 rounded-lg p-6">
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-white mb-1">Upload {selectedDoc.name}</p>
                            <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-3 text-white border-white/20 hover:bg-white/10"
                              onClick={() => triggerFileUpload(selectedDoc.id)}
                            >
                              Choose File
                            </Button>
                            <input
                              ref={(el) => fileInputRefs.current[selectedDoc.id] = el}
                              type="file"
                              accept=".pdf,.jpg,.jpeg,.png"
                              multiple
                              onChange={(e) => handleFileUpload(selectedDoc.id, e)}
                              style={{ display: 'none' }}
                            />
                          </div>
                          
                          {/* Display uploaded files */}
                          {uploadedFiles[selectedDoc.id] && uploadedFiles[selectedDoc.id].length > 0 && (
                            <div className="mt-4 space-y-2">
                              <p className="text-sm text-white font-medium">Uploaded Files:</p>
                              {uploadedFiles[selectedDoc.id].map((file, index) => (
                                <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                                  <span className="text-sm text-white">{file.name}</span>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => removeFile(selectedDoc.id, index)}
                                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </CardContent>
            </Card>
            
            {/* Document Verification Service */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white flex items-center">
                  <UserCheck className="h-5 w-5 mr-2" />
                  Verify Documents
                </CardTitle>
                <p className="text-sm text-gray-300">Book a consultation with our experts to verify your property documents</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Calendar Interface */}
                  <div className="p-4 rounded-xl border border-white/10" style={{
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
                            <span className="text-xs text-gray-400 font-normal">{day}</span>
                          </div>
                        ))}
                      </div>

                      {/* Calendar Days */}
                      <div className="grid grid-cols-7 gap-0">
                        {generateCalendarDays().map((dayObj, index) => {
                          const isSelected = dayObj.isCurrentMonth && selectedConsultationDate === dayObj.day;
                          const isPastDate = dayObj.isCurrentMonth && 
                            new Date(currentMonth.getFullYear(), currentMonth.getMonth(), dayObj.day) < new Date();
                          
                          return (
                            <button 
                              key={index}
                              onClick={() => {
                                if (dayObj.isCurrentMonth && !isPastDate) {
                                  setSelectedConsultationDate(dayObj.day);
                                  setSelectedTimeSlot(""); // Reset time slot when date changes
                                }
                              }}
                              disabled={!dayObj.isCurrentMonth || isPastDate}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-normal transition-colors
                                ${isSelected 
                                  ? 'bg-blue-600 text-white' 
                                  : dayObj.isCurrentMonth 
                                    ? isPastDate 
                                      ? 'text-gray-600 cursor-not-allowed'
                                      : 'text-white hover:bg-white/10' 
                                    : 'text-gray-600'
                                }`}
                            >
                              {dayObj.day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Time Slots - Show only when date is selected */}
                  {selectedConsultationDate && (
                    <div className="space-y-3">
                      <Label className="text-white text-sm font-medium">
                        Available Time Slots for {formatMonth(currentMonth)} {selectedConsultationDate}
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`p-2 rounded-lg text-sm border transition-colors ${
                              selectedTimeSlot === slot
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'border-white/20 text-white hover:bg-white/10'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-white">30-minute consultation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-white">Video/Phone call</span>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400/30">
                      Free
                    </Badge>
                  </div>

                  <Button 
                    onClick={handleBookConsultation}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={!selectedConsultationDate || !selectedTimeSlot}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Free Consultation
                  </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;