import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AppointmentsList } from '@/components/dashboard/AppointmentsList';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  Users, 
  Calendar, 
  UserPlus, 
  Clock,
  Ticket,
  Stethoscope,
  Search
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const stats = [
  { title: "Today's Registrations", value: '28', change: { value: 12, type: 'increase' as const }, icon: UserPlus, variant: 'primary' as const },
  { title: 'Appointments Booked', value: '45', change: { value: 8, type: 'increase' as const }, icon: Calendar, variant: 'success' as const },
  { title: 'Current Queue', value: '12', icon: Users, variant: 'info' as const },
  { title: 'Avg Wait Time', value: '15 min', change: { value: 3, type: 'decrease' as const }, icon: Clock, variant: 'warning' as const },
];

const appointments = [
  { id: '1', patientName: 'Sarah Johnson', time: '09:00 AM', type: 'General Checkup', status: 'completed' as const, doctor: 'Dr. Chen' },
  { id: '2', patientName: 'David Williams', time: '09:30 AM', type: 'Follow-up', status: 'in-progress' as const, doctor: 'Dr. Brown' },
  { id: '3', patientName: 'Maria Garcia', time: '10:00 AM', type: 'Consultation', status: 'waiting' as const, doctor: 'Dr. Wilson' },
  { id: '4', patientName: 'Robert Brown', time: '10:30 AM', type: 'Lab Results', status: 'waiting' as const, doctor: 'Dr. Taylor' },
];

const quickActions = [
  { label: 'New Patient', description: 'Register patient', icon: UserPlus, variant: 'primary' as const },
  { label: 'Book Appointment', description: 'Schedule visit', icon: Calendar, variant: 'success' as const },
  { label: 'Generate Token', description: 'Queue token', icon: Ticket, variant: 'info' as const },
  { label: 'Find Doctor', description: 'Check availability', icon: Stethoscope, variant: 'warning' as const },
];

const currentQueue = [
  { token: 'A-012', patient: 'Sarah Johnson', doctor: 'Dr. Chen', department: 'Cardiology', status: 'in-consultation' as const },
  { token: 'A-013', patient: 'David Williams', doctor: 'Dr. Brown', department: 'General', status: 'waiting' as const },
  { token: 'A-014', patient: 'Maria Garcia', doctor: 'Dr. Wilson', department: 'Orthopedics', status: 'waiting' as const },
  { token: 'A-015', patient: 'Robert Brown', doctor: 'Dr. Taylor', department: 'Neurology', status: 'waiting' as const },
  { token: 'A-016', patient: 'Jennifer Davis', doctor: 'Dr. Chen', department: 'Cardiology', status: 'waiting' as const },
];

const queueStatusConfig = {
  'in-consultation': { label: 'In Consultation', className: 'bg-success/10 text-success border-success/20' },
  waiting: { label: 'Waiting', className: 'bg-warning/10 text-warning border-warning/20' },
};

export default function ReceptionDashboard() {
  return (
    <DashboardLayout title="Reception Dashboard" subtitle="Manage patient registration and appointments">
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
        {/* Current Queue - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground">Current Queue</h2>
                <p className="text-sm text-muted-foreground">Live patient queue status</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Ticket className="w-4 h-4" />
                Generate Token
              </Button>
            </div>

            <div className="space-y-3">
              {currentQueue.map((item, index) => {
                const config = queueStatusConfig[item.status];

                return (
                  <div
                    key={item.token}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer",
                      item.status === 'in-consultation' && "ring-2 ring-success/30 bg-success/5",
                      `stagger-${index + 1}`
                    )}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex items-center justify-center font-display font-bold text-lg",
                      item.status === 'in-consultation' 
                        ? "bg-success/20 text-success" 
                        : "bg-primary/10 text-primary"
                    )}>
                      {item.token}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground">{item.patient}</p>
                      <p className="text-sm text-muted-foreground">{item.doctor} • {item.department}</p>
                    </div>

                    <Badge variant="outline" className={config.className}>
                      {config.label}
                    </Badge>

                    <Button size="sm" variant="ghost" className="text-muted-foreground">
                      Call
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <QuickActions actions={quickActions} />
          
          {/* Doctor Availability Mini Card */}
          <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
            <h2 className="font-display font-semibold text-lg text-foreground mb-4">Doctor Availability</h2>
            <div className="space-y-3">
              {[
                { name: 'Dr. Chen', dept: 'Cardiology', available: true },
                { name: 'Dr. Brown', dept: 'General', available: true },
                { name: 'Dr. Wilson', dept: 'Orthopedics', available: false },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.dept}</p>
                  </div>
                  <div className={cn(
                    "w-2 h-2 rounded-full",
                    doc.available ? "bg-success animate-pulse" : "bg-muted-foreground"
                  )} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
