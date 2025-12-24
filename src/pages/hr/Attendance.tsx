import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, Calendar, UserCheck, UserX, Clock, AlertCircle } from 'lucide-react';

const attendanceStats = {
  present: 142,
  absent: 8,
  late: 6,
  onLeave: 14,
};

const attendanceRecords = [
  { id: 1, name: 'Dr. Sarah Johnson', department: 'Administration', date: '2024-01-15', checkIn: '08:30 AM', checkOut: '05:45 PM', hours: '9.25', status: 'Present' },
  { id: 2, name: 'Dr. Michael Chen', department: 'Cardiology', date: '2024-01-15', checkIn: '09:15 AM', checkOut: '06:30 PM', hours: '9.25', status: 'Late' },
  { id: 3, name: 'Emily Rodriguez', department: 'Pharmacy', date: '2024-01-15', checkIn: '-', checkOut: '-', hours: '-', status: 'On Leave' },
  { id: 4, name: 'James Wilson', department: 'Laboratory', date: '2024-01-15', checkIn: '08:00 AM', checkOut: '04:15 PM', hours: '8.25', status: 'Present' },
  { id: 5, name: 'Lisa Thompson', department: 'Reception', date: '2024-01-15', checkIn: '08:45 AM', checkOut: '05:00 PM', hours: '8.25', status: 'Present' },
  { id: 6, name: 'Robert Davis', department: 'Finance', date: '2024-01-15', checkIn: '-', checkOut: '-', hours: '-', status: 'Absent' },
  { id: 7, name: 'Dr. Priya Sharma', department: 'Pediatrics', date: '2024-01-15', checkIn: '08:55 AM', checkOut: '06:00 PM', hours: '9.08', status: 'Present' },
  { id: 8, name: 'Rahul Kumar', department: 'IT', date: '2024-01-15', checkIn: '09:30 AM', checkOut: '07:00 PM', hours: '9.5', status: 'Late' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Present': return 'border-success text-success';
    case 'Late': return 'border-warning text-warning';
    case 'Absent': return 'border-destructive text-destructive';
    case 'On Leave': return 'border-accent text-accent';
    default: return 'border-muted text-muted-foreground';
  }
};

export default function Attendance() {
  const [selectedDate, setSelectedDate] = useState('2024-01-15');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  return (
    <DashboardLayout title="Attendance Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.present}</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <UserX className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.absent}</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Late</p>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.late}</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Leave</p>
                <p className="text-2xl font-bold text-foreground">{attendanceStats.onLeave}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Attendance Table */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Daily Attendance Record</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search employee..." className="pl-9 w-64 bg-secondary/30" />
              </div>
              <Input 
                type="date" 
                value={selectedDate} 
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-40 bg-secondary/30"
              />
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-40 bg-secondary/30">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="administration">Administration</SelectItem>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="laboratory">Laboratory</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{record.name}</TableCell>
                    <TableCell>{record.department}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.checkIn}</TableCell>
                    <TableCell>{record.checkOut}</TableCell>
                    <TableCell>{record.hours}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getStatusColor(record.status)}>
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">Edit</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Monthly Summary */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Monthly Attendance Summary</CardTitle>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">January 2024</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4 text-center">
              <div className="p-4 rounded-lg bg-secondary/30">
                <p className="text-3xl font-bold text-foreground">22</p>
                <p className="text-sm text-muted-foreground">Working Days</p>
              </div>
              <div className="p-4 rounded-lg bg-success/10">
                <p className="text-3xl font-bold text-success">94.5%</p>
                <p className="text-sm text-muted-foreground">Attendance Rate</p>
              </div>
              <div className="p-4 rounded-lg bg-warning/10">
                <p className="text-3xl font-bold text-warning">3.2%</p>
                <p className="text-sm text-muted-foreground">Late Rate</p>
              </div>
              <div className="p-4 rounded-lg bg-accent/10">
                <p className="text-3xl font-bold text-accent">8.2</p>
                <p className="text-sm text-muted-foreground">Avg. Hours/Day</p>
              </div>
              <div className="p-4 rounded-lg bg-primary/10">
                <p className="text-3xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}