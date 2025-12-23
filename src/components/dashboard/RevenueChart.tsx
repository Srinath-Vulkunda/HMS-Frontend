import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 45000, patients: 320 },
  { name: 'Feb', revenue: 52000, patients: 380 },
  { name: 'Mar', revenue: 48000, patients: 350 },
  { name: 'Apr', revenue: 61000, patients: 420 },
  { name: 'May', revenue: 55000, patients: 390 },
  { name: 'Jun', revenue: 67000, patients: 450 },
  { name: 'Jul', revenue: 72000, patients: 480 },
];

interface RevenueChartProps {
  title?: string;
}

export function RevenueChart({ title = "Revenue Overview" }: RevenueChartProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">Monthly revenue trend</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 text-success">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm font-medium">+12.5%</span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168, 80%, 30%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168, 80%, 30%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(210, 20%, 90%)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(168, 80%, 30%)"
              strokeWidth={2}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
