import { LucideIcon, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickAction {
  label: string;
  description: string;
  icon: LucideIcon;
  variant: 'primary' | 'success' | 'warning' | 'info';
  onClick?: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

const variantStyles = {
  primary: 'from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-primary/20',
  success: 'from-success/10 to-success/5 hover:from-success/20 hover:to-success/10 border-success/20',
  warning: 'from-warning/10 to-warning/5 hover:from-warning/20 hover:to-warning/10 border-warning/20',
  info: 'from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 border-accent/20',
};

const iconStyles = {
  primary: 'text-primary',
  success: 'text-success',
  warning: 'text-warning',
  info: 'text-accent',
};

export function QuickActions({ actions, title = "Quick Actions" }: QuickActionsProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
      <h2 className="font-display font-semibold text-lg text-foreground mb-4">{title}</h2>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className={cn(
              "group flex flex-col items-start gap-3 p-4 rounded-xl border bg-gradient-to-br transition-all duration-200",
              variantStyles[action.variant],
              `stagger-${index + 1}`
            )}
          >
            <action.icon className={cn("w-6 h-6", iconStyles[action.variant])} />
            <div className="text-left">
              <p className="font-medium text-foreground text-sm">{action.label}</p>
              <p className="text-xs text-muted-foreground">{action.description}</p>
            </div>
            <ArrowRight className="w-4 h-4 text-muted-foreground/50 group-hover:translate-x-1 transition-transform self-end" />
          </button>
        ))}
      </div>
    </div>
  );
}
