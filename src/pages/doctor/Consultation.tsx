import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, Heart, Thermometer, Activity, Plus, Trash2, 
  FileText, TestTube, Pill, Save, CheckCircle, Clock,
  Stethoscope, AlertCircle, History
} from 'lucide-react';

// Mock patient data
const patientData = {
  id: 'P001',
  name: 'Maria Garcia',
  age: 45,
  gender: 'Female',
  bloodGroup: 'O+',
  phone: '+1 234-567-8901',
  allergies: ['Penicillin', 'Sulfa drugs'],
  chronicConditions: ['Hypertension', 'Diabetes Type 2'],
  lastVisit: 'Dec 15, 2024',
};

const vitalSigns = {
  bloodPressure: '130/85',
  heartRate: 78,
  temperature: 98.4,
  oxygenLevel: 98,
  weight: 68,
  height: 165,
};

const medicalHistory = [
  { date: 'Dec 15, 2024', diagnosis: 'Upper Respiratory Infection', doctor: 'Dr. Chen' },
  { date: 'Nov 20, 2024', diagnosis: 'Routine Checkup', doctor: 'Dr. Chen' },
  { date: 'Oct 05, 2024', diagnosis: 'Blood Pressure Follow-up', doctor: 'Dr. Patel' },
];

const medicinesList = [
  { id: '1', name: 'Paracetamol 500mg', category: 'Analgesic' },
  { id: '2', name: 'Amoxicillin 500mg', category: 'Antibiotic' },
  { id: '3', name: 'Omeprazole 20mg', category: 'Antacid' },
  { id: '4', name: 'Metformin 500mg', category: 'Antidiabetic' },
  { id: '5', name: 'Amlodipine 5mg', category: 'Antihypertensive' },
  { id: '6', name: 'Cetirizine 10mg', category: 'Antihistamine' },
];

const labTestsList = [
  { id: '1', name: 'Complete Blood Count (CBC)', category: 'Hematology' },
  { id: '2', name: 'Blood Sugar (Fasting)', category: 'Biochemistry' },
  { id: '3', name: 'Lipid Profile', category: 'Biochemistry' },
  { id: '4', name: 'Liver Function Test (LFT)', category: 'Biochemistry' },
  { id: '5', name: 'Thyroid Profile', category: 'Endocrinology' },
  { id: '6', name: 'Urine Analysis', category: 'Clinical Pathology' },
  { id: '7', name: 'Chest X-Ray', category: 'Radiology' },
  { id: '8', name: 'ECG', category: 'Cardiology' },
];

