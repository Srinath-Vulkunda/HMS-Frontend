import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Search, Upload, FileText, CheckCircle, AlertTriangle, Eye, Send } from 'lucide-react';
import { useState } from 'react';

const results = [
  { 
    id: 'LAB001', 
    patient: 'Sarah Johnson', 
    test: 'Complete Blood Count', 
    date: '2024-12-23',
    status: 'verified',
    values: [
      { name: 'Hemoglobin', value: '13.5', unit: 'g/dL', range: '12-16', flag: null },
      { name: 'WBC', value: '7,500', unit: '/mcL', range: '4,500-11,000', flag: null },
      { name: 'Platelets', value: '250,000', unit: '/mcL', range: '150,000-400,000', flag: null },
    ]
  },
  { 
    id: 'LAB002', 
    patient: 'David Williams', 
    test: 'Blood Glucose', 
    date: '2024-12-23',
    status: 'pending_verification',
    values: [
      { name: 'Fasting Glucose', value: '126', unit: 'mg/dL', range: '70-100', flag: 'high' },
      { name: 'Post-Prandial', value: '185', unit: 'mg/dL', range: '70-140', flag: 'high' },
    ]
  },
  { 
    id: 'LAB003', 
    patient: 'Maria Garcia', 
    test: 'Lipid Panel', 
    date: '2024-12-22',
    status: 'verified',
    values: [
      { name: 'Total Cholesterol', value: '210', unit: 'mg/dL', range: '<200', flag: 'borderline' },
      { name: 'LDL', value: '130', unit: 'mg/dL', range: '<100', flag: 'high' },
      { name: 'HDL', value: '55', unit: 'mg/dL', range: '>40', flag: null },
      { name: 'Triglycerides', value: '125', unit: 'mg/dL', range: '<150', flag: null },
    ]
  },
  { 
    id: 'LAB004', 
    patient: 'Robert Brown', 
    test: 'Thyroid Function', 
    date: '2024-12-22',
    status: 'pending_entry',
    values: []
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  pending_entry: { label: 'Pending Entry', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
  pending_verification: { label: 'Pending Verification', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  verified: { label: 'Verified', color: 'bg-green-500/20 text-green-400 border-green-500/30' },
};

const flagColors: Record<string, string> = {
  high: 'text-red-400',
  low: 'text-blue-400',
  borderline: 'text-yellow-400',
};

export default function Results() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedResult, setSelectedResult] = useState<typeof results[0] | null>(null);

  const filteredResults = results.filter(result =>
    result.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
    result.test.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="Lab Results" subtitle="Enter and verify test results">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search results..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {filteredResults.map((result, index) => {
          const status = statusConfig[result.status];
          return (
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
                    <h3 className="font-semibold text-foreground">{result.patient}</h3>
                    <p className="text-sm text-muted-foreground">{result.test} • {result.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className={status.color}>
                    {status.label}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{result.id}</span>
                </div>
              </div>

              {result.values.length > 0 && (
                <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {result.values.map((val, i) => (
                      <div key={i}>
                        <p className="text-xs text-muted-foreground">{val.name}</p>
                        <p className={`font-medium ${val.flag ? flagColors[val.flag] : 'text-foreground'}`}>
                          {val.value} {val.unit}
                          {val.flag && <AlertTriangle className="w-3 h-3 inline ml-1" />}
                        </p>
                        <p className="text-xs text-muted-foreground">Ref: {val.range}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 pt-4 border-t border-border">
                {result.status === 'pending_entry' && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <Upload className="w-3 h-3" />
                        Enter Results
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Enter Results - {result.test}</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label>Upload Report PDF</Label>
                          <Input type="file" accept=".pdf" />
                        </div>
                        <p className="text-sm text-muted-foreground">Or enter values manually:</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Parameter</Label>
                            <Input placeholder="e.g., TSH" />
                          </div>
                          <div className="space-y-2">
                            <Label>Value</Label>
                            <Input placeholder="e.g., 2.5 mIU/L" />
                          </div>
                        </div>
                        <Button className="w-full">Save Results</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                {result.status === 'pending_verification' && (
                  <Button size="sm" className="gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Verify Results
                  </Button>
                )}
                <Button variant="outline" size="sm" className="gap-1">
                  <Eye className="w-3 h-3" />
                  View Full Report
                </Button>
                {result.status === 'verified' && (
                  <Button variant="outline" size="sm" className="gap-1">
                    <Send className="w-3 h-3" />
                    Send to Doctor
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
