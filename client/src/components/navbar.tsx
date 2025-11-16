import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { storage } from "@/lib/storage";
import pawLogo from "@assets/generated_images/pawlogo.png"; // Your logo image

export default function Navbar() {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    storage.clearUser();
    setLocation("/");
  };

  const navLinks = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/pets", label: "Browse Pets" },
    { href: "/checklist", label: "Safety Guide" },
    { href: "/review", label: "Reviews" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-lg bg-[#fff5ec]/90 border-b border-[#bfa385] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/dashboard">
            <a className="flex items-center gap-2" data-testid="link-logo">
              <img
                src={pawLogo}
                alt="PawConnect Logo"
                className="w-21 h-40"
                style={{ filter: "drop-shadow(0 1px 4px #bfa385)" }}
              />
            </a>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <a
                  className={`px-4 py-2 rounded-xl font-medium tracking-tight transition-all duration-200 ${
                    location === link.href
                      ? "bg-[#6d3b1a] text-white shadow"
                      : "text-[#63706b] hover:bg-[#f2e7dd] hover:text-[#6d3b1a]"
                  }`}
                  style={{ fontFamily: "Inter, var(--font-sans)", fontSize: "1.08rem" }}
                  data-testid={`link-${link.label.toLowerCase().replace(' ', '-')}`}
                >
                  {link.label}
                </a>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              data-testid="button-logout"
              style={{ color: "#6d3b1a" }}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-xl hover:bg-[#f2e7dd] transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
            style={{ color: "#6d3b1a" }}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-medium tracking-tight transition-all duration-200 ${
                      location === link.href
                        ? "bg-[#6d3b1a] text-white shadow"
                        : "text-[#63706b] hover:bg-[#f2e7dd] hover:text-[#6d3b1a]"
                    }`}
                    style={{ fontFamily: "Inter, var(--font-sans)", fontSize: "1.08rem" }}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(' ', '-')}`}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 rounded-xl font-medium text-[#63706b] hover:bg-[#f2e7dd] flex items-center gap-2"
                data-testid="button-mobile-logout"
              >
                <LogOut className="w-5 h-5" /> Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
