import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, DollarSign, TrendingUp, Users, FileText, Calendar } from 'lucide-react';

const payrollData = [
  { id: 1, name: 'Dr. Sarah Johnson', department: 'Administration', designation: 'Chief Admin', basicSalary: 150000, allowances: 25000, deductions: 15000, netSalary: 160000, status: 'Processed' },
  { id: 2, name: 'Dr. Michael Chen', department: 'Cardiology', designation: 'Senior Doctor', basicSalary: 180000, allowances: 30000, deductions: 18000, netSalary: 192000, status: 'Processed' },
  { id: 3, name: 'Emily Rodriguez', department: 'Pharmacy', designation: 'Head Pharmacist', basicSalary: 75000, allowances: 12000, deductions: 8000, netSalary: 79000, status: 'Pending' },
  { id: 4, name: 'James Wilson', department: 'Laboratory', designation: 'Lab Technician', basicSalary: 55000, allowances: 8000, deductions: 5500, netSalary: 57500, status: 'Processed' },
  { id: 5, name: 'Lisa Thompson', department: 'Reception', designation: 'Senior Receptionist', basicSalary: 45000, allowances: 6000, deductions: 4500, netSalary: 46500, status: 'Pending' },
  { id: 6, name: 'Robert Davis', department: 'Finance', designation: 'Accountant', basicSalary: 65000, allowances: 10000, deductions: 6500, netSalary: 68500, status: 'Processed' },
];

const salaryHistory = [
  { month: 'December 2024', totalPayroll: 4523500, processed: 3815000, pending: 708500, employees: 156 },
  { month: 'November 2024', totalPayroll: 4480000, processed: 4480000, pending: 0, employees: 154 },
  { month: 'October 2024', totalPayroll: 4450000, processed: 4450000, pending: 0, employees: 152 },
  { month: 'September 2024', totalPayroll: 4420000, processed: 4420000, pending: 0, employees: 150 },
  { month: 'August 2024', totalPayroll: 4380000, processed: 4380000, pending: 0, employees: 148 },
  { month: 'July 2024', totalPayroll: 4350000, processed: 4350000, pending: 0, employees: 146 },
];

export default function Payroll() {
  const [selectedMonth, setSelectedMonth] = useState('December 2024');

  return (
    <DashboardLayout title="Payroll Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Payroll</p>
                <p className="text-xl font-bold text-foreground">₹45,23,500</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-xl font-bold text-foreground">₹38,15,000</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold text-foreground">₹7,08,500</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-xl font-bold text-foreground">156</p>
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="current" className="space-y-6">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="current">Current Month</TabsTrigger>
            <TabsTrigger value="history">Salary History</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Card className="glass-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>January 2024 Payroll</CardTitle>
                <div className="flex gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input placeholder="Search employee..." className="pl-9 w-64 bg-secondary/30" />
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button className="gradient-primary text-primary-foreground">
                    Process All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead className="text-right">Basic</TableHead>
                      <TableHead className="text-right">Allowances</TableHead>
                      <TableHead className="text-right">Deductions</TableHead>
                      <TableHead className="text-right">Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payrollData.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-muted-foreground">{employee.designation}</p>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell className="text-right">₹{employee.basicSalary.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-success">+₹{employee.allowances.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-destructive">-₹{employee.deductions.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-semibold">₹{employee.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={employee.status === 'Processed' ? 'border-success text-success' : 'border-warning text-warning'}
                          >
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            {employee.status === 'Pending' && (
                              <Button size="sm" className="gradient-primary text-primary-foreground">Process</Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Previous Months Salary Records
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead className="text-right">Total Payroll</TableHead>
                      <TableHead className="text-right">Processed</TableHead>
                      <TableHead className="text-right">Pending</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {salaryHistory.map((record, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{record.month}</TableCell>
                        <TableCell className="text-right">₹{record.totalPayroll.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-success">₹{record.processed.toLocaleString()}</TableCell>
                        <TableCell className="text-right text-warning">
                          {record.pending > 0 ? `₹${record.pending.toLocaleString()}` : '-'}
                        </TableCell>
                        <TableCell>{record.employees}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={record.pending === 0 ? 'border-success text-success' : 'border-warning text-warning'}
                          >
                            {record.pending === 0 ? 'Completed' : 'Partial'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Details</Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-3 h-3 mr-1" />
                              Export
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}