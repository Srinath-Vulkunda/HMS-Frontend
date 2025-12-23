import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Download, Eye, AlertTriangle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

const labResults = [
  { 
    id: 'LAB001', 
    patient: 'Sarah Johnson', 
    test: 'Complete Blood Count', 
    date: '2024-12-23',
    status: 'ready',
    results: { hemoglobin: '13.5 g/dL', wbc: '7,500/mcL', platelets: '250,000/mcL' },
    flag: null
  },
  { 
    id: 'LAB002', 
    patient: 'David Williams', 
    test: 'Blood Glucose', 
    date: '2024-12-22',
    status: 'ready',
    results: { fasting: '126 mg/dL', postPrandial: '185 mg/dL' },
    flag: 'high'
  },
  { 
    id: 'LAB003', 
    patient: 'Maria Garcia', 
    test: 'Lipid Panel', 
    date: '2024-12-21',
    status: 'ready',
    results: { totalCholesterol: '210 mg/dL', ldl: '130 mg/dL', hdl: '55 mg/dL' },
    flag: 'borderline'
  },
  { 
    id: 'LAB004', 
    patient: 'Robert Brown', 
    test: 'Thyroid Function', 
    date: '2024-12-20',
    status: 'pending',
    results: null,
    flag: null
  },
  { 
    id: 'LAB005', 
    patient: 'Jennifer Davis', 
    test: 'Liver Function Test', 
    date: '2024-12-19',
    status: 'ready',
    results: { alt: '25 U/L', ast: '28 U/L', bilirubin: '0.8 mg/dL' },
    flag: null
  },
  { 
    id: 'LAB006', 
    patient: 'Michael Taylor', 
    test: 'Cardiac Markers', 
    date: '2024-12-18',
    status: 'ready',
    results: { troponin: '0.02 ng/mL', bnp: '85 pg/mL' },
    flag: null
  },
];

const statusColors: Record<string, string> = {
  ready: 'bg-green-500/20 text-green-400 border-green-500/30',
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

const flagColors: Record<string, { color: string; icon: React.ElementType }> = {
  high: { color: 'text-red-400', icon: AlertTriangle },
  borderline: { color: 'text-yellow-400', icon: AlertTriangle },
};

export default function LabResults() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredResults = labResults.filter(result =>
    result.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.test.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Lab Results" subtitle="View patient lab reports">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by patient or test..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result, index) => (
          <div
            key={result.id}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all stagger-${(index % 4) + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {result.patient.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{result.patient}</h3>
                    <Badge variant="outline" className={statusColors[result.status]}>
                      {result.status}
                    </Badge>
                    {result.flag && (
                      <span className={`flex items-center gap-1 text-sm ${flagColors[result.flag].color}`}>
                        <AlertTriangle className="w-4 h-4" />
                        {result.flag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{result.test} • {result.date}</p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">{result.id}</span>
            </div>

            {result.results && (
              <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(result.results).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                      <p className="font-medium text-foreground">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Eye className="w-3 h-3" />
                View Full Report
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="w-3 h-3" />
                Download PDF
              </Button>
              {result.status === 'ready' && !result.flag && (
                <Button variant="outline" size="sm" className="gap-1 text-green-400 border-green-500/30 hover:bg-green-500/10">
                  <CheckCircle className="w-3 h-3" />
                  Mark Reviewed
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
