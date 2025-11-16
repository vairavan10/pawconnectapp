import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table - for both Pet Owners and Pet Companions
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(), // "owner" or "companion"
});

// Pets table
export const pets = pgTable("pets", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  breed: text("breed").notNull(),
  age: integer("age").notNull(),
  behavior: text("behavior").notNull(),
  available: boolean("available").notNull().default(true),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
});

// Bookings table
export const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  petId: varchar("pet_id").notNull(),
  petName: varchar("pet_name").notNull(),
  breed: text("breed").notNull(),
  subscriptionType: text("subscription_type").notNull(), // "hourly", "daily", "weekly"
  date: text("date").notNull(),
  time: text("time").notNull(),
  checklistCompleted: boolean("checklist_completed").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Reviews table
export const reviews = pgTable("reviews", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  petId: varchar("pet_id").notNull(),
  bookingId: varchar("booking_id").notNull(),
  rating: integer("rating").notNull(),
  feedback: text("feedback").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Zod schemas
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertPetSchema = createInsertSchema(pets).omit({ id: true });
export const insertBookingSchema = createInsertSchema(bookings).omit({ 
  id: true, 
  createdAt: true 
});
export const insertReviewSchema = createInsertSchema(reviews).omit({ 
  id: true, 
  createdAt: true 
});

// TypeScript types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertPet = z.infer<typeof insertPetSchema>;
export type Pet = typeof pets.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookings.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
export type Review = typeof reviews.$inferSelect;

// Frontend-only types for localStorage
export interface LoginCredentials {
  username: string;
  password: string;
  role: "owner" | "companion";
}

export interface BookingFlow {
  petId: string;
  petName: string;
  breed: string;
  subscriptionType?: "hourly" | "daily" | "weekly";
  date?: string;
  time?: string;
}

export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}
