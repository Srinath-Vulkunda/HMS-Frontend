import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { 
  Activity, 
  Stethoscope, 
  Pill, 
  TestTube, 
  UserPlus, 
  DollarSign, 
  LayoutDashboard,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  Briefcase
} from 'lucide-react';

const roles: { value: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'admin', label: 'Admin', icon: LayoutDashboard, description: 'System control & analytics' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, description: 'Patient care & prescriptions' },
  { value: 'pharmacist', label: 'Pharmacist', icon: Pill, description: 'Medicine dispensing' },
  { value: 'lab_technician', label: 'Lab Tech', icon: TestTube, description: 'Test management' },
  { value: 'receptionist', label: 'Reception', icon: UserPlus, description: 'Patient onboarding' },
  { value: 'accountant', label: 'Accounts', icon: DollarSign, description: 'Billing & finance' },
  { value: 'hr', label: 'HR', icon: Briefcase, description: 'Staff management' },
];

const roleRoutes: Record<UserRole, string> = {
  admin: '/admin',
  doctor: '/doctor',
  pharmacist: '/pharmacy',
  lab_technician: '/lab',
  receptionist: '/reception',
  accountant: '/accounts',
  hr: '/hr',
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('admin');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(email, password, selectedRole);
      if (success) {
        navigate(roleRoutes[selectedRole]);
      } else {
        setError('Invalid credentials');
      }
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Branding Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-95" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        
        <div className="relative z-10 flex flex-col justify-center px-12 w-full">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-lg flex items-center justify-center">
              <Activity className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-4xl font-bold text-primary-foreground">HMS</h1>
              <p className="text-primary-foreground/80">Hospital Management System</p>
            </div>
          </div>

          <div className="space-y-6 max-w-md">
            <h2 className="font-display text-3xl font-bold text-primary-foreground leading-tight">
              Streamline your healthcare operations
            </h2>
            <p className="text-primary-foreground/80 text-lg leading-relaxed">
              A comprehensive solution for patient management, appointments, prescriptions, 
              billing, and more — all in one secure platform.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { label: '10K+', desc: 'Patients' },
                { label: '500+', desc: 'Staff' },
                { label: '99.9%', desc: 'Uptime' },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl bg-primary-foreground/10 backdrop-blur-lg">
                  <p className="font-display text-2xl font-bold text-primary-foreground">{stat.label}</p>
                  <p className="text-sm text-primary-foreground/70">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
              <Activity className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold text-foreground">HMS</h1>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="font-display text-2xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted-foreground mt-1">Sign in to access your dashboard</p>
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-sm font-medium text-foreground mb-3 block">Select your role</Label>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200",
                    selectedRole === role.value
                      ? "border-primary bg-primary/5 shadow-glow"
                      : "border-border bg-card hover:border-primary/30 hover:bg-secondary/50"
                  )}
                >
                  <role.icon className={cn(
                    "w-5 h-5 transition-colors",
                    selectedRole === role.value ? "text-primary" : "text-muted-foreground"
                  )} />
                  <span className={cn(
                    "text-xs font-medium transition-colors",
                    selectedRole === role.value ? "text-primary" : "text-muted-foreground"
                  )}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-secondary/30 border-border focus:border-primary focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 bg-secondary/30 border-border focus:border-primary focus:ring-primary pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive text-center bg-destructive/10 py-2 rounded-lg">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full h-12 gradient-primary text-primary-foreground font-semibold text-base shadow-glow hover:opacity-90 transition-opacity"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Demo: Select any role and click Sign In
          </p>
        </div>
      </div>
    </div>
  );
}
