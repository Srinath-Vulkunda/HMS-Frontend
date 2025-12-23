import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Users, Stethoscope, Building2, Edit, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const departments = [
  { id: '1', name: 'Cardiology', head: 'Dr. John Smith', doctors: 8, patients: 145, status: 'active' },
  { id: '2', name: 'Neurology', head: 'Dr. Emily Davis', doctors: 6, patients: 89, status: 'active' },
  { id: '3', name: 'Orthopedics', head: 'Dr. Robert Wilson', doctors: 5, patients: 112, status: 'active' },
  { id: '4', name: 'Pediatrics', head: 'Dr. Sarah Chen', doctors: 7, patients: 203, status: 'active' },
  { id: '5', name: 'Dermatology', head: 'Dr. Michael Brown', doctors: 4, patients: 67, status: 'active' },
  { id: '6', name: 'Oncology', head: 'Dr. Lisa Anderson', doctors: 6, patients: 54, status: 'active' },
  { id: '7', name: 'Emergency', head: 'Dr. James Miller', doctors: 12, patients: 320, status: 'active' },
  { id: '8', name: 'Radiology', head: 'Dr. Karen White', doctors: 5, patients: 0, status: 'active' },
];

export default function Departments() {
  return (
    <DashboardLayout title="Departments" subtitle="Manage hospital departments">
      {/* Actions Bar */}
      <div className="flex justify-end mb-6">
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Department
        </Button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {departments.map((dept, index) => (
          <div
            key={dept.id}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 stagger-${(index % 4) + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary-foreground" />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <h3 className="font-display font-semibold text-lg text-foreground mb-1">{dept.name}</h3>
            <p className="text-sm text-muted-foreground mb-4">{dept.head}</p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{dept.doctors}</span>
                <span className="text-xs text-muted-foreground">Doctors</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium">{dept.patients}</span>
                <span className="text-xs text-muted-foreground">Patients</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/30">
                {dept.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
