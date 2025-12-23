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
import { Search, Plus, Package, AlertTriangle, TrendingDown } from 'lucide-react';
import { useState } from 'react';

const inventory = [
  { id: 'MED001', name: 'Lisinopril 10mg', category: 'Cardiovascular', stock: 450, minStock: 100, unit: 'tablets', price: 0.15, expiry: '2025-06-15' },
  { id: 'MED002', name: 'Metformin 500mg', category: 'Diabetes', stock: 320, minStock: 150, unit: 'tablets', price: 0.08, expiry: '2025-08-20' },
  { id: 'MED003', name: 'Amlodipine 5mg', category: 'Cardiovascular', stock: 280, minStock: 100, unit: 'tablets', price: 0.12, expiry: '2025-04-10' },
  { id: 'MED004', name: 'Omeprazole 20mg', category: 'Gastrointestinal', stock: 85, minStock: 100, unit: 'capsules', price: 0.25, expiry: '2025-03-25' },
  { id: 'MED005', name: 'Albuterol Inhaler', category: 'Respiratory', stock: 45, minStock: 50, unit: 'units', price: 15.00, expiry: '2025-09-30' },
  { id: 'MED006', name: 'Atorvastatin 20mg', category: 'Cardiovascular', stock: 520, minStock: 150, unit: 'tablets', price: 0.18, expiry: '2025-07-18' },
  { id: 'MED007', name: 'Sertraline 50mg', category: 'Mental Health', stock: 180, minStock: 80, unit: 'tablets', price: 0.22, expiry: '2025-05-12' },
  { id: 'MED008', name: 'Prednisone 10mg', category: 'Anti-inflammatory', stock: 25, minStock: 50, unit: 'tablets', price: 0.10, expiry: '2024-12-30' },
];

export default function Inventory() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock <= minStock * 0.5) return { label: 'Critical', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (stock <= minStock) return { label: 'Low', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' };
    return { label: 'In Stock', color: 'bg-green-500/20 text-green-400 border-green-500/30' };
  };

  const isExpiringSoon = (expiry: string) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 90;
  };

  return (
    <DashboardLayout title="Inventory Management" subtitle="Track and manage medicine stock">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inventory.length}</p>
              <p className="text-sm text-muted-foreground">Total Items</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inventory.filter(i => i.stock <= i.minStock).length}</p>
              <p className="text-sm text-muted-foreground">Low Stock</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{inventory.filter(i => isExpiringSoon(i.expiry)).length}</p>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">${inventory.reduce((acc, i) => acc + i.stock * i.price, 0).toFixed(0)}</p>
              <p className="text-sm text-muted-foreground">Stock Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search medicines..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Stock
        </Button>
      </div>

      {/* Inventory Table */}
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/30">
              <TableHead>Medicine</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Unit Price</TableHead>
              <TableHead>Expiry</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInventory.map((item) => {
              const status = getStockStatus(item.stock, item.minStock);
              const expiringSoon = isExpiringSoon(item.expiry);
              return (
                <TableRow key={item.id} className="hover:bg-secondary/20">
                  <TableCell>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span className="font-medium">{item.stock}</span>
                    <span className="text-muted-foreground text-sm"> / {item.minStock} min</span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={status.color}>
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell>${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className={expiringSoon ? 'text-red-400 font-medium' : ''}>
                      {item.expiry}
                      {expiringSoon && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                    </span>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
