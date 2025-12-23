import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, CheckCircle, XCircle, ArrowRight, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

const queueData = [
  { token: 1, patient: 'Sarah Johnson', doctor: 'Dr. John Smith', department: 'Cardiology', time: '09:00 AM', status: 'completed' },
  { token: 2, patient: 'David Williams', doctor: 'Dr. John Smith', department: 'Cardiology', time: '09:30 AM', status: 'completed' },
  { token: 3, patient: 'Maria Garcia', doctor: 'Dr. Emily Davis', department: 'Neurology', time: '10:00 AM', status: 'in-consultation' },
  { token: 4, patient: 'Robert Brown', doctor: 'Dr. John Smith', department: 'Cardiology', time: '10:30 AM', status: 'waiting' },
  { token: 5, patient: 'Jennifer Davis', doctor: 'Dr. Sarah Chen', department: 'Pediatrics', time: '11:00 AM', status: 'waiting' },
  { token: 6, patient: 'Michael Taylor', doctor: 'Dr. Emily Davis', department: 'Neurology', time: '11:30 AM', status: 'waiting' },
  { token: 7, patient: 'Emily Wilson', doctor: 'Dr. Robert Wilson', department: 'Orthopedics', time: '12:00 PM', status: 'waiting' },
  { token: 8, patient: 'James Anderson', doctor: 'Dr. John Smith', department: 'Cardiology', time: '12:30 PM', status: 'waiting' },
];

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  waiting: { label: 'Waiting', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
  'in-consultation': { label: 'In Consultation', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: ArrowRight },
  completed: { label: 'Completed', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle },
};

export default function Queue() {
  const waitingCount = queueData.filter(q => q.status === 'waiting').length;
  const inConsultationCount = queueData.filter(q => q.status === 'in-consultation').length;
  const completedCount = queueData.filter(q => q.status === 'completed').length;

  const callNext = () => {
    const nextPatient = queueData.find(q => q.status === 'waiting');
    if (nextPatient) {
      toast.success(`Calling Token #${nextPatient.token} - ${nextPatient.patient}`);
    }
  };

  return (
    <DashboardLayout title="Patient Queue" subtitle="Manage today's patient queue">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{queueData.length}</p>
              <p className="text-sm text-muted-foreground">Total Today</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{waitingCount}</p>
              <p className="text-sm text-muted-foreground">Waiting</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inConsultationCount}</p>
              <p className="text-sm text-muted-foreground">In Consultation</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call Next Button */}
      <div className="mb-6">
        <Button onClick={callNext} size="lg" className="gap-2">
          <Volume2 className="w-5 h-5" />
          Call Next Patient
        </Button>
      </div>

      {/* Queue List */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="bg-secondary/30 px-6 py-3 border-b border-border">
          <h3 className="font-display font-semibold text-foreground">Today's Queue</h3>
        </div>
        <div className="divide-y divide-border">
          {queueData.map((item) => {
            const status = statusConfig[item.status];
            const StatusIcon = status.icon;
            return (
              <div
                key={item.token}
                className={`flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors ${
                  item.status === 'in-consultation' ? 'bg-blue-500/5' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    item.status === 'in-consultation'
                      ? 'bg-blue-500/20 text-blue-400'
                      : item.status === 'waiting'
                      ? 'bg-primary/20 text-primary'
                      : 'bg-secondary text-muted-foreground'
                  }`}>
                    #{item.token}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{item.patient}</h4>
                    <p className="text-sm text-muted-foreground">{item.doctor} • {item.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{item.time}</p>
                    <Badge variant="outline" className={status.color}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  {item.status === 'waiting' && (
                    <Button size="sm" variant="outline">
                      Call
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
