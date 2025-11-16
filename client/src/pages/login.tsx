import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { storage } from "@/lib/storage";
import loginHeroImage from "@assets/generated_images/Login_hero_pet_owner_60d14351.png";
import pawLogo from "@assets/generated_images/paw.png"; // use your jpg/png as appropriate

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
        <div className="absolute inset-0 bg-gradient-to-r from-[#6d3b1a]/20 to-transparent" />
        <div className="relative z-10 flex items-end p-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Welcome to PawConnect
            </h1>
            <p className="text-lg text-white/90">
              Find trusted companions for your furry friends
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-1 sm:p-1 bg-background">
        <div className="w-full max-w-md">
          {/* Logo & Heading */}
          <div className="flex flex-col items-center mb-3">
            <div className="flex items-center justify-center">
              <img
                src={pawLogo}
                alt="Paw Logo"
                className="w-16 h-16"
                // style={{ filter: "drop-shadow(0 1px 4px #bfa385)" }} // gentle brown shadow
              />
              <h2
                className="text-3xl sm:text-4xl font-extrabold tracking-tight"
                style={{
                  color: "#6d3b1a",
                  letterSpacing: "0.02em"
                }}
                data-testid="text-app-title"
              >
                Paw
                <span style={{ color: "#63706b" }}>Connect</span>
              </h2>
            </div>
            <p className="text-sm sm:text-base font-medium mt-1" style={{ color: "#63706b" }}>
              Connecting hearts, through Paws
            </p>
          </div>

          {/* Role Toggle */}
          <div className="flex gap-2 mb-8 p-1" style={{ background: "#f2e7dd" , borderRadius:"1.5rem" }}>
            <button
              type="button"
              onClick={() => setRole("owner")}
              data-testid="button-role-owner"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                role === "owner"
                  ? "shadow-sm"
                  : ""
              }`}
              style={
                role === "owner"
                  ? {
                      background: "#6d3b1a",
                      color: "#fff"
                    }
                  : {
                      color: "#6d3b1a",
                      background: "transparent"
                    }
              }
            >
              Pet Owner
            </button>
            <button
              type="button"
              onClick={() => setRole("companion")}
              data-testid="button-role-companion"
              className={`flex-1 py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
                role === "companion"
                  ? "shadow-sm"
                  : ""
              }`}
              style={
                role === "companion"
                  ? {
                      background: "#63706b",
                      color: "#fff"
                    }
                  : {
                      color: "#63706b",
                      background: "transparent"
                    }
              }
            >
              Pet Companion
            </button>
          </div>

          {/* Login Form - Glassmorphic Card */}
          <form
            onSubmit={handleLogin}
            className="space-y-6 backdrop-blur-sm bg-card/50 p-6 sm:p-8 rounded-3xl border border-card-border shadow-lg"
          >
            <div className="space-y-2">
              <Label
                htmlFor="username"
                style={{ color: "#6d3b1a", fontWeight: 600 }}
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                data-testid="input-username"
                className="h-12 rounded-xl"
                style={{ borderColor: "#bfa385" }}
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                style={{ color: "#63706b", fontWeight: 600 }}
              >
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                data-testid="input-password"
                className="h-12 rounded-xl"
                style={{ borderColor: "#bfa385" }}
              />
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-semibold rounded-xl"
              style={{
                background: "#6d3b1a",
                color: "#fff",
                border: "none"
              }}
              data-testid="button-login"
            >
              Sign In as {role === "owner" ? "Pet Owner" : "Pet Companion"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
