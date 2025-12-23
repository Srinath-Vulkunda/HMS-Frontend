import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Plus, Pill, FileText, Calendar, Printer } from 'lucide-react';
import { useState } from 'react';

const prescriptions = [
  { id: 'RX001', patient: 'Sarah Johnson', date: '2024-12-23', medicines: ['Lisinopril 10mg', 'Amlodipine 5mg'], status: 'active', notes: 'Take with food' },
  { id: 'RX002', patient: 'David Williams', date: '2024-12-22', medicines: ['Metformin 500mg', 'Glipizide 5mg'], status: 'active', notes: 'Monitor blood sugar' },
  { id: 'RX003', patient: 'Maria Garcia', date: '2024-12-21', medicines: ['Sumatriptan 50mg'], status: 'dispensed', notes: 'As needed for migraine' },
  { id: 'RX004', patient: 'Robert Brown', date: '2024-12-20', medicines: ['Ibuprofen 400mg', 'Omeprazole 20mg'], status: 'dispensed', notes: 'Take after meals' },
  { id: 'RX005', patient: 'Jennifer Davis', date: '2024-12-19', medicines: ['Albuterol Inhaler'], status: 'active', notes: 'Use as needed for breathing' },
  { id: 'RX006', patient: 'Michael Taylor', date: '2024-12-18', medicines: ['Atorvastatin 20mg', 'Aspirin 81mg', 'Metoprolol 25mg'], status: 'dispensed', notes: 'Heart medication regimen' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  dispensed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  expired: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Prescriptions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredPrescriptions = prescriptions.filter(rx =>
    rx.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Prescriptions" subtitle="Create and manage prescriptions">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search prescriptions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Prescription
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Prescription</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Patient</Label>
                  <Input placeholder="Select patient" />
                </div>
                <div className="space-y-2">
                  <Label>Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Medicines</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input placeholder="Medicine name" className="flex-1" />
                    <Input placeholder="Dosage" className="w-32" />
                    <Input placeholder="Frequency" className="w-32" />
                  </div>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Plus className="w-3 h-3" />
                    Add Medicine
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Notes</Label>
                <Textarea placeholder="Additional instructions..." />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsDialogOpen(false)}>Create Prescription</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.map((rx, index) => (
          <div
            key={rx.id}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all stagger-${(index % 4) + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{rx.id}</h3>
                    <Badge variant="outline" className={statusColors[rx.status]}>
                      {rx.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rx.patient}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {rx.date}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {rx.medicines.map((med, i) => (
                <Badge key={i} variant="secondary" className="gap-1">
                  <Pill className="w-3 h-3" />
                  {med}
                </Badge>
              ))}
            </div>

            <p className="text-sm text-muted-foreground mb-4">{rx.notes}</p>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="gap-1">
                <FileText className="w-3 h-3" />
                View Details
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Printer className="w-3 h-3" />
                Print
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
