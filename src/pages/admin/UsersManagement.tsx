import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Plus, MoreHorizontal, Edit, Trash2, Shield } from 'lucide-react';
import { useState } from 'react';

const users = [
  { id: '1', name: 'Dr. John Smith', email: 'john.smith@hospital.com', role: 'doctor', department: 'Cardiology', status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah.j@hospital.com', role: 'receptionist', department: 'Front Desk', status: 'active' },
  { id: '3', name: 'Mike Williams', email: 'mike.w@hospital.com', role: 'pharmacist', department: 'Pharmacy', status: 'active' },
  { id: '4', name: 'Dr. Emily Davis', email: 'emily.d@hospital.com', role: 'doctor', department: 'Neurology', status: 'inactive' },
  { id: '5', name: 'James Brown', email: 'james.b@hospital.com', role: 'lab_technician', department: 'Laboratory', status: 'active' },
  { id: '6', name: 'Lisa Anderson', email: 'lisa.a@hospital.com', role: 'accountant', department: 'Finance', status: 'active' },
  { id: '7', name: 'Dr. Robert Wilson', email: 'robert.w@hospital.com', role: 'doctor', department: 'Orthopedics', status: 'active' },
  { id: '8', name: 'Admin User', email: 'admin@hospital.com', role: 'admin', department: 'Administration', status: 'active' },
];

const roleColors: Record<string, string> = {
  admin: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  doctor: 'bg-primary/20 text-primary border-primary/30',
  pharmacist: 'bg-green-500/20 text-green-400 border-green-500/30',
  lab_technician: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  receptionist: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  accountant: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const roleLabels: Record<string, string> = {
  admin: 'Admin',
  doctor: 'Doctor',
  pharmacist: 'Pharmacist',
  lab_technician: 'Lab Tech',
  receptionist: 'Receptionist',
  accountant: 'Accountant',
};

export default function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Users & Roles" subtitle="Manage system users and their permissions">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add User
        </Button>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id} className="hover:bg-secondary/20">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">{user.email}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={roleColors[user.role]}>
                    <Shield className="w-3 h-3 mr-1" />
                    {roleLabels[user.role]}
                  </Badge>
                </TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
