import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import UserCard from "@/components/user/UserCard";
import EditUserForm from "@/components/user/EditUserForm";
import DeleteConfirmation from "@/components/user/DeleteConfirmation";
import { CardSkeletonGrid } from "@/components/ui/card-skeleton";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { getUsers } from "@/services/api";
import { usePagination } from "@/hooks/usePagination";
import { useToast } from "@/hooks/use-toast";
import { Search } from "lucide-react";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const { currentPage, totalPages, nextPage, prevPage, setTotalPages } = usePagination();
  const { toast } = useToast();

  // Fetch users when page changes
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getUsers(currentPage);
        setUsers(data.data);
        setFilteredUsers(data.data);
        setTotalPages(data.total_pages);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch users. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage, setTotalPages, toast]);

  // Filter users based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
      setFilteredUsers(filtered);
    }
  }, [searchQuery, users]);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-medium text-neutral-700 mb-4 sm:mb-0">Users List</h2>
        </div>
        
        {loading ? (
          <CardSkeletonGrid />
        ) : filteredUsers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                onEdit={handleEditUser}
                onDelete={handleDeleteUser}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 mx-auto text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-neutral-700">No users found</h3>
            <p className="text-neutral-500 mt-1">Try adjusting your search or filters</p>
          </div>
        )}
        
        {!loading && filteredUsers.length > 0 && (
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={prevPage}
                disabled={currentPage <= 1}
              >
                Previous
              </Button>
              <div className="flex items-center px-4 text-neutral-700">
                <span>{currentPage}</span>
                <span className="mx-1">/</span>
                <span>{totalPages}</span>
              </div>
              <Button
                variant="outline"
                onClick={nextPage}
                disabled={currentPage >= totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </main>
      
      <EditUserForm
        user={selectedUser}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
      
      <DeleteConfirmation
        user={selectedUser}
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </div>
  );
}
