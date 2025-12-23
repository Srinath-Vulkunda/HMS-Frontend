import { Clock, User, MoreVertical, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Appointment {
  id: string;
  patientName: string;
  time: string;
  type: string;
  status: 'waiting' | 'in-progress' | 'completed' | 'cancelled';
  doctor?: string;
}

interface AppointmentsListProps {
  appointments: Appointment[];
  title?: string;
  showDoctor?: boolean;
}

const statusConfig = {
  waiting: {
    label: 'Waiting',
    className: 'bg-warning/10 text-warning border-warning/20',
    icon: Clock3,
  },
  'in-progress': {
    label: 'In Progress',
    className: 'bg-info/10 text-info border-info/20',
    icon: Clock,
  },
  completed: {
    label: 'Completed',
    className: 'bg-success/10 text-success border-success/20',
    icon: CheckCircle,
  },
  cancelled: {
    label: 'Cancelled',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
    icon: XCircle,
  },
};

export function AppointmentsList({ appointments, title = "Today's Appointments", showDoctor = false }: AppointmentsListProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg text-foreground">{title}</h2>
        <Button variant="ghost" size="sm" className="text-muted-foreground">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {appointments.map((apt, index) => {
          const config = statusConfig[apt.status];
          const StatusIcon = config.icon;
          
          return (
            <div
              key={apt.id}
              className={cn(
                "flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all duration-200 cursor-pointer group",
                `stagger-${index + 1}`
              )}
            >
              {/* Time */}
              <div className="text-center min-w-[60px]">
                <p className="font-display font-bold text-lg text-foreground">{apt.time.split(':')[0]}</p>
                <p className="text-xs text-muted-foreground">{apt.time.includes('AM') ? 'AM' : 'PM'}</p>
              </div>

              {/* Divider */}
              <div className="w-px h-12 bg-border" />

              {/* Patient Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground truncate">{apt.patientName}</p>
                    <p className="text-xs text-muted-foreground">{apt.type}</p>
                  </div>
                </div>
                {showDoctor && apt.doctor && (
                  <p className="text-xs text-muted-foreground mt-1 ml-10">Dr. {apt.doctor}</p>
                )}
              </div>

              {/* Status */}
              <Badge variant="outline" className={cn("gap-1", config.className)}>
                <StatusIcon className="w-3 h-3" />
                {config.label}
              </Badge>

              {/* Actions */}
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
