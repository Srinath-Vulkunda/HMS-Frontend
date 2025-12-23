import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'Cardiology', patients: 145, revenue: 28500 },
  { name: 'Orthopedics', patients: 132, revenue: 24200 },
  { name: 'Neurology', patients: 98, revenue: 21800 },
  { name: 'Pediatrics', patients: 156, revenue: 18900 },
  { name: 'General', patients: 189, revenue: 15600 },
];

const colors = [
  'hsl(168, 80%, 35%)',
  'hsl(200, 85%, 50%)',
  'hsl(152, 76%, 40%)',
  'hsl(38, 92%, 50%)',
  'hsl(280, 70%, 50%)',
];

interface DepartmentChartProps {
  title?: string;
}

export function DepartmentChart({ title = "Department Performance" }: DepartmentChartProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-display font-semibold text-lg text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground">Patients by department</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(210, 20%, 90%)" vertical={false} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 11 }}
              angle={-20}
              textAnchor="end"
              height={60}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 15%, 50%)', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(210, 20%, 90%)',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.08)',
              }}
              formatter={(value: number, name: string) => [value, name === 'patients' ? 'Patients' : 'Revenue']}
            />
            <Bar dataKey="patients" radius={[8, 8, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
