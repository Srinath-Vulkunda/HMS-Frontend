import { AlertTriangle, Package, FileText, DollarSign, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Alert {
  id: string;
  type: 'stock' | 'report' | 'payment' | 'urgent';
  title: string;
  description: string;
  time: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
  title?: string;
}

const alertConfig = {
  stock: {
    icon: Package,
    className: 'bg-warning/10 border-warning/30 text-warning',
    iconBg: 'bg-warning/20',
  },
  report: {
    icon: FileText,
    className: 'bg-info/10 border-info/30 text-info',
    iconBg: 'bg-info/20',
  },
  payment: {
    icon: DollarSign,
    className: 'bg-destructive/10 border-destructive/30 text-destructive',
    iconBg: 'bg-destructive/20',
  },
  urgent: {
    icon: AlertTriangle,
    className: 'bg-destructive/10 border-destructive/30 text-destructive',
    iconBg: 'bg-destructive/20',
  },
};

export function AlertsPanel({ alerts, title = "Alerts & Notifications" }: AlertsPanelProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display font-semibold text-lg text-foreground">{title}</h2>
        <span className="text-xs text-muted-foreground">{alerts.length} active</span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.type];
          const AlertIcon = config.icon;
          
          return (
            <div
              key={alert.id}
              className={cn(
                "flex items-start gap-3 p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01]",
                config.className,
                `stagger-${index + 1}`
              )}
            >
              <div className={cn("p-2 rounded-lg", config.iconBg)}>
                <AlertIcon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm">{alert.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{alert.description}</p>
                <p className="text-xs text-muted-foreground/70 mt-1">{alert.time}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6 hover:bg-background/50">
                <X className="w-3 h-3" />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
