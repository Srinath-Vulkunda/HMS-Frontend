import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { 
  Pill, 
  Package, 
  AlertTriangle, 
  FileText,
  Search,
  CheckCircle,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const stats = [
  { title: 'Total Medicines', value: '2,845', icon: Pill, variant: 'primary' as const },
  { title: 'Low Stock Items', value: '24', icon: Package, variant: 'warning' as const },
  { title: 'Expiring Soon', value: '8', icon: AlertTriangle, variant: 'destructive' as const },
  { title: "Today's Dispensed", value: '156', change: { value: 12, type: 'increase' as const }, icon: FileText, variant: 'success' as const },
];

const prescriptionQueue = [
  { id: '1', patientName: 'Sarah Johnson', doctor: 'Dr. Chen', time: '09:15 AM', items: 3, status: 'pending' as const },
  { id: '2', patientName: 'David Williams', doctor: 'Dr. Brown', time: '09:30 AM', items: 2, status: 'pending' as const },
  { id: '3', patientName: 'Maria Garcia', doctor: 'Dr. Wilson', time: '09:45 AM', items: 5, status: 'processing' as const },
  { id: '4', patientName: 'Robert Brown', doctor: 'Dr. Taylor', time: '10:00 AM', items: 1, status: 'completed' as const },
];

const alerts = [
  { id: '1', type: 'stock' as const, title: 'Paracetamol 500mg', description: 'Only 45 units remaining (Min: 100)', time: '5 minutes ago' },
  { id: '2', type: 'stock' as const, title: 'Amoxicillin 250mg', description: 'Only 28 units remaining (Min: 50)', time: '15 minutes ago' },
  { id: '3', type: 'urgent' as const, title: 'Insulin Expiring', description: 'Batch #4521 expires in 7 days', time: '1 hour ago' },
];

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20', icon: Clock },
  processing: { label: 'Processing', className: 'bg-info/10 text-info border-info/20', icon: Package },
  completed: { label: 'Completed', className: 'bg-success/10 text-success border-success/20', icon: CheckCircle },
};

export default function PharmacyDashboard() {
  return (
    <DashboardLayout title="Pharmacy Dashboard" subtitle="Manage prescriptions and inventory">
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
        {/* Prescription Queue - 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display font-semibold text-lg text-foreground">Prescription Queue</h2>
                <p className="text-sm text-muted-foreground">Prescriptions awaiting dispensing</p>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search prescriptions..." className="w-64 pl-10" />
              </div>
            </div>

            <div className="space-y-3">
              {prescriptionQueue.map((rx, index) => {
                const config = statusConfig[rx.status];
                const StatusIcon = config.icon;

                return (
                  <div
                    key={rx.id}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group",
                      `stagger-${index + 1}`
                    )}
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{rx.patientName}</p>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">{rx.doctor}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {rx.time} • {rx.items} item{rx.items > 1 ? 's' : ''}
                      </p>
                    </div>

                    <Badge variant="outline" className={cn("gap-1", config.className)}>
                      <StatusIcon className="w-3 h-3" />
                      {config.label}
                    </Badge>

                    {rx.status !== 'completed' && (
                      <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gradient-primary text-primary-foreground">
                        Dispense
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Alerts */}
        <div>
          <AlertsPanel alerts={alerts} title="Stock Alerts" />
        </div>
      </div>
    </DashboardLayout>
  );
}
