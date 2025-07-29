import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Calendar, DollarSign, FileText, Download, Eye, AlertCircle, CheckCircle, Upload, Home, Receipt, Users, Map, Edit, Compass, ScrollText, Gavel } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PropertyMap from "@/components/PropertyMap";

const PropertyDetails = () => {
  const navigate = useNavigate();

  // Dummy property data
  const propertyData = {
    id: "PROP-2024-001",
    name: "Green Valley Residential Plot",
    type: "Residential Plot",
    address: "Block A, Plot 123, Dhanmondi, Dhaka-1205, Bangladesh",
    description: "Prime residential plot located in the heart of Dhanmondi. This 5 katha plot is perfect for building a family home with excellent connectivity to schools, hospitals, and shopping centers.",
    area: "5 Katha (3,350 sq ft)",
    currentValue: "৳85,00,000",
    purchaseValue: "৳65,00,000",
    purchaseDate: "2023-03-15",
    coordinates: { lat: 23.7465, lng: 90.3763 }
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

  // Document status with dummy data
  const documentStatus = [
    {
      id: "deed",
      name: "Deed (দলিল)",
      description: "Property ownership document",
      status: "uploaded",
      files: [
        { name: "property_deed_original.pdf", size: "2.3 MB", uploadDate: "2024-01-15" },
        { name: "deed_translation.pdf", size: "1.8 MB", uploadDate: "2024-01-15" }
      ],
      details: {
        deedNumber: "DD-2023-04567",
        registrationDate: "2023-03-20",
        purchaseValue: "৳65,00,000",
        currentMarketValue: "৳85,00,000",
        registrationOffice: "Dhanmondi Sub-Registry Office"
      }
    },
    {
      id: "khajna",
      name: "Khajna (খাজনা)",
      description: "Land revenue receipt",
      status: "uploaded",
      files: [
        { name: "khajna_receipt_2024.pdf", size: "0.8 MB", uploadDate: "2024-01-10" }
      ],
      details: {
        receiptNumber: "KR-2024-001234",
        expiryDate: "2024-12-31",
        amount: "৳12,500",
        fiscalYear: "2024-25"
      }
    },
    {
      id: "naamjari",
      name: "Naam Jari (নাম জারি)",
      description: "Name transfer document",
      status: "uploaded",
      files: [
        { name: "naamjari_certificate.pdf", size: "1.5 MB", uploadDate: "2024-01-08" }
      ],
      details: {
        applicationNumber: "NJ-2023-005678",
        approvalDate: "2023-04-15",
        transferFromName: "Md. Abdul Rahman",
        transferToName: "Md. Karim Uddin"
      }
    },
    {
      id: "porcha",
      name: "Porcha (পর্চা)",
      description: "Land ownership record",
      status: "missing",
      files: [],
      details: {}
    },
    {
      id: "mutation",
      name: "Mutation (মিউটেশন)",
      description: "Land record change",
      status: "missing",
      files: [],
      details: {}
    },
    {
      id: "survey",
      name: "Survey Settlement (সার্ভে সেটেলমেন্ট)",
      description: "Land survey document",
      status: "uploaded",
      files: [
        { name: "survey_settlement_2020.pdf", size: "3.2 MB", uploadDate: "2024-01-12" }
      ],
      details: {
        surveyNumber: "SS-2020-009876",
        settlementYear: "2020",
        landClass: "Residential",
        surveyorName: "Bangladesh Survey Department"
      }
    },
    {
      id: "will",
      name: "Will (উইল)",
      description: "Inheritance document",
      status: "missing",
      files: [],
      details: {}
    },
    {
      id: "powerOfAttorney",
      name: "Power of Attorney (পাওয়ার অফ এটর্নি)",
      description: "Legal authority document",
      status: "missing",
      files: [],
      details: {}
    }
  ];

  const uploadedDocuments = documentStatus.filter(doc => doc.status === "uploaded");
  const missingDocuments = documentStatus.filter(doc => doc.status === "missing");

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
              <h1 className="text-xl font-semibold text-white">{propertyData.name}</h1>
              <p className="text-sm text-gray-300">Property ID: {propertyData.id}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
              <Edit className="h-4 w-4 mr-2" />
              Edit Property
            </Button>
            <Button variant="hero" className="bg-primary hover:bg-primary/90">
              Generate Report
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Property Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Property Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-400">Property Type</label>
                    <p className="text-white font-medium">{propertyData.type}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Area</label>
                    <p className="text-white font-medium">{propertyData.area}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Purchase Value</label>
                    <p className="text-white font-medium">{propertyData.purchaseValue}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Current Market Value</label>
                    <p className="text-white font-medium">{propertyData.currentValue}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-gray-400">Address</label>
                  <div className="flex items-center mt-1">
                    <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-white">{propertyData.address}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Description</label>
                  <p className="text-white mt-1">{propertyData.description}</p>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Purchase Date</label>
                  <div className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <p className="text-white">{propertyData.purchaseDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Uploaded Documents */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-white">Uploaded Documents</CardTitle>
                  <Badge variant="default" className="bg-green-600 text-white">
                    {uploadedDocuments.length} of {documentStatus.length} Complete
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedDocuments.map((doc) => {
                  const IconComponent = getDocumentIcon(doc.id);
                  return (
                    <div key={doc.id} className="border border-white/10 rounded-lg p-4 bg-white/5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <IconComponent className="h-6 w-6 text-white" />
                          <div>
                            <h4 className="font-medium text-white">{doc.name}</h4>
                            <p className="text-sm text-gray-400">{doc.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-green-400 border-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Uploaded
                        </Badge>
                      </div>

                      {/* Document Details */}
                      {Object.keys(doc.details).length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          {Object.entries(doc.details).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-400">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}: </span>
                              <span className="text-white">{value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Files */}
                      <div className="space-y-2">
                        {doc.files.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white/5 rounded p-2">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <div>
                                <p className="text-sm text-white">{file.name}</p>
                                <p className="text-xs text-gray-400">{file.size} • Uploaded {file.uploadDate}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Status Summary */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Document Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Completion Progress</span>
                  <span className="text-sm text-white">{uploadedDocuments.length}/{documentStatus.length}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(uploadedDocuments.length / documentStatus.length) * 100}%` }}
                  ></div>
                </div>
                
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-white">Uploaded</span>
                    </div>
                    <span className="text-sm text-green-400">{uploadedDocuments.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <span className="text-sm text-white">Missing</span>
                    </div>
                    <span className="text-sm text-red-400">{missingDocuments.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Missing Documents */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Missing Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {missingDocuments.map((doc) => {
                  const IconComponent = getDocumentIcon(doc.id);
                  return (
                    <div key={doc.id} className="border border-red-400/20 rounded-lg p-3 bg-red-400/5">
                      <div className="flex items-center space-x-3">
                        <IconComponent className="h-5 w-5 text-red-400" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-white">{doc.name}</h4>
                          <p className="text-xs text-gray-400">{doc.description}</p>
                        </div>
                        <AlertCircle className="h-4 w-4 text-red-400" />
                      </div>
                    </div>
                  );
                })}
                
                <Button className="w-full mt-4 bg-orange-600 hover:bg-orange-700 text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Missing Documents
                </Button>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="rounded-xl border border-white/10" style={{
              background: '#001731',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }}>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-white">Location</CardTitle>
              </CardHeader>
              <CardContent>
                <PropertyMap 
                  coordinates={propertyData.coordinates}
                  address={propertyData.address}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;