import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Activity, Heart, Thermometer, Droplet, 
  Save, CheckCircle, Clock, AlertCircle 
} from 'lucide-react';
import { toast } from 'sonner';

const patients = [
  { id: 'P001', name: 'John Smith', room: '101-A', lastRecorded: '2 hours ago' },
  { id: 'P002', name: 'Mary Johnson', room: '102-B', lastRecorded: '30 min ago' },
  { id: 'P003', name: 'Robert Williams', room: '103-A', lastRecorded: '1 hour ago' },
  { id: 'P004', name: 'Emily Davis', room: '104-B', lastRecorded: '3 hours ago' },
  { id: 'P005', name: 'Michael Brown', room: '105-A', lastRecorded: '15 min ago' },
];

const recentRecords = [
  { patient: 'Mary Johnson', room: '102-B', time: '09:30 AM', bp: '150/95', hr: 88, temp: 99.2, spo2: 96, status: 'elevated' },
  { patient: 'Michael Brown', room: '105-A', time: '09:45 AM', bp: '180/100', hr: 92, temp: 98.8, spo2: 94, status: 'critical' },
  { patient: 'John Smith', room: '101-A', time: '08:00 AM', bp: '120/80', hr: 72, temp: 98.4, spo2: 98, status: 'normal' },
  { patient: 'Robert Williams', room: '103-A', time: '09:00 AM', bp: '125/82', hr: 78, temp: 98.6, spo2: 97, status: 'normal' },
];

export default function VitalsRecording() {
  const [selectedPatient, setSelectedPatient] = useState('');
  const [vitals, setVitals] = useState({
    systolic: '',
    diastolic: '',
    heartRate: '',
    temperature: '',
    spo2: '',
    respiratoryRate: '',
    bloodSugar: '',
    notes: '',
  });

  const handleSubmit = () => {
    if (!selectedPatient) {
      toast.error('Please select a patient');
      return;
    }
    toast.success('Vitals recorded successfully');
    setVitals({
      systolic: '', diastolic: '', heartRate: '', temperature: '',
      spo2: '', respiratoryRate: '', bloodSugar: '', notes: '',
    });
    setSelectedPatient('');
  };

  return (
    <DashboardLayout title="Vitals Recording" subtitle="Record and monitor patient vitals">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recording Form */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-primary" />
              Record Vitals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Patient</label>
              <Select value={selectedPatient} onValueChange={setSelectedPatient}>
                <SelectTrigger className="bg-secondary/30">
                  <SelectValue placeholder="Choose a patient..." />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.name} - Room {patient.room}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Blood Pressure */}
              <div className="col-span-2">
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  Blood Pressure (mmHg)
                </label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Systolic"
                    value={vitals.systolic}
                    onChange={(e) => setVitals({ ...vitals, systolic: e.target.value })}
                    className="bg-secondary/30"
                  />
                  <span className="flex items-center text-muted-foreground">/</span>
                  <Input
                    type="number"
                    placeholder="Diastolic"
                    value={vitals.diastolic}
                    onChange={(e) => setVitals({ ...vitals, diastolic: e.target.value })}
                    className="bg-secondary/30"
                  />
                </div>
              </div>

              {/* Heart Rate */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  Heart Rate (bpm)
                </label>
                <Input
                  type="number"
                  placeholder="72"
                  value={vitals.heartRate}
                  onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
                  className="bg-secondary/30"
                />
              </div>

              {/* Temperature */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-orange-400" />
                  Temperature (°F)
                </label>
                <Input
                  type="number"
                  step="0.1"
                  placeholder="98.6"
                  value={vitals.temperature}
                  onChange={(e) => setVitals({ ...vitals, temperature: e.target.value })}
                  className="bg-secondary/30"
                />
              </div>

              {/* SpO2 */}
              <div>
                <label className="text-sm font-medium mb-2 flex items-center gap-2">
                  <Droplet className="w-4 h-4 text-blue-400" />
                  SpO2 (%)
                </label>
                <Input
                  type="number"
                  placeholder="98"
                  value={vitals.spo2}
                  onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
                  className="bg-secondary/30"
                />
              </div>

              {/* Respiratory Rate */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Respiratory Rate (/min)
                </label>
                <Input
                  type="number"
                  placeholder="16"
                  value={vitals.respiratoryRate}
                  onChange={(e) => setVitals({ ...vitals, respiratoryRate: e.target.value })}
                  className="bg-secondary/30"
                />
              </div>

              {/* Blood Sugar */}
              <div className="col-span-2">
                <label className="text-sm font-medium mb-2 block">
                  Blood Sugar (mg/dL) - Optional
                </label>
                <Input
                  type="number"
                  placeholder="100"
                  value={vitals.bloodSugar}
                  onChange={(e) => setVitals({ ...vitals, bloodSugar: e.target.value })}
                  className="bg-secondary/30"
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full gradient-primary text-primary-foreground">
              <Save className="w-4 h-4 mr-2" />
              Save Vitals
            </Button>
          </CardContent>
        </Card>

        {/* Recent Records */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recent Recordings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>BP</TableHead>
                  <TableHead>HR</TableHead>
                  <TableHead>Temp</TableHead>
                  <TableHead>SpO2</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentRecords.map((record, idx) => (
                  <TableRow key={idx}>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{record.patient}</p>
                        <p className="text-xs text-muted-foreground">{record.room}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{record.time}</TableCell>
                    <TableCell className="text-sm">{record.bp}</TableCell>
                    <TableCell className="text-sm">{record.hr}</TableCell>
                    <TableCell className="text-sm">{record.temp}</TableCell>
                    <TableCell className="text-sm">{record.spo2}%</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={
                          record.status === 'critical' 
                            ? 'border-destructive text-destructive'
                            : record.status === 'elevated'
                            ? 'border-warning text-warning'
                            : 'border-success text-success'
                        }
                      >
                        {record.status === 'critical' && <AlertCircle className="w-3 h-3 mr-1" />}
                        {record.status === 'normal' && <CheckCircle className="w-3 h-3 mr-1" />}
                        {record.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pending Vitals */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-warning" />
              Pending Vitals Check
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {patients.filter(p => p.lastRecorded.includes('hour')).map((patient) => (
                <div key={patient.id} className="p-4 rounded-lg bg-warning/10 border border-warning/30">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">{patient.name}</p>
                    <Badge variant="outline" className="border-warning text-warning">
                      {patient.lastRecorded}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">Room {patient.room}</p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setSelectedPatient(patient.id)}
                  >
                    Record Now
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
