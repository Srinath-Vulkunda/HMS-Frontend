import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Download, DollarSign, TrendingUp, Users, FileText } from 'lucide-react';

const payrollData = [
  { id: 1, name: 'Dr. Sarah Johnson', department: 'Administration', designation: 'Chief Admin', basicSalary: 150000, allowances: 25000, deductions: 15000, netSalary: 160000, status: 'Processed' },
  { id: 2, name: 'Dr. Michael Chen', department: 'Cardiology', designation: 'Senior Doctor', basicSalary: 180000, allowances: 30000, deductions: 18000, netSalary: 192000, status: 'Processed' },
  { id: 3, name: 'Emily Rodriguez', department: 'Pharmacy', designation: 'Head Pharmacist', basicSalary: 75000, allowances: 12000, deductions: 8000, netSalary: 79000, status: 'Pending' },
  { id: 4, name: 'James Wilson', department: 'Laboratory', designation: 'Lab Technician', basicSalary: 55000, allowances: 8000, deductions: 5500, netSalary: 57500, status: 'Processed' },
  { id: 5, name: 'Lisa Thompson', department: 'Reception', designation: 'Senior Receptionist', basicSalary: 45000, allowances: 6000, deductions: 4500, netSalary: 46500, status: 'Pending' },
  { id: 6, name: 'Robert Davis', department: 'Finance', designation: 'Accountant', basicSalary: 65000, allowances: 10000, deductions: 6500, netSalary: 68500, status: 'Processed' },
];

export default function Payroll() {
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
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Employees</p>
                <p className="text-xl font-bold text-foreground">156</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Payroll Table */}
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
      </div>
    </DashboardLayout>
  );
}