import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LogOut, Search } from "lucide-react";

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <h1 className="text-xl font-medium text-neutral-700">User Management</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 pl-3 pr-10 py-2"
              />
              <div className="absolute right-3 top-2.5 text-gray-400">
                <Search size={18} />
              </div>
            </div>
            <Button
              variant="ghost"
              onClick={logout}
              className="text-neutral-700 hover:text-primary flex items-center space-x-2"
            >
              <span className="hidden sm:inline">Logout</span>
              <LogOut size={18} />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
