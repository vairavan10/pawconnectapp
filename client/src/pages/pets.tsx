import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { storage } from "@/lib/storage";
import Navbar from "@/components/navbar";
import goldenRetrieverImage from "@assets/generated_images/Golden_retriever_profile_fabd6893.png";
import beagleImage from "@assets/generated_images/Beagle_dog_profile_ca6327de.png";
import huskyImage from "@assets/generated_images/Husky_dog_profile_d73db247.png";
import tabbyCatImage from "@assets/generated_images/Tabby_cat_profile_6de5f72d.png";
import britishShorthairImage from "@assets/generated_images/British_shorthair_cat_b83c77d9.png";
import labradorImage from "@assets/generated_images/Labrador_retriever_profile_28e4b324.png";
import blackLabradorImage from "@assets/generated_images/lab.jpg";
import germanShepherdImage from "@assets/generated_images/german.jpg";
import pugImage from "@assets/generated_images/pug.jpg";
import shihTzuImage from "@assets/generated_images/sitzu.jpg";
import pixieBobImage from "@assets/generated_images/pixi.jpg";
import silverShadedImage from "@assets/generated_images/silver.jpg";
import persianCatImage from "@assets/generated_images/persian.jpg";
import raga from "@assets/generated_images/raga.jpg";
import toyPoodleImage from "@assets/generated_images/toy.jpg";

const MOCK_PETS = [
  {
    id: "1",
    name: "Max",
    breed: "Golden Retriever",
    age: 3,
    behavior: "Friendly, Energetic",
    available: true,
    imageUrl: goldenRetrieverImage,
    description: "Max is a loving and energetic golden retriever who loves to play fetch and go on long walks. Great with kids and other pets!"
  },
  {
    id: "2",
    name: "Bella",
    breed: "Beagle",
    age: 2,
    behavior: "Playful, Curious",
    available: true,
    imageUrl: beagleImage,
    description: "Bella is a curious beagle with a gentle temperament. She enjoys exploring and sniffing around the park."
  },
  {
    id: "3",
    name: "Luna",
    breed: "Siberian Husky",
    age: 4,
    behavior: "Active, Loyal",
    available: true,
    imageUrl: huskyImage,
    description: "Luna is a beautiful husky with striking blue eyes. She's very active and loves outdoor adventures."
  },
  {
    id: "4",
    name: "Whiskers",
    breed: "Tabby Cat",
    age: 1,
    behavior: "Independent, Affectionate",
    available: true,
    imageUrl: tabbyCatImage,
    description: "Whiskers is a sweet tabby cat who loves to cuddle after playtime. Independent but very affectionate."
  },
  {
    id: "5",
    name: "Oliver",
    breed: "British Shorthair",
    age: 3,
    behavior: "Calm, Gentle",
    available: true,
    imageUrl: britishShorthairImage,
    description: "Oliver is a calm and gentle British Shorthair who enjoys quiet companionship and gentle petting."
  },
  {
    id: "6",
    name: "Charlie",
    breed: "Labrador Retriever",
    age: 2,
    behavior: "Friendly, Social",
    available: false,
    imageUrl: labradorImage,
    description: "Charlie is a friendly chocolate lab who loves meeting new people and other dogs. Great family companion!"
  },
  {
    id: "7",
    name: "Joy",
    breed: "Pug",
    age: 3,
    behavior: "Charming, Mischievous",
    available: true,
    imageUrl: pugImage,
    description: "Joy is a small but charismatic pug who loves attention and cuddles. Perfect apartment buddy!",
  },
  {
    id: "8",
    name: "Rocky",
    breed: "German Shepherd",
    age: 5,
    behavior: "Loyal, Protective",
    available: true,
    imageUrl: germanShepherdImage,
    description: "Rocky is a disciplined German Shepherd, ideal for families seeking a watchful, loyal companion.",
  },
  {
    id: "9",
    name: "Lily",
    breed: "Persian Cat",
    age: 2,
    behavior: "Graceful, Quiet",
    available: true,
    imageUrl: persianCatImage,
    description: "Lily is an elegant Persian cat who prefers a calm, quiet environment and gentle petting.",
  },
  {
    id: "10",
    name: "Shadow",
    breed: "Black Labrador",
    age: 4,
    behavior: "Friendly, Obedient",
    available: true,
    imageUrl: blackLabradorImage,
    description: "Shadow is a cheerful black lab who gets along well with everyone. Currently booked!",
  },
  {
    id: "11",
    name: "Tzuzy",
    breed: "Shih Tzu",
    age: 4,
    behavior: "Loyal, Playful",
    available: true,
    imageUrl: shihTzuImage,
    description: "Tzuzy is a charming Shih Tzu who loves being pampered and is great with families.",
  },
  {
    id: "12",
    name: "Pluto",
    breed: "Silver Shaded Cat",
    age: 2,
    behavior: "Calm, Independent",
    available: true,
    imageUrl: silverShadedImage,
    description: "Pluto is a graceful, calm cat with a beautiful silver shaded coat and a gentle demeanor.",
  },
  {
    id: "13",
    name: "Simba",
    breed: "Pixie Bob Cat",
    age: 3,
    behavior: "Curious, Friendly",
    available: true,
    imageUrl: pixieBobImage,
    description: "Simba is a unique Pixie Bob cat with tufted ears and a playful, curious personality.",
  },
  {
    id: "14",
    name: "Milo",
    breed: "Raga muffin Cat",
    age: 3,
    behavior: "Curious, Friendly",
    available: true,
    imageUrl: raga,
    description: "Milo is a unique Raga muffin cat with tufted ears and a playful, curious personality.",
  },
  {
    id: "15",
    name: "Coco",
    breed: "Toy Poodle",
    age: 2,
    behavior: "Affectionate, Intelligent",
    available: true,
    imageUrl: toyPoodleImage,
    description: "Coco is a playful toy poodle who loves cuddles and puzzle toys. Perfect for apartment visits and calm indoor sessions.",
  },
];

