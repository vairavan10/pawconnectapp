# PawConnect Design Guidelines

## Design Approach
**Reference-Based**: Drawing inspiration from Airbnb (booking flow), Rover (pet profiles), and modern glassmorphism trends. This app requires emotional connection through visuals while maintaining professional booking functionality.

## Typography System
- **Primary Font**: 'Inter' or 'Poppins' from Google Fonts (modern, friendly)
- **Display/Headers**: 600-700 weight, 2.5rem-4rem for hero, 1.5rem-2rem for section titles
- **Body Text**: 400-500 weight, 1rem base with 1.5 line-height
- **Buttons/CTAs**: 600 weight, 0.875rem-1rem, uppercase with letter-spacing

## Layout System
**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Container max-width: 1280px (max-w-7xl)
- Section padding: py-16 to py-24 (desktop), py-12 (mobile)
- Card spacing: p-6 to p-8
- Grid gaps: gap-6 to gap-8

## Component Library

### Login Page
- **Split-screen layout**: Left side with hero image of happy pets/owners, right side with login form
- Glassmorphic login card: backdrop-blur with subtle border, floating above background
- Toggle between "Pet Owner" and "Pet Companion" with animated slider indicator
- Input fields with subtle glassmorphic styling, rounded-2xl borders
- Animated gradient CTA button with smooth transitions

### Dashboard/Home
- **Hero Section** (80vh): Full-width background image of pets and companions, overlay with glassmorphic search/filter card
- Stats section: 3-column grid showing "Available Pets", "Happy Owners", "Trusted Companions" with animated counters
- Quick action cards: glassmorphic tiles for "Browse Pets", "My Bookings", "Safety Guide"

### Pet Profiles Gallery
- **Masonry/Grid Layout**: 3-column on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3), single column mobile
- **Pet Cards**: 
  - Featured pet image (16:9 aspect ratio), rounded-3xl with overflow-hidden
  - Glassmorphic overlay on hover revealing breed, age, behavior tags
  - Availability badge (top-right corner, glassmorphic pill)
  - Smooth scale transform on hover (scale-105)
  - Click expands to full-screen modal with detailed profile

### Pet Details Modal
- Full-screen overlay with backdrop-blur
- Centered glassmorphic card (max-w-4xl)
- Two-column layout: Large pet image gallery left, details/CTA right
- Smooth slide-up animation on open
- "Book Now" CTA prominently placed

### Subscription Flow
- **Multi-step wizard** with progress indicator (glassmorphic pills)
- Step 1: Breed selection grid with image cards
- Step 2: Pricing tiers in 3-column layout:
  - "Hourly", "Daily", "Weekly" cards with glassmorphic borders
  - Selected plan gets accent glow effect
  - Each card shows: price, duration, features list, "Choose Plan" button
- Smooth slide transitions between steps

### Booking Scheduler
- Calendar widget with glassmorphic styling
- Time slot grid (4-column for hours)
- Selected date/time highlights with smooth transitions
- Confirmation modal: Celebration animation (confetti or checkmark), booking summary card, "Done" CTA

### Safety Checklist
- Vertical list of checkbox items with custom checkbox styling
- Each checked item gets smooth checkmark animation
- Progress bar at top showing completion percentage
- "All Complete" celebration when 100% with animated badge

### Ratings & Feedback
- Star rating widget: Large, interactive stars with smooth fill animation
- Textarea with glassmorphic styling
- Testimonials section: 2-column grid of glassmorphic cards with star ratings, user avatars (initials), feedback text

## Navigation
- **Sticky navbar**: Glassmorphic with backdrop-blur, transitions from transparent to solid on scroll
- Logo left, nav links center, profile/logout right
- Mobile: Hamburger menu with slide-in drawer
- Active page indicator with smooth underline animation

## Glassmorphism Implementation
- **Standard Glass Card**: backdrop-blur-lg, semi-transparent background, subtle border (1px white/10% opacity)
- Border radius: rounded-2xl to rounded-3xl consistently
- Layering: Use subtle shadows (shadow-xl) for depth
- Hover states: Increase blur intensity, scale slightly

## Animations & Interactions
- **Page transitions**: Fade-in + slide-up (300-400ms)
- **Card hovers**: scale-105, shadow increase (200ms ease)
- **Button interactions**: Scale-down on click (scale-95), smooth transitions
- **Modal open**: Backdrop fade + card slide-up from bottom
- **Success states**: Checkmark icon with bounce animation

## Images
**Required Images:**
1. **Login Hero** (left split): Happy pet owner with dog, warm outdoor setting
2. **Dashboard Hero**: Wide shot of diverse pets (dogs, cats) with companions in park
3. **Pet Profile Images**: Individual pet photos (high-quality, well-lit, various breeds)
4. **Testimonial Avatars**: Use initials in circular glassmorphic badges

## Responsive Behavior
- Mobile: Single column, full-width cards, simplified navigation
- Tablet: 2-column grids, maintain glassmorphic effects
- Desktop: Full 3-column layouts, enhanced hover effects
- Touch devices: Replace hover states with active/tap states