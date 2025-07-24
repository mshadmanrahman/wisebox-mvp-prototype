import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { CalendarIcon, Clock, DollarSign, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConsultationService {
  id: string;
  name: string;
  duration: number; // in minutes
  price: number; // in USD, 0 for free
  description: string;
  category: string;
}

const CONSULTATION_SERVICES: ConsultationService[] = [
  {
    id: "general_15",
    name: "General Consultation",
    duration: 15,
    price: 0,
    description: "Quick questions about property matters",
    category: "General"
  },
  {
    id: "general_60",
    name: "Extended General Consultation", 
    duration: 60,
    price: 30,
    description: "In-depth discussion about property matters",
    category: "General"
  },
  {
    id: "doc_verification",
    name: "Document Verification",
    duration: 30,
    price: 30,
    description: "Professional verification of property documents",
    category: "Documentation"
  },
  {
    id: "will_translation",
    name: "Will Translation",
    duration: 30, 
    price: 30,
    description: "Translation services for legal documents",
    category: "Documentation"
  },
  {
    id: "legal_advice",
    name: "Legal Advisory",
    duration: 45,
    price: 50,
    description: "Professional legal advice on property matters",
    category: "Legal"
  },
  {
    id: "property_valuation",
    name: "Property Valuation Consultation",
    duration: 30,
    price: 40,
    description: "Expert guidance on property valuation",
    category: "Valuation"
  },
  {
    id: "tax_consultation",
    name: "Tax & Compliance Consultation", 
    duration: 45,
    price: 45,
    description: "Tax implications and compliance requirements",
    category: "Tax"
  },
  {
    id: "inheritance_planning",
    name: "Inheritance Planning",
    duration: 60,
    price: 60,
    description: "Comprehensive inheritance and estate planning",
    category: "Planning"
  }
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

interface ConsultationBookingProps {
  propertyId: string;
  propertyName: string;
}

const ConsultationBooking = ({ propertyId, propertyName }: ConsultationBookingProps) => {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [notes, setNotes] = useState("");

  const service = CONSULTATION_SERVICES.find(s => s.id === selectedService);

  const handleBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      return; // Add proper validation
    }

    // If it's the free consultation, redirect to Calendly
    if (selectedService === "general_15") {
      // Replace with your actual Calendly URL
      window.open("https://calendly.com/your-calendly-link/15min-free-consultation", "_blank");
      setOpen(false);
      // Reset form
      setSelectedService("");
      setSelectedDate(undefined);
      setSelectedTime("");
      setNotes("");
      return;
    }

    const bookingData = {
      propertyId,
      serviceId: selectedService,
      date: selectedDate,
      time: selectedTime,
      notes,
      service
    };

    console.log("Booking consultation:", bookingData);
    // Here you would send the booking data to your backend for paid consultations
    
    setOpen(false);
    // Reset form
    setSelectedService("");
    setSelectedDate(undefined);
    setSelectedTime("");
    setNotes("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Book Consultation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Consultation for {propertyName}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Choose Consultation Service</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CONSULTATION_SERVICES.map((consultationService) => (
                <Card 
                  key={consultationService.id}
                  className={cn(
                    "cursor-pointer transition-all hover:shadow-md",
                    selectedService === consultationService.id && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedService(consultationService.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{consultationService.name}</CardTitle>
                        <CardDescription className="text-sm mt-1">
                          {consultationService.description}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{consultationService.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {consultationService.duration} mins
                        </div>
                        <div className="flex items-center font-medium">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {consultationService.price === 0 ? "Free" : `$${consultationService.price}`}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Date and Time Selection */}
          {selectedService && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Select Date & Time</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : "Select consultation date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Time</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time slot" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {selectedService && (
            <div className="space-y-2">
              <Label htmlFor="consultation-notes">Additional Notes (Optional)</Label>
              <Textarea
                id="consultation-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any specific topics or questions you'd like to discuss..."
                rows={3}
              />
            </div>
          )}

          {/* Booking Summary */}
          {service && selectedDate && selectedTime && (
            <Card className="bg-muted/50">
              <CardHeader>
                <CardTitle className="text-base">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{service.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span>{service.duration} minutes</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span>{format(selectedDate, "PPP")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span>Property:</span>
                  <span className="font-medium">{propertyName}</span>
                </div>
                <div className="flex justify-between border-t pt-2 mt-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">
                    {service.price === 0 ? "Free" : `$${service.price}`}
                  </span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleBooking}
              disabled={!selectedService || !selectedDate || !selectedTime}
            >
              {service?.price === 0 ? "Book Free Consultation" : `Pay $${service?.price} & Book`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConsultationBooking;