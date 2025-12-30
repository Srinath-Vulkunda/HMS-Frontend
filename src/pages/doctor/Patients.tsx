import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, FileText, Calendar, X, Activity, Pill, FlaskConical } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';

const patients = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, gender: 'Female', phone: '+1 555-0101', lastVisit: '2024-12-20', condition: 'Hypertension', status: 'active', bloodType: 'A+', allergies: ['Penicillin'], emergencyContact: '+1 555-9001' },
  { id: 'P002', name: 'David Williams', age: 52, gender: 'Male', phone: '+1 555-0102', lastVisit: '2024-12-19', condition: 'Diabetes Type 2', status: 'active', bloodType: 'O+', allergies: [], emergencyContact: '+1 555-9002' },
  { id: 'P003', name: 'Maria Garcia', age: 28, gender: 'Female', phone: '+1 555-0103', lastVisit: '2024-12-18', condition: 'Migraine', status: 'active', bloodType: 'B+', allergies: ['Aspirin'], emergencyContact: '+1 555-9003' },
  { id: 'P004', name: 'Robert Brown', age: 45, gender: 'Male', phone: '+1 555-0104', lastVisit: '2024-12-15', condition: 'Arthritis', status: 'inactive', bloodType: 'AB+', allergies: [], emergencyContact: '+1 555-9004' },
  { id: 'P005', name: 'Jennifer Davis', age: 38, gender: 'Female', phone: '+1 555-0105', lastVisit: '2024-12-22', condition: 'Asthma', status: 'active', bloodType: 'A-', allergies: ['Sulfa'], emergencyContact: '+1 555-9005' },
  { id: 'P006', name: 'Michael Taylor', age: 61, gender: 'Male', phone: '+1 555-0106', lastVisit: '2024-12-21', condition: 'Heart Disease', status: 'critical', bloodType: 'O-', allergies: ['Ibuprofen'], emergencyContact: '+1 555-9006' },
  { id: 'P007', name: 'Emily Wilson', age: 29, gender: 'Female', phone: '+1 555-0107', lastVisit: '2024-12-17', condition: 'Anxiety', status: 'active', bloodType: 'B-', allergies: [], emergencyContact: '+1 555-9007' },
  { id: 'P008', name: 'James Anderson', age: 55, gender: 'Male', phone: '+1 555-0108', lastVisit: '2024-12-16', condition: 'High Cholesterol', status: 'active', bloodType: 'AB-', allergies: ['Codeine'], emergencyContact: '+1 555-9008' },
];

