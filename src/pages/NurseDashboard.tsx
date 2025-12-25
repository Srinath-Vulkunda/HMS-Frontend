import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Activity, Utensils, Clock, AlertCircle, CheckCircle, Clipboard } from 'lucide-react';

const stats: { title: string; value: string; change: { value: number; type: 'increase' | 'decrease' }; icon: typeof Users }[] = [
  { title: 'Assigned Patients', value: '12', change: { value: 2, type: 'increase' }, icon: Users },
  { title: 'Pending Vitals', value: '5', change: { value: 3, type: 'decrease' }, icon: Activity },
  { title: 'Meals Due', value: '8', change: { value: 0, type: 'increase' }, icon: Utensils },
  { title: 'Scheduled Rounds', value: '4', change: { value: 1, type: 'increase' }, icon: Clock },
];

const assignedPatients = [
  { id: 'P001', name: 'John Smith', room: '101-A', condition: 'Stable', nextTask: 'Vitals Check', time: '10:00 AM' },
  { id: 'P002', name: 'Mary Johnson', room: '102-B', condition: 'Critical', nextTask: 'Medication', time: '10:15 AM' },
  { id: 'P003', name: 'Robert Williams', room: '103-A', condition: 'Recovering', nextTask: 'Wound Dressing', time: '10:30 AM' },
  { id: 'P004', name: 'Emily Davis', room: '104-B', condition: 'Stable', nextTask: 'Breakfast', time: '10:45 AM' },
];

const upcomingTasks = [
  { time: '10:00 AM', task: 'Vitals Check - Room 101-A', type: 'vitals', patient: 'John Smith' },
  { time: '10:15 AM', task: 'Administer Medication - Room 102-B', type: 'medication', patient: 'Mary Johnson' },
  { time: '10:30 AM', task: 'Change Wound Dressing - Room 103-A', type: 'care', patient: 'Robert Williams' },
  { time: '11:00 AM', task: 'Doctor Round Assistance', type: 'round', patient: 'Multiple' },
  { time: '12:00 PM', task: 'Lunch Distribution', type: 'meal', patient: 'All Patients' },
];

const alerts = [
  { patient: 'Mary Johnson', room: '102-B', message: 'BP elevated - 150/95', severity: 'high' },
  { patient: 'Robert Williams', room: '103-A', message: 'Pain medication due in 30 min', severity: 'medium' },
];

export default function NurseDashboard() {
  return (
    <DashboardLayout title="Nurse Dashboard" subtitle="Patient Care Overview">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={stat.title} className={`stagger-${index + 1}`}>
              <StatCard {...stat} />
            </div>
          ))}
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="border-warning/50 bg-warning/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertCircle className="w-5 h-5" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alerts.map((alert, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-background border border-border">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${alert.severity === 'high' ? 'bg-destructive' : 'bg-warning'}`} />
                      <div>
                        <p className="font-medium">{alert.patient} - {alert.room}</p>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Acknowledge</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Assigned Patients */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Assigned Patients</CardTitle>
              <Button size="sm" variant="outline">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assignedPatients.map((patient) => (
                  <div key={patient.id} className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-medium">{patient.name}</h4>
                        <p className="text-sm text-muted-foreground">Room {patient.room}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="outline" 
                        className={
                          patient.condition === 'Critical' 
                            ? 'border-destructive text-destructive' 
                            : patient.condition === 'Stable' 
                            ? 'border-success text-success'
                            : 'border-primary text-primary'
                        }
                      >
                        {patient.condition}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {patient.nextTask} • {patient.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Tasks</CardTitle>
              <Badge variant="outline" className="border-primary text-primary">
                {upcomingTasks.length} Tasks
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      {task.type === 'vitals' && <Activity className="w-5 h-5 text-primary" />}
                      {task.type === 'medication' && <Clipboard className="w-5 h-5 text-primary" />}
                      {task.type === 'care' && <Users className="w-5 h-5 text-primary" />}
                      {task.type === 'round' && <Clock className="w-5 h-5 text-primary" />}
                      {task.type === 'meal' && <Utensils className="w-5 h-5 text-primary" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{task.task}</p>
                      <p className="text-xs text-muted-foreground">{task.patient}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{task.time}</Badge>
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
