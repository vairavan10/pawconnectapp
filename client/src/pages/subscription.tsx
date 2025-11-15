import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { storage } from "@/lib/storage";
import Navbar from "@/components/navbar";

const SUBSCRIPTION_PLANS = [
  {
    type: "hourly" as const,
    title: "Hourly",
    price: "$15",
    duration: "per hour",
    features: [
      "Perfect for quick visits",
      "Flexible scheduling",
      "1-hour minimum",
      "Same-day booking available"
    ]
  },
  {
    type: "daily" as const,
    title: "Daily",
    price: "$75",
    duration: "per day",
    features: [
      "Full day care (8 hours)",
      "Multiple play sessions",
      "Photo updates",
      "Feeding & medications"
    ],
    popular: true
  },
  {
    type: "weekly" as const,
    title: "Weekly",
    price: "$450",
    duration: "per week",
    features: [
      "Best value for long trips",
      "7 days of care",
      "Daily updates & photos",
      "Priority booking"
    ]
  },
];

export default function Subscription() {
  const [, setLocation] = useLocation();
  const [bookingData, setBookingData] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const savedBooking = storage.getCurrentBooking();
    if (!savedBooking) {
      setLocation("/pets");
    } else {
      setBookingData(savedBooking);
    }
  }, [setLocation]);

  const handleSelectPlan = (planType: string) => {
    setSelectedPlan(planType);
  };

  const handleContinue = () => {
    if (!selectedPlan || !bookingData) return;

    const updatedBooking = {
      ...bookingData,
      subscriptionType: selectedPlan
    };
    storage.setCurrentBooking(updatedBooking);
    setLocation("/booking");
  };

  if (!bookingData) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              1
            </div>
            <span className="text-sm font-medium">Select Pet</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
              2
            </div>
            <span className="text-sm font-medium">Choose Plan</span>
          </div>
          <div className="w-12 h-0.5 bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center font-semibold">
              3
            </div>
            <span className="text-sm text-muted-foreground">Schedule</span>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4" data-testid="text-page-title">Choose Your Plan</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4" data-testid="text-pet-name">
            Select the best subscription for {bookingData.petName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card
              key={plan.type}
              className={`relative rounded-3xl p-8 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.type
                  ? "ring-2 ring-primary shadow-lg"
                  : ""
              }`}
              onClick={() => handleSelectPlan(plan.type)}
              data-testid={`card-plan-${plan.type}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1 rounded-full">
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-primary" data-testid={`text-price-${plan.type}`}>
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.duration.split(' ')[1]}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-xl"
                variant={selectedPlan === plan.type ? "default" : "outline"}
                data-testid={`button-select-${plan.type}`}
                onClick={() => handleSelectPlan(plan.type)}
              >
                {selectedPlan === plan.type ? "Selected" : "Select Plan"}
              </Button>
            </Card>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedPlan}
            className="px-12 h-12 rounded-xl"
            data-testid="button-continue"
          >
            Continue to Booking
          </Button>
        </div>
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 text-sm font-medium ${className}`}>
      {children}
    </span>
  );
}
