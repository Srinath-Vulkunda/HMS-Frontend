import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import PharmacyDashboard from "./pages/PharmacyDashboard";
import LabDashboard from "./pages/LabDashboard";
import ReceptionDashboard from "./pages/ReceptionDashboard";
import AccountsDashboard from "./pages/AccountsDashboard";
import HRDashboard from "./pages/HRDashboard";
import NotFound from "./pages/NotFound";

// Admin pages
import UsersManagement from "./pages/admin/UsersManagement";
import Departments from "./pages/admin/Departments";
import Schedules from "./pages/admin/Schedules";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

// Doctor pages
import Patients from "./pages/doctor/Patients";
import DoctorAppointments from "./pages/doctor/Appointments";
import Prescriptions from "./pages/doctor/Prescriptions";
import LabResults from "./pages/doctor/LabResults";

// Pharmacy pages
import PrescriptionQueue from "./pages/pharmacy/PrescriptionQueue";
import Inventory from "./pages/pharmacy/Inventory";
import ExpiryAlerts from "./pages/pharmacy/ExpiryAlerts";

// Lab pages
import TestRequests from "./pages/lab/TestRequests";
import Results from "./pages/lab/Results";

// Reception pages
import PatientRegistration from "./pages/reception/PatientRegistration";
import AppointmentBooking from "./pages/reception/AppointmentBooking";
import Queue from "./pages/reception/Queue";

// Accounts pages
import Billing from "./pages/accounts/Billing";
import FinancialReports from "./pages/accounts/FinancialReports";

// HR pages
import Payroll from "./pages/hr/Payroll";
import Shifts from "./pages/hr/Shifts";
import Attendance from "./pages/hr/Attendance";
import LeaveApprovals from "./pages/hr/LeaveApprovals";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UsersManagement />} />
            <Route path="/admin/departments" element={<Departments />} />
            <Route path="/admin/schedules" element={<Schedules />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/settings" element={<Settings />} />
            
            {/* Doctor Routes */}
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/patients" element={<Patients />} />
            <Route path="/doctor/appointments" element={<DoctorAppointments />} />
            <Route path="/doctor/prescriptions" element={<Prescriptions />} />
            <Route path="/doctor/lab-results" element={<LabResults />} />
            
            {/* Pharmacy Routes */}
            <Route path="/pharmacy" element={<PharmacyDashboard />} />
            <Route path="/pharmacy/prescriptions" element={<PrescriptionQueue />} />
            <Route path="/pharmacy/inventory" element={<Inventory />} />
            <Route path="/pharmacy/alerts" element={<ExpiryAlerts />} />
            
            {/* Lab Routes */}
            <Route path="/lab" element={<LabDashboard />} />
            <Route path="/lab/requests" element={<TestRequests />} />
            <Route path="/lab/results" element={<Results />} />
            
            {/* Reception Routes */}
            <Route path="/reception" element={<ReceptionDashboard />} />
            <Route path="/reception/register" element={<PatientRegistration />} />
            <Route path="/reception/appointments" element={<AppointmentBooking />} />
            <Route path="/reception/queue" element={<Queue />} />
            
            {/* Accounts Routes */}
            <Route path="/accounts" element={<AccountsDashboard />} />
            <Route path="/accounts/billing" element={<Billing />} />
            <Route path="/accounts/reports" element={<FinancialReports />} />
            
            {/* HR Routes */}
            <Route path="/hr" element={<HRDashboard />} />
            <Route path="/hr/payroll" element={<Payroll />} />
            <Route path="/hr/shifts" element={<Shifts />} />
            <Route path="/hr/attendance" element={<Attendance />} />
            <Route path="/hr/leaves" element={<LeaveApprovals />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
