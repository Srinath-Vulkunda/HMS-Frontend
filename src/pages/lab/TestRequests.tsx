import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TestTube, Clock, Play, CheckCircle, User, FileText } from 'lucide-react';

const testRequests = {
  pending: [
    { id: 'LAB001', patient: 'Sarah Johnson', doctor: 'Dr. John Smith', test: 'Complete Blood Count', priority: 'routine', requestedAt: '9:00 AM' },
    { id: 'LAB002', patient: 'David Williams', doctor: 'Dr. Emily Davis', test: 'Blood Glucose (Fasting)', priority: 'urgent', requestedAt: '9:15 AM' },
    { id: 'LAB003', patient: 'Maria Garcia', doctor: 'Dr. Robert Wilson', test: 'Lipid Panel', priority: 'routine', requestedAt: '9:30 AM' },
    { id: 'LAB004', patient: 'Robert Brown', doctor: 'Dr. John Smith', test: 'Thyroid Function Test', priority: 'routine', requestedAt: '10:00 AM' },
    { id: 'LAB005', patient: 'Jennifer Davis', doctor: 'Dr. Sarah Chen', test: 'Liver Function Test', priority: 'urgent', requestedAt: '10:15 AM' },
  ],
  inProgress: [
    { id: 'LAB006', patient: 'Michael Taylor', doctor: 'Dr. John Smith', test: 'Cardiac Markers', priority: 'stat', startedAt: '8:45 AM', estimatedCompletion: '10:45 AM' },
    { id: 'LAB007', patient: 'Emily Wilson', doctor: 'Dr. Emily Davis', test: 'Urinalysis', priority: 'routine', startedAt: '9:00 AM', estimatedCompletion: '10:00 AM' },
  ],
  completed: [
    { id: 'LAB008', patient: 'James Anderson', doctor: 'Dr. Robert Wilson', test: 'Complete Blood Count', completedAt: '8:30 AM' },
    { id: 'LAB009', patient: 'Lisa Thompson', doctor: 'Dr. Sarah Chen', test: 'Blood Glucose', completedAt: '8:15 AM' },
    { id: 'LAB010', patient: 'Mark Johnson', doctor: 'Dr. John Smith', test: 'Hemoglobin A1C', completedAt: '8:00 AM' },
  ],
};

const priorityColors: Record<string, string> = {
  stat: 'bg-red-500/20 text-red-400 border-red-500/30',
  urgent: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  routine: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

export default function TestRequests() {
  return (
    <DashboardLayout title="Test Requests" subtitle="Manage laboratory test orders">
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({testRequests.pending.length})
          </TabsTrigger>
          <TabsTrigger value="inProgress" className="gap-2">
            <Play className="w-4 h-4" />
            In Progress ({testRequests.inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed ({testRequests.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {testRequests.pending.map((request, index) => (
            <div
              key={request.id}
              className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all stagger-${(index % 4) + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {request.patient.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{request.patient}</h3>
                      <Badge variant="outline" className={priorityColors[request.priority]}>
                        {request.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{request.doctor}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{request.id}</span>
              </div>

              <div className="mt-4 p-3 bg-secondary/30 rounded-xl">
                <div className="flex items-center gap-2">
                  <TestTube className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{request.test}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Requested at {request.requestedAt}</p>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button size="sm" className="gap-1">
                  <Play className="w-3 h-3" />
                  Start Test
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="w-3 h-3" />
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="inProgress" className="space-y-4">
          {testRequests.inProgress.map((request, index) => (
            <div
              key={request.id}
              className={`bg-card border-2 border-primary/30 rounded-2xl p-6 stagger-${(index % 4) + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                    <TestTube className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{request.patient}</h3>
                    <p className="text-sm text-muted-foreground">{request.doctor}</p>
                  </div>
                </div>
                <Badge className="bg-primary/20 text-primary border-primary/30">Processing</Badge>
              </div>

              <div className="mt-4 p-3 bg-secondary/30 rounded-xl">
                <p className="font-medium text-foreground">{request.test}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span>Started: {request.startedAt}</span>
                  <span>Est. Completion: {request.estimatedCompletion}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button size="sm" className="gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Complete & Enter Results
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {testRequests.completed.map((request, index) => (
            <div
              key={request.id}
              className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all stagger-${(index % 4) + 1}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{request.patient}</h3>
                    <p className="text-sm text-muted-foreground">{request.doctor}</p>
                  </div>
                </div>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                  Completed
                </Badge>
              </div>

              <div className="mt-4 p-3 bg-secondary/30 rounded-xl">
                <p className="font-medium text-foreground">{request.test}</p>
                <p className="text-sm text-muted-foreground mt-1">Completed at {request.completedAt}</p>
              </div>

              <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                <Button variant="outline" size="sm" className="gap-1">
                  <FileText className="w-3 h-3" />
                  View Results
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
