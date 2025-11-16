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
import blackLabradorImage from "@assets/generated_images/balcky.jpeg";
import germanShepherdImage from "@assets/generated_images/german.jpeg";
import pugImage from "@assets/generated_images/pug.jpg";
import shihTzuImage from "@assets/generated_images/sitzu.jpg";
import pixieBobImage from "@assets/generated_images/pixi.jpg";
import silverShadedImage from "@assets/generated_images/silver.jpg";
import persianCatImage from "@assets/generated_images/Gemini_Generated_Image_g1imd5g1imd5g1im.png";
import raga from "@assets/generated_images/raga.jpg";



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
    name: "Coco",
    breed: "Pug",
    age: 3,
    behavior: "Charming, Mischievous",
    available: true,
    imageUrl: pugImage, // import or require the image
    description: "Coco is a small but charismatic pug who loves attention and cuddles. Perfect apartment buddy!",
  },
  {
    id: "8",
    name: "Rocky",
    breed: "German Shepherd",
    age: 5,
    behavior: "Loyal, Protective",
    available: true,
    imageUrl: germanShepherdImage, // import or require the image
    description: "Rocky is a disciplined German Shepherd, ideal for families seeking a watchful, loyal companion.",
  },
  {
    id: "9",
    name: "Lily",
    breed: "Persian Cat",
    age: 2,
    behavior: "Graceful, Quiet",
    available: true,
    imageUrl: persianCatImage, // import or require the image
    description: "Lily is an elegant Persian cat who prefers a calm, quiet environment and gentle petting.",
  },
  {
    id: "10",
    name: "Shadow",
    breed: "Black Labrador",
    age: 4,
    behavior: "Friendly, Obedient",
    available: true,
    imageUrl: blackLabradorImage, // import or require the image
    description: "Shadow is a cheerful black lab who gets along well with everyone. Currently booked!",
  },
  {
  id: "11",
  name: "Tzuzy",
  breed: "Shih Tzu",
  age: 4,
  behavior: "Loyal, Playful",
  available: true,
  imageUrl: shihTzuImage, // Add and import this image
  description: "Tzuzy is a charming Shih Tzu who loves being pampered and is great with families.",
},
{
  id: "12",
  name: "Silver",
  breed: "Silver Shaded Cat",
  age: 2,
  behavior: "Calm, Independent",
  available: true,
  imageUrl: silverShadedImage, // Add and import this image
  description: "Silver is a graceful, calm cat with a beautiful silver shaded coat and a gentle demeanor.",
},
{
  id: "13",
  name: "Pixie",
  breed: "Pixie Bob Cat",
  age: 3,
  behavior: "Curious, Friendly",
  available: true,
  imageUrl: pixieBobImage, // Add and import this image
  description: "Pixie is a unique Pixie Bob cat with tufted ears and a playful, curious personality.",
},
{
  id: "14",
  name: "Ragav",
  breed: "Raga muffin Cat",
  age: 3,
  behavior: "Curious, Friendly",
  available: true,
  imageUrl: raga, // Add and import this image
  description: "Ragav is a unique Raga muffin cat with tufted ears and a playful, curious personality.",
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
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4" data-testid="text-page-title">Find Your Perfect Pet Companion</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">Browse our available pets and book a session today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PETS.map((pet) => (
            <Card
              key={pet.id}
              className="overflow-hidden rounded-3xl hover-elevate active-elevate-2 cursor-pointer transition-all duration-300 group"
              onClick={() => setSelectedPet(pet)}
              data-testid={`card-pet-${pet.id}`}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img 
                  src={pet.imageUrl} 
                  alt={pet.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <Badge 
                    variant={pet.available ? "default" : "secondary"}
                    className="backdrop-blur-lg bg-background/20 px-3 py-1 rounded-full"
                    data-testid={`badge-availability-${pet.id}`}
                  >
                    {pet.available ? "Available" : "Booked"}
                  </Badge>
                </div>
                
                {/* Glassmorphic overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <p className="text-sm text-foreground/90 mb-1">
                      <span className="font-semibold">Breed:</span> {pet.breed}
                    </p>
                    <p className="text-sm text-foreground/90 mb-1">
                      <span className="font-semibold">Age:</span> {pet.age} years
                    </p>
                    <p className="text-sm text-foreground/90">
                      <span className="font-semibold">Behavior:</span> {pet.behavior}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2" data-testid={`text-pet-name-${pet.id}`}>{pet.name}</h3>
                <p className="text-muted-foreground">{pet.breed} · {pet.age} years old</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Pet Details Modal */}
      <Dialog open={!!selectedPet} onOpenChange={() => setSelectedPet(null)}>
        <DialogContent className="max-w-4xl rounded-3xl p-0 overflow-hidden">
          {selectedPet && (
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto">
                <img 
                  src={selectedPet.imageUrl} 
                  alt={selectedPet.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold mb-2" data-testid="text-modal-pet-name">{selectedPet.name}</h2>
                    <p className="text-xl text-muted-foreground">{selectedPet.breed}</p>
                  </div>
                  <Badge 
                    variant={selectedPet.available ? "default" : "secondary"}
                    className="text-sm"
                    data-testid="badge-modal-availability"
                  >
                    {selectedPet.available ? "Available" : "Booked"}
                  </Badge>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Age</h3>
                    <p className="text-lg" data-testid="text-modal-age">{selectedPet.age} years old</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">Behavior</h3>
                    <p className="text-lg" data-testid="text-modal-behavior">{selectedPet.behavior}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">About {selectedPet.name}</h3>
                    <p className="text-foreground/80" data-testid="text-modal-description">{selectedPet.description}</p>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-xl h-12"
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
