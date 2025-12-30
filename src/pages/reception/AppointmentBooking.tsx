import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar, Clock, User, Stethoscope, Check, IndianRupee } from 'lucide-react';
import { useState, useMemo } from 'react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const doctors = [
  { id: 'D001', name: 'Dr. John Smith', department: 'Cardiology', available: true, consultationFee: 800 },
  { id: 'D002', name: 'Dr. Emily Davis', department: 'Neurology', available: true, consultationFee: 1000 },
  { id: 'D003', name: 'Dr. Robert Wilson', department: 'Orthopedics', available: false, consultationFee: 700 },
  { id: 'D004', name: 'Dr. Sarah Chen', department: 'Pediatrics', available: true, consultationFee: 600 },
  { id: 'D005', name: 'Dr. Michael Brown', department: 'Dermatology', available: true, consultationFee: 500 },
];

const appointmentTypeFees: Record<string, number> = {
  consultation: 0,
  followup: -200,
  checkup: 100,
  emergency: 300,
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

const bookedSlots = ['09:30 AM', '10:00 AM', '02:30 PM'];

export default function AppointmentBooking() {
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [appointmentType, setAppointmentType] = useState('');

  const selectedDoctorData = useMemo(() => 
    doctors.find(d => d.id === selectedDoctor), 
    [selectedDoctor]
  );

  const totalFee = useMemo(() => {
    if (!selectedDoctorData) return 0;
    const baseFee = selectedDoctorData.consultationFee;
    const typeAdjustment = appointmentType ? appointmentTypeFees[appointmentType] || 0 : 0;
    return Math.max(0, baseFee + typeAdjustment);
  }, [selectedDoctorData, appointmentType]);

  const handleBook = () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !patientSearch) {
      toast.error('Please fill in all required fields');
      return;
    }
    const tokenNo = Math.floor(Math.random() * 100) + 1;
    toast.success(`Appointment booked! Token #${tokenNo}. Redirecting to billing...`);
    
    // Navigate to billing with appointment details
    navigate('/reception/billing', {
      state: {
        patientName: patientSearch,
        doctorName: selectedDoctorData?.name,
        department: selectedDoctorData?.department,
        appointmentDate: selectedDate,
        appointmentTime: selectedTime,
        appointmentType: appointmentType || 'consultation',
        consultationFee: totalFee,
        tokenNo,
      }
    });
  };

  return (
    <DashboardLayout title="Book Appointment" subtitle="Schedule patient appointments">
      <div className="max-w-4xl space-y-6">
        {/* Patient Selection */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Patient Details</h3>
              <p className="text-sm text-muted-foreground">Search for existing patient or register new</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Search Patient *</Label>
              <Input
                placeholder="Enter patient name or ID..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Appointment Type</Label>
              <Select value={appointmentType} onValueChange={setAppointmentType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation (Standard)</SelectItem>
                  <SelectItem value="followup">Follow-up (-₹200)</SelectItem>
                  <SelectItem value="checkup">General Checkup (+₹100)</SelectItem>
                  <SelectItem value="emergency">Emergency (+₹300)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Doctor Selection */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Stethoscope className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Select Doctor</h3>
              <p className="text-sm text-muted-foreground">Choose available doctor</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                onClick={() => doctor.available && setSelectedDoctor(doctor.id)}
                disabled={!doctor.available}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedDoctor === doctor.id
                    ? 'border-primary bg-primary/10'
                    : doctor.available
                    ? 'border-border hover:border-primary/50'
                    : 'border-border opacity-50 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-foreground">{doctor.name}</span>
                  {selectedDoctor === doctor.id && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{doctor.department}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className={`${
                      doctor.available
                        ? 'bg-green-500/20 text-green-400 border-green-500/30'
                        : 'bg-red-500/20 text-red-400 border-red-500/30'
                    }`}
                  >
                    {doctor.available ? 'Available' : 'Unavailable'}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30">
                    ₹{doctor.consultationFee}
                  </Badge>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Date & Time Selection */}
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Select Date & Time</h3>
              <p className="text-sm text-muted-foreground">Choose appointment slot</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Appointment Date *</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {selectedDate && (
              <div className="space-y-2">
                <Label>Available Time Slots</Label>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {timeSlots.map((slot) => {
                    const isBooked = bookedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => !isBooked && setSelectedTime(slot)}
                        disabled={isBooked}
                        className={`p-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === slot
                            ? 'border-primary bg-primary text-primary-foreground'
                            : isBooked
                            ? 'border-border bg-secondary/30 text-muted-foreground cursor-not-allowed line-through'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fee Summary */}
        {selectedDoctor && (
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <IndianRupee className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-display font-semibold text-foreground">Fee Summary</h3>
                <p className="text-sm text-muted-foreground">Consultation charges</p>
              </div>
            </div>
            <div className="space-y-2 p-4 bg-secondary/30 rounded-xl">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Doctor Consultation Fee</span>
                <span className="text-foreground">₹{selectedDoctorData?.consultationFee || 0}</span>
              </div>
              {appointmentType && appointmentTypeFees[appointmentType] !== 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {appointmentType.charAt(0).toUpperCase() + appointmentType.slice(1)} Adjustment
                  </span>
                  <span className={appointmentTypeFees[appointmentType] > 0 ? 'text-red-400' : 'text-green-400'}>
                    {appointmentTypeFees[appointmentType] > 0 ? '+' : ''}₹{appointmentTypeFees[appointmentType]}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold pt-2 border-t border-border">
                <span>Total Amount</span>
                <span className="text-primary text-lg">₹{totalFee}</span>
              </div>
            </div>
          </div>
        )}

        {/* Book Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancel</Button>
          <Button onClick={handleBook} className="gap-2">
            <Calendar className="w-4 h-4" />
            Book & Proceed to Billing
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
