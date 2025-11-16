import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PawPrint, Calendar, Shield } from "lucide-react";
import { storage } from "@/lib/storage";
import dashboardHeroImage from "@assets/generated_images/Dashboard_hero_background_9da70534.png";
import Navbar from "@/components/navbar";

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = storage.getUser();
    if (!savedUser) {
      setLocation("/");
    } else {
      setUser(savedUser);
    }
  }, [setLocation]);

  const stats = [
    { label: "Available Pets", value: "50+", icon: PawPrint },
    { label: "Happy Owners", value: "1,200+", icon: Calendar },
    { label: "Trusted Companions", value: "300+", icon: Shield },
  ];

  const quickActions = [
    {
      title: "Browse Pets",
      description: "Find your perfect pet companion",
      action: () => setLocation("/pets"),
      testId: "card-browse-pets"
    },
    {
      title: "Total Bookings",
      description: "View and manage your bookings",
      action: () => {
        const bookings = storage.getBookings();
        if (bookings.length > 0) {
          alert(`Total  ${bookings.length} booking(s) Today`);
        } else {
          setLocation("/pets");
        }
      },
      testId: "card-bookings"
    },
    {
      title: "Safety Guide",
      description: "Learn about pet care safety",
      action: () => setLocation("/checklist"),
      testId: "card-safety"
    },
  ];

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero Section */}
      <div className="relative min-h-[500px] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff5ec]/60 via-[#f2e7dd]/80 to-[#fff5ec]" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              style={{ color: "#6d3b1a" }}
              data-testid="text-welcome">
            Welcome back, {user.username}!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8"
             style={{ color: "#63706b" }}>
            Find trusted companions for your furry friends
          </p>
          {/* Glassmorphic Search Card */}
          <Card className="backdrop-blur-lg bg-[#fff5ec]/80 border-[#bfa385] p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-6" style={{ color: "#6d3b1a" }}>
              Start Your Search
            </h3>
            <Button
              size="lg"
              className="text-lg px-8 h-14 rounded-xl"
              style={{
                background: "#6d3b1a",
                color: "#fff",
                border: "none"
              }}
              onClick={() => setLocation("/pets")}
              data-testid="button-start-search"
            >
              Browse Available Pets
            </Button>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="backdrop-blur-sm bg-[#fff5ec]/90 border-[#bfa385] p-8 rounded-3xl text-center hover:shadow-lg transition-transform duration-300"
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4" style={{ color: "#6d3b1a" }}/>
              <h3 className="text-4xl font-bold mb-2" style={{ color: "#6d3b1a" }}>
                {stat.value}
              </h3>
              <p className="text-base" style={{ color: "#63706b" }}>
                {stat.label}
              </p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#6d3b1a" }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card
                key={index}
                className="backdrop-blur-sm bg-[#fff5ec]/90 border-[#bfa385] p-8 rounded-3xl hover:shadow-lg active:shadow transition-all duration-300 cursor-pointer"
                onClick={action.action}
                data-testid={action.testId}
              >
                <h3 className="text-xl font-semibold mb-2" style={{ color: "#6d3b1a" }}>
                  {action.title}
                </h3>
                <p className="mb-4" style={{ color: "#63706b" }}>{action.description}</p>
                <Button
                  variant="secondary"
                  className="w-full rounded-xl"
                  style={{
                    background: "#63706b",
                    color: "#fff"
                  }}
                  data-testid={`button-${action.testId}`}
                >
                  Get Started
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
