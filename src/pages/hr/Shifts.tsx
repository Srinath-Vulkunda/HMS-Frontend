import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Clock, Users, Calendar, GripVertical } from 'lucide-react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Employee {
  id: string;
  name: string;
  department: string;
  role: string;
}

interface ShiftColumn {
  id: string;
  title: string;
  time: string;
  employees: Employee[];
}

const initialColumns: ShiftColumn[] = [
  {
    id: 'morning',
    title: 'Morning Shift',
    time: '06:00 AM - 02:00 PM',
    employees: [
      { id: '1', name: 'Dr. Michael Chen', department: 'Cardiology', role: 'Doctor' },
      { id: '2', name: 'Emily Rodriguez', department: 'Pharmacy', role: 'Pharmacist' },
    ],
  },
  {
    id: 'day',
    title: 'Day Shift',
    time: '08:00 AM - 04:00 PM',
    employees: [
      { id: '3', name: 'James Wilson', department: 'Laboratory', role: 'Lab Tech' },
      { id: '4', name: 'Lisa Thompson', department: 'Reception', role: 'Receptionist' },
    ],
  },
  {
    id: 'evening',
    title: 'Evening Shift',
    time: '02:00 PM - 10:00 PM',
    employees: [
      { id: '5', name: 'Dr. Priya Sharma', department: 'Pediatrics', role: 'Doctor' },
    ],
  },
  {
    id: 'night',
    title: 'Night Shift',
    time: '10:00 PM - 06:00 AM',
    employees: [
      { id: '6', name: 'Robert Davis', department: 'Emergency', role: 'Nurse' },
    ],
  },
];

const unassigned: Employee[] = [
  { id: '7', name: 'Sarah Miller', department: 'Nursing', role: 'Nurse' },
  { id: '8', name: 'Tom Anderson', department: 'Radiology', role: 'Technician' },
  { id: '9', name: 'Anna White', department: 'Pharmacy', role: 'Pharmacist' },
];

function SortableEmployee({ employee }: { employee: Employee }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: employee.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-3 p-3 rounded-lg bg-background border border-border ${
        isDragging ? 'opacity-50 shadow-lg' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
        <span className="text-xs font-semibold text-primary">
          {employee.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{employee.name}</p>
        <p className="text-xs text-muted-foreground">{employee.role}</p>
      </div>
    </div>
  );
}

export default function Shifts() {
  const [columns, setColumns] = useState(initialColumns);
  const [unassignedList, setUnassignedList] = useState(unassigned);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find source and destination
    let sourceColumn: ShiftColumn | null = null;
    let destColumn: ShiftColumn | null = null;
    let fromUnassigned = false;

    if (unassignedList.find(e => e.id === activeId)) {
      fromUnassigned = true;
    } else {
      sourceColumn = columns.find(col => col.employees.find(e => e.id === activeId)) || null;
    }

    destColumn = columns.find(col => col.id === overId || col.employees.find(e => e.id === overId)) || null;

    if (!destColumn && overId === 'unassigned') {
      // Moving to unassigned
      if (sourceColumn) {
        const emp = sourceColumn.employees.find(e => e.id === activeId);
        if (emp) {
          setColumns(cols => cols.map(col => 
            col.id === sourceColumn!.id 
              ? { ...col, employees: col.employees.filter(e => e.id !== activeId) }
              : col
          ));
          setUnassignedList(list => [...list, emp]);
        }
      }
      return;
    }

    if (destColumn) {
      const emp = fromUnassigned 
        ? unassignedList.find(e => e.id === activeId)
        : sourceColumn?.employees.find(e => e.id === activeId);
      
      if (emp) {
        if (fromUnassigned) {
          setUnassignedList(list => list.filter(e => e.id !== activeId));
        } else if (sourceColumn) {
          setColumns(cols => cols.map(col => 
            col.id === sourceColumn!.id 
              ? { ...col, employees: col.employees.filter(e => e.id !== activeId) }
              : col
          ));
        }
        
        setColumns(cols => cols.map(col => 
          col.id === destColumn!.id 
            ? { ...col, employees: [...col.employees, emp] }
            : col
        ));
      }
    }
  };

  return (
    <DashboardLayout title="Shift Management">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <span className="text-muted-foreground">Week of Dec 23 - Dec 29, 2024</span>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search employee..." className="pl-9 w-64 bg-secondary/30" />
            </div>
            <Button className="gradient-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" />
              Add Shift
            </Button>
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Shift Columns */}
            {columns.map((column) => (
              <Card key={column.id} className="glass-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Clock className="w-4 h-4 text-primary" />
                    <CardTitle className="text-sm">{column.title}</CardTitle>
                  </div>
                  <p className="text-xs text-muted-foreground">{column.time}</p>
                  <Badge variant="secondary" className="w-fit mt-2">
                    <Users className="w-3 h-3 mr-1" />
                    {column.employees.length} staff
                  </Badge>
                </CardHeader>
                <CardContent>
                  <SortableContext items={column.employees.map(e => e.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2 min-h-[200px]" id={column.id}>
                      {column.employees.map((employee) => (
                        <SortableEmployee key={employee.id} employee={employee} />
                      ))}
                      {column.employees.length === 0 && (
                        <div className="h-[200px] border-2 border-dashed border-border rounded-lg flex items-center justify-center">
                          <p className="text-xs text-muted-foreground">Drop here</p>
                        </div>
                      )}
                    </div>
                  </SortableContext>
                </CardContent>
              </Card>
            ))}

            {/* Unassigned */}
            <Card className="glass-card border-dashed">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-muted-foreground">Unassigned</CardTitle>
                <Badge variant="outline" className="w-fit mt-2">
                  {unassignedList.length} staff
                </Badge>
              </CardHeader>
              <CardContent>
                <SortableContext items={unassignedList.map(e => e.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-2 min-h-[200px]" id="unassigned">
                    {unassignedList.map((employee) => (
                      <SortableEmployee key={employee.id} employee={employee} />
                    ))}
                  </div>
                </SortableContext>
              </CardContent>
            </Card>
          </div>
        </DndContext>
      </div>
    </DashboardLayout>
  );
}
