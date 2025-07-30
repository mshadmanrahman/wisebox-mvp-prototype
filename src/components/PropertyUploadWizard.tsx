import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  Clock
} from 'lucide-react';

// Types and Interfaces
interface PropertyUploadData {
  propertyType: string;
  ownershipType: string;
  documents: {
    dolilAgreements: File[];
    dcr: File[];
    khatian: {
      cs: File[];
      sa: File[];
      rs: File[];
      brs: File[];
      bs: File[];
    };
    khajna: File[];
    possession: {
      hasPossession: boolean;
      photos: File[];
    };
    bayaDeed: File[];
    moujaMap: File[];
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
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<PropertyUploadData>({
    propertyType: '',
    ownershipType: '',
    documents: {
      dolilAgreements: [],
      dcr: [],
      khatian: { cs: [], sa: [], rs: [], brs: [], bs: [] },
      khajna: [],
      possession: { hasPossession: false, photos: [] },
      bayaDeed: [],
      moujaMap: [],
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
      status: data.documents.dolilAgreements.length > 0 ? 'complete' : currentStep === 2 ? 'in-progress' : 'pending',
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
      default: return 'bg-gray-300';
    }
  };

  const handleFileUpload = (files: FileList | null, path: string) => {
    if (!files) return;
    
    const fileArray = Array.from(files);
    // This is a simplified implementation - in reality you'd handle the nested paths properly
    console.log(`Uploading ${fileArray.length} files to ${path}`);
  };

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
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Ownership Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload your core proof-of-ownership papers. These are mandatory documents.
        </p>
      </div>
      
      <div>
        <Label className="text-base font-medium">Dolil / Agreement(s) *</Label>
        <p className="text-sm text-gray-500 mb-3">Upload multiple files if needed</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">Drag and drop files here, or click to browse</p>
          <Input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e.target.files, 'dolilAgreements')}
            className="hidden"
            id="dolil-upload"
          />
          <Label htmlFor="dolil-upload">
            <Button variant="outline" className="cursor-pointer">
              Choose Files
            </Button>
          </Label>
        </div>
        {data.documents.dolilAgreements.length > 0 && (
          <div className="mt-2">
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {data.documents.dolilAgreements.length} file(s) uploaded
            </Badge>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Verification Documents</h3>
        <p className="text-sm text-gray-600 mb-4">
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
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Possession & History</h3>
        <p className="text-sm text-gray-600 mb-4">
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
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Maps & Visuals</h3>
        <p className="text-sm text-gray-600 mb-4">
          Upload official maps and visual documentation of your property.
        </p>
      </div>

      <div>
        <Label className="text-base font-medium">Mouja Map *</Label>
        <p className="text-sm text-gray-500 mb-3">Official map of the plot from land registry</p>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Map className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm text-gray-500 mb-2">Upload Mouja Map (PDF, Image formats)</p>
          <Input 
            type="file" 
            multiple 
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(e.target.files, 'moujaMap')}
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Property Details</h3>
        <p className="text-sm text-gray-600 mb-4">
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
          <Label className="text-base font-medium">Unit</Label>
          <select 
            className="w-full p-2 border rounded-md"
            value={data.propertyDetails.size.unit}
            onChange={(e) => setData(prev => ({
              ...prev,
              propertyDetails: {
                ...prev.propertyDetails,
                size: { ...prev.propertyDetails.size, unit: e.target.value }
              }
            }))}
          >
            {LAND_SIZE_UNITS.map(unit => (
              <option key={unit} value={unit}>{unit}</option>
            ))}
          </select>
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

      {/* Address */}
      <div>
        <Label className="text-base font-medium">Property Address *</Label>
        <Textarea 
          placeholder="Enter complete address"
          value={data.propertyDetails.address}
          onChange={(e) => setData(prev => ({
            ...prev,
            propertyDetails: { ...prev.propertyDetails, address: e.target.value }
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
      case 2: return data.documents.dolilAgreements.length > 0;
      default: return true; // For now, allow proceeding from other steps
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
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