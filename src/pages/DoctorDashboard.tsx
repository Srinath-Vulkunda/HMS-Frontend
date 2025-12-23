import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AppointmentsList } from '@/components/dashboard/AppointmentsList';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Calendar, 
  FileText,
  Clock,
  ClipboardList,
  TestTube,
  Pill,
  UserCheck
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stats = [
  { title: "Today's Appointments", value: '12', change: { value: 2, type: 'increase' as const }, icon: Calendar, variant: 'primary' as const },
  { title: 'Patients Seen', value: '8', change: { value: 15, type: 'increase' as const }, icon: UserCheck, variant: 'success' as const },
  { title: 'Pending Reports', value: '3', icon: FileText, variant: 'warning' as const },
  { title: 'Avg Wait Time', value: '12 min', change: { value: 5, type: 'decrease' as const }, icon: Clock, variant: 'info' as const },
];

const appointments = [
  { id: '1', patientName: 'Sarah Johnson', time: '09:00 AM', type: 'General Checkup', status: 'completed' as const },
  { id: '2', patientName: 'David Williams', time: '09:30 AM', type: 'Follow-up', status: 'completed' as const },
  { id: '3', patientName: 'Maria Garcia', time: '10:00 AM', type: 'Consultation', status: 'in-progress' as const },
  { id: '4', patientName: 'Robert Brown', time: '10:30 AM', type: 'Lab Results', status: 'waiting' as const },
  { id: '5', patientName: 'Jennifer Davis', time: '11:00 AM', type: 'Prescription', status: 'waiting' as const },
  { id: '6', patientName: 'Michael Taylor', time: '11:30 AM', type: 'Follow-up', status: 'waiting' as const },
];

const quickActions = [
  { label: 'New Prescription', description: 'Create prescription', icon: ClipboardList, variant: 'primary' as const },
  { label: 'Order Lab Test', description: 'Request lab work', icon: TestTube, variant: 'success' as const },
  { label: 'View Patients', description: 'Patient history', icon: Users, variant: 'info' as const },
  { label: 'Refer Patient', description: 'Send referral', icon: Pill, variant: 'warning' as const },
];

const recentPatients = [
  { name: 'Sarah Johnson', age: 34, lastVisit: 'Today', condition: 'Hypertension' },
  { name: 'David Williams', age: 52, lastVisit: 'Today', condition: 'Diabetes Type 2' },
  { name: 'Maria Garcia', age: 28, lastVisit: 'Yesterday', condition: 'Migraine' },
];

export default function DoctorDashboard() {
  const { user } = useAuth();

  return (
    <DashboardLayout title="Doctor Dashboard" subtitle={`Good morning, ${user?.name}!`}>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className={`stagger-${index + 1}`}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments Timeline - 2 columns */}
        <div className="lg:col-span-2">
          <AppointmentsList appointments={appointments} title="Today's Schedule" />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <QuickActions actions={quickActions} />

          {/* Recent Patients */}
          <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-lg text-foreground">Recent Patients</h2>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                View All
              </Button>
            </div>

            <div className="space-y-3">
              {recentPatients.map((patient, index) => (
                <div
                  key={patient.name}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer",
                    `stagger-${index + 1}`
                  )}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {patient.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground text-sm">{patient.name}</p>
                    <p className="text-xs text-muted-foreground">{patient.age} yrs • {patient.lastVisit}</p>
                  </div>
                  <Badge variant="outline" className="bg-secondary/50">
                    {patient.condition}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
