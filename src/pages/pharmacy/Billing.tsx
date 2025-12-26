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
import { Receipt, Pill, User, Printer, CreditCard, Trash2, Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

const medicineInventory = [
  { id: 'M001', name: 'Lisinopril 10mg', price: 15.99, stock: 500 },
  { id: 'M002', name: 'Amlodipine 5mg', price: 12.50, stock: 300 },
  { id: 'M003', name: 'Metformin 500mg', price: 8.99, stock: 450 },
  { id: 'M004', name: 'Omeprazole 20mg', price: 18.75, stock: 200 },
  { id: 'M005', name: 'Ibuprofen 400mg', price: 6.50, stock: 600 },
  { id: 'M006', name: 'Aspirin 81mg', price: 4.99, stock: 800 },
  { id: 'M007', name: 'Atorvastatin 20mg', price: 22.00, stock: 150 },
  { id: 'M008', name: 'Sertraline 50mg', price: 25.50, stock: 100 },
];

const recentBills = [
  { id: 'PB001', patient: 'Sarah Johnson', items: 3, total: 45.48, status: 'paid', time: '10:30 AM' },
  { id: 'PB002', patient: 'David Williams', items: 2, total: 31.49, status: 'paid', time: '10:15 AM' },
  { id: 'PB003', patient: 'Maria Garcia', items: 1, total: 18.75, status: 'pending', time: '10:00 AM' },
  { id: 'PB004', patient: 'Robert Brown', items: 4, total: 67.23, status: 'paid', time: '9:45 AM' },
];

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function PharmacyBilling() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [patientName, setPatientName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const filteredMedicines = medicineInventory.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (medicine: typeof medicineInventory[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === medicine.id);
      if (existing) {
        return prev.map(item =>
          item.id === medicine.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: medicine.id, name: medicine.name, price: medicine.price, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const handleGenerateBill = () => {
    if (!patientName || cart.length === 0) {
      toast.error('Please add patient name and medicines');
      return;
    }
    toast.success(`Bill generated for ${patientName} - Total: $${total.toFixed(2)}`);
    setCart([]);
    setPatientName('');
    setSearchTerm('');
  };

  return (
    <DashboardLayout title="Pharmacy Billing" subtitle="Generate bills for medicines">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Medicine Selection */}
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
                <Label>Prescription ID (Optional)</Label>
                <Input placeholder="Enter prescription ID" />
              </div>
            </div>
          </div>

          {/* Medicine Search */}
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Pill className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display font-semibold text-foreground">Add Medicines</h3>
            </div>
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {filteredMedicines.map((med) => (
                <button
                  key={med.id}
                  onClick={() => addToCart(med)}
                  className="p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{med.name}</span>
                    <Plus className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm text-muted-foreground">Stock: {med.stock}</span>
                    <span className="text-sm font-semibold text-primary">${med.price.toFixed(2)}</span>
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
                  <TableHead>Items</TableHead>
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
                    <TableCell>{bill.items}</TableCell>
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

        {/* Cart / Invoice */}
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
                <Pill className="w-12 h-12 mx-auto mb-2 opacity-30" />
                <p>No items added</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 bg-secondary/30 rounded-xl">
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                        className="w-16 h-8 text-center"
                        min="1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-400 hover:text-red-300"
                        onClick={() => removeFromCart(item.id)}
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
