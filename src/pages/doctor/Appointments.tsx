import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, User, CheckCircle, XCircle, Play } from 'lucide-react';

const appointments = {
  today: [
    { id: '1', patient: 'Sarah Johnson', time: '09:00 AM', type: 'General Checkup', status: 'completed', duration: '30 min' },
    { id: '2', patient: 'David Williams', time: '09:30 AM', type: 'Follow-up', status: 'completed', duration: '20 min' },
    { id: '3', patient: 'Maria Garcia', time: '10:00 AM', type: 'Consultation', status: 'in-progress', duration: '45 min' },
    { id: '4', patient: 'Robert Brown', time: '10:30 AM', type: 'Lab Results', status: 'waiting', duration: '30 min' },
    { id: '5', patient: 'Jennifer Davis', time: '11:00 AM', type: 'Prescription', status: 'waiting', duration: '15 min' },
    { id: '6', patient: 'Michael Taylor', time: '11:30 AM', type: 'Follow-up', status: 'waiting', duration: '30 min' },
  ],
  upcoming: [
    { id: '7', patient: 'Emily Wilson', time: '2:00 PM', date: 'Dec 24', type: 'Annual Checkup', status: 'scheduled', duration: '45 min' },
    { id: '8', patient: 'James Anderson', time: '10:00 AM', date: 'Dec 26', type: 'Follow-up', status: 'scheduled', duration: '30 min' },
    { id: '9', patient: 'Lisa Thompson', time: '3:00 PM', date: 'Dec 27', type: 'Consultation', status: 'scheduled', duration: '45 min' },
  ],
  past: [
    { id: '10', patient: 'Mark Johnson', time: '9:00 AM', date: 'Dec 20', type: 'General Checkup', status: 'completed', duration: '30 min' },
    { id: '11', patient: 'Anna Smith', time: '11:00 AM', date: 'Dec 19', type: 'Follow-up', status: 'completed', duration: '20 min' },
    { id: '12', patient: 'Chris Davis', time: '2:00 PM', date: 'Dec 18', type: 'Lab Results', status: 'cancelled', duration: '30 min' },
  ],
};

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  completed: { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
  'in-progress': { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: Play },
  waiting: { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: Clock },
  scheduled: { color: 'bg-primary/20 text-primary border-primary/30', icon: Calendar },
  cancelled: { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle },
};

function AppointmentCard({ appointment, showDate = false, onStart }: { appointment: typeof appointments.today[0] & { date?: string }, showDate?: boolean, onStart?: (id: string) => void }) {
  const config = statusConfig[appointment.status];
  const StatusIcon = config.icon;

  return (
    <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:shadow-elegant transition-all">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
        <span className="text-sm font-semibold text-primary">
          {appointment.patient.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-medium text-foreground truncate">{appointment.patient}</h3>
          <Badge variant="outline" className={config.color}>
            <StatusIcon className="w-3 h-3 mr-1" />
            {appointment.status}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {appointment.time}
            {showDate && appointment.date && ` • ${appointment.date}`}
          </span>
          <span>{appointment.type}</span>
          <span>{appointment.duration}</span>
        </div>
      </div>
      <div className="flex gap-2">
        {appointment.status === 'waiting' && (
          <Button size="sm" className="gap-1" onClick={() => onStart?.(appointment.id)}>
            <Play className="w-3 h-3" />
            Start
          </Button>
        )}
        {appointment.status === 'in-progress' && (
          <Button size="sm" variant="outline" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Complete
          </Button>
        )}
        {appointment.status === 'scheduled' && (
          <Button size="sm" variant="outline">
            Reschedule
          </Button>
        )}
      </div>
    </div>
  );
}

export default function Appointments() {
  const navigate = useNavigate();

  const handleStartConsultation = (appointmentId: string) => {
    navigate(`/doctor/consultation/${appointmentId}`);
  };

  return (
    <DashboardLayout title="Appointments" subtitle="Manage your appointments">
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="today">Today ({appointments.today.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({appointments.upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({appointments.past.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4">
          {appointments.today.map((apt, index) => (
            <div key={apt.id} className={`stagger-${(index % 4) + 1}`}>
              <AppointmentCard appointment={apt} onStart={handleStartConsultation} />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4">
          {appointments.upcoming.map((apt, index) => (
            <div key={apt.id} className={`stagger-${(index % 4) + 1}`}>
              <AppointmentCard appointment={apt} showDate />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {appointments.past.map((apt, index) => (
            <div key={apt.id} className={`stagger-${(index % 4) + 1}`}>
              <AppointmentCard appointment={apt} showDate />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
