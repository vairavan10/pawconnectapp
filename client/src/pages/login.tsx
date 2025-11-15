import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import loginHeroImage from "@assets/generated_images/Login_hero_pet_owner_60d14351.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [role, setRole] = useState<"owner" | "companion">("owner");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      return;
    }
    
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username: username.trim(),
      password,
      role,
    };
    
    storage.setUser(user);
    setLocation("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero Image */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${loginHeroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        <div className="relative z-10 flex items-end p-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Welcome to PawConnect</h1>
            <p className="text-lg text-white/90">Find trusted companions for your furry friends</p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary" data-testid="text-app-title">PawConnect</h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2">Connect with pet care you can trust</p>
          </div>

          {/* Role Toggle */}
          <div className="flex gap-2 mb-8 p-1 bg-muted rounded-2xl">
            <button
              type="button"
              onClick={() => setRole("owner")}
              data-testid="button-role-owner"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                role === "owner"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover-elevate"
              }`}
            >
              Pet Owner
            </button>
            <button
              type="button"
              onClick={() => setRole("companion")}
              data-testid="button-role-companion"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                role === "companion"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover-elevate"
              }`}
            >
              Pet Companion
            </button>
          </div>

          {/* Login Form - Glassmorphic Card */}
          <form onSubmit={handleLogin} className="space-y-6 backdrop-blur-sm bg-card/50 p-6 sm:p-8 rounded-3xl border border-card-border shadow-lg">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
                className="h-12 rounded-xl"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl"
              data-testid="button-login"
            >
              Sign In as {role === "owner" ? "Pet Owner" : "Pet Companion"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            New to PawConnect?{" "}
            <button className="text-primary font-semibold hover:underline">
              Create an account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
