import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { 
  Clock, Users, CheckCircle, Play, Calendar,
  Stethoscope, ClipboardCheck, AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const scheduledRounds = [
  { 
    id: 'R001', time: '06:00 AM', type: 'Morning Round', 
    status: 'completed', patients: 5, completedAt: '06:45 AM',
    notes: 'All patients stable. Mr. Smith reported mild headache.'
  },
  { 
    id: 'R002', time: '10:00 AM', type: 'Doctor Round Assist', 
    status: 'in-progress', patients: 5, doctor: 'Dr. Chen',
    notes: ''
  },
  { 
    id: 'R003', time: '02:00 PM', type: 'Afternoon Check', 
    status: 'pending', patients: 5,
    notes: ''
  },
  { 
    id: 'R004', time: '06:00 PM', type: 'Evening Round', 
    status: 'pending', patients: 5,
    notes: ''
  },
  { 
    id: 'R005', time: '10:00 PM', type: 'Night Check', 
    status: 'pending', patients: 5,
    notes: ''
  },
];

const patientChecklist = [
  { id: 'P001', name: 'John Smith', room: '101-A', checked: true, notes: 'Stable, vitals normal' },
  { id: 'P002', name: 'Mary Johnson', room: '102-B', checked: true, notes: 'BP slightly elevated' },
  { id: 'P003', name: 'Robert Williams', room: '103-A', checked: false, notes: '' },
  { id: 'P004', name: 'Emily Davis', room: '104-B', checked: false, notes: '' },
  { id: 'P005', name: 'Michael Brown', room: '105-A', checked: false, notes: '' },
];

export default function Rounds() {
  const [activeRound, setActiveRound] = useState<string | null>('R002');
  const [checklist, setChecklist] = useState(patientChecklist);
  const [roundNotes, setRoundNotes] = useState('');

  const togglePatientCheck = (id: string) => {
    setChecklist(prev => 
      prev.map(p => p.id === id ? { ...p, checked: !p.checked } : p)
    );
  };

  const completeRound = () => {
    toast.success('Round completed successfully');
    setActiveRound(null);
    setChecklist(prev => prev.map(p => ({ ...p, checked: false, notes: '' })));
    setRoundNotes('');
  };

  const startRound = (roundId: string) => {
    setActiveRound(roundId);
    toast.info('Round started');
  };

  return (
    <DashboardLayout title="Nursing Rounds" subtitle="Schedule and manage patient rounds">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Scheduled Rounds */}
        <Card className="glass-card lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Today's Rounds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {scheduledRounds.map((round) => (
                <div 
                  key={round.id}
                  className={`p-4 rounded-lg border transition-all ${
                    activeRound === round.id 
                      ? 'border-primary bg-primary/10' 
                      : round.status === 'completed'
                      ? 'border-success/30 bg-success/5'
                      : 'border-border bg-secondary/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{round.time}</span>
                    </div>
                    <Badge 
                      variant="outline"
                      className={
                        round.status === 'completed' 
                          ? 'border-success text-success'
                          : round.status === 'in-progress'
                          ? 'border-primary text-primary'
                          : 'border-muted-foreground text-muted-foreground'
                      }
                    >
                      {round.status === 'completed' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {round.status === 'in-progress' && <Play className="w-3 h-3 mr-1" />}
                      {round.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{round.type}</p>
                  {round.doctor && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Stethoscope className="w-3 h-3" />
                      {round.doctor}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {round.patients} patients
                    {round.completedAt && ` • Completed at ${round.completedAt}`}
                  </div>
                  
                  {round.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full mt-3"
                      onClick={() => startRound(round.id)}
                    >
                      <Play className="w-3 h-3 mr-2" />
                      Start Round
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Active Round Checklist */}
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="w-5 h-5 text-primary" />
              {activeRound ? 'Active Round - Patient Checklist' : 'No Active Round'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activeRound ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {checklist.map((patient) => (
                    <div 
                      key={patient.id}
                      className={`p-4 rounded-lg border transition-all cursor-pointer ${
                        patient.checked 
                          ? 'border-success bg-success/10' 
                          : 'border-border bg-secondary/30 hover:border-primary/50'
                      }`}
                      onClick={() => togglePatientCheck(patient.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            patient.checked 
                              ? 'border-success bg-success' 
                              : 'border-muted-foreground'
                          }`}>
                            {patient.checked && <CheckCircle className="w-4 h-4 text-white" />}
                          </div>
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-xs text-muted-foreground">Room {patient.room}</p>
                          </div>
                        </div>
                      </div>
                      {patient.checked && patient.notes && (
                        <p className="text-sm text-muted-foreground mt-2 pl-9">
                          {patient.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Round Notes</label>
                  <Textarea
                    placeholder="Enter any observations or notes from this round..."
                    value={roundNotes}
                    onChange={(e) => setRoundNotes(e.target.value)}
                    className="bg-secondary/30 min-h-[100px]"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={completeRound}
                    className="gradient-primary text-primary-foreground"
                    disabled={!checklist.every(p => p.checked)}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete Round
                  </Button>
                  <Button variant="outline" onClick={() => setActiveRound(null)}>
                    Cancel
                  </Button>
                </div>

                {!checklist.every(p => p.checked) && (
                  <div className="flex items-center gap-2 text-sm text-warning">
                    <AlertCircle className="w-4 h-4" />
                    Check all patients to complete the round
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <ClipboardCheck className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No active round</p>
                <p className="text-sm text-muted-foreground">Start a round from the schedule to begin patient checks</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
