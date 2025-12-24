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
import { Receipt, TestTube, User, Printer, CreditCard, Trash2, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const labTests = [
  { id: 'T001', name: 'Complete Blood Count (CBC)', price: 25.00, category: 'Hematology' },
  { id: 'T002', name: 'Blood Glucose (Fasting)', price: 15.00, category: 'Biochemistry' },
  { id: 'T003', name: 'Lipid Panel', price: 45.00, category: 'Biochemistry' },
  { id: 'T004', name: 'Thyroid Function Test (TFT)', price: 60.00, category: 'Endocrine' },
  { id: 'T005', name: 'Liver Function Test (LFT)', price: 40.00, category: 'Biochemistry' },
  { id: 'T006', name: 'Kidney Function Test (KFT)', price: 35.00, category: 'Biochemistry' },
  { id: 'T007', name: 'Urinalysis', price: 20.00, category: 'Urinalysis' },
  { id: 'T008', name: 'HbA1c', price: 30.00, category: 'Biochemistry' },
  { id: 'T009', name: 'Vitamin D Test', price: 50.00, category: 'Vitamins' },
  { id: 'T010', name: 'Vitamin B12 Test', price: 45.00, category: 'Vitamins' },
  { id: 'T011', name: 'Iron Studies', price: 55.00, category: 'Hematology' },
  { id: 'T012', name: 'Cardiac Markers', price: 80.00, category: 'Cardiology' },
];

const testPackages = [
  { id: 'P001', name: 'Basic Health Package', tests: 5, price: 99.00 },
  { id: 'P002', name: 'Comprehensive Health Package', tests: 12, price: 199.00 },
  { id: 'P003', name: 'Diabetic Package', tests: 6, price: 89.00 },
  { id: 'P004', name: 'Cardiac Package', tests: 8, price: 149.00 },
];

const recentBills = [
  { id: 'LB001', patient: 'Sarah Johnson', tests: 3, total: 85.00, status: 'paid', time: '10:30 AM' },
  { id: 'LB002', patient: 'David Williams', tests: 5, total: 145.00, status: 'paid', time: '10:15 AM' },
  { id: 'LB003', patient: 'Maria Garcia', tests: 1, total: 25.00, status: 'pending', time: '10:00 AM' },
  { id: 'LB004', patient: 'Robert Brown', tests: 12, total: 199.00, status: 'paid', time: '9:45 AM' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function LabBilling() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientName, setPatientName] = useState('');
  const [referringDoctor, setReferringDoctor] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const filteredTests = labTests.filter(test =>
    test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (item: { id: string; name: string; price: number }) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleGenerateBill = () => {
    if (!patientName || cart.length === 0) {
      toast.error('Please add patient name and tests');
      return;
    }
    toast.success(`Bill generated for ${patientName} - Total: $${total.toFixed(2)}`);
    setCart([]);
    setPatientName('');
    setReferringDoctor('');
    setSearchTerm('');
  };

  return (
    <DashboardLayout title="Lab Billing" subtitle="Generate bills for laboratory tests">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Test Selection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Patient Info */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Patient Information</h3>
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
                <Label>Referring Doctor</Label>
                <Input
                  placeholder="Enter doctor name"
                  value={referringDoctor}
                  onChange={(e) => setReferringDoctor(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Test Packages */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <TestTube className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Test Packages</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {testPackages.map((pkg) => (
                <button
                  key={pkg.id}
                  onClick={() => addToCart(pkg)}
                  className="p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-foreground text-sm">{pkg.name}</span>
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-xs text-muted-foreground">{pkg.tests} tests included</p>
                  <span className="text-lg font-semibold text-primary">${pkg.price.toFixed(2)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Individual Tests */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                <TestTube className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Individual Tests</h3>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {filteredTests.map((test) => (
                <button
                  key={test.id}
                  onClick={() => addToCart(test)}
                  className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground text-sm">{test.name}</span>
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <Badge variant="outline" className="text-xs">{test.category}</Badge>
                    <span className="text-sm font-semibold text-primary">${test.price.toFixed(2)}</span>
                  </div>
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
                  <TableHead>Tests</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-medium">{bill.id}</TableCell>
                    <TableCell>{bill.patient}</TableCell>
                    <TableCell>{bill.tests}</TableCell>
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
                    <TableCell>{bill.time}</TableCell>
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

            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <TestTube className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No tests added</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-400 hover:text-red-300"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
