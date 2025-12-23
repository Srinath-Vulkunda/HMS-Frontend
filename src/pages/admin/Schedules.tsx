import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const schedules = [
  { id: '1', doctor: 'Dr. John Smith', department: 'Cardiology', day: 'Monday', shift: '9:00 AM - 5:00 PM', status: 'on-duty' },
  { id: '2', doctor: 'Dr. Emily Davis', department: 'Neurology', day: 'Monday', shift: '10:00 AM - 6:00 PM', status: 'on-duty' },
  { id: '3', doctor: 'Dr. Robert Wilson', department: 'Orthopedics', day: 'Monday', shift: '8:00 AM - 4:00 PM', status: 'on-leave' },
  { id: '4', doctor: 'Dr. Sarah Chen', department: 'Pediatrics', day: 'Monday', shift: '9:00 AM - 5:00 PM', status: 'on-duty' },
  { id: '5', doctor: 'Dr. Michael Brown', department: 'Dermatology', day: 'Monday', shift: '11:00 AM - 7:00 PM', status: 'on-duty' },
  { id: '6', doctor: 'Dr. John Smith', department: 'Cardiology', day: 'Tuesday', shift: '9:00 AM - 5:00 PM', status: 'on-duty' },
  { id: '7', doctor: 'Dr. Emily Davis', department: 'Neurology', day: 'Tuesday', shift: '10:00 AM - 6:00 PM', status: 'on-duty' },
  { id: '8', doctor: 'Dr. Robert Wilson', department: 'Orthopedics', day: 'Tuesday', shift: '8:00 AM - 4:00 PM', status: 'on-duty' },
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function Schedules() {
  const [currentWeek, setCurrentWeek] = useState('Dec 23 - Dec 29, 2024');

  return (
    <DashboardLayout title="Doctor Schedules" subtitle="Manage doctor shifts and availability">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-xl">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">{currentWeek}</span>
          </div>
          <Button variant="outline" size="icon">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Add Schedule
        </Button>
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-7 gap-4 mb-6">
        {weekDays.map((day, index) => (
          <div
            key={day}
            className={`text-center p-3 rounded-xl ${index === 0 ? 'bg-primary/20 border border-primary/30' : 'bg-card border border-border'}`}
          >
            <p className="text-xs text-muted-foreground">{day.slice(0, 3)}</p>
            <p className="font-semibold text-lg">{23 + index}</p>
          </div>
        ))}
      </div>

      {/* Schedule List */}
      <div className="space-y-4">
        {['Monday', 'Tuesday'].map(day => (
          <div key={day} className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="bg-secondary/30 px-6 py-3 border-b border-border">
              <h3 className="font-display font-semibold text-foreground">{day}</h3>
            </div>
            <div className="divide-y divide-border">
              {schedules.filter(s => s.day === day).map(schedule => (
                <div key={schedule.id} className="flex items-center justify-between px-6 py-4 hover:bg-secondary/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {schedule.doctor.split(' ').slice(1).map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{schedule.doctor}</p>
                      <p className="text-sm text-muted-foreground">{schedule.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{schedule.shift}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={schedule.status === 'on-duty' 
                        ? 'bg-green-500/10 text-green-400 border-green-500/30'
                        : 'bg-orange-500/10 text-orange-400 border-orange-500/30'
                      }
                    >
                      {schedule.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
