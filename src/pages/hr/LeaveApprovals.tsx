import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Calendar, Check, X, Clock, CalendarDays, CalendarCheck, CalendarX } from 'lucide-react';

const pendingLeaves = [
  { id: 1, employee: 'Dr. Michael Chen', department: 'Cardiology', type: 'Annual Leave', from: '2024-01-20', to: '2024-01-25', days: 5, reason: 'Family vacation', appliedOn: '2024-01-10' },
  { id: 2, employee: 'Emily Rodriguez', department: 'Pharmacy', type: 'Sick Leave', from: '2024-01-16', to: '2024-01-17', days: 2, reason: 'Medical appointment', appliedOn: '2024-01-14' },
  { id: 3, employee: 'James Wilson', department: 'Laboratory', type: 'Personal Leave', from: '2024-01-22', to: '2024-01-22', days: 1, reason: 'Personal work', appliedOn: '2024-01-12' },
  { id: 4, employee: 'Dr. Priya Sharma', department: 'Pediatrics', type: 'Annual Leave', from: '2024-02-01', to: '2024-02-05', days: 5, reason: 'Travel plans', appliedOn: '2024-01-08' },
];

const approvedLeaves = [
  { id: 5, employee: 'Lisa Thompson', department: 'Reception', type: 'Maternity Leave', from: '2024-01-01', to: '2024-04-01', days: 90, reason: 'Maternity', approvedOn: '2023-12-15', approvedBy: 'HR Manager' },
  { id: 6, employee: 'Robert Davis', department: 'Finance', type: 'Sick Leave', from: '2024-01-08', to: '2024-01-10', days: 3, reason: 'Flu', approvedOn: '2024-01-07', approvedBy: 'HR Manager' },
];

const rejectedLeaves = [
  { id: 7, employee: 'Rahul Kumar', department: 'IT', type: 'Annual Leave', from: '2024-01-15', to: '2024-01-20', days: 5, reason: 'Holiday trip', rejectedOn: '2024-01-05', rejectedBy: 'HR Manager', rejectionReason: 'Critical project deadline' },
];

const leaveBalance = [
  { type: 'Annual Leave', total: 20, used: 8, remaining: 12 },
  { type: 'Sick Leave', total: 12, used: 3, remaining: 9 },
  { type: 'Personal Leave', total: 5, used: 2, remaining: 3 },
  { type: 'Maternity/Paternity', total: 90, used: 0, remaining: 90 },
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'Annual Leave': return 'bg-primary/20 text-primary';
    case 'Sick Leave': return 'bg-destructive/20 text-destructive';
    case 'Personal Leave': return 'bg-accent/20 text-accent';
    case 'Maternity Leave': return 'bg-success/20 text-success';
    default: return 'bg-secondary text-muted-foreground';
  }
};

export default function LeaveApprovals() {
  const [activeTab, setActiveTab] = useState('pending');

  return (
    <DashboardLayout title="Leave Management">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">{pendingLeaves.length}</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved (This Month)</p>
                <p className="text-2xl font-bold text-foreground">{approvedLeaves.length}</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <CalendarX className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-foreground">{rejectedLeaves.length}</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">On Leave Today</p>
                <p className="text-2xl font-bold text-foreground">14</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Leave Requests Tabs */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Leave Requests</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-9 w-64 bg-secondary/30" />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="pending" className="gap-2">
                  <Clock className="w-4 h-4" />
                  Pending ({pendingLeaves.length})
                </TabsTrigger>
                <TabsTrigger value="approved" className="gap-2">
                  <Check className="w-4 h-4" />
                  Approved
                </TabsTrigger>
                <TabsTrigger value="rejected" className="gap-2">
                  <X className="w-4 h-4" />
                  Rejected
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Applied On</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{leave.employee}</p>
                            <p className="text-sm text-muted-foreground">{leave.department}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(leave.type)}>{leave.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{leave.from}</p>
                            <p className="text-muted-foreground">to {leave.to}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{leave.days}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{leave.reason}</TableCell>
                        <TableCell>{leave.appliedOn}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="text-destructive border-destructive/30">
                              <X className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                            <Button size="sm" className="gradient-primary text-primary-foreground">
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="approved">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Approved On</TableHead>
                      <TableHead>Approved By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {approvedLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{leave.employee}</p>
                            <p className="text-sm text-muted-foreground">{leave.department}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(leave.type)}>{leave.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{leave.from}</p>
                            <p className="text-muted-foreground">to {leave.to}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{leave.days}</TableCell>
                        <TableCell>{leave.approvedOn}</TableCell>
                        <TableCell>{leave.approvedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="rejected">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Employee</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Days</TableHead>
                      <TableHead>Rejection Reason</TableHead>
                      <TableHead>Rejected By</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rejectedLeaves.map((leave) => (
                      <TableRow key={leave.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{leave.employee}</p>
                            <p className="text-sm text-muted-foreground">{leave.department}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getTypeColor(leave.type)}>{leave.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{leave.from}</p>
                            <p className="text-muted-foreground">to {leave.to}</p>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">{leave.days}</TableCell>
                        <TableCell className="text-destructive">{leave.rejectionReason}</TableCell>
                        <TableCell>{leave.rejectedBy}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Leave Balance Overview */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Leave Balance Overview (Company Wide Average)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {leaveBalance.map((leave) => (
                <div key={leave.type} className="p-4 rounded-lg bg-secondary/30">
                  <p className="text-sm font-medium text-muted-foreground mb-2">{leave.type}</p>
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-2xl font-bold text-foreground">{leave.remaining}</p>
                      <p className="text-xs text-muted-foreground">remaining</p>
                    </div>
                    <div className="text-right text-sm">
                      <p className="text-muted-foreground">Total: {leave.total}</p>
                      <p className="text-muted-foreground">Used: {leave.used}</p>
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-secondary overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(leave.remaining / leave.total) * 100}%` }}
                    />
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