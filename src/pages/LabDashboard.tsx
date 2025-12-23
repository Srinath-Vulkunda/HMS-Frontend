import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { 
  TestTube, 
  Clock, 
  CheckCircle, 
  FileText,
  Search,
  AlertCircle,
  Upload
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const stats = [
  { title: 'Pending Tests', value: '18', icon: Clock, variant: 'warning' as const },
  { title: 'In Progress', value: '5', icon: TestTube, variant: 'info' as const },
  { title: 'Completed Today', value: '42', change: { value: 8, type: 'increase' as const }, icon: CheckCircle, variant: 'success' as const },
  { title: 'Pending Verification', value: '7', icon: FileText, variant: 'primary' as const },
];

const testRequests = [
  { id: '1', patientName: 'Sarah Johnson', testType: 'Complete Blood Count', doctor: 'Dr. Chen', priority: 'normal' as const, status: 'pending' as const, time: '09:00 AM' },
  { id: '2', patientName: 'David Williams', testType: 'Lipid Profile', doctor: 'Dr. Brown', priority: 'urgent' as const, status: 'in-progress' as const, time: '09:15 AM', progress: 65 },
  { id: '3', patientName: 'Maria Garcia', testType: 'Thyroid Function', doctor: 'Dr. Wilson', priority: 'normal' as const, status: 'completed' as const, time: '08:30 AM' },
  { id: '4', patientName: 'Robert Brown', testType: 'Blood Sugar Fasting', doctor: 'Dr. Taylor', priority: 'normal' as const, status: 'pending' as const, time: '09:30 AM' },
  { id: '5', patientName: 'Jennifer Davis', testType: 'Liver Function', doctor: 'Dr. Chen', priority: 'urgent' as const, status: 'pending' as const, time: '09:45 AM' },
];

const statusConfig = {
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  'in-progress': { label: 'In Progress', className: 'bg-info/10 text-info border-info/20' },
  completed: { label: 'Completed', className: 'bg-success/10 text-success border-success/20' },
};

const priorityConfig = {
  normal: { label: 'Normal', className: 'bg-secondary text-secondary-foreground' },
  urgent: { label: 'Urgent', className: 'bg-destructive/10 text-destructive border-destructive/20' },
};

export default function LabDashboard() {
  return (
    <DashboardLayout title="Lab Dashboard" subtitle="Manage test requests and results">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className={`stagger-${index + 1}`}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Test Requests */}
      <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground">Test Requests</h2>
            <p className="text-sm text-muted-foreground">Manage laboratory test requests</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search tests..." className="w-64 pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
          </div>
        </div>

        <div className="space-y-3">
          {testRequests.map((test, index) => {
            const statusCfg = statusConfig[test.status];
            const priorityCfg = priorityConfig[test.priority];

            return (
              <div
                key={test.id}
                className={cn(
                  "flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer group",
                  `stagger-${index + 1}`
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center",
                  test.priority === 'urgent' ? "bg-destructive/10" : "bg-primary/10"
                )}>
                  <TestTube className={cn(
                    "w-6 h-6",
                    test.priority === 'urgent' ? "text-destructive" : "text-primary"
                  )} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{test.patientName}</p>
                    {test.priority === 'urgent' && (
                      <AlertCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{test.testType}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{test.doctor} • {test.time}</p>
                  
                  {test.status === 'in-progress' && test.progress && (
                    <div className="mt-2 flex items-center gap-2">
                      <Progress value={test.progress} className="h-1.5 flex-1" />
                      <span className="text-xs text-muted-foreground">{test.progress}%</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={priorityCfg.className}>
                    {priorityCfg.label}
                  </Badge>
                  <Badge variant="outline" className={statusCfg.className}>
                    {statusCfg.label}
                  </Badge>
                </div>

                {test.status === 'pending' && (
                  <Button size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity gradient-primary text-primary-foreground">
                    Start Test
                  </Button>
                )}

                {test.status === 'completed' && (
                  <Button size="sm" variant="outline" className="opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                    <Upload className="w-4 h-4" />
                    Upload
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
