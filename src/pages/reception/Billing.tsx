import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Receipt, User, Printer, CreditCard, Trash2, Plus, Calendar, Stethoscope } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const consultationFees = [
  { id: 'C001', name: 'General Consultation', price: 50.00 },
  { id: 'C002', name: 'Specialist Consultation', price: 100.00 },
  { id: 'C003', name: 'Emergency Consultation', price: 150.00 },
  { id: 'C004', name: 'Follow-up Visit', price: 30.00 },
  { id: 'C005', name: 'Annual Checkup', price: 200.00 },
];

const additionalServices = [
  { id: 'S001', name: 'ECG', price: 25.00 },
  { id: 'S002', name: 'X-Ray', price: 75.00 },
  { id: 'S003', name: 'Blood Pressure Check', price: 10.00 },
  { id: 'S004', name: 'Wound Dressing', price: 20.00 },
  { id: 'S005', name: 'Injection Administration', price: 15.00 },
];

const recentBills = [
  { id: 'RB001', patient: 'John Doe', doctor: 'Dr. Smith', type: 'Consultation', total: 100.00, status: 'paid', time: '11:00 AM' },
  { id: 'RB002', patient: 'Jane Smith', doctor: 'Dr. Davis', type: 'Follow-up', total: 30.00, status: 'paid', time: '10:45 AM' },
  { id: 'RB003', patient: 'Mike Johnson', doctor: 'Dr. Wilson', type: 'Emergency', total: 175.00, status: 'pending', time: '10:30 AM' },
  { id: 'RB004', patient: 'Emily Brown', doctor: 'Dr. Chen', type: 'Checkup', total: 225.00, status: 'paid', time: '10:15 AM' },
];

interface BillItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function ReceptionBilling() {
  const [items, setItems] = useState<BillItem[]>([]);
  const [patientName, setPatientName] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const addItem = (item: { id: string; name: string; price: number }) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleGenerateBill = () => {
    if (!patientName || items.length === 0) {
      toast.error('Please add patient name and services');
      return;
    }
    toast.success(`Bill generated for ${patientName} - Total: $${total.toFixed(2)}`);
    setItems([]);
    setPatientName('');
    setSelectedDoctor('');
    setAppointmentType('');
  };

  return (
    <DashboardLayout title="Reception Billing" subtitle="Generate bills for appointments and services">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient & Services Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Info */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Appointment Details</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Patient Name / ID *</Label>
                <Input
                  placeholder="Enter patient name or ID"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Doctor</Label>
                <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-smith">Dr. John Smith</SelectItem>
                    <SelectItem value="dr-davis">Dr. Emily Davis</SelectItem>
                    <SelectItem value="dr-wilson">Dr. Robert Wilson</SelectItem>
                    <SelectItem value="dr-chen">Dr. Sarah Chen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Appointment Type</Label>
                <Select value={appointmentType} onValueChange={setAppointmentType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New Patient</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="emergency">Emergency</SelectItem>
                    <SelectItem value="checkup">General Checkup</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
              </div>
            </div>
          </div>

          {/* Consultation Fees */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Consultation Fees</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {consultationFees.map((fee) => (
                <button
                  key={fee.id}
                  onClick={() => addItem(fee)}
                  className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{fee.name}</span>
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-lg font-semibold text-primary">${fee.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Additional Services</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {additionalServices.map((service) => (
                <button
                  key={service.id}
                  onClick={() => addItem(service)}
                  className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center"
                >
                  <span className="text-sm font-medium text-foreground block">{service.name}</span>
                  <span className="text-sm font-semibold text-primary">${service.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Recent Bills */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Bills</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Bill ID</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.patient}</TableCell>
                    <TableCell>{bill.doctor}</TableCell>
                    <TableCell>{bill.type}</TableCell>
                    <TableCell>${bill.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={bill.status === 'paid'
                          ? 'bg-green-500/20 text-green-400 border-green-500/30'
                          : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }
                      >
                        {bill.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Invoice */}
        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl p-6 sticky top-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <Receipt className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Invoice</h3>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Receipt className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No items added</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} × {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">${(item.price * item.quantity).toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-300"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="text-foreground">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Payment Method</Label>
                  <div className="flex gap-2">
                    {['cash', 'card', 'insurance'].map((method) => (
                      <button
                        key={method}
                        onClick={() => setPaymentMethod(method)}
                        className={`flex-1 p-2 rounded-lg border text-sm font-medium capitalize transition-all ${
                          paymentMethod === method
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        {method}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1 gap-1">
                    <Printer className="w-4 h-4" />
                    Print
                  </Button>
                  <Button className="flex-1 gap-1" onClick={handleGenerateBill}>
                    <CreditCard className="w-4 h-4" />
                    Pay
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
