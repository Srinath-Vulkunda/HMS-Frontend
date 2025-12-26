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
  Receipt, 
  Pill, 
  User, 
  Printer, 
  CreditCard, 
  Trash2, 
  Plus, 
  Search, 
  Minus,
  Zap,
  Clock,
  CheckCircle,
  ShoppingCart,
  Barcode,
  X
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const medicineInventory = [
  { id: 'M001', name: 'Lisinopril 10mg', price: 15.99, stock: 500, category: 'BP' },
  { id: 'M002', name: 'Amlodipine 5mg', price: 12.50, stock: 300, category: 'BP' },
  { id: 'M003', name: 'Metformin 500mg', price: 8.99, stock: 450, category: 'Diabetes' },
  { id: 'M004', name: 'Omeprazole 20mg', price: 18.75, stock: 200, category: 'Gastric' },
  { id: 'M005', name: 'Ibuprofen 400mg', price: 6.50, stock: 600, category: 'Pain' },
  { id: 'M006', name: 'Aspirin 81mg', price: 4.99, stock: 800, category: 'Pain' },
  { id: 'M007', name: 'Atorvastatin 20mg', price: 22.00, stock: 150, category: 'Cholesterol' },
  { id: 'M008', name: 'Sertraline 50mg', price: 25.50, stock: 100, category: 'Mental' },
  { id: 'M009', name: 'Paracetamol 500mg', price: 3.99, stock: 1000, category: 'Pain' },
  { id: 'M010', name: 'Amoxicillin 500mg', price: 14.50, stock: 250, category: 'Antibiotic' },
  { id: 'M011', name: 'Cetirizine 10mg', price: 5.99, stock: 400, category: 'Allergy' },
  { id: 'M012', name: 'Vitamin D3', price: 9.99, stock: 300, category: 'Vitamin' },
];