interface Prescription {
  medicine: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface LabTest {
  test: string;
  priority: string;
  notes: string;
}

export default function Consultation() {
  const navigate = useNavigate();
  const { appointmentId } = useParams();
  
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [notes, setNotes] = useState('');
  
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [newPrescription, setNewPrescription] = useState<Prescription>({
    medicine: '',
    dosage: '',
    frequency: '1-0-1',
    duration: '5 days',
    instructions: 'After meals',
  });
  
  const [labTests, setLabTests] = useState<LabTest[]>([]);
  const [newLabTest, setNewLabTest] = useState<LabTest>({
    test: '',
    priority: 'routine',
    notes: '',
  });

  const addPrescription = () => {
    if (newPrescription.medicine) {
      setPrescriptions([...prescriptions, newPrescription]);
      setNewPrescription({
        medicine: '',
        dosage: '',
        frequency: '1-0-1',
        duration: '5 days',
        instructions: 'After meals',
      });
    }
  };

  const removePrescription = (index: number) => {
    setPrescriptions(prescriptions.filter((_, i) => i !== index));
  };

  const addLabTest = () => {
    if (newLabTest.test) {
      setLabTests([...labTests, newLabTest]);
      setNewLabTest({ test: '', priority: 'routine', notes: '' });
    }
  };

  const removeLabTest = (index: number) => {
    setLabTests(labTests.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    // In real app, save data to backend
    navigate('/doctor/appointments');
  };

  return (
    <DashboardLayout title="Patient Consultation" subtitle={`Appointment #${appointmentId || 'APT001'}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Patient Info & Vitals */}
        <div className="space-y-6">
          {/* Patient Card */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">MG</span>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{patientData.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {patientData.age} yrs • {patientData.gender} • {patientData.bloodGroup}
                  </p>
                  <p className="text-sm text-muted-foreground">{patientData.phone}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Allergies</p>
                <div className="flex flex-wrap gap-2">
                  {patientData.allergies.map((allergy) => (
                    <Badge key={allergy} variant="destructive" className="text-xs">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Chronic Conditions</p>
                <div className="flex flex-wrap gap-2">
                  {patientData.chronicConditions.map((condition) => (
                    <Badge key={condition} variant="outline" className="text-xs border-warning text-warning">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vitals Card */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="w-5 h-5 text-primary" />
                Vital Signs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Heart className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-muted-foreground">Blood Pressure</span>
                  </div>
                  <p className="font-semibold">{vitalSigns.bloodPressure} mmHg</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-muted-foreground">Heart Rate</span>
                  </div>
                  <p className="font-semibold">{vitalSigns.heartRate} bpm</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Thermometer className="w-4 h-4 text-orange-400" />
                    <span className="text-xs text-muted-foreground">Temperature</span>
                  </div>
                  <p className="font-semibold">{vitalSigns.temperature}°F</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-muted-foreground">SpO2</span>
                  </div>
                  <p className="font-semibold">{vitalSigns.oxygenLevel}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card className="glass-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <History className="w-5 h-5 text-primary" />
                Medical History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {medicalHistory.map((visit, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-secondary/30 border border-border">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{visit.diagnosis}</span>
                      <Badge variant="outline" className="text-xs">{visit.date}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{visit.doctor}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Consultation Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="diagnosis" className="space-y-6">
            <TabsList className="bg-secondary/50 w-full justify-start">
              <TabsTrigger value="diagnosis" className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4" />
                Diagnosis
              </TabsTrigger>
              <TabsTrigger value="prescription" className="flex items-center gap-2">
                <Pill className="w-4 h-4" />
                Prescription
              </TabsTrigger>
              <TabsTrigger value="labtests" className="flex items-center gap-2">
                <TestTube className="w-4 h-4" />
                Lab Tests
              </TabsTrigger>
            </TabsList>

            {/* Diagnosis Tab */}
            <TabsContent value="diagnosis">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Diagnosis & Notes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Chief Complaints / Symptoms</label>
                    <Textarea
                      placeholder="Enter patient's symptoms and complaints..."
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      className="min-h-[100px] bg-secondary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Diagnosis</label>
                    <Textarea
                      placeholder="Enter your diagnosis..."
                      value={diagnosis}
                      onChange={(e) => setDiagnosis(e.target.value)}
                      className="min-h-[100px] bg-secondary/30"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Clinical Notes</label>
                    <Textarea
                      placeholder="Additional notes, observations, recommendations..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="min-h-[120px] bg-secondary/30"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Prescription Tab */}
            <TabsContent value="prescription">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Prescribe Medicines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Medicine Form */}
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Medicine</label>
                        <Select
                          value={newPrescription.medicine}
                          onValueChange={(value) => setNewPrescription({ ...newPrescription, medicine: value })}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select medicine" />
                          </SelectTrigger>
                          <SelectContent>
                            {medicinesList.map((med) => (
                              <SelectItem key={med.id} value={med.name}>
                                {med.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Dosage</label>
                        <Input
                          placeholder="e.g., 500mg"
                          value={newPrescription.dosage}
                          onChange={(e) => setNewPrescription({ ...newPrescription, dosage: e.target.value })}
                          className="bg-background"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Frequency</label>
                        <Select
                          value={newPrescription.frequency}
                          onValueChange={(value) => setNewPrescription({ ...newPrescription, frequency: value })}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1-0-0">Once daily (Morning)</SelectItem>
                            <SelectItem value="0-0-1">Once daily (Night)</SelectItem>
                            <SelectItem value="1-0-1">Twice daily</SelectItem>
                            <SelectItem value="1-1-1">Thrice daily</SelectItem>
                            <SelectItem value="1-1-1-1">Four times daily</SelectItem>
                            <SelectItem value="SOS">As needed (SOS)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Duration</label>
                        <Select
                          value={newPrescription.duration}
                          onValueChange={(value) => setNewPrescription({ ...newPrescription, duration: value })}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="3 days">3 Days</SelectItem>
                            <SelectItem value="5 days">5 Days</SelectItem>
                            <SelectItem value="7 days">7 Days</SelectItem>
                            <SelectItem value="10 days">10 Days</SelectItem>
                            <SelectItem value="14 days">14 Days</SelectItem>
                            <SelectItem value="1 month">1 Month</SelectItem>
                            <SelectItem value="Continuous">Continuous</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Instructions</label>
                      <Input
                        placeholder="e.g., After meals, Before bed"
                        value={newPrescription.instructions}
                        onChange={(e) => setNewPrescription({ ...newPrescription, instructions: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <Button onClick={addPrescription} className="gradient-primary text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Medicine
                    </Button>
                  </div>

                  {/* Prescription List */}
                  {prescriptions.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Medicine</TableHead>
                          <TableHead>Dosage</TableHead>
                          <TableHead>Frequency</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Instructions</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {prescriptions.map((rx, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{rx.medicine}</TableCell>
                            <TableCell>{rx.dosage}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{rx.frequency}</Badge>
                            </TableCell>
                            <TableCell>{rx.duration}</TableCell>
                            <TableCell className="text-muted-foreground">{rx.instructions}</TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive"
                                onClick={() => removePrescription(idx)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Lab Tests Tab */}
            <TabsContent value="labtests">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recommend Lab Tests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Add Lab Test Form */}
                  <div className="p-4 rounded-lg bg-secondary/30 border border-border space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Test</label>
                        <Select
                          value={newLabTest.test}
                          onValueChange={(value) => setNewLabTest({ ...newLabTest, test: value })}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select test" />
                          </SelectTrigger>
                          <SelectContent>
                            {labTestsList.map((test) => (
                              <SelectItem key={test.id} value={test.name}>
                                {test.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Priority</label>
                        <Select
                          value={newLabTest.priority}
                          onValueChange={(value) => setNewLabTest({ ...newLabTest, priority: value })}
                        >
                          <SelectTrigger className="bg-background">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="routine">Routine</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                            <SelectItem value="stat">STAT (Immediate)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Notes</label>
                      <Input
                        placeholder="Additional notes for lab..."
                        value={newLabTest.notes}
                        onChange={(e) => setNewLabTest({ ...newLabTest, notes: e.target.value })}
                        className="bg-background"
                      />
                    </div>
                    <Button onClick={addLabTest} className="gradient-primary text-primary-foreground">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Test
                    </Button>
                  </div>

                  {/* Lab Tests List */}
                  {labTests.length > 0 && (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Test</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Notes</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {labTests.map((test, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-medium">{test.test}</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={
                                  test.priority === 'stat'
                                    ? 'border-destructive text-destructive'
                                    : test.priority === 'urgent'
                                    ? 'border-warning text-warning'
                                    : 'border-primary text-primary'
                                }
                              >
                                {test.priority.toUpperCase()}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-muted-foreground">{test.notes || '-'}</TableCell>
                            <TableCell>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="text-destructive"
                                onClick={() => removeLabTest(idx)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={() => navigate('/doctor/appointments')}>
              Cancel
            </Button>
            <Button variant="outline" className="gap-2">
              <Save className="w-4 h-4" />
              Save Draft
            </Button>
            <Button onClick={handleComplete} className="gradient-primary text-primary-foreground gap-2">
              <CheckCircle className="w-4 h-4" />
              Complete Consultation
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
