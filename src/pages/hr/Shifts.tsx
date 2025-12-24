import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Plus, Clock, Users, Calendar, Edit } from 'lucide-react';

const shifts = [
  { id: 1, name: 'Morning Shift', time: '06:00 AM - 02:00 PM', employees: 45, department: 'All' },
  { id: 2, name: 'Day Shift', time: '08:00 AM - 04:00 PM', employees: 52, department: 'All' },
  { id: 3, name: 'Evening Shift', time: '02:00 PM - 10:00 PM', employees: 38, department: 'All' },
  { id: 4, name: 'Night Shift', time: '10:00 PM - 06:00 AM', employees: 21, department: 'All' },
];

const shiftAssignments = [
  { id: 1, employee: 'Dr. Michael Chen', department: 'Cardiology', currentShift: 'Day Shift', nextWeek: 'Morning Shift', status: 'Assigned' },
  { id: 2, employee: 'Emily Rodriguez', department: 'Pharmacy', currentShift: 'Morning Shift', nextWeek: 'Day Shift', status: 'Assigned' },
  { id: 3, employee: 'James Wilson', department: 'Laboratory', currentShift: 'Day Shift', nextWeek: 'Evening Shift', status: 'Pending' },
  { id: 4, employee: 'Lisa Thompson', department: 'Reception', currentShift: 'Morning Shift', nextWeek: 'Morning Shift', status: 'Assigned' },
  { id: 5, employee: 'Robert Davis', department: 'Finance', currentShift: 'Day Shift', nextWeek: 'Day Shift', status: 'Assigned' },
  { id: 6, employee: 'Dr. Priya Sharma', department: 'Pediatrics', currentShift: 'Evening Shift', nextWeek: 'Night Shift', status: 'Pending' },
];

export default function Shifts() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <DashboardLayout title="Shift Management">
      <div className="space-y-6">
        {/* Shift Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {shifts.map((shift) => (
            <Card key={shift.id} className="glass-card p-4 hover:border-primary/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{shift.name}</p>
                  <p className="text-sm text-muted-foreground">{shift.time}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{shift.employees} employees</span>
                </div>
                <Button size="sm" variant="ghost">
                  <Edit className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Shift Assignments */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Shift Assignments</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search employee..." className="pl-9 w-64 bg-secondary/30" />
              </div>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40 bg-secondary/30">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                  <SelectItem value="reception">Reception</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gradient-primary text-primary-foreground">
                <Plus className="w-4 h-4 mr-2" />
                Assign Shift
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Current Shift</TableHead>
                  <TableHead>Next Week</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shiftAssignments.map((assignment) => (
                  <TableRow key={assignment.id}>
                    <TableCell className="font-medium">{assignment.employee}</TableCell>
                    <TableCell>{assignment.department}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        {assignment.currentShift}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-accent/30 text-accent">
                        {assignment.nextWeek}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline"
                        className={assignment.status === 'Assigned' ? 'border-success text-success' : 'border-warning text-warning'}
                      >
                        {assignment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Weekly Calendar Preview */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Weekly Shift Calendar</CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Week of Jan 15 - Jan 21, 2024</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-7 gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                <div key={day} className="text-center">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{day}</p>
                  <div className="space-y-1">
                    <div className="p-2 rounded bg-primary/10 text-xs text-primary">Morning: 45</div>
                    <div className="p-2 rounded bg-accent/10 text-xs text-accent">Day: 52</div>
                    <div className="p-2 rounded bg-warning/10 text-xs text-warning">Evening: 38</div>
                    <div className="p-2 rounded bg-secondary text-xs text-muted-foreground">Night: 21</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}