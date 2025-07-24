import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Users, 
  UserPlus, 
  Edit3, 
  Trash2, 
  Shield, 
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAllUsers } from "@/contexts/AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user" | "consultant";
  location?: string;
  phone?: string;
  createdAt: string;
  lastActive: string;
  status: "active" | "suspended" | "pending";
}

const AdminUserManagement = () => {
  const [users, setUsers] = useState<User[]>(getAllUsers());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleRoleChange = (userId: string, newRole: "admin" | "user" | "consultant") => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    toast({
      title: "Role Updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleStatusChange = (userId: string, newStatus: "active" | "suspended" | "pending") => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    toast({
      title: "Status Updated", 
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
    toast({
      title: "User Deleted",
      description: "User has been permanently removed from the system.",
      variant: "destructive",
    });
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin": return Shield;
      case "consultant": return User;
      default: return User;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin": return "default";
      case "consultant": return "secondary";
      default: return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return CheckCircle;
      case "suspended": return XCircle;
      case "pending": return Clock;
      default: return Clock;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-success";
      case "suspended": return "text-danger";
      case "pending": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Management</h2>
          <p className="text-muted-foreground">Manage users and assign roles</p>
        </div>
        <Button variant="hero">
          <UserPlus className="h-4 w-4 mr-2" />
          Add New User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters & Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="search">Search Users</Label>
              <Input
                id="search"
                placeholder="Name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="role-filter">Filter by Role</Label>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All roles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="consultant">Consultant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Users className="h-4 w-4 mr-2" />
                {filteredUsers.length} Users
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-4">
        {filteredUsers.map((user) => {
          const RoleIcon = getRoleIcon(user.role);
          const StatusIcon = getStatusIcon(user.status);
          
          return (
            <Card key={user.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center">
                      <RoleIcon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{user.name}</h3>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role}
                        </Badge>
                        <div className={`flex items-center space-x-1 ${getStatusColor(user.status)}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="text-xs capitalize">{user.status}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </span>
                        {user.location && (
                          <span className="flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {user.location}
                          </span>
                        )}
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Joined {user.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    {/* Role Change */}
                    <Select
                      value={user.role}
                      onValueChange={(value: "admin" | "user" | "consultant") => 
                        handleRoleChange(user.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="consultant">Consultant</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Status Change */}
                    <Select
                      value={user.status}
                      onValueChange={(value: "active" | "suspended" | "pending") => 
                        handleStatusChange(user.id, value)
                      }
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>

                    {/* Actions */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsEditOpen(true);
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {user.phone && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {user.phone}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Edit User Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Update user information and permissions
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Full Name</Label>
                <Input id="edit-name" defaultValue={selectedUser.name} />
              </div>
              <div>
                <Label htmlFor="edit-email">Email</Label>
                <Input id="edit-email" defaultValue={selectedUser.email} />
              </div>
              <div>
                <Label htmlFor="edit-phone">Phone</Label>
                <Input id="edit-phone" defaultValue={selectedUser.phone} />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input id="edit-location" defaultValue={selectedUser.location} />
              </div>
              <div className="flex space-x-2">
                <Button variant="hero" className="flex-1">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUserManagement;