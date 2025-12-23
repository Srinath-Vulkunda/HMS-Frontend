import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Clock, CheckCircle, Pill, User, FileText, AlertCircle } from 'lucide-react';

const prescriptions = {
  pending: [
    { id: 'RX001', patient: 'Sarah Johnson', doctor: 'Dr. John Smith', time: '9:15 AM', medicines: ['Lisinopril 10mg x30', 'Amlodipine 5mg x30'], priority: 'normal' },
    { id: 'RX002', patient: 'David Williams', doctor: 'Dr. Emily Davis', time: '9:30 AM', medicines: ['Metformin 500mg x60', 'Glipizide 5mg x30'], priority: 'high' },
    { id: 'RX003', patient: 'Maria Garcia', doctor: 'Dr. Robert Wilson', time: '10:00 AM', medicines: ['Sumatriptan 50mg x10'], priority: 'normal' },
    { id: 'RX004', patient: 'Robert Brown', doctor: 'Dr. John Smith', time: '10:15 AM', medicines: ['Ibuprofen 400mg x20', 'Omeprazole 20mg x30'], priority: 'normal' },
  ],
  processing: [
    { id: 'RX005', patient: 'Jennifer Davis', doctor: 'Dr. Sarah Chen', time: '8:45 AM', medicines: ['Albuterol Inhaler x1', 'Prednisone 10mg x14'], priority: 'high' },
  ],
  completed: [
    { id: 'RX006', patient: 'Michael Taylor', doctor: 'Dr. John Smith', time: '8:00 AM', medicines: ['Atorvastatin 20mg x30', 'Aspirin 81mg x30'], priority: 'normal' },
    { id: 'RX007', patient: 'Emily Wilson', doctor: 'Dr. Emily Davis', time: '8:15 AM', medicines: ['Sertraline 50mg x30'], priority: 'normal' },
    { id: 'RX008', patient: 'James Anderson', doctor: 'Dr. Robert Wilson', time: '8:30 AM', medicines: ['Lisinopril 20mg x30', 'HCTZ 12.5mg x30'], priority: 'normal' },
  ],
};

const priorityColors: Record<string, string> = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  normal: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
};

function PrescriptionCard({ rx, showActions = true }: { rx: typeof prescriptions.pending[0], showActions?: boolean }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">
              {rx.patient.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{rx.patient}</h3>
              <Badge variant="outline" className={priorityColors[rx.priority]}>
                {rx.priority === 'high' && <AlertCircle className="w-3 h-3 mr-1" />}
                {rx.priority}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{rx.doctor} • {rx.time}</p>
          </div>
        </div>
        <span className="text-sm font-medium text-muted-foreground">{rx.id}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {rx.medicines.map((med, i) => (
          <Badge key={i} variant="secondary" className="gap-1">
            <Pill className="w-3 h-3" />
            {med}
          </Badge>
        ))}
      </div>

      {showActions && (
        <div className="flex gap-2 pt-4 border-t border-border">
          <Button size="sm" className="gap-1">
            <CheckCircle className="w-3 h-3" />
            Start Dispensing
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <FileText className="w-3 h-3" />
            View Details
          </Button>
        </div>
      )}
    </div>
  );
}

export default function PrescriptionQueue() {
  return (
    <DashboardLayout title="Prescription Queue" subtitle="Process and dispense medications">
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="bg-secondary/50">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="w-4 h-4" />
            Pending ({prescriptions.pending.length})
          </TabsTrigger>
          <TabsTrigger value="processing" className="gap-2">
            <Pill className="w-4 h-4" />
            Processing ({prescriptions.processing.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="gap-2">
            <CheckCircle className="w-4 h-4" />
            Completed ({prescriptions.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {prescriptions.pending.map((rx, index) => (
            <div key={rx.id} className={`stagger-${(index % 4) + 1}`}>
              <PrescriptionCard rx={rx} />
            </div>
          ))}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {prescriptions.processing.map((rx, index) => (
            <div key={rx.id} className={`stagger-${(index % 4) + 1}`}>
              <div className="bg-card border-2 border-primary/30 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
                      <Pill className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{rx.patient}</h3>
                      <p className="text-sm text-muted-foreground">{rx.doctor}</p>
                    </div>
                  </div>
                  <Badge className="bg-primary/20 text-primary border-primary/30">Processing</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {rx.medicines.map((med, i) => (
                    <Badge key={i} variant="secondary" className="gap-1">
                      <Pill className="w-3 h-3" />
                      {med}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 pt-4 border-t border-border">
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Complete & Generate Invoice
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {prescriptions.completed.map((rx, index) => (
            <div key={rx.id} className={`stagger-${(index % 4) + 1}`}>
              <PrescriptionCard rx={rx} showActions={false} />
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}
