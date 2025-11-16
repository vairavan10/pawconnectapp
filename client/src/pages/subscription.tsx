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
    price: "₹15",
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
    price: "₹75",
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
    price: "₹450",
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
    <div
      className="min-h-screen bg-background"
      style={{
        background:
          "linear-gradient(135deg, #fff9f4 60%, #fdf6ed 100%)",
        fontFamily:
          "'Inter', 'Quicksand', 'Poppins', 'Segoe UI', 'Arial', sans-serif",
      }}
    >
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {[1, 2, 3].map((step, idx) => {
            const labels = ["Select Pet", "Choose Plan", "Schedule"];
            const isActive = step <= 2; // steps 1 and 2 active for example
            return (
              <div key={step} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                    isActive
                      ? "bg-[#6d3b1a] text-white"
                      : "bg-[#ececec] text-[#bfa385]"
                  }`}
                >
                  {step}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-[#6d3b1a]" : "text-[#bfa385]"
                  }`}
                >
                  {labels[idx]}
                </span>
                {step < 3 && (
                  <div
                    className={`w-12 h-0.5 ${
                      isActive ? "bg-[#6d3b1a]" : "bg-[#bfa385]"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4"
            style={{
              color: "#6d3b1a",
              fontFamily: "'Quicksand', 'Poppins', cursive",
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 2px 0 #bfa385)",
            }}
            data-testid="text-page-title"
          >
            Choose Your Plan
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground px-4"
            style={{ color: "#63706b", fontFamily: "'Inter', sans-serif" }}
            data-testid="text-pet-name"
          >
            Select the best subscription for {bookingData.petName}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <Card
              key={plan.type}
              className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-300 ${
                selectedPlan === plan.type
                  ? "ring-2 ring-[#6d3b1a] shadow-lg"
                  : "hover:shadow"
              }`}
              onClick={() => handleSelectPlan(plan.type)}
              data-testid={`card-plan-${plan.type}`}
              style={{ background: "#fff9f4", border: "1.5px solid #bfa385" }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-[#6d3b1a] text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#6d3b1a", fontFamily: "'Quicksand', cursive" }}
                >
                  {plan.title}
                </h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span
                    className="text-4xl font-bold"
                    style={{ color: "#6d3b1a" }}
                    data-testid={`text-price-${plan.type}`}
                  >
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">/{plan.duration.split(" ")[1]}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8" style={{ color: "#63706b" }}>
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-[#6d3b1a] shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full rounded-xl"
                variant={selectedPlan === plan.type ? "default" : "outline"}
                data-testid={`button-select-${plan.type}`}
                onClick={() => handleSelectPlan(plan.type)}
                style={{
                  borderColor: selectedPlan === plan.type ? "#6d3b1a" : "#bfa385",
                  color: selectedPlan === plan.type ? "#fff" : "#6d3b1a",
                  backgroundColor: selectedPlan === plan.type ? "#6d3b1a" : "transparent",
                }}
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
            style={{ backgroundColor: "#6d3b1a", color: "#fff" }}
          >
            Continue to Booking
          </Button>
        </div>
      </div>
    </div>
  );
}
