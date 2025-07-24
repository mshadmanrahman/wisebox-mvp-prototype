import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Upload, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  type: string;
  file?: File;
  expiryDate?: Date;
  notes?: string;
}

const PROPERTY_TYPES = [
  "Residential",
  "Commercial", 
  "Industrial",
  "Agricultural",
  "Mixed Use"
];

const DOCUMENT_TYPES = [
  { value: "will", label: "Will", hasExpiry: false },
  { value: "deed", label: "Deed", hasExpiry: false },
  { value: "chalan", label: "Chalan", hasExpiry: true },
  { value: "naam_jari", label: "Naam Jari", hasExpiry: true },
  { value: "khajna", label: "Khajna", hasExpiry: true },
  { value: "mutation", label: "Mutation", hasExpiry: false },
  { value: "survey", label: "Survey", hasExpiry: true }
];

const AddPropertyModal = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    address: "",
    description: ""
  });
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = () => {
    const newDoc: Document = {
      id: Math.random().toString(36).substr(2, 9),
      type: "",
      notes: ""
    };
    setDocuments([...documents, newDoc]);
  };

  const updateDocument = (id: string, field: keyof Document, value: any) => {
    setDocuments(documents.map(doc => 
      doc.id === id ? { ...doc, [field]: value } : doc
    ));
  };

  const removeDocument = (id: string) => {
    setDocuments(documents.filter(doc => doc.id !== id));
  };

  const getDocumentType = (value: string) => {
    return DOCUMENT_TYPES.find(type => type.value === value);
  };

  const handleSubmit = () => {
    // Here you would save the property and documents
    console.log("Property Data:", formData);
    console.log("Documents:", documents);
    setOpen(false);
    // Reset form
    setFormData({ name: "", type: "", address: "", description: "" });
    setDocuments([]);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" className="h-auto p-6 flex-col space-y-2">
          <Plus className="h-6 w-6" />
          <span>Add Property</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Property</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Property Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Property Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="property-name">Property Name</Label>
                  <Input
                    id="property-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter property name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="property-type">Property Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map((type) => (
                        <SelectItem key={type} value={type.toLowerCase().replace(' ', '_')}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-address">Address</Label>
                <Input
                  id="property-address"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Enter property address"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="property-description">Description</Label>
                <Textarea
                  id="property-description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter property description"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Documents Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Documents
                <Button onClick={addDocument} size="sm" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Document
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {documents.map((doc) => {
                const docType = getDocumentType(doc.type);
                return (
                  <div key={doc.id} className="border border-border rounded-lg p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <div className="space-y-2">
                          <Label>Document Type</Label>
                          <Select 
                            value={doc.type} 
                            onValueChange={(value) => updateDocument(doc.id, 'type', value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent>
                              {DOCUMENT_TYPES.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Upload Document</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="file"
                              onChange={(e) => updateDocument(doc.id, 'file', e.target.files?.[0])}
                              accept=".pdf,.doc,.docx,.jpg,.png"
                              className="flex-1"
                            />
                            <Upload className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                      
                      <Button
                        onClick={() => removeDocument(doc.id)}
                        size="sm"
                        variant="ghost"
                        className="ml-4"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {docType?.hasExpiry && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !doc.expiryDate && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {doc.expiryDate ? format(doc.expiryDate, "PPP") : "Select expiry date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={doc.expiryDate}
                                onSelect={(date) => updateDocument(doc.id, 'expiryDate', date)}
                                initialFocus
                                className="pointer-events-auto"
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Input
                            value={doc.notes || ""}
                            onChange={(e) => updateDocument(doc.id, 'notes', e.target.value)}
                            placeholder="Add notes about this document"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {documents.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  No documents added yet. Click "Add Document" to get started.
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Create Property
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddPropertyModal;