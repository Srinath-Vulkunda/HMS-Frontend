import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Pill,
  TestTube,
  UserPlus,
  DollarSign,
  Stethoscope,
  ClipboardList,
  Package,
  AlertTriangle,
  Building2,
  ChevronRight,
  Activity,
  Briefcase,
  Clock,
  CalendarCheck,
  Wallet,
  Heart,
  Thermometer,
  UtensilsCrossed,
  RotateCcw,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const roleNavItems: Record<string, NavItem[]> = {
  admin: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { label: 'Users & Roles', icon: Users, path: '/admin/users' },
    { label: 'Departments', icon: Building2, path: '/admin/departments' },
    { label: 'Schedules', icon: Calendar, path: '/admin/schedules' },
    { label: 'Reports', icon: FileText, path: '/admin/reports' },
    { label: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
  doctor: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/doctor' },
    { label: 'Patients', icon: Users, path: '/doctor/patients' },
    { label: 'Appointments', icon: Calendar, path: '/doctor/appointments' },
    { label: 'Prescriptions', icon: ClipboardList, path: '/doctor/prescriptions' },
    { label: 'Lab Results', icon: TestTube, path: '/doctor/lab-results' },
  ],
  pharmacist: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/pharmacy' },
    { label: 'Prescriptions', icon: ClipboardList, path: '/pharmacy/prescriptions' },
    { label: 'Inventory', icon: Package, path: '/pharmacy/inventory' },
    { label: 'Billing', icon: DollarSign, path: '/pharmacy/billing' },
    { label: 'Expiry Alerts', icon: AlertTriangle, path: '/pharmacy/alerts' },
  ],
  lab_technician: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/lab' },
    { label: 'Test Requests', icon: TestTube, path: '/lab/requests' },
    { label: 'Results', icon: FileText, path: '/lab/results' },
    { label: 'Billing', icon: DollarSign, path: '/lab/billing' },
  ],
  receptionist: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/reception' },
    { label: 'New Patient', icon: UserPlus, path: '/reception/register' },
    { label: 'Appointments', icon: Calendar, path: '/reception/appointments' },
    { label: 'Billing', icon: DollarSign, path: '/reception/billing' },
    { label: 'Queue', icon: Users, path: '/reception/queue' },
  ],
  accountant: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/accounts' },
    { label: 'Billing', icon: DollarSign, path: '/accounts/billing' },
    { label: 'Reports', icon: FileText, path: '/accounts/reports' },
  ],
  hr: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/hr' },
    { label: 'Payroll', icon: Wallet, path: '/hr/payroll' },
    { label: 'Shifts', icon: Clock, path: '/hr/shifts' },
    { label: 'Attendance', icon: CalendarCheck, path: '/hr/attendance' },
    { label: 'Leave Approvals', icon: Calendar, path: '/hr/leaves' },
  ],
  nurse: [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/nurse' },
    { label: 'Patient Care', icon: Heart, path: '/nurse/patients' },
    { label: 'Vitals', icon: Thermometer, path: '/nurse/vitals' },
    { label: 'Meals', icon: UtensilsCrossed, path: '/nurse/meals' },
    { label: 'Rounds', icon: RotateCcw, path: '/nurse/rounds' },
  ],
};

const roleIcons: Record<string, React.ElementType> = {
  admin: LayoutDashboard,
  doctor: Stethoscope,
  pharmacist: Pill,
  lab_technician: TestTube,
  receptionist: UserPlus,
  accountant: DollarSign,
  hr: Briefcase,
  nurse: Heart,
};

const roleLabels: Record<string, string> = {
  admin: 'Administrator',
  doctor: 'Doctor',
  pharmacist: 'Pharmacist',
  lab_technician: 'Lab Technician',
  receptionist: 'Receptionist',
  accountant: 'Accountant',
  hr: 'HR Manager',
  nurse: 'Nurse',
};

export function AppSidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) return null;

  const navItems = roleNavItems[user.role] || [];
  const RoleIcon = roleIcons[user.role] || LayoutDashboard;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-5 border-b border-sidebar-border">
        <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
          <Activity className="w-5 h-5 text-primary-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-lg text-sidebar-foreground">HMS</h1>
          <p className="text-xs text-sidebar-foreground/60">Hospital Management</p>
        </div>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-sm">
              {user.name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <div className="flex items-center gap-1.5">
              <RoleIcon className="w-3 h-3 text-sidebar-primary" />
              <span className="text-xs text-sidebar-foreground/70">{roleLabels[user.role]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive && "animate-fade-in")} />
              <span className="flex-1 text-left">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-sidebar-border">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
