import React, { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Trash2, Eye, User } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
interface User {
    _id: { $oid: string };
    clerkUserId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: { $date: string };
    updatedAt: { $date: string };
    __v: number;
    role: string;
    lastLogin: string;
    id?: string; // Added for easier access in React
  }
  
  interface AdminDashboardProps {
    handleLogout: () => void;
  }
  
  export default function AdminDashboard({ handleLogout }: AdminDashboardProps) {
    const navigate = useNavigate();
    const [users, setUsers] = useState<User[]>([]);
    const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "" });
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get('http://localhost:4000/get-users');
          // Map the _id to id for easier usage
          const usersWithId = response.data.map((user: User) => ({
            ...user,
            id: user._id.$oid
          }));
          setUsers(usersWithId);
          console.log(usersWithId);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };
      fetchUsers();
    }, []);
  
    const deleteUser = (id: string) => {
      setUsers(users.filter(user => user.id !== id));
    };
  
    const createUser = (e: React.FormEvent) => {
      e.preventDefault();
      if (newUser.firstName && newUser.lastName && newUser.email) {
        const newUserData: User = {
          _id: { $oid: Date.now().toString() },
          clerkUserId: "",
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          createdAt: { $date: new Date().toISOString() },
          updatedAt: { $date: new Date().toISOString() },
          __v: 0,
          role: "User",
          lastLogin: "N/A",
          id: Date.now().toString()
        };
        setUsers([...users, newUserData]);
        setNewUser({ firstName: "", lastName: "", email: "" });
      }
    };
  
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {users.map(user => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.firstName} {user.lastName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">{user.email}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="destructive" onClick={() => deleteUser(user.id!)}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`/user/${user.clerkUserId}`)}
            >
              <Eye className="mr-2 h-4 w-4" />
              View More
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Create New User</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={createUser} className="space-y-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={newUser.firstName}
                  onChange={e => setNewUser({ ...newUser, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={newUser.lastName}
                  onChange={e => setNewUser({ ...newUser, lastName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({ ...newUser, email: e.target.value })}
                  required
                />
              </div>
              <Button type="submit">Create User</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }