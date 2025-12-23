import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  variant?: 'primary' | 'success' | 'warning' | 'info' | 'destructive';
  className?: string;
}

const variantStyles = {
  primary: {
    gradient: 'gradient-primary',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
  },
  success: {
    gradient: 'gradient-success',
    iconBg: 'bg-success/10',
    iconColor: 'text-success',
  },
  warning: {
    gradient: 'gradient-warning',
    iconBg: 'bg-warning/10',
    iconColor: 'text-warning',
  },
  info: {
    gradient: 'gradient-accent',
    iconBg: 'bg-accent/10',
    iconColor: 'text-accent',
  },
  destructive: {
    gradient: 'gradient-destructive',
    iconBg: 'bg-destructive/10',
    iconColor: 'text-destructive',
  },
};

export function StatCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  variant = 'primary',
  className 
}: StatCardProps) {
  const styles = variantStyles[variant];

  return (
    <div className={cn(
      "stat-card bg-card border border-border rounded-2xl animate-slide-up",
      className
    )}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-3 rounded-xl", styles.iconBg)}>
          <Icon className={cn("w-6 h-6", styles.iconColor)} />
        </div>
        {change && (
          <div className={cn(
            "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
            change.type === 'increase' 
              ? "bg-success/10 text-success" 
              : "bg-destructive/10 text-destructive"
          )}>
            {change.type === 'increase' ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(change.value)}%
          </div>
        )}
      </div>
      <div>
        <h3 className="font-display text-3xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {/* Decorative gradient line */}
      <div className={cn("absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl", styles.gradient)} />
    </div>
  );
}
