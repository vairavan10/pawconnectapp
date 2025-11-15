import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";
import { storage } from "@/lib/storage";
import Navbar from "@/components/navbar";

const SAFETY_CHECKLIST = [
  {
    id: "1",
    text: "Verify pet companion's identity and credentials"
  },
  {
    id: "2",
    text: "Share emergency contact information"
  },
  {
    id: "3",
    text: "Provide pet's medical history and current medications"
  },
  {
    id: "4",
    text: "Discuss feeding schedule and dietary restrictions"
  },
  {
    id: "5",
    text: "Review behavioral notes and special care instructions"
  },
  {
    id: "6",
    text: "Exchange contact information for updates"
  },
  {
    id: "7",
    text: "Confirm pickup and drop-off location and time"
  },
  {
    id: "8",
    text: "Take photo of pet before handoff"
  }
];

export default function Checklist() {
  const [, setLocation] = useLocation();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [showCompletion, setShowCompletion] = useState(false);

  useEffect(() => {
    const currentBooking = storage.getCurrentBooking();
    if (!currentBooking || !currentBooking.id) {
      setLocation("/pets");
    }
  }, [setLocation]);

  const progress = (checkedItems.size / SAFETY_CHECKLIST.length) * 100;
  const isComplete = progress === 100;

  const toggleItem = (id: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(id)) {
      newChecked.delete(id);
    } else {
      newChecked.add(id);
    }
    setCheckedItems(newChecked);

    if (newChecked.size === SAFETY_CHECKLIST.length) {
      setTimeout(() => setShowCompletion(true), 300);
    } else {
      setShowCompletion(false);
    }
  };

  const handleComplete = () => {
    const currentBooking = storage.getCurrentBooking();
    if (currentBooking) {
      const updatedBooking = {
        ...currentBooking,
        checklistCompleted: true
      };
      storage.setCurrentBooking(updatedBooking);
      storage.updateBooking(currentBooking.id, { checklistCompleted: true });
    }
    
    setLocation("/review");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4" data-testid="text-page-title">Pre-Meetup Safety Checklist</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
            Ensure a safe and smooth experience for your pet
          </p>
        </div>

        <Card className="max-w-3xl mx-auto rounded-3xl p-8">
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Completion Progress</span>
              <span className="text-sm font-medium text-primary" data-testid="text-progress">
                {checkedItems.size} / {SAFETY_CHECKLIST.length}
              </span>
            </div>
            <Progress value={progress} className="h-3" data-testid="progress-checklist" />
          </div>

          {/* Checklist Items */}
          <div className="space-y-4 mb-8">
            {SAFETY_CHECKLIST.map((item) => {
              const isChecked = checkedItems.has(item.id);
              return (
                <div
                  key={item.id}
                  className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                    isChecked
                      ? "bg-primary/5 border-primary/20"
                      : "bg-card border-card-border hover-elevate"
                  }`}
                  data-testid={`checklist-item-${item.id}`}
                >
                  <Checkbox
                    id={item.id}
                    checked={isChecked}
                    onCheckedChange={() => toggleItem(item.id)}
                    className="mt-1"
                    data-testid={`checkbox-${item.id}`}
                  />
                  <label
                    htmlFor={item.id}
                    className={`flex-1 cursor-pointer transition-all duration-200 ${
                      isChecked
                        ? "text-foreground/70 line-through"
                        : "text-foreground"
                    }`}
                  >
                    {item.text}
                  </label>
                </div>
              );
            })}
          </div>

          {/* Completion Animation */}
          {showCompletion && (
            <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 text-primary rounded-full">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold" data-testid="text-all-complete">All items completed!</span>
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="w-full h-12 rounded-xl"
            onClick={handleComplete}
            disabled={!isComplete}
            data-testid="button-complete-checklist"
          >
            {isComplete ? "Continue to Review" : "Complete All Items to Continue"}
          </Button>
        </Card>
      </div>
    </div>
  );
}
