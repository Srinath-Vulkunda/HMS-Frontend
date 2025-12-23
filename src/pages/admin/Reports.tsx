import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const monthlyData = [
  { month: 'Jul', patients: 420, revenue: 125000, appointments: 890 },
  { month: 'Aug', patients: 480, revenue: 142000, appointments: 920 },
  { month: 'Sep', patients: 510, revenue: 156000, appointments: 980 },
  { month: 'Oct', patients: 550, revenue: 168000, appointments: 1050 },
  { month: 'Nov', patients: 590, revenue: 175000, appointments: 1120 },
  { month: 'Dec', patients: 620, revenue: 189000, appointments: 1180 },
];

const departmentData = [
  { name: 'Cardiology', patients: 145, revenue: 45000 },
  { name: 'Neurology', patients: 89, revenue: 32000 },
  { name: 'Orthopedics', patients: 112, revenue: 38000 },
  { name: 'Pediatrics', patients: 203, revenue: 28000 },
  { name: 'Emergency', patients: 320, revenue: 52000 },
];

const reportTypes = [
  { title: 'Patient Report', description: 'Monthly patient statistics', icon: Users, color: 'primary' },
  { title: 'Revenue Report', description: 'Financial performance', icon: DollarSign, color: 'success' },
  { title: 'Appointment Report', description: 'Scheduling analytics', icon: Calendar, color: 'info' },
  { title: 'Department Report', description: 'Department-wise analysis', icon: BarChart3, color: 'warning' },
];

export default function Reports() {
  return (
    <DashboardLayout title="Reports & Analytics" subtitle="View hospital performance metrics">
      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {reportTypes.map((report, index) => (
          <div
            key={report.title}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 cursor-pointer group stagger-${index + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${report.color}/20 flex items-center justify-center`}>
                <report.icon className={`w-6 h-6 text-${report.color}`} />
              </div>
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Download className="w-4 h-4" />
              </Button>
            </div>
            <h3 className="font-display font-semibold text-foreground mb-1">{report.title}</h3>
            <p className="text-sm text-muted-foreground">{report.description}</p>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient Trend */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">Patient Growth</h3>
              <p className="text-sm text-muted-foreground">Monthly patient registrations</p>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="patientGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
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
                />
                <Area
                  type="monotone"
                  dataKey="patients"
                  stroke="hsl(var(--primary))"
                  fill="url(#patientGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-display font-semibold text-lg text-foreground">Department Performance</h3>
              <p className="text-sm text-muted-foreground">Patient count by department</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={departmentData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{
                    background: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '12px',
                  }}
                />
                <Bar dataKey="patients" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