const patientHistory: Record<string, { visits: Array<{ date: string; diagnosis: string; doctor: string; notes: string }>; prescriptions: Array<{ date: string; medication: string; dosage: string; duration: string }>; labResults: Array<{ date: string; test: string; result: string; status: string }> }> = {
  'P001': {
    visits: [
      { date: '2024-12-20', diagnosis: 'Hypertension follow-up', doctor: 'Dr. John Smith', notes: 'Blood pressure controlled, continue current medication' },
      { date: '2024-11-15', diagnosis: 'Routine checkup', doctor: 'Dr. John Smith', notes: 'All vitals normal' },
      { date: '2024-10-05', diagnosis: 'Initial hypertension diagnosis', doctor: 'Dr. John Smith', notes: 'Started on Amlodipine 5mg' },
    ],
    prescriptions: [
      { date: '2024-12-20', medication: 'Amlodipine', dosage: '5mg once daily', duration: '30 days' },
      { date: '2024-12-20', medication: 'Aspirin', dosage: '75mg once daily', duration: '30 days' },
    ],
    labResults: [
      { date: '2024-12-18', test: 'Complete Blood Count', result: 'Normal', status: 'completed' },
      { date: '2024-12-18', test: 'Lipid Profile', result: 'Cholesterol slightly elevated', status: 'completed' },
    ],
  },
  'P002': {
    visits: [
      { date: '2024-12-19', diagnosis: 'Diabetes management', doctor: 'Dr. Emily Davis', notes: 'HbA1c improved, continue metformin' },
      { date: '2024-11-10', diagnosis: 'Diabetes follow-up', doctor: 'Dr. Emily Davis', notes: 'Diet compliance good' },
    ],
    prescriptions: [
      { date: '2024-12-19', medication: 'Metformin', dosage: '500mg twice daily', duration: '60 days' },
    ],
    labResults: [
      { date: '2024-12-17', test: 'HbA1c', result: '6.8%', status: 'completed' },
      { date: '2024-12-17', test: 'Fasting Blood Sugar', result: '110 mg/dL', status: 'completed' },
    ],
  },
};

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [historyDialogOpen, setHistoryDialogOpen] = useState(false);
  const [bookDialogOpen, setBookDialogOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleView = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    setViewDialogOpen(true);
  };

  const handleHistory = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    setHistoryDialogOpen(true);
  };

  const handleBook = (patient: typeof patients[0]) => {
    setSelectedPatient(patient);
    setBookDialogOpen(true);
  };

  const confirmBooking = () => {
    if (!bookingDate || !bookingTime) {
      toast.error('Please select date and time');
      return;
    }
    toast.success(`Appointment booked for ${selectedPatient?.name} on ${bookingDate} at ${bookingTime}`);
    setBookDialogOpen(false);
    setBookingDate('');
    setBookingTime('');
  };

  const history = selectedPatient ? patientHistory[selectedPatient.id] : null;

  return (
    <DashboardLayout title="My Patients" subtitle="View and manage your patients">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient, index) => (
          <div
            key={patient.id}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 stagger-${(index % 3) + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground">{patient.id}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[patient.status]}>
                {patient.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Age/Gender</span>
                <span className="text-foreground">{patient.age} / {patient.gender}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span className="text-foreground">{patient.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Condition</span>
                <span className="text-foreground">{patient.condition}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Visit</span>
                <span className="text-foreground">{patient.lastVisit}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleView(patient)}>
                <Eye className="w-3 h-3" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleHistory(patient)}>
                <FileText className="w-3 h-3" />
                History
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1" onClick={() => handleBook(patient)}>
                <Calendar className="w-3 h-3" />
                Book
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* View Patient Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Patient Details</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{selectedPatient.name}</h3>
                  <p className="text-muted-foreground">{selectedPatient.id}</p>
                  <Badge variant="outline" className={statusColors[selectedPatient.status]}>
                    {selectedPatient.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/30 rounded-xl">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{selectedPatient.age} years</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{selectedPatient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-medium">{selectedPatient.bloodType}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedPatient.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Condition</p>
                  <p className="font-medium">{selectedPatient.condition}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Emergency Contact</p>
                  <p className="font-medium">{selectedPatient.emergencyContact}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-muted-foreground">Allergies</p>
                  <div className="flex gap-2 mt-1">
                    {selectedPatient.allergies.length > 0 ? (
                      selectedPatient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive">{allergy}</Badge>
                      ))
                    ) : (
                      <span className="text-muted-foreground">No known allergies</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* History Dialog */}
      <Dialog open={historyDialogOpen} onOpenChange={setHistoryDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Patient History - {selectedPatient?.name}</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <Tabs defaultValue="visits" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visits" className="gap-2">
                  <Activity className="w-4 h-4" />
                  Visits
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="gap-2">
                  <Pill className="w-4 h-4" />
                  Prescriptions
                </TabsTrigger>
                <TabsTrigger value="labs" className="gap-2">
                  <FlaskConical className="w-4 h-4" />
                  Lab Results
                </TabsTrigger>
              </TabsList>
              <TabsContent value="visits" className="mt-4 space-y-3">
                {history?.visits?.length ? (
                  history.visits.map((visit, i) => (
                    <div key={i} className="p-4 bg-secondary/30 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium">{visit.diagnosis}</p>
                        <Badge variant="outline">{visit.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{visit.doctor}</p>
                      <p className="text-sm mt-2">{visit.notes}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No visit history available</p>
                )}
              </TabsContent>
              <TabsContent value="prescriptions" className="mt-4 space-y-3">
                {history?.prescriptions?.length ? (
                  history.prescriptions.map((rx, i) => (
                    <div key={i} className="p-4 bg-secondary/30 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-medium">{rx.medication}</p>
                        <p className="text-sm text-muted-foreground">{rx.dosage} - {rx.duration}</p>
                      </div>
                      <Badge variant="outline">{rx.date}</Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No prescriptions available</p>
                )}
              </TabsContent>
              <TabsContent value="labs" className="mt-4 space-y-3">
                {history?.labResults?.length ? (
                  history.labResults.map((lab, i) => (
                    <div key={i} className="p-4 bg-secondary/30 rounded-xl flex justify-between items-center">
                      <div>
                        <p className="font-medium">{lab.test}</p>
                        <p className="text-sm text-muted-foreground">{lab.result}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                          {lab.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{lab.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-8">No lab results available</p>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>

      {/* Book Appointment Dialog */}
      <Dialog open={bookDialogOpen} onOpenChange={setBookDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
          </DialogHeader>
          {selectedPatient && (
            <div className="space-y-4">
              <div className="p-4 bg-secondary/30 rounded-xl">
                <p className="font-medium">{selectedPatient.name}</p>
                <p className="text-sm text-muted-foreground">{selectedPatient.id} • {selectedPatient.condition}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Time</label>
                <Input
                  type="time"
                  value={bookingTime}
                  onChange={(e) => setBookingTime(e.target.value)}
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setBookDialogOpen(false)}>Cancel</Button>
                <Button onClick={confirmBooking}>Confirm Booking</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
