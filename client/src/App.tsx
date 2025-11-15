import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Login from "@/pages/login";
import Dashboard from "@/pages/dashboard";
import Pets from "@/pages/pets";
import Subscription from "@/pages/subscription";
import Booking from "@/pages/booking";
import Checklist from "@/pages/checklist";
import Review from "@/pages/review";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/pets" component={Pets} />
      <Route path="/subscription" component={Subscription} />
      <Route path="/booking" component={Booking} />
      <Route path="/checklist" component={Checklist} />
      <Route path="/review" component={Review} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