const quickAddMedicines = [
  { id: 'M009', name: 'Paracetamol', shortName: 'PARA' },
  { id: 'M005', name: 'Ibuprofen', shortName: 'IBU' },
  { id: 'M006', name: 'Aspirin', shortName: 'ASP' },
  { id: 'M011', name: 'Cetirizine', shortName: 'CET' },
  { id: 'M003', name: 'Metformin', shortName: 'MET' },
  { id: 'M010', name: 'Amoxicillin', shortName: 'AMOX' },
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
  const [showSearch, setShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const barcodeInputRef = useRef<HTMLInputElement>(null);

  // Auto-focus barcode input
  useEffect(() => {
    if (barcodeInputRef.current) {
      barcodeInputRef.current.focus();
    }
  }, [cart]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F2') {
        e.preventDefault();
        setShowSearch(true);
        setTimeout(() => searchInputRef.current?.focus(), 100);
      }
      if (e.key === 'F3') {
        e.preventDefault();
        handleGenerateBill();
      }
      if (e.key === 'Escape') {
        setShowSearch(false);
        setSearchTerm('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cart, patientName]);

  const filteredMedicines = medicineInventory.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (medicineId: string) => {
    const medicine = medicineInventory.find(m => m.id === medicineId);
    if (!medicine) return;
    
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
    toast.success(`Added ${medicine.name}`, { duration: 1000 });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity + delta;
        if (newQuantity <= 0) return item;
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const setQuantity = (id: string, quantity: number) => {
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
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

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

  const handleBarcodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const barcode = formData.get('barcode') as string;
    
    const medicine = medicineInventory.find(m => 
      m.id.toLowerCase() === barcode.toLowerCase() ||
      m.name.toLowerCase().includes(barcode.toLowerCase())
    );
    
    if (medicine) {
      addToCart(medicine.id);
    } else {
      toast.error('Medicine not found');
    }
    (e.target as HTMLFormElement).reset();
  };

  const clearCart = () => {
    setCart([]);
    toast.info('Cart cleared');
  };

  return (
    <DashboardLayout title="Pharmacy Billing" subtitle="Fast & easy medicine billing">
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4 h-[calc(100vh-180px)]">
        {/* Left Panel - Medicine Selection */}
        <div className="xl:col-span-7 flex flex-col gap-4 overflow-hidden">
          {/* Quick Patient Entry & Barcode */}
          <Card className="bg-card border-border shrink-0">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5" /> Patient Name *
                  </Label>
                  <Input
                    placeholder="Enter patient name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="h-10"
                  />
                </div>
                <form onSubmit={handleBarcodeSubmit} className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                    <Barcode className="w-3.5 h-3.5" /> Scan / Type Medicine ID
                  </Label>
                  <div className="relative">
                    <Input
                      ref={barcodeInputRef}
                      name="barcode"
                      placeholder="Scan barcode or type ID..."
                      className="h-10 pr-20 font-mono"
                      autoComplete="off"
                    />
                    <Button 
                      type="submit" 
                      size="sm" 
                      className="absolute right-1 top-1 h-8"
                    >
                      <Plus className="w-4 h-4 mr-1" /> Add
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>

          {/* Quick Add Buttons */}
          <Card className="bg-card border-border shrink-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Quick Add</span>
                <span className="text-xs text-muted-foreground ml-auto">Press F2 to search</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {quickAddMedicines.map((med) => (
                  <Button
                    key={med.id}
                    variant="outline"
                    size="sm"
                    onClick={() => addToCart(med.id)}
                    className="h-12 flex flex-col gap-0.5 hover:bg-primary/10 hover:border-primary/50 transition-all"
                  >
                    <span className="font-bold text-xs">{med.shortName}</span>
                    <span className="text-[10px] text-muted-foreground truncate w-full">{med.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Search Panel */}
          <Card className="bg-card border-border flex-1 overflow-hidden flex flex-col">
            <CardHeader className="p-4 pb-2 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    ref={searchInputRef}
                    placeholder="Search medicines by name or ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 h-10"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                      onClick={() => setSearchTerm('')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex-1 overflow-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {filteredMedicines.map((med) => (
                  <button
                    key={med.id}
                    onClick={() => addToCart(med.id)}
                    className="group p-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 transition-all text-left"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{med.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{med.id} • {med.category}</p>
                      </div>
                      <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Plus className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs bg-secondary/50">
                        Stock: {med.stock}
                      </Badge>
                      <span className="text-sm font-bold text-primary">${med.price.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Cart & Invoice */}
        <div className="xl:col-span-5 flex flex-col gap-4 overflow-hidden">
          {/* Cart Summary Header */}
          <Card className="bg-card border-border shrink-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Current Bill</p>
                    <p className="text-xs text-muted-foreground">{totalItems} items • {cart.length} medicines</p>
                  </div>
                </div>
                {cart.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={clearCart} className="text-destructive hover:text-destructive">
                    <Trash2 className="w-4 h-4 mr-1" /> Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <Card className="bg-card border-border flex-1 overflow-hidden flex flex-col">
            <CardContent className="p-4 flex-1 overflow-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
                    <Pill className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-muted-foreground font-medium">No items in cart</p>
                  <p className="text-xs text-muted-foreground mt-1">Scan barcode or click medicines to add</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map((item, index) => (
                    <div 
                      key={item.id} 
                      className="flex items-center gap-3 p-3 bg-secondary/30 rounded-xl group"
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary shrink-0">
                        {index + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} × {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => setQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-12 h-8 text-center text-sm font-medium p-0"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Invoice Summary & Actions */}
          <Card className="bg-card border-border shrink-0">
            <CardContent className="p-4 space-y-4">
              {/* Totals */}
              <div className="space-y-2 p-3 bg-secondary/30 rounded-xl">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="text-foreground font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2">
                <Label className="text-xs font-medium text-muted-foreground">Payment Method</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'cash', label: 'Cash', icon: '💵' },
                    { id: 'card', label: 'Card', icon: '💳' },
                    { id: 'insurance', label: 'Insurance', icon: '🏥' }
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        paymentMethod === method.id
                          ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
                          : 'border-border hover:border-primary/50 hover:bg-secondary/50'
                      }`}
                    >
                      <span className="text-xl block mb-1">{method.icon}</span>
                      <span className="text-xs font-medium">{method.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="lg" className="h-12" disabled={cart.length === 0}>
                  <Printer className="w-4 h-4 mr-2" />
                  Print Bill
                </Button>
                <Button 
                  size="lg" 
                  className="h-12 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleGenerateBill}
                  disabled={cart.length === 0 || !patientName}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Complete (F3)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recent Bills - Collapsible */}
      <Card className="bg-card border-border mt-4">
        <CardHeader className="p-4 pb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <CardTitle className="text-sm font-medium">Recent Bills Today</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Bill ID</TableHead>
                  <TableHead className="text-xs">Patient</TableHead>
                  <TableHead className="text-xs">Items</TableHead>
                  <TableHead className="text-xs">Total</TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                  <TableHead className="text-xs">Time</TableHead>
                  <TableHead className="text-xs">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBills.map((bill) => (
                  <TableRow key={bill.id}>
                    <TableCell className="font-mono text-xs">{bill.id}</TableCell>
                    <TableCell className="text-sm">{bill.patient}</TableCell>
                    <TableCell className="text-sm">{bill.items}</TableCell>
                    <TableCell className="font-medium text-sm">${bill.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={bill.status === 'paid'
                          ? 'bg-green-500/20 text-green-500 border-green-500/30 text-xs'
                          : 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30 text-xs'
                        }
                      >
                        {bill.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">{bill.time}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-7 text-xs">
                        <Printer className="w-3 h-3 mr-1" /> Reprint
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
}
