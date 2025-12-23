import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  CreditCard,
  Calendar,
  PieChart
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPie, Pie, Cell } from 'recharts';

const monthlyRevenue = [
  { month: 'Jul', revenue: 125000, expenses: 85000 },
  { month: 'Aug', revenue: 142000, expenses: 92000 },
  { month: 'Sep', revenue: 156000, expenses: 98000 },
  { month: 'Oct', revenue: 168000, expenses: 105000 },
  { month: 'Nov', revenue: 175000, expenses: 110000 },
  { month: 'Dec', revenue: 189000, expenses: 115000 },
];

const revenueByDepartment = [
  { name: 'Cardiology', value: 45000, color: 'hsl(var(--primary))' },
  { name: 'Neurology', value: 32000, color: 'hsl(var(--accent))' },
  { name: 'Orthopedics', value: 38000, color: '#22c55e' },
  { name: 'Pediatrics', value: 28000, color: '#eab308' },
  { name: 'Emergency', value: 52000, color: '#ef4444' },
];

const recentTransactions = [
  { id: 'TXN001', type: 'income', description: 'Patient Payment - Sarah Johnson', amount: 250, date: '2024-12-23' },
  { id: 'TXN002', type: 'expense', description: 'Medical Supplies', amount: 1500, date: '2024-12-23' },
  { id: 'TXN003', type: 'income', description: 'Insurance Claim - Blue Cross', amount: 3200, date: '2024-12-22' },
  { id: 'TXN004', type: 'expense', description: 'Equipment Maintenance', amount: 800, date: '2024-12-22' },
  { id: 'TXN005', type: 'income', description: 'Patient Payment - David Williams', amount: 180, date: '2024-12-22' },
];

export default function FinancialReports() {
  const currentMonthRevenue = 189000;
  const previousMonthRevenue = 175000;
  const revenueChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue * 100).toFixed(1);

  return (
    <DashboardLayout title="Financial Reports" subtitle="View revenue and expense analytics">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-green-400" />
            <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              +{revenueChange}%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-foreground">${currentMonthRevenue.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">This Month Revenue</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <CreditCard className="w-5 h-5 text-red-400" />
            <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
              <TrendingUp className="w-3 h-3 mr-1" />
              +4.5%
            </Badge>
          </div>
          <p className="text-2xl font-bold text-foreground">$115,000</p>
          <p className="text-sm text-muted-foreground">This Month Expenses</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
          </div>
          <p className="text-2xl font-bold text-foreground">$74,000</p>
          <p className="text-sm text-muted-foreground">Net Profit</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-accent" />
          </div>
          <p className="text-2xl font-bold text-foreground">$28,500</p>
          <p className="text-sm text-muted-foreground">Outstanding Payments</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue vs Expenses */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">Revenue vs Expenses</h3>
              <p className="text-sm text-muted-foreground">6 months comparison</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1">
              <Download className="w-3 h-3" />
              Export
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#22c55e"
                  fill="url(#revenueGradient)"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="#ef4444"
                  fill="url(#expenseGradient)"
                  strokeWidth={2}
                  name="Expenses"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue by Department */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">Revenue by Department</h3>
              <p className="text-sm text-muted-foreground">This month breakdown</p>
            </div>
          </div>
          <div className="h-64 flex items-center">
            <ResponsiveContainer width="50%" height="100%">
              <RechartsPie>
                <Pie
                  data={revenueByDepartment}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {revenueByDepartment.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </RechartsPie>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {revenueByDepartment.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }} />
                    <span className="text-sm text-foreground">{dept.name}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">${dept.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-display font-semibold text-lg text-foreground">Recent Transactions</h3>
          <Button variant="outline" size="sm">View All</Button>
        </div>
        <div className="space-y-4">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  txn.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'
                }`}>
                  {txn.type === 'income' ? (
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground">{txn.description}</p>
                  <p className="text-sm text-muted-foreground">{txn.date}</p>
                </div>
              </div>
              <span className={`font-semibold ${txn.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                {txn.type === 'income' ? '+' : '-'}${txn.amount.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
