import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { AppointmentsList } from '@/components/dashboard/AppointmentsList';
import { AlertsPanel } from '@/components/dashboard/AlertsPanel';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { DepartmentChart } from '@/components/dashboard/DepartmentChart';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { 
  Users, 
  Stethoscope, 
  Calendar, 
  DollarSign,
  UserPlus,
  Building2,
  FileText,
  Settings
} from 'lucide-react';

const stats = [
  { title: 'Total Patients', value: '12,548', change: { value: 12, type: 'increase' as const }, icon: Users, variant: 'primary' as const },
  { title: 'Active Doctors', value: '48', change: { value: 5, type: 'increase' as const }, icon: Stethoscope, variant: 'success' as const },
  { title: "Today's Appointments", value: '156', change: { value: 8, type: 'decrease' as const }, icon: Calendar, variant: 'info' as const },
  { title: "Today's Revenue", value: '$24,580', change: { value: 15, type: 'increase' as const }, icon: DollarSign, variant: 'warning' as const },
];

const appointments = [
  { id: '1', patientName: 'Sarah Johnson', time: '09:00 AM', type: 'General Checkup', status: 'completed' as const, doctor: 'Michael Chen' },
  { id: '2', patientName: 'David Williams', time: '09:30 AM', type: 'Follow-up', status: 'in-progress' as const, doctor: 'Emily Brown' },
  { id: '3', patientName: 'Maria Garcia', time: '10:00 AM', type: 'Consultation', status: 'waiting' as const, doctor: 'James Wilson' },
  { id: '4', patientName: 'Robert Brown', time: '10:30 AM', type: 'Lab Results', status: 'waiting' as const, doctor: 'Lisa Taylor' },
  { id: '5', patientName: 'Jennifer Davis', time: '11:00 AM', type: 'Prescription', status: 'waiting' as const, doctor: 'Michael Chen' },
];

const alerts = [
  { id: '1', type: 'stock' as const, title: 'Low Stock Alert', description: 'Paracetamol inventory below minimum', time: '10 minutes ago' },
  { id: '2', type: 'report' as const, title: 'Pending Lab Reports', description: '12 reports awaiting verification', time: '25 minutes ago' },
  { id: '3', type: 'payment' as const, title: 'Unpaid Bills', description: '8 invoices pending for 30+ days', time: '1 hour ago' },
  { id: '4', type: 'urgent' as const, title: 'Emergency Room Alert', description: 'Capacity at 85%', time: '2 hours ago' },
];

const quickActions = [
  { label: 'Add User', description: 'Create new staff account', icon: UserPlus, variant: 'primary' as const },
  { label: 'Departments', description: 'Manage departments', icon: Building2, variant: 'success' as const },
  { label: 'Reports', description: 'View analytics', icon: FileText, variant: 'info' as const },
  { label: 'Settings', description: 'System configuration', icon: Settings, variant: 'warning' as const },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Admin Dashboard" subtitle="Welcome back! Here's your hospital overview.">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div key={stat.title} className={`stagger-${index + 1}`}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue Chart - 2 columns */}
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        {/* Quick Actions */}
        <div>
          <QuickActions actions={quickActions} />
        </div>
      </div>

      {/* Secondary Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Chart */}
        <div className="lg:col-span-1">
          <DepartmentChart />
        </div>

        {/* Appointments List */}
        <div className="lg:col-span-1">
          <AppointmentsList appointments={appointments} showDoctor />
        </div>

        {/* Alerts Panel */}
        <div className="lg:col-span-1">
          <AlertsPanel alerts={alerts} />
        </div>
      </div>
    </DashboardLayout>
  );
}
