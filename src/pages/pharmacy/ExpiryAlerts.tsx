import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Calendar, Package, Trash2, RefreshCw } from 'lucide-react';

const expiringMedicines = [
  { id: 'MED008', name: 'Prednisone 10mg', batch: 'B2024-1234', stock: 25, expiry: '2024-12-30', daysLeft: 7, action: 'dispose' },
  { id: 'MED009', name: 'Amoxicillin 250mg', batch: 'B2024-5678', stock: 150, expiry: '2025-01-15', daysLeft: 23, action: 'return' },
  { id: 'MED010', name: 'Insulin Glargine', batch: 'B2024-9012', stock: 12, expiry: '2025-01-20', daysLeft: 28, action: 'use' },
  { id: 'MED003', name: 'Amlodipine 5mg', batch: 'B2024-3456', stock: 280, expiry: '2025-02-10', daysLeft: 49, action: 'use' },
  { id: 'MED004', name: 'Omeprazole 20mg', batch: 'B2024-7890', stock: 85, expiry: '2025-02-25', daysLeft: 64, action: 'use' },
  { id: 'MED011', name: 'Ciprofloxacin 500mg', batch: 'B2024-2345', stock: 45, expiry: '2025-03-01', daysLeft: 68, action: 'use' },
];

const getUrgencyColor = (daysLeft: number) => {
  if (daysLeft <= 7) return 'bg-red-500/20 text-red-400 border-red-500/30';
  if (daysLeft <= 30) return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
  if (daysLeft <= 60) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
  return 'bg-green-500/20 text-green-400 border-green-500/30';
};

const getActionButton = (action: string) => {
  switch (action) {
    case 'dispose':
      return (
        <Button size="sm" variant="destructive" className="gap-1">
          <Trash2 className="w-3 h-3" />
          Dispose
        </Button>
      );
    case 'return':
      return (
        <Button size="sm" variant="outline" className="gap-1">
          <RefreshCw className="w-3 h-3" />
          Return to Vendor
        </Button>
      );
    default:
      return (
        <Button size="sm" variant="outline" className="gap-1">
          <Package className="w-3 h-3" />
          Prioritize Use
        </Button>
      );
  }
};

export default function ExpiryAlerts() {
  const criticalCount = expiringMedicines.filter(m => m.daysLeft <= 7).length;
  const warningCount = expiringMedicines.filter(m => m.daysLeft > 7 && m.daysLeft <= 30).length;
  const cautionCount = expiringMedicines.filter(m => m.daysLeft > 30 && m.daysLeft <= 60).length;

  return (
    <DashboardLayout title="Expiry Alerts" subtitle="Track medicines nearing expiration">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-400">{criticalCount}</p>
              <p className="text-sm text-red-400/80">Critical (≤7 days)</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-400">{warningCount}</p>
              <p className="text-sm text-orange-400/80">Warning (≤30 days)</p>
            </div>
          </div>
        </div>
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Package className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-400">{cautionCount}</p>
              <p className="text-sm text-yellow-400/80">Caution (≤60 days)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Medicines List */}
      <div className="space-y-4">
        {expiringMedicines.map((medicine, index) => (
          <div
            key={`${medicine.id}-${medicine.batch}`}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all stagger-${(index % 4) + 1}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${getUrgencyColor(medicine.daysLeft).split(' ')[0]}`}>
                  <AlertTriangle className={`w-6 h-6 ${getUrgencyColor(medicine.daysLeft).split(' ')[1]}`} />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{medicine.name}</h3>
                  <p className="text-sm text-muted-foreground">Batch: {medicine.batch} • Stock: {medicine.stock} units</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <Badge variant="outline" className={getUrgencyColor(medicine.daysLeft)}>
                    {medicine.daysLeft} days left
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">Expires: {medicine.expiry}</p>
                </div>
                {getActionButton(medicine.action)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