export default function Pets() {
  const [, setLocation] = useLocation();
  const [selectedPet, setSelectedPet] = useState<typeof MOCK_PETS[0] | null>(null);

  const handleBookNow = (pet: typeof MOCK_PETS[0]) => {
    storage.setCurrentBooking({
      petId: pet.id,
      petName: pet.name,
      breed: pet.breed,
    });
    setSelectedPet(null);
    setLocation("/subscription");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(135deg, #fff9f4 60%, #fdf6ed 100%)",
        fontFamily:
          "'Inter', 'Quicksand', 'Poppins', 'Segoe UI', 'Arial', sans-serif",
      }}
    >
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight"
            style={{
              color: "#6d3b1a",
              fontFamily: "'Quicksand', 'Poppins', cursive",
              letterSpacing: "0.02em",
              filter: "drop-shadow(0 2px 0 #bfa385)",
            }}
            data-testid="text-page-title"
          >
            Find Your Perfect Pet Companion
          </h1>
          <p
            className="text-lg md:text-xl"
            style={{
              color: "#63706b",
              fontFamily: "'Inter', 'Arial', sans-serif",
            }}
          >
            Browse our available pets and book a session today
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_PETS.map((pet) => (
            <Card
              key={pet.id}
              style={{
                borderRadius: "2.5rem",
                background:
                  pet.available
                    ? "#fff9f4"
                    : "linear-gradient(90deg, #fdf6ed 75%, #ececec 100%)",
                border: "1.5px solid #bfa385",
                boxShadow: pet.available
                  ? "0 2px 12px #fff0ea"
                  : "0 2px 12px #ececec",
              }}
              className="group cursor-pointer hover:scale-105 active:scale-100 transition duration-200"
              onClick={() => setSelectedPet(pet)}
              data-testid={`card-pet-${pet.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-t-3xl">
                <img
                  src={pet.imageUrl}
                  alt={pet.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  style={{ borderTopLeftRadius: "2.5rem", borderTopRightRadius: "2.5rem" }}
                />
                <div className="absolute top-4 right-4">
                  <Badge
                    variant={pet.available ? "default" : "secondary"}
                    className="backdrop-blur bg-[#fff9f4]/90 px-4 py-2 rounded-full text-sm"
                    style={{
                      color: pet.available ? "#fff" : "#63706b",
                      background: pet.available ? "#6d3b1a" : "#bfa385",
                      fontFamily: "'Quicksand', 'Poppins', cursive",
                      letterSpacing: "0.03em",
                    }}
                    data-testid={`badge-availability-${pet.id}`}
                  >
                    {pet.available ? "Available" : "Booked"}
                  </Badge>
                </div>
                {/* Glassmorphic overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#fdf6ed] via-[#fff9f4]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-sm mb-1" style={{ color: "#6d3b1a" }}>
                      <span className="font-semibold">Breed:</span> {pet.breed}
                    </p>
                    <p className="text-sm mb-1" style={{ color: "#6d3b1a" }}>
                      <span className="font-semibold">Age:</span> {pet.age} years
                    </p>
                    <p className="text-sm" style={{ color: "#6d3b1a" }}>
                      <span className="font-semibold">Behavior:</span> {pet.behavior}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3
                  className="text-2xl font-extrabold mb-2"
                  style={{
                    color: "#6d3b1a",
                    fontFamily: "'Quicksand', 'Poppins', cursive",
                    letterSpacing: "0.02em",
                  }}
                  data-testid={`text-pet-name-${pet.id}`}
                >
                  {pet.name}
                </h3>
                <p className="text-base" style={{ color: "#63706b" }}>
                  {pet.breed} · {pet.age} years old
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pet Details Modal */}
      <Dialog open={!!selectedPet} onOpenChange={() => setSelectedPet(null)}>
        <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden">
          {selectedPet && (
            <div className="grid md:grid-cols-2 bg-[#fff9f4]">
              <div className="relative aspect-square md:aspect-auto">
                <img
                  src={selectedPet.imageUrl}
                  alt={selectedPet.name}
                  className="w-full h-full object-cover"
                  style={{ borderTopLeftRadius: "2rem" }}
                />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2
                      className="text-3xl font-extrabold mb-2"
                      style={{
                        color: "#6d3b1a",
                        fontFamily: "'Quicksand', 'Poppins', cursive",
                        letterSpacing: "0.02em",
                      }}
                      data-testid="text-modal-pet-name"
                    >
                      {selectedPet.name}
                    </h2>
                    <p className="text-xl" style={{ color: "#63706b" }}>
                      {selectedPet.breed}
                    </p>
                  </div>
                  <Badge
                    variant={selectedPet.available ? "default" : "secondary"}
                    className="text-sm"
                    style={{
                      color: selectedPet.available ? "#fff" : "#63706b",
                      background: selectedPet.available ? "#6d3b1a" : "#bfa385",
                    }}
                    data-testid="badge-modal-availability"
                  >
                    {selectedPet.available ? "Available" : "Booked"}
                  </Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "#bfa385" }}>Age</h3>
                    <p className="text-lg" style={{ color: "#6d3b1a" }} data-testid="text-modal-age">{selectedPet.age} years old</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "#bfa385" }}>Behavior</h3>
                    <p className="text-lg" style={{ color: "#6d3b1a" }} data-testid="text-modal-behavior">{selectedPet.behavior}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: "#bfa385" }}>About {selectedPet.name}</h3>
                    <p className="text-foreground/80" style={{ color: "#63706b" }} data-testid="text-modal-description">{selectedPet.description}</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-xl h-12"
                  style={{
                    background: selectedPet.available ? "#6d3b1a" : "#bfa385",
                    color: "#fff",
                    border: "none",
                  }}
                  onClick={() => handleBookNow(selectedPet)}
                  disabled={!selectedPet.available}
                  data-testid="button-book-now"
                >
                  {selectedPet.available ? "Book Now" : "Not Available"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
