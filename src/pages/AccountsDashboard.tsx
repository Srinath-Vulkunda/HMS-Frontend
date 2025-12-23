import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { 
  DollarSign, 
  CreditCard, 
  AlertCircle, 
  TrendingUp,
  Search,
  Download,
  Eye,
  MoreVertical
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const stats = [
  { title: "Today's Revenue", value: '$24,580', change: { value: 15, type: 'increase' as const }, icon: DollarSign, variant: 'primary' as const },
  { title: 'Pending Payments', value: '$8,420', icon: AlertCircle, variant: 'warning' as const },
  { title: 'Insurance Claims', value: '$45,200', change: { value: 8, type: 'increase' as const }, icon: CreditCard, variant: 'info' as const },
  { title: 'Monthly Growth', value: '+12.5%', icon: TrendingUp, variant: 'success' as const },
];

const recentTransactions = [
  { id: 'INV-001', patient: 'Sarah Johnson', type: 'Consultation', amount: 150, status: 'paid' as const, date: 'Today, 09:30 AM' },
  { id: 'INV-002', patient: 'David Williams', type: 'Lab Tests', amount: 320, status: 'paid' as const, date: 'Today, 10:15 AM' },
  { id: 'INV-003', patient: 'Maria Garcia', type: 'Pharmacy', amount: 85, status: 'pending' as const, date: 'Today, 10:45 AM' },
  { id: 'INV-004', patient: 'Robert Brown', type: 'Surgery', amount: 5500, status: 'partial' as const, date: 'Yesterday' },
  { id: 'INV-005', patient: 'Jennifer Davis', type: 'Emergency', amount: 890, status: 'pending' as const, date: 'Yesterday' },
];

const insuranceClaims = [
  { id: 'CLM-101', patient: 'Sarah Johnson', insurance: 'Blue Cross', amount: 2500, status: 'approved' as const },
  { id: 'CLM-102', patient: 'David Williams', insurance: 'Aetna', amount: 1800, status: 'pending' as const },
  { id: 'CLM-103', patient: 'Maria Garcia', insurance: 'Medicare', amount: 3200, status: 'under-review' as const },
];

const statusConfig = {
  paid: { label: 'Paid', className: 'bg-success/10 text-success border-success/20' },
  pending: { label: 'Pending', className: 'bg-warning/10 text-warning border-warning/20' },
  partial: { label: 'Partial', className: 'bg-info/10 text-info border-info/20' },
  approved: { label: 'Approved', className: 'bg-success/10 text-success border-success/20' },
  'under-review': { label: 'Under Review', className: 'bg-warning/10 text-warning border-warning/20' },
};

export default function AccountsDashboard() {
  return (
    <DashboardLayout title="Accounts Dashboard" subtitle="Manage billing and finances">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className={`stagger-${index + 1}`}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart - 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Insurance Claims */}
        <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold text-lg text-foreground">Insurance Claims</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground">View All</Button>
          </div>

          <div className="space-y-3">
            {insuranceClaims.map((claim, index) => {
              const config = statusConfig[claim.status];

              return (
                <div
                  key={claim.id}
                  className={cn(
                    "p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all cursor-pointer",
                    `stagger-${index + 1}`
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-foreground text-sm">{claim.patient}</p>
                    <Badge variant="outline" className={config.className}>
                      {config.label}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{claim.insurance}</p>
                  <p className="font-display font-bold text-foreground mt-1">${claim.amount.toLocaleString()}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display font-semibold text-lg text-foreground">Recent Transactions</h2>
            <p className="text-sm text-muted-foreground">Latest billing and payment activity</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="w-64 pl-10" />
            </div>
            <Button variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Invoice</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((tx, index) => {
                const config = statusConfig[tx.status];

                return (
                  <tr key={tx.id} className={cn("border-b border-border/50 hover:bg-secondary/30 transition-colors", `stagger-${index + 1}`)}>
                    <td className="py-3 px-4">
                      <span className="font-mono text-sm text-primary">{tx.id}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-foreground">{tx.patient}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-muted-foreground">{tx.type}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-muted-foreground">{tx.date}</span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-display font-semibold text-foreground">${tx.amount.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <Badge variant="outline" className={config.className}>
                        {config.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
