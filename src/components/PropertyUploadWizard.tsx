import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropertyMapComponent } from './PropertyMapComponent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Home, 
  Building, 
  MapPin, 
  Users, 
  User, 
  FileText, 
  Camera, 
  Map,
  Upload,
  CheckCircle,
  AlertCircle,
  Clock,
  ArrowLeft
} from 'lucide-react';

// Types and Interfaces
interface DocumentInfo {
  files: File[];
  title: string;
  description: string;
  category: string;
  notes: string;
}

interface PropertyUploadData {
  propertyType: string;
  ownershipType: string;
  documents: {
    dolilAgreements: DocumentInfo;
    dcr: DocumentInfo;
    khatian: {
      cs: DocumentInfo;
      sa: DocumentInfo;
      rs: DocumentInfo;
      brs: DocumentInfo;
      bs: DocumentInfo;
    };
    khajna: DocumentInfo;
    possession: {
      hasPossession: boolean;
      photos: DocumentInfo;
    };
    bayaDeed: DocumentInfo;
    moujaMap: DocumentInfo;
  };
  propertyDetails: {
    size: {
      value: string;
      unit: string;
    };
    valuation: string;
    purchaseDate: string;
    address: string;
    sellers: Array<{
      name: string;
      phone: string;
      email: string;
    }>;
  };
}

interface Step {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'complete' | 'incomplete';
}

const PROPERTY_TYPES = [
  { value: 'land', label: 'Land', icon: MapPin },
  { value: 'apartment', label: 'Apartment', icon: Building },
  { value: 'house', label: 'House', icon: Home },
  { value: 'commercial', label: 'Commercial', icon: Building },
];

const OWNERSHIP_TYPES = [
  { value: 'personal', label: 'Personal', icon: User },
  { value: 'shared', label: 'Shared', icon: Users },
];

const LAND_SIZE_UNITS = [
  'Katha', 'Bigha', 'Decimal', 'Sq Ft', 'Acres'
];

const KHATIAN_TYPES = [
  { value: 'cs', label: 'CS (Cadastral Survey)' },
  { value: 'sa', label: 'SA (State Acquisition Survey)' },
  { value: 'rs', label: 'RS (Revisional Survey)' },
  { value: 'brs', label: 'BRS (Bangladesh Revisional Survey)' },
  { value: 'bs', label: 'BS (Boundary Survey)' },
];

