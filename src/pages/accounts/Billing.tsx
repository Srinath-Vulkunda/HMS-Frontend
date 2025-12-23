import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Plus, FileText, DollarSign, CreditCard, Printer, Eye } from 'lucide-react';
import { useState } from 'react';

const invoices = [
  { id: 'INV001', patient: 'Sarah Johnson', date: '2024-12-23', services: ['Consultation', 'Blood Test'], amount: 250, paid: 250, status: 'paid' },
  { id: 'INV002', patient: 'David Williams', date: '2024-12-23', services: ['Follow-up', 'Medication'], amount: 180, paid: 180, status: 'paid' },
  { id: 'INV003', patient: 'Maria Garcia', date: '2024-12-22', services: ['MRI Scan', 'Consultation'], amount: 850, paid: 500, status: 'partial' },
  { id: 'INV004', patient: 'Robert Brown', date: '2024-12-22', services: ['Consultation', 'X-Ray'], amount: 320, paid: 0, status: 'pending' },
  { id: 'INV005', patient: 'Jennifer Davis', date: '2024-12-21', services: ['Emergency', 'Medication'], amount: 450, paid: 450, status: 'paid' },
  { id: 'INV006', patient: 'Michael Taylor', date: '2024-12-21', services: ['Surgery Consultation', 'Lab Tests'], amount: 1200, paid: 0, status: 'pending' },
  { id: 'INV007', patient: 'Emily Wilson', date: '2024-12-20', services: ['Therapy Session'], amount: 150, paid: 150, status: 'paid' },
  { id: 'INV008', patient: 'James Anderson', date: '2024-12-20', services: ['Check-up', 'ECG'], amount: 280, paid: 280, status: 'paid' },
];

const statusColors: Record<string, string> = {
  paid: 'bg-green-500/20 text-green-400 border-green-500/30',
  partial: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  pending: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Billing() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInvoices = invoices.filter(inv =>
    inv.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inv.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = invoices.reduce((acc, inv) => acc + inv.paid, 0);
  const totalPending = invoices.reduce((acc, inv) => acc + (inv.amount - inv.paid), 0);

  return (
    <DashboardLayout title="Billing" subtitle="Manage invoices and payments">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{invoices.length}</p>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Collected</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${totalPending.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{invoices.filter(i => i.status === 'paid').length}</p>
              <p className="text-sm text-muted-foreground">Paid Invoices</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Invoice
        </Button>
      </div>

      {/* Invoices Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30">
              <TableHead>Invoice ID</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[100px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((inv) => (
              <TableRow key={inv.id} className="hover:bg-secondary/20">
                <TableCell className="font-medium">{inv.id}</TableCell>
                <TableCell>{inv.patient}</TableCell>
                <TableCell>{inv.date}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {inv.services.map((s, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="font-medium">${inv.amount}</TableCell>
                <TableCell>${inv.paid}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusColors[inv.status]}>
                    {inv.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Printer className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
