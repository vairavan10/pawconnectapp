import type { User, Pet, Booking, Review } from "@shared/schema";

// Extended type for booking flow that includes temporary fields
export interface BookingFlow extends Partial<Booking> {
  petId: string;
  petName?: string;
  breed: string;
  subscriptionType?: string;
  date?: string;
  time?: string;
}

const STORAGE_KEYS = {
  USER: "pawconnect_user",
  PETS: "pawconnect_pets",
  BOOKINGS: "pawconnect_bookings",
  CURRENT_BOOKING: "pawconnect_current_booking",
  REVIEWS: "pawconnect_reviews",
} as const;

// User Management
export const storage = {
  // User
  getUser(): User | null {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  setUser(user: Partial<User>): void {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },

  clearUser(): void {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Pets
  getPets(): Pet[] {
    const data = localStorage.getItem(STORAGE_KEYS.PETS);
    return data ? JSON.parse(data) : [];
  },

  setPets(pets: Pet[]): void {
    localStorage.setItem(STORAGE_KEYS.PETS, JSON.stringify(pets));
  },

  getPetById(id: string): Pet | undefined {
    return this.getPets().find(pet => pet.id === id);
  },

  // Bookings
  getBookings(): Booking[] {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  addBooking(booking: Booking): void {
    const bookings = this.getBookings();
    bookings.push(booking);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  },

  updateBooking(id: string, updates: Partial<Booking>): void {
    const bookings = this.getBookings();
    const updated = bookings.map(b => 
      b.id === id ? { ...b, ...updates } : b
    );
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  },

  getCurrentBooking(): BookingFlow | null {
    const data = localStorage.getItem(STORAGE_KEYS.CURRENT_BOOKING);
    return data ? JSON.parse(data) : null;
  },

  setCurrentBooking(booking: BookingFlow): void {
    localStorage.setItem(STORAGE_KEYS.CURRENT_BOOKING, JSON.stringify(booking));
  },

  clearCurrentBooking(): void {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_BOOKING);
  },

  // Reviews
  getReviews(): Review[] {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  },

  addReview(review: Review): void {
    const reviews = this.getReviews();
    reviews.push(review);
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  },

  getReviewsByPetId(petId: string): Review[] {
    return this.getReviews().filter(review => review.petId === petId);
  },

  // Initialize app with mock data
  initializeApp(): void {
    // Only initialize if no data exists
    if (!this.getPets().length) {
      // This will be set by the pets page with mock data
      // We keep it empty here to avoid duplication
    }
  }
};

// Initialize on app load
if (typeof window !== 'undefined') {
  storage.initializeApp();
}
