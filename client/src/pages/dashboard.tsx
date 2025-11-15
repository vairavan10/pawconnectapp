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
      title: "My Bookings",
      description: "View and manage your bookings",
      action: () => {
        const bookings = storage.getBookings();
        if (bookings.length > 0) {
          alert(`You have ${bookings.length} booking(s)`);
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-6" data-testid="text-welcome">
            Welcome back, {user.username}!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-foreground/80 mb-6 sm:mb-8">
            Find trusted companions for your furry friends
          </p>
          
          {/* Glassmorphic Search Card */}
          <Card className="backdrop-blur-lg bg-card/70 border-card-border p-8 rounded-3xl shadow-xl">
            <h3 className="text-2xl font-semibold mb-6">Start Your Search</h3>
            <Button 
              size="lg"
              className="text-lg px-8 h-14 rounded-xl"
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
              className="backdrop-blur-sm bg-card/90 border-card-border p-8 rounded-3xl text-center hover-elevate transition-transform duration-300"
              data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
            >
              <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-4xl font-bold text-foreground mb-2">{stat.value}</h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card 
                key={index}
                className="backdrop-blur-sm bg-card/90 border-card-border p-8 rounded-3xl hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
                onClick={action.action}
                data-testid={action.testId}
              >
                <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                <p className="text-muted-foreground mb-4">{action.description}</p>
                <Button variant="secondary" className="w-full rounded-xl" data-testid={`button-${action.testId}`}>
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
