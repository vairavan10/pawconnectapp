import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { storage } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";

export default function Booking() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const savedBooking = storage.getCurrentBooking();
    if (!savedBooking) {
      setLocation("/pets");
    } else {
      if (!savedBooking.subscriptionType) {
        setLocation("/subscription");
      } else {
        setBookingData(savedBooking);
      }
    }
  }, [setLocation]);

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedDate || !selectedTime) {
      toast({
        title: "Missing Information",
        description: "Please select both a date and time for your booking.",
        variant: "destructive"
      });
      return;
    }
    
    const user = storage.getUser();
    
    const booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || "guest",
      petId: bookingData.petId,
      breed: bookingData.breed,
      subscriptionType: bookingData.subscriptionType,
      date: selectedDate,
      time: selectedTime,
      checklistCompleted: false,
      createdAt: new Date().toISOString()
    };

    storage.addBooking(booking);
    storage.setCurrentBooking(booking);
    
    setShowConfirmation(true);
  };

  const handleGoToChecklist = () => {
    setShowConfirmation(false);
    setLocation("/checklist");
  };

  if (!bookingData) return null;

  const timeSlots = [
    "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
    "05:00 PM", "06:00 PM"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm font-medium">Select Pet</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              ✓
            </div>
            <span className="text-sm font-medium">Choose Plan</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-sm font-medium">Schedule</span>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4" data-testid="text-page-title">Schedule Your Booking</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4" data-testid="text-booking-pet">
            Choose your preferred date and time for {bookingData.petName}
          </p>
        </div>

        <Card className="max-w-3xl mx-auto rounded-3xl p-8">
          <form onSubmit={handleConfirmBooking} className="space-y-8">
            {/* Booking Summary */}
            <div className="bg-muted rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Booking Summary</h3>
              <div className="space-y-2 text-sm">
                <p><span className="text-muted-foreground">Pet:</span> <span className="font-medium">{bookingData.petName}</span></p>
                <p><span className="text-muted-foreground">Breed:</span> <span className="font-medium">{bookingData.breed}</span></p>
                <p><span className="text-muted-foreground">Plan:</span> <span className="font-medium capitalize">{bookingData.subscriptionType}</span></p>
              </div>
            </div>

            {/* Date Selection */}
            <div className="space-y-2">
              <Label htmlFor="date">Select Date *</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
                className="h-12 rounded-xl"
                data-testid="input-date"
              />
            </div>

            {/* Time Selection */}
            <div className="space-y-2">
              <Label>Select Time *</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                      selectedTime === time
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground hover-elevate"
                    }`}
                    data-testid={`button-time-${time.replace(/[: ]/g, '-')}`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-xl"
              disabled={!selectedDate || !selectedTime}
              data-testid="button-confirm-booking"
            >
              Confirm Booking
            </Button>
          </form>
        </Card>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md rounded-3xl text-center p-8">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-4" data-testid="text-confirmation-title">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-8">
            Your booking for {bookingData.petName} on {selectedDate} at {selectedTime} has been confirmed.
          </p>

          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full rounded-xl"
              onClick={handleGoToChecklist}
              data-testid="button-go-checklist"
            >
              Continue to Safety Checklist
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full rounded-xl"
              onClick={() => setLocation("/dashboard")}
              data-testid="button-go-dashboard"
            >
              Back to Dashboard
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