export const PropertyUploadWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const createEmptyDocumentInfo = (): DocumentInfo => ({
    files: [],
    title: '',
    description: '',
    category: '',
    notes: ''
  });

  const [data, setData] = useState<PropertyUploadData>({
    propertyType: '',
    ownershipType: '',
    documents: {
      dolilAgreements: createEmptyDocumentInfo(),
      dcr: createEmptyDocumentInfo(),
      khatian: { 
        cs: createEmptyDocumentInfo(), 
        sa: createEmptyDocumentInfo(), 
        rs: createEmptyDocumentInfo(), 
        brs: createEmptyDocumentInfo(), 
        bs: createEmptyDocumentInfo() 
      },
      khajna: createEmptyDocumentInfo(),
      possession: { hasPossession: false, photos: createEmptyDocumentInfo() },
      bayaDeed: createEmptyDocumentInfo(),
      moujaMap: createEmptyDocumentInfo(),
    },
    propertyDetails: {
      size: { value: '', unit: 'Katha' },
      valuation: '',
      purchaseDate: '',
      address: '',
      sellers: [{ name: '', phone: '', email: '' }],
    },
  });

  const steps: Step[] = [
    {
      id: 1,
      title: 'Property & Ownership Type',
      description: 'Select your property and ownership type',
      status: data.propertyType && data.ownershipType ? 'complete' : currentStep === 1 ? 'in-progress' : 'pending',
    },
    {
      id: 2,
      title: 'Ownership Documents',
      description: 'Upload Dolil/Agreements (Core ownership papers)',
      status: data.documents.dolilAgreements.files.length > 0 ? 'complete' : currentStep === 2 ? 'in-progress' : 'pending',
    },
    {
      id: 3,
      title: 'Verification Documents',
      description: 'DCR, Khatian records, and Khajna receipts',
      status: currentStep === 3 ? 'in-progress' : currentStep > 3 ? 'complete' : 'pending',
    },
    {
      id: 4,
      title: 'Possession & History',
      description: 'Possession confirmation and previous owner records',
      status: currentStep === 4 ? 'in-progress' : currentStep > 4 ? 'complete' : 'pending',
    },
    {
      id: 5,
      title: 'Maps & Visuals',
      description: 'Upload Mouja Map and property visuals',
      status: currentStep === 5 ? 'in-progress' : currentStep > 5 ? 'complete' : 'pending',
    },
    {
      id: 6,
      title: 'Property Details',
      description: 'Size, valuation, address, and seller information',
      status: currentStep === 6 ? 'in-progress' : currentStep > 6 ? 'complete' : 'pending',
    },
  ];

  const getProgressPercentage = () => {
    const completedSteps = steps.filter(step => step.status === 'complete').length;
    return (completedSteps / steps.length) * 100;
  };

  const getStatusColor = (status: Step['status']) => {
    switch (status) {
      case 'complete': return 'bg-green-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'incomplete': return 'bg-red-500';
      default: return 'bg-white/20';
    }
  };

  const handleFileUpload = (files: FileList | null, documentPath: string) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    setData(prev => {
      const pathParts = documentPath.split('.');
      let newData = { ...prev };
      
      if (pathParts.length === 1) {
        // Direct document path like 'dolilAgreements'
        const docInfo = newData.documents[pathParts[0] as keyof typeof newData.documents] as DocumentInfo;
        if (docInfo && 'files' in docInfo) {
          docInfo.files = [...docInfo.files, ...fileArray];
        }
      } else if (pathParts.length === 2) {
        // Nested path like 'khatian.cs'
        const [parent, child] = pathParts;
        if (parent === 'khatian') {
          const khatianDoc = newData.documents.khatian[child as keyof typeof newData.documents.khatian] as DocumentInfo;
          if (khatianDoc && 'files' in khatianDoc) {
            khatianDoc.files = [...khatianDoc.files, ...fileArray];
          }
        } else if (parent === 'possession' && child === 'photos') {
          newData.documents.possession.photos.files = [...newData.documents.possession.photos.files, ...fileArray];
        }
      }
      
      return newData;
    });
  };

  const updateDocumentInfo = (documentPath: string, field: keyof Omit<DocumentInfo, 'files'>, value: string) => {
    setData(prev => {
      const pathParts = documentPath.split('.');
      let newData = { ...prev };
      
      if (pathParts.length === 1) {
        const docInfo = newData.documents[pathParts[0] as keyof typeof newData.documents] as DocumentInfo;
        if (docInfo && 'files' in docInfo) {
          docInfo[field] = value;
        }
      } else if (pathParts.length === 2) {
        const [parent, child] = pathParts;
        if (parent === 'khatian') {
          const khatianDoc = newData.documents.khatian[child as keyof typeof newData.documents.khatian] as DocumentInfo;
          if (khatianDoc && 'files' in khatianDoc) {
            khatianDoc[field] = value;
          }
        } else if (parent === 'possession' && child === 'photos') {
          newData.documents.possession.photos[field] = value;
        }
      }
      
      return newData;
    });
  };

  const DocumentUploadComponent = ({ 
    title, 
    description, 
    documentPath, 
    documentInfo, 
    accept = ".pdf,.jpg,.jpeg,.png",
    multiple = true,
    icon: IconComponent = Upload,
    required = false 
  }: {
    title: string;
    description: string;
    documentPath: string;
    documentInfo: DocumentInfo;
    accept?: string;
    multiple?: boolean;
    icon?: any;
    required?: boolean;
  }) => (
    <div className="space-y-4">
      <div>
        <Label className="text-base font-medium text-white">
          {title} {required && '*'}
        </Label>
        <p className="text-sm text-gray-400 mb-3">{description}</p>
      </div>

      {/* Additional Information Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <Label className="text-sm font-medium text-gray-300">Document Title</Label>
          <Input 
            placeholder="e.g., Original Sale Deed"
            value={documentInfo.title}
            onChange={(e) => updateDocumentInfo(documentPath, 'title', e.target.value)}
            className="bg-white/5 border-white/20 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <Label className="text-sm font-medium text-gray-300">Category</Label>
          <Select 
            value={documentInfo.category}
            onValueChange={(value) => updateDocumentInfo(documentPath, 'category', value)}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              <SelectItem value="original" className="text-white hover:bg-white/10">Original</SelectItem>
              <SelectItem value="certified-copy" className="text-white hover:bg-white/10">Certified Copy</SelectItem>
              <SelectItem value="photocopy" className="text-white hover:bg-white/10">Photocopy</SelectItem>
              <SelectItem value="digital-scan" className="text-white hover:bg-white/10">Digital Scan</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-300">Description</Label>
        <Textarea 
          placeholder="Brief description of the document content"
          value={documentInfo.description}
          onChange={(e) => updateDocumentInfo(documentPath, 'description', e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-400"
          rows={2}
        />
      </div>

      <div>
        <Label className="text-sm font-medium text-gray-300">Additional Notes</Label>
        <Textarea 
          placeholder="Any special notes or observations about this document"
          value={documentInfo.notes}
          onChange={(e) => updateDocumentInfo(documentPath, 'notes', e.target.value)}
          className="bg-white/5 border-white/20 text-white placeholder-gray-400"
          rows={2}
        />
      </div>

      {/* File Upload Area */}
      <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 text-center bg-primary/5 hover:bg-primary/10 transition-colors">
        <IconComponent className="h-10 w-10 mx-auto mb-3 text-primary" />
        <p className="text-sm text-gray-300 mb-3">Drag and drop files here, or click to browse</p>
        <Input 
          type="file" 
          multiple={multiple}
          accept={accept}
          onChange={(e) => handleFileUpload(e.target.files, documentPath)}
          className="hidden"
          id={`${documentPath}-upload`}
        />
        <Label htmlFor={`${documentPath}-upload`}>
          <Button variant="hero" size="lg" className="cursor-pointer shadow-lg">
            <Upload className="h-4 w-4 mr-2" />
            Choose Files
          </Button>
        </Label>
      </div>

      {/* Uploaded Files Display */}
      {documentInfo.files.length > 0 && (
        <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span className="text-sm font-medium text-green-400">
              {documentInfo.files.length} file(s) uploaded successfully
            </span>
          </div>
          <div className="space-y-1">
            {documentInfo.files.map((file, index) => (
              <div key={index} className="text-xs text-gray-400 flex items-center gap-2">
                <FileText className="h-3 w-3" />
                {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const addSeller = () => {
    setData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        sellers: [...prev.propertyDetails.sellers, { name: '', phone: '', email: '' }],
      },
    }));
  };

  const updateSeller = (index: number, field: string, value: string) => {
    setData(prev => ({
      ...prev,
      propertyDetails: {
        ...prev.propertyDetails,
        sellers: prev.propertyDetails.sellers.map((seller, i) => 
          i === index ? { ...seller, [field]: value } : seller
        ),
      },
    }));
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Select Property Type</h3>
        <RadioGroup 
          value={data.propertyType} 
          onValueChange={(value) => setData(prev => ({ ...prev, propertyType: value }))}
          className="grid grid-cols-2 gap-4"
        >
          {PROPERTY_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-white/10 transition-colors">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="flex items-center space-x-2 cursor-pointer flex-1">
                <type.icon className="h-5 w-5" />
                <span>{type.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Select Ownership Type</h3>
        <RadioGroup 
          value={data.ownershipType} 
          onValueChange={(value) => setData(prev => ({ ...prev, ownershipType: value }))}
          className="grid grid-cols-2 gap-4"
        >
          {OWNERSHIP_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-white/10 transition-colors">
              <RadioGroupItem value={type.value} id={type.value} />
              <Label htmlFor={type.value} className="flex items-center space-x-2 cursor-pointer flex-1">
                <type.icon className="h-5 w-5" />
                <span>{type.label}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Ownership Documents</h3>
        <p className="text-sm text-gray-300 mb-4">
          Upload your core proof-of-ownership papers. These are mandatory documents.
        </p>
      </div>
      
      <DocumentUploadComponent
        title="Dolil / Agreement(s)"
        description="Upload multiple files if needed - these are your core ownership documents"
        documentPath="dolilAgreements"
        documentInfo={data.documents.dolilAgreements}
        icon={FileText}
        required={true}
      />
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Verification Documents</h3>
        <p className="text-sm text-gray-300 mb-4">
          Upload mutation records, land records, and tax receipts for verification.
        </p>
      </div>

      {/* DCR Section */}
      <div>
        <Label className="text-base font-medium">DCR (Duplicate Carbon Receipts) *</Label>
        <p className="text-sm text-gray-500 mb-3">Mutation transaction receipts</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <Input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e.target.files, 'dcr')}
          />
        </div>
      </div>

      {/* Khatian Section */}
      <div>
        <Label className="text-base font-medium">Khatian (Official Land Records)</Label>
        <p className="text-sm text-gray-500 mb-3">Upload any of the following records you have</p>
        <div className="grid grid-cols-1 gap-4">
          {KHATIAN_TYPES.map((type) => (
            <div key={type.value} className="border rounded-lg p-4">
              <Label className="font-medium">{type.label}</Label>
              <Input 
                type="file" 
                multiple 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileUpload(e.target.files, `khatian.${type.value}`)}
                className="mt-2"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Khajna Section */}
      <div>
        <Label className="text-base font-medium">Khajna (Tax Receipts) *</Label>
        <p className="text-sm text-gray-500 mb-3">Annual property tax documents</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <Input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e.target.files, 'khajna')}
          />
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Possession & History</h3>
        <p className="text-sm text-gray-300 mb-4">
          Confirm possession and upload historical ownership records.
        </p>
      </div>

      {/* Possession Confirmation */}
      <div>
        <Label className="text-base font-medium">Do you have possession of this property? *</Label>
        <RadioGroup 
          value={data.documents.possession.hasPossession ? 'yes' : 'no'} 
          onValueChange={(value) => setData(prev => ({
            ...prev,
            documents: {
              ...prev.documents,
              possession: { ...prev.documents.possession, hasPossession: value === 'yes' }
            }
          }))}
          className="flex space-x-6 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="possession-yes" />
            <Label htmlFor="possession-yes">Yes</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="possession-no" />
            <Label htmlFor="possession-no">No</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Possession Photos */}
      {data.documents.possession.hasPossession && (
        <div>
          <Label className="text-base font-medium">Recent Property Photos</Label>
          <p className="text-sm text-gray-500 mb-3">Upload recent photos of the property</p>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
            <Camera className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <Input 
              type="file" 
              multiple 
              accept=".jpg,.jpeg,.png"
              onChange={(e) => handleFileUpload(e.target.files, 'possession.photos')}
            />
          </div>
        </div>
      )}

      {/* Baya Deed */}
      <div>
        <Label className="text-base font-medium">Baya Deed / Agreement of Previous Owners</Label>
        <p className="text-sm text-gray-500 mb-3">Historical sale agreements or transfer records</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <Input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e.target.files, 'bayaDeed')}
          />
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Maps & Visuals</h3>
        <p className="text-sm text-gray-300 mb-4">
          Upload official maps and visual documentation of your property.
        </p>
      </div>

      
      {/* Property Address */}
      <div>
        <Label className="text-base font-medium text-white">Property Address *</Label>
        <Textarea 
          placeholder="Enter complete address"
          value={data.propertyDetails.address}
          onChange={(e) => setData(prev => ({
            ...prev,
            propertyDetails: { ...prev.propertyDetails, address: e.target.value }
          }))}
          className="bg-white/5 border-white/20 text-white"
        />
        <p className="text-sm text-gray-400 mt-1">The map below will update based on this address</p>
      </div>

      {/* Interactive Map */}
      <div>
        <Label className="text-base font-medium text-white">Location on Map</Label>
        <p className="text-sm text-gray-400 mb-3">Confirm the exact location by dragging the pin if needed</p>
        <PropertyMapComponent 
          address={data.propertyDetails.address}
          onLocationChange={(coordinates, address) => {
            // Store the coordinates in the data state if needed
            console.log('Location updated:', coordinates, address);
          }}
        />
      </div>

      <DocumentUploadComponent
        title="Mouja Map"
        description="Official map of the plot from land registry - upload PDF or image formats"
        documentPath="moujaMap"
        documentInfo={data.documents.moujaMap}
        icon={Map}
        required={true}
      />
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="bg-white/5 border border-white/20 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-white">Property Details</h3>
        <p className="text-sm text-gray-300 mb-4">
          Provide detailed information about your property.
        </p>
      </div>

      {/* Land Size */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label className="text-base font-medium">Land Size *</Label>
          <Input 
            type="number" 
            placeholder="Enter size"
            value={data.propertyDetails.size.value}
            onChange={(e) => setData(prev => ({
              ...prev,
              propertyDetails: {
                ...prev.propertyDetails,
                size: { ...prev.propertyDetails.size, value: e.target.value }
              }
            }))}
          />
        </div>
        <div>
          <Label className="text-base font-medium text-white">Unit</Label>
          <Select 
            value={data.propertyDetails.size.unit}
            onValueChange={(value) => setData(prev => ({
              ...prev,
              propertyDetails: {
                ...prev.propertyDetails,
                size: { ...prev.propertyDetails.size, unit: value }
              }
            }))}
          >
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-white/20">
              {LAND_SIZE_UNITS.map(unit => (
                <SelectItem key={unit} value={unit} className="text-white hover:bg-white/10">
                  {unit}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Valuation */}
      <div>
        <Label className="text-base font-medium">Valuation (BDT) *</Label>
        <Input 
          type="number" 
          placeholder="Purchase price or estimated value"
          value={data.propertyDetails.valuation}
          onChange={(e) => setData(prev => ({
            ...prev,
            propertyDetails: { ...prev.propertyDetails, valuation: e.target.value }
          }))}
        />
      </div>

      {/* Purchase Date */}
      <div>
        <Label className="text-base font-medium">Date of Purchase</Label>
        <Input 
          type="date"
          value={data.propertyDetails.purchaseDate}
          onChange={(e) => setData(prev => ({
            ...prev,
            propertyDetails: { ...prev.propertyDetails, purchaseDate: e.target.value }
          }))}
        />
      </div>


      {/* Seller Information */}
      <div>
        <Label className="text-base font-medium">Seller Information</Label>
        <p className="text-sm text-gray-500 mb-3">Add details of the person(s) you purchased from</p>
        {data.propertyDetails.sellers.map((seller, index) => (
          <div key={index} className="border rounded-lg p-4 mb-4">
            <h4 className="font-medium mb-3">Seller {index + 1}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input 
                placeholder="Full Name"
                value={seller.name}
                onChange={(e) => updateSeller(index, 'name', e.target.value)}
              />
              <Input 
                placeholder="Phone Number"
                value={seller.phone}
                onChange={(e) => updateSeller(index, 'phone', e.target.value)}
              />
              <Input 
                placeholder="Email Address"
                value={seller.email}
                onChange={(e) => updateSeller(index, 'email', e.target.value)}
              />
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={addSeller} className="w-full">
          Add Another Seller
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return data.propertyType && data.ownershipType;
      case 2: return true; // Allow proceeding without files for testing
      default: return true; // For now, allow proceeding from other steps
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
        <h1 className="text-2xl font-bold mb-2">Add New Property</h1>
        <p className="text-gray-600">Follow the steps below to upload your property documents and details.</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gray-500">{Math.round(getProgressPercentage())}% Complete</span>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
        
        {/* Step Indicators */}
        <div className="flex justify-between mt-4">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${getStatusColor(step.status)}`}>
                {step.status === 'complete' ? <CheckCircle className="h-4 w-4" /> : step.id}
              </div>
              <span className="text-xs mt-1 text-center max-w-20">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Step {currentStep}: {steps[currentStep - 1]?.title}</span>
            <Badge variant={steps[currentStep - 1]?.status === 'complete' ? 'default' : 'secondary'}>
              {steps[currentStep - 1]?.status === 'complete' ? 'Complete' : 'In Progress'}
            </Badge>
          </CardTitle>
          <p className="text-sm text-gray-600">{steps[currentStep - 1]?.description}</p>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          <Button variant="outline">
            Save Draft
          </Button>
          <Button 
            onClick={() => setCurrentStep(prev => Math.min(6, prev + 1))}
            disabled={!canProceed() || currentStep === 6}
          >
            {currentStep === 6 ? 'Submit Property' : 'Next Step'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyUploadWizard;