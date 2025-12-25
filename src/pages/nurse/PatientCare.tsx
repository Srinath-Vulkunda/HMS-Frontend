import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Search, User, Activity, Heart, Thermometer, 
  Droplet, Clock, CheckCircle, AlertCircle 
} from 'lucide-react';

const patients = [
  { 
    id: 'P001', name: 'John Smith', room: '101-A', bed: '1', age: 65, gender: 'Male',
    condition: 'Stable', doctor: 'Dr. Chen', admissionDate: 'Dec 20, 2024',
    diagnosis: 'Post-Surgery Recovery', lastVitals: '2 hours ago'
  },
  { 
    id: 'P002', name: 'Mary Johnson', room: '102-B', bed: '2', age: 45, gender: 'Female',
    condition: 'Critical', doctor: 'Dr. Patel', admissionDate: 'Dec 22, 2024',
    diagnosis: 'Cardiac Monitoring', lastVitals: '30 min ago'
  },
  { 
    id: 'P003', name: 'Robert Williams', room: '103-A', bed: '1', age: 55, gender: 'Male',
    condition: 'Recovering', doctor: 'Dr. Chen', admissionDate: 'Dec 18, 2024',
    diagnosis: 'Pneumonia', lastVitals: '1 hour ago'
  },
  { 
    id: 'P004', name: 'Emily Davis', room: '104-B', bed: '2', age: 32, gender: 'Female',
    condition: 'Stable', doctor: 'Dr. Wilson', admissionDate: 'Dec 23, 2024',
    diagnosis: 'Appendectomy', lastVitals: '3 hours ago'
  },
  { 
    id: 'P005', name: 'Michael Brown', room: '105-A', bed: '1', age: 70, gender: 'Male',
    condition: 'Critical', doctor: 'Dr. Patel', admissionDate: 'Dec 24, 2024',
    diagnosis: 'Diabetic Emergency', lastVitals: '15 min ago'
  },
];

const vitalsHistory = [
  { time: '10:00 AM', bp: '120/80', hr: 72, temp: 98.4, spo2: 98, patient: 'P001' },
  { time: '08:00 AM', bp: '125/82', hr: 75, temp: 98.6, spo2: 97, patient: 'P001' },
  { time: '06:00 AM', bp: '118/78', hr: 70, temp: 98.2, spo2: 99, patient: 'P001' },
];

export default function PatientCare() {
  const [selectedPatient, setSelectedPatient] = useState<typeof patients[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.room.includes(searchQuery) ||
    p.id.includes(searchQuery)
  );

  return (
    <DashboardLayout title="Patient Care" subtitle="Monitor and manage assigned patients">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient List */}
        <Card className="glass-card lg:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Assigned Patients
            </CardTitle>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search patient..." 
                className="pl-9 bg-secondary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[600px] overflow-y-auto">
              {filteredPatients.map((patient) => (
                <button
                  key={patient.id}
                  onClick={() => setSelectedPatient(patient)}
                  className={`w-full text-left p-4 rounded-xl border transition-all ${
                    selectedPatient?.id === patient.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary/30 hover:bg-secondary/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">Room {patient.room}</p>
                      </div>
                    </div>
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
                  </div>
                  <p className="text-xs text-muted-foreground">{patient.diagnosis}</p>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    Last vitals: {patient.lastVitals}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Patient Details */}
        <div className="lg:col-span-2">
          {selectedPatient ? (
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="vitals">Vitals History</TabsTrigger>
                <TabsTrigger value="tasks">Care Tasks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-xl font-bold text-primary">
                            {selectedPatient.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold">{selectedPatient.name}</h3>
                          <p className="text-muted-foreground">
                            {selectedPatient.age} yrs • {selectedPatient.gender} • ID: {selectedPatient.id}
                          </p>
                        </div>
                      </div>
                      <Badge 
                        className={
                          selectedPatient.condition === 'Critical' 
                            ? 'bg-destructive' 
                            : selectedPatient.condition === 'Stable' 
                            ? 'bg-success'
                            : 'bg-primary'
                        }
                      >
                        {selectedPatient.condition}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 rounded-lg bg-secondary/30">
                        <p className="text-sm text-muted-foreground">Room / Bed</p>
                        <p className="font-semibold">{selectedPatient.room} / Bed {selectedPatient.bed}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/30">
                        <p className="text-sm text-muted-foreground">Attending Doctor</p>
                        <p className="font-semibold">{selectedPatient.doctor}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/30">
                        <p className="text-sm text-muted-foreground">Admitted</p>
                        <p className="font-semibold">{selectedPatient.admissionDate}</p>
                      </div>
                      <div className="p-4 rounded-lg bg-secondary/30">
                        <p className="text-sm text-muted-foreground">Diagnosis</p>
                        <p className="font-semibold">{selectedPatient.diagnosis}</p>
                      </div>
                    </div>

                    {/* Current Vitals */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-primary" />
                        Current Vitals
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="w-4 h-4 text-red-400" />
                            <span className="text-xs text-muted-foreground">Blood Pressure</span>
                          </div>
                          <p className="font-semibold text-lg">120/80 mmHg</p>
                        </div>
                        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Activity className="w-4 h-4 text-green-400" />
                            <span className="text-xs text-muted-foreground">Heart Rate</span>
                          </div>
                          <p className="font-semibold text-lg">72 bpm</p>
                        </div>
                        <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Thermometer className="w-4 h-4 text-orange-400" />
                            <span className="text-xs text-muted-foreground">Temperature</span>
                          </div>
                          <p className="font-semibold text-lg">98.4°F</p>
                        </div>
                        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-1">
                            <Droplet className="w-4 h-4 text-blue-400" />
                            <span className="text-xs text-muted-foreground">SpO2</span>
                          </div>
                          <p className="font-semibold text-lg">98%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button className="gradient-primary text-primary-foreground">
                        <Activity className="w-4 h-4 mr-2" />
                        Record Vitals
                      </Button>
                      <Button variant="outline">
                        View Full Chart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="vitals">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Vitals History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Blood Pressure</TableHead>
                          <TableHead>Heart Rate</TableHead>
                          <TableHead>Temperature</TableHead>
                          <TableHead>SpO2</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vitalsHistory.map((record, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{record.time}</TableCell>
                            <TableCell>{record.bp} mmHg</TableCell>
                            <TableCell>{record.hr} bpm</TableCell>
                            <TableCell>{record.temp}°F</TableCell>
                            <TableCell>{record.spo2}%</TableCell>
                            <TableCell>
                              <Badge variant="outline" className="border-success text-success">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Normal
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Care Tasks</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { task: 'Morning Vitals Check', time: '06:00 AM', status: 'completed' },
                        { task: 'Medication - Aspirin 100mg', time: '08:00 AM', status: 'completed' },
                        { task: 'Breakfast', time: '08:30 AM', status: 'completed' },
                        { task: 'Wound Dressing Change', time: '10:00 AM', status: 'pending' },
                        { task: 'Lunch', time: '12:00 PM', status: 'pending' },
                        { task: 'Afternoon Vitals Check', time: '02:00 PM', status: 'pending' },
                      ].map((task, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
                          <div className="flex items-center gap-3">
                            {task.status === 'completed' ? (
                              <CheckCircle className="w-5 h-5 text-success" />
                            ) : (
                              <Clock className="w-5 h-5 text-muted-foreground" />
                            )}
                            <div>
                              <p className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                {task.task}
                              </p>
                              <p className="text-xs text-muted-foreground">{task.time}</p>
                            </div>
                          </div>
                          {task.status === 'pending' && (
                            <Button size="sm" className="gradient-primary text-primary-foreground">
                              Mark Done
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          ) : (
            <Card className="glass-card h-full flex items-center justify-center min-h-[400px]">
              <div className="text-center text-muted-foreground">
                <User className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Select a patient to view details</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
