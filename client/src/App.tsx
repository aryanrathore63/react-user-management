import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import LoginPage from "@/pages/LoginPage";
import UsersPage from "@/pages/UsersPage";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";

function Router() {
  const [location, setLocation] = useLocation();
  const isAuthenticated = localStorage.getItem("token") !== null;

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected routes
    if (!isAuthenticated && location !== "/") {
      setLocation("/");
    }
    
    // Redirect to users page if already authenticated and on login page
    if (isAuthenticated && location === "/") {
      setLocation("/users");
    }
  }, [isAuthenticated, location, setLocation]);

  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route path="/users" component={UsersPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
