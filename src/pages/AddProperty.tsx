import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Upload, ArrowLeft, MapPin, FileText, Calendar, DollarSign } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const navigate = useNavigate();
  const [selectedDocumentType, setSelectedDocumentType] = useState("");

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
      fields: ["deedNumber", "registrationDate", "propertyValue", "registrationOffice"]
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
      propertyValue: "Property Value (৳)",
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
                <Tabs value={selectedDocumentType} onValueChange={setSelectedDocumentType}>
                  <TabsList className="grid grid-cols-2 gap-1 bg-white/5 p-1">
                    {documentTypes.slice(0, 8).map((doc) => (
                      <TabsTrigger 
                        key={doc.id} 
                        value={doc.id}
                        className="text-xs text-white data-[state=active]:bg-primary data-[state=active]:text-white"
                      >
                        {doc.name.split(' ')[0]}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {documentTypes.map((doc) => (
                    <TabsContent key={doc.id} value={doc.id} className="mt-4">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-white">{doc.name}</h3>
                            <p className="text-sm text-gray-400">{doc.description}</p>
                          </div>
                          <Badge variant="outline" className="text-white border-white/20">
                            Required
                          </Badge>
                        </div>

                        {/* Document Fields */}
                        <div className="grid grid-cols-1 gap-3">
                          {doc.fields.map((field) => (
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
                            <p className="text-sm text-white mb-1">Upload {doc.name}</p>
                            <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                            <Button variant="outline" size="sm" className="mt-3 text-white border-white/20 hover:bg-white/10">
                              Choose File
                            </Button>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;