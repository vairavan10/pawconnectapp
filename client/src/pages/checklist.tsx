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
    text: "Verify pet companion’s identity and Aadhaar or other ID proof"
  },
  {
    id: "2",
    text: "Exchange emergency contact numbers including family member"
  },
  {
    id: "3",
    text: "Share pet’s health and vaccination records"
  },
  {
    id: "4",
    text: "Discuss pet’s diet: favorite foods & avoid items"
  },
  {
    id: "5",
    text: "Understand pet’s behavior: temperament & any special care"
  },
  {
    id: "6",
    text: "Agree on clear pickup and drop-off locations and times"
  },
  {
    id: "7",
    text: "Take a photo of the pet before handover for record"
  },
  {
    id: "8",
    text: "Keep sanitizers and masks handy during meetup"
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
    <div
      className="min-h-screen bg-background"
      style={{
        background: "linear-gradient(135deg, #fff9f4 60%, #fdf6ed 100%)",
        fontFamily:
          "'Inter', 'Quicksand', 'Poppins', 'Segoe UI', 'Arial', sans-serif",
      }}
    >
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
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
            Pre-Meetup Safety Checklist
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground px-4"
            style={{
              color: "#63706b",
              fontFamily: "'Inter', 'Arial', sans-serif",
            }}
          >
            Ensure a safe and smooth experience for your pet
          </p>
        </div>

        <Card
          className="max-w-3xl mx-auto rounded-3xl p-8"
          style={{ background: "#fff9f4", border: "1.5px solid #bfa385" }}
        >
          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium" style={{ color: "#6d3b1a" }}>
                Completion Progress
              </span>
              <span
                className="text-sm font-medium"
                style={{ color: "#6d3b1a" }}
                data-testid="text-progress"
              >
                {checkedItems.size} / {SAFETY_CHECKLIST.length}
              </span>
            </div>
            <Progress value={progress} className="h-3" data-testid="progress-checklist" style={{ backgroundColor: "#fdf6ed", borderRadius: "9999px" }} />
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
                      ? "bg-[#6d3b1a]/10 border-[#6d3b1a]/20"
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
                      isChecked ? "text-[#63706b] line-through" : "text-foreground"
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
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#6d3b1a]/10 text-[#6d3b1a] rounded-full">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold" data-testid="text-all-complete">
                  All items completed!
                </span>
              </div>
            </div>
          )}

          <Button
            size="lg"
            className="w-full h-12 rounded-xl"
            onClick={handleComplete}
            disabled={!isComplete}
            data-testid="button-complete-checklist"
            style={{ backgroundColor: "#6d3b1a", color: "#fff" }}
          >
            {isComplete ? "Continue to Review" : "Complete All Items to Continue"}
          </Button>
        </Card>
      </div>
    </div>
  );
}

