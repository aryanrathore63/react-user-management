import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export default function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-md transition duration-200">
      <CardContent className="p-6">
        <div className="flex flex-col items-center">
          <img 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`} 
            className="h-24 w-24 rounded-full object-cover"
          />
          <h3 className="mt-4 text-lg font-medium text-neutral-700">
            {user.first_name} {user.last_name}
          </h3>
          <p className="text-neutral-500 mt-1">{user.email}</p>
        </div>
        <div className="mt-6 flex space-x-3">
          <Button 
            className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-200"
            onClick={() => onEdit(user)}
          >
            Edit
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 bg-white text-red-500 border border-red-500 py-2 px-4 rounded-md hover:bg-red-50 transition duration-200"
            onClick={() => onDelete(user)}
          >
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
