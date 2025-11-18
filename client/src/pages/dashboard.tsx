// File: src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  PawPrint,
  Calendar,
  Shield,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import { storage } from "@/lib/storage";
import dashboardHeroImage from "@assets/generated_images/Dashboard_hero_background_9da70534.png";
import Navbar from "@/components/navbar";
import { motion, Variants } from "framer-motion";

/**
 * Playful Dashboard with Option B animations:
 * - Bouncy card entrance
 * - Paw wiggle
 * - Buttons bounce on hover
 * - Staggered content reveal
 */

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
      testId: "card-browse-pets",
    },
    {
      title: "Total Bookings",
      description: "View and manage your bookings",
      action: () => {
        const bookings = storage.getBookings();
        if (bookings.length > 0) {
          alert(`Total ${bookings.length} booking(s) Today`);
        } else {
          setLocation("/pets");
        }
      },
      testId: "card-bookings",
    },
    {
      title: "Safety Guide",
      description: "Learn about pet care safety",
      action: () => setLocation("/checklist"),
      testId: "card-safety",
    },
  ];

  if (!user) return null;

  /* -------------------- Framer motion variants -------------------- */

  // Container stagger for sections
  const containerStagger: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, when: "beforeChildren" },
    },
  };

  // Bouncy entrance for cards / items
  const bounceIn: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.6,
      },
    },
  };

  // Hero title drop-in with playful elastic
  const heroTitle: Variants = {
    hidden: { opacity: 0, y: -30, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 12 },
    },
  };

  // Paw wiggle keyframes using animate prop directly (infinite)
  const pawWiggle = {
    rotate: [0, -12, 10, -6, 6, 0],
    transition: { duration: 1.1, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 },
  };

  // Footer reveal
  const footerVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ------------------------ HERO ------------------------ */}
      <div className="relative min-h-[500px] sm:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dashboardHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#fff5ec]/60 via-[#f2e7dd]/80 to-[#fff5ec]" />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
            style={{ color: "#6d3b1a" }}
            data-testid="text-welcome"
            variants={heroTitle}
            initial="hidden"
            animate="show"
          >
            Welcome back,{" "}
            <motion.span
              key={user.username}
              className="inline-block"
              initial={{ scale: 0.98 }}
              animate={{ scale: [1, 1.02, 1], transition: { duration: 1.2, repeat: Infinity, repeatDelay: 4 } }}
            >
              {user.username}!
            </motion.span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8"
            style={{ color: "#63706b" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Find trusted companions for your furry friends
          </motion.p>

          {/* Search Card with gentle entrance */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.6 }}>
            <Card className="backdrop-blur-lg bg-[#fff5ec]/80 border-[#bfa385] p-8 rounded-3xl shadow-xl">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="text-left flex-1">
                  <h3 className="text-2xl font-semibold mb-2" style={{ color: "#6d3b1a" }}>
                    Start Your Search
                  </h3>
                  <p className="text-sm" style={{ color: "#63706b" }}>
                    Browse available pets, view profiles, and book a visit.
                  </p>
                </div>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    size="lg"
                    className="text-lg px-8 h-14 rounded-xl"
                    style={{ background: "#6d3b1a", color: "#fff", border: "none" }}
                    onClick={() => setLocation("/pets")}
                    data-testid="button-start-search"
                  >
                    Browse Available Pets
                  </Button>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* ------------------------ STATS ------------------------ */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div key={index} variants={bounceIn}>
                <Card className="backdrop-blur-sm bg-[#fff5ec]/90 border-[#bfa385] p-8 rounded-3xl text-center hover:shadow-lg transform-gpu">
                  <motion.div
                    // Paw wiggle only on the paw icon; for others we do a small pop
                    animate={stat.label === "Available Pets" ? pawWiggle : { scale: [1, 1.02, 1] }}
                    transition={{ duration: 1.2 }}
                    className="mx-auto mb-4"
                    style={{ display: "inline-block" }}
                  >
                    <Icon className="w-12 h-12" style={{ color: "#6d3b1a" }} />
                  </motion.div>

                  <h3 className="text-4xl font-bold mb-2" style={{ color: "#6d3b1a" }}>
                    {stat.value}
                  </h3>
                  <p className="text-base" style={{ color: "#63706b" }}>
                    {stat.label}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ------------------------ QUICK ACTIONS ------------------------ */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8" style={{ color: "#6d3b1a" }}>
            Quick Actions
          </h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerStagger}
            initial="hidden"
            animate="show"
          >
            {quickActions.map((action, index) => (
              <motion.div
                key={index}
                variants={bounceIn}
                whileHover={{ y: -6, boxShadow: "0 14px 30px rgba(0,0,0,0.06)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="backdrop-blur-sm bg-[#fff5ec]/90 border-[#bfa385] p-6 md:p-8 rounded-3xl cursor-pointer"
                  onClick={action.action}
                  data-testid={action.testId}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-0">
                      <motion.div
                        whileHover={{ rotate: [0, -8, 8, -6, 6, 0], transition: { duration: 0.7 } }}
                        className="bg-[#fffaf3] p-3 rounded-lg shadow-sm"
                      >
                        {/* small playful paw icon in corner */}
                        <PawPrint className="w-6 h-6" style={{ color: "#6d3b1a" }} />
                      </motion.div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-1" style={{ color: "#6d3b1a" }}>
                        {action.title}
                      </h3>
                      <p className="text-sm mb-4" style={{ color: "#63706b" }}>
                        {action.description}
                      </p>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          variant="secondary"
                          className="w-full rounded-xl"
                          style={{ background: "#63706b", color: "#fff" }}
                          data-testid={`button-${action.testId}`}
                          onClick={action.action}
                        >
                          Get Started
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ------------------------ FOOTER ------------------------ */}
      <motion.footer
        className="bg-[#6d3b1a] text-white py-12 mt-12"
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand / Info */}
          <div>
            <h2 className="text-3xl font-bold mb-4">PawConnect</h2>
            <p className="text-[#f3e7dc]">
              Your trusted partner for safe and loving pet care. Book, connect, and care with PawConnect.
            </p>

            {/* small callout */}
            <motion.div
              className="mt-6 inline-flex items-center gap-3 bg-[#7f5a37]/10 px-3 py-2 rounded-full"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 6 }}
            >
              <PawPrint className="w-5 h-5 text-[#f3e7dc]" />
              <span className="text-sm text-[#f3e7dc]">Enjoy playful meets & trusted sitters</span>
            </motion.div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-[#f3e7dc]">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1" />
                <div>
                  <strong>PawConnect Meeting Space</strong>
                  <div className="text-sm">MG Road, Bengaluru, Karnataka, India</div>
                </div>
              </li>

              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5" />
                <a href="tel:+919876543210" className="text-[#f3e7dc]">+91 98765 43210</a>
              </li>

              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5" />
                <a href="mailto:support@pawconnect.com" className="text-[#f3e7dc]">support@pawconnect.com</a>
              </li>

              <li className="flex items-center gap-3">
                <Clock className="w-5 h-5" />
                <span>Mon - Sun: 9:00 AM – 9:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Social & Extra */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect & Visit</h3>

            <div className="flex gap-4 mb-6">
              <a href="#" className="p-3 bg-[#8a552d] rounded-full hover:bg-[#a16a3d] transition">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-3 bg-[#8a552d] rounded-full hover:bg-[#a16a3d] transition">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="p-3 bg-[#8a552d] rounded-full hover:bg-[#a16a3d] transition">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>

            <Card className="bg-[#fff5ec]/10 border-[#bfa385] p-4 rounded-2xl">
              <h4 className="text-sm font-semibold mb-2" style={{ color: "#f3e7dc" }}>
                PawConnect Meeting Space
              </h4>
              <p className="text-xs" style={{ color: "#e9d6c2" }}>
                Friendly drop-in location for meet & greets, small events, and consultations. Wheelchair accessible.
              </p>
              <div className="mt-3">
                <Button
                  className="w-full rounded-xl"
                  onClick={() => alert("Need to Update in Map, soon it will be updated)") }
                  style={{ background: "#6d3b1a", color: "#fff" }}
                >
                  Get Directions
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <div className="mt-10 text-center text-[#e8d3bf] text-sm">
          © {new Date().getFullYear()} PawConnect. All rights reserved.
        </div>
      </motion.footer>
    </div>
  );
}
