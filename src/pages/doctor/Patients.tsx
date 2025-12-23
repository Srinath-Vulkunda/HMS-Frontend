import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Eye, FileText, Calendar } from 'lucide-react';
import { useState } from 'react';

const patients = [
  { id: 'P001', name: 'Sarah Johnson', age: 34, gender: 'Female', phone: '+1 555-0101', lastVisit: '2024-12-20', condition: 'Hypertension', status: 'active' },
  { id: 'P002', name: 'David Williams', age: 52, gender: 'Male', phone: '+1 555-0102', lastVisit: '2024-12-19', condition: 'Diabetes Type 2', status: 'active' },
  { id: 'P003', name: 'Maria Garcia', age: 28, gender: 'Female', phone: '+1 555-0103', lastVisit: '2024-12-18', condition: 'Migraine', status: 'active' },
  { id: 'P004', name: 'Robert Brown', age: 45, gender: 'Male', phone: '+1 555-0104', lastVisit: '2024-12-15', condition: 'Arthritis', status: 'inactive' },
  { id: 'P005', name: 'Jennifer Davis', age: 38, gender: 'Female', phone: '+1 555-0105', lastVisit: '2024-12-22', condition: 'Asthma', status: 'active' },
  { id: 'P006', name: 'Michael Taylor', age: 61, gender: 'Male', phone: '+1 555-0106', lastVisit: '2024-12-21', condition: 'Heart Disease', status: 'critical' },
  { id: 'P007', name: 'Emily Wilson', age: 29, gender: 'Female', phone: '+1 555-0107', lastVisit: '2024-12-17', condition: 'Anxiety', status: 'active' },
  { id: 'P008', name: 'James Anderson', age: 55, gender: 'Male', phone: '+1 555-0108', lastVisit: '2024-12-16', condition: 'High Cholesterol', status: 'active' },
];

const statusColors: Record<string, string> = {
  active: 'bg-green-500/20 text-green-400 border-green-500/30',
  inactive: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
};

export default function Patients() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout title="My Patients" subtitle="View and manage your patients">
      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search by name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* Patients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPatients.map((patient, index) => (
          <div
            key={patient.id}
            className={`bg-card border border-border rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 stagger-${(index % 3) + 1}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{patient.name}</h3>
                  <p className="text-xs text-muted-foreground">{patient.id}</p>
                </div>
              </div>
              <Badge variant="outline" className={statusColors[patient.status]}>
                {patient.status}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Age/Gender</span>
                <span className="text-foreground">{patient.age} / {patient.gender}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Phone</span>
                <span className="text-foreground">{patient.phone}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Condition</span>
                <span className="text-foreground">{patient.condition}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Visit</span>
                <span className="text-foreground">{patient.lastVisit}</span>
              </div>
            </div>

            <div className="flex gap-2 pt-4 border-t border-border">
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Eye className="w-3 h-3" />
                View
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <FileText className="w-3 h-3" />
                History
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Calendar className="w-3 h-3" />
                Book
              </Button>
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
