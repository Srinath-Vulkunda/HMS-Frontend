import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Wallet, Clock, CalendarCheck, TrendingUp, UserCheck, AlertCircle } from 'lucide-react';

const pendingLeaves = [
  { id: 1, employee: 'Dr. Michael Chen', type: 'Annual Leave', from: '2024-01-15', to: '2024-01-20', days: 5 },
  { id: 2, employee: 'Emily Rodriguez', type: 'Sick Leave', from: '2024-01-12', to: '2024-01-13', days: 2 },
  { id: 3, employee: 'James Wilson', type: 'Personal Leave', from: '2024-01-18', to: '2024-01-18', days: 1 },
];

const todayAttendance = [
  { id: 1, name: 'Dr. Sarah Johnson', department: 'Administration', checkIn: '08:30 AM', status: 'Present' },
  { id: 2, name: 'Dr. Michael Chen', department: 'Cardiology', checkIn: '09:00 AM', status: 'Present' },
  { id: 3, name: 'Emily Rodriguez', department: 'Pharmacy', checkIn: '-', status: 'On Leave' },
  { id: 4, name: 'Lisa Thompson', department: 'Reception', checkIn: '08:45 AM', status: 'Present' },
];

export default function HRDashboard() {
  return (
    <DashboardLayout title="HR Dashboard">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Employees"
            value="156"
            change={{ value: 5, type: 'increase' }}
            icon={Users}
          />
          <StatCard
            title="Present Today"
            value="142"
            change={{ value: 2, type: 'decrease' }}
            icon={UserCheck}
          />
          <StatCard
            title="Pending Leaves"
            value="8"
            change={{ value: 3, type: 'increase' }}
            icon={CalendarCheck}
          />
          <StatCard
            title="Monthly Payroll"
            value="₹45.2L"
            change={{ value: 8, type: 'increase' }}
            icon={Wallet}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pending Leave Requests */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Pending Leave Requests</CardTitle>
              <Badge variant="secondary" className="bg-warning/20 text-warning">
                {pendingLeaves.length} Pending
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingLeaves.map((leave) => (
                <div key={leave.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{leave.employee}</p>
                    <p className="text-sm text-muted-foreground">
                      {leave.type} • {leave.from} to {leave.to} ({leave.days} days)
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                      Reject
                    </Button>
                    <Button size="sm" className="gradient-primary text-primary-foreground">
                      Approve
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Today's Attendance */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Today's Attendance</CardTitle>
              <Badge variant="secondary" className="bg-success/20 text-success">
                91% Present
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayAttendance.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
                  <div>
                    <p className="font-medium text-foreground">{record.name}</p>
                    <p className="text-sm text-muted-foreground">{record.department}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{record.checkIn}</p>
                    <Badge 
                      variant="outline" 
                      className={record.status === 'Present' ? 'border-success text-success' : 'border-warning text-warning'}
                    >
                      {record.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg. Working Hours</p>
                <p className="text-xl font-bold text-foreground">8.2 hrs</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On-Time Rate</p>
                <p className="text-xl font-bold text-foreground">94.5%</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Open Positions</p>
                <p className="text-xl font-bold text-foreground">4</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}