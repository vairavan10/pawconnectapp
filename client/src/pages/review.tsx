import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { storage } from "@/lib/storage";
import Navbar from "@/components/navbar";

export default function Review() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentBooking, setCurrentBooking] = useState<any>(null);

  useEffect(() => {
    const booking = storage.getCurrentBooking();
    console.log("Current Booking in Review:", booking);
    if (!booking || !booking.id) {
      setLocation("/pets");
      return;
    }
    if (!booking.checklistCompleted) {
      toast({
        title: "Checklist Required",
        description: "Please complete the safety checklist before submitting a review.",
        variant: "destructive",
      });
      setLocation("/checklist");
      return;
    }
    setCurrentBooking(booking);

    const savedReviews = storage.getReviews();
    setTestimonials(savedReviews);
  }, [setLocation, toast]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentBooking?.checklistCompleted) {
      toast({
        title: "Checklist incomplete",
        description: "Please complete the safety checklist before submitting a review.",
        variant: "destructive",
      });
      return;
    }

    const user = storage.getUser();

    const review = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user?.id || "guest",
      petId: currentBooking?.petId || "unknown",
      petName: currentBooking?.petName || "Unknown Pet",
      bookingId: currentBooking?.id || "unknown",
      rating,
      feedback,
      username: user?.username || "Anonymous",
      createdAt: new Date().toISOString(),
    };

    storage.addReview(review);
    const updatedReviews = storage.getReviews();
    setTestimonials(updatedReviews);

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    });

    setRating(0);
    setFeedback("");
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
            Rate Your Experience
          </h1>
          <p
            className="text-base sm:text-lg md:text-xl text-muted-foreground px-4"
            style={{ color: "#63706b", fontFamily: "'Inter', sans-serif" }}
          >
            Help us improve by sharing your feedback
          </p>
        </div>

        {/* Rating Form */}
        <Card
          className="max-w-3xl mx-auto rounded-3xl p-8 mb-16"
          style={{ background: "#fff9f4", border: "1.5px solid #bfa385" }}
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <h3
                className="text-lg font-semibold mb-4 text-center"
                style={{ color: "#6d3b1a", fontFamily: "'Quicksand', cursive" }}
              >
                How was your experience?
              </h3>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-all duration-200 hover:scale-110"
                    data-testid={`button-star-${star}`}
                  >
                    <Star
                      className={`w-12 h-12 transition-colors duration-200 ${
                        star <= (hoveredRating || rating)
                          ? "fill-[#6d3b1a] text-[#6d3b1a]"
                          : "text-[#bfa385]"
                      }`}
                    />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p
                  className="text-center text-sm mt-2"
                  style={{ color: "#63706b" }}
                  data-testid="text-rating-value"
                >
                  {rating} {rating === 1 ? "star" : "stars"}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-medium mb-2 block"
                style={{ color: "#6d3b1a" }}
              >
                Your Feedback
              </label>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Tell us about your experience with the pet companion..."
                rows={5}
                required
                className="resize-none rounded-xl"
                data-testid="textarea-feedback"
                style={{ borderColor: "#bfa385" }}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-12 rounded-xl"
              disabled={rating === 0 || !feedback.trim()}
              data-testid="button-submit-review"
              style={{ backgroundColor: "#6d3b1a", color: "#fff" }}
            >
              Submit Review
            </Button>
          </form>
        </Card>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <div className="max-w-6xl mx-auto">
            <h2
              className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8"
              style={{ color: "#6d3b1a" }}
              data-testid="text-testimonials-title"
            >
              What Our Users Say
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials
                .slice(-6)
                .reverse()
                .map((testimonial) => (
                  <Card
                    key={testimonial.id}
                    className="rounded-3xl p-6 backdrop-blur-sm bg-card/90"
                    data-testid={`testimonial-${testimonial.id}`}
                    style={{ border: "1.5px solid #bfa385" }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#6d3b1a]/10 flex items-center justify-center">
                        <span
                          className="font-semibold"
                          style={{ color: "#6d3b1a" }}
                        >
                          {testimonial.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p
                          className="font-semibold"
                          style={{ color: "#6d3b1a" }}
                          data-testid={`text-reviewer-${testimonial.id}`}
                        >
                          {testimonial.username}
                        </p>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testimonial.rating
                                  ? "fill-[#6d3b1a] text-[#6d3b1a]"
                                  : "text-[#bfa385]"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p
                      className="text-foreground/80"
                      style={{ color: "#63706b" }}
                      data-testid={`text-feedback-${testimonial.id}`}
                    >
                      {testimonial.feedback}
                    </p>
                    {/* <p
                      className="text-xs mt-3"
                      style={{ color: "#bfa385" }}
                    >
                      Pet: {testimonial.petName}
                    </p> */}
                  </Card>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
