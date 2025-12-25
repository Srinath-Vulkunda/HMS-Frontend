import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Utensils, Coffee, Sun, Moon, CheckCircle, Clock, 
  AlertCircle, Users 
} from 'lucide-react';
import { toast } from 'sonner';

const mealSchedule = {
  breakfast: [
    { id: 'P001', name: 'John Smith', room: '101-A', diet: 'Regular', restrictions: 'None', status: 'pending' },
    { id: 'P002', name: 'Mary Johnson', room: '102-B', diet: 'Low Sodium', restrictions: 'No salt', status: 'served' },
    { id: 'P003', name: 'Robert Williams', room: '103-A', diet: 'Diabetic', restrictions: 'Sugar-free', status: 'pending' },
    { id: 'P004', name: 'Emily Davis', room: '104-B', diet: 'Liquid', restrictions: 'Post-surgery', status: 'served' },
    { id: 'P005', name: 'Michael Brown', room: '105-A', diet: 'Diabetic', restrictions: 'Sugar-free, Low carb', status: 'pending' },
  ],
  lunch: [
    { id: 'P001', name: 'John Smith', room: '101-A', diet: 'Regular', restrictions: 'None', status: 'pending' },
    { id: 'P002', name: 'Mary Johnson', room: '102-B', diet: 'Low Sodium', restrictions: 'No salt', status: 'pending' },
    { id: 'P003', name: 'Robert Williams', room: '103-A', diet: 'Diabetic', restrictions: 'Sugar-free', status: 'pending' },
    { id: 'P004', name: 'Emily Davis', room: '104-B', diet: 'Soft', restrictions: 'Easy to digest', status: 'pending' },
    { id: 'P005', name: 'Michael Brown', room: '105-A', diet: 'Diabetic', restrictions: 'Sugar-free, Low carb', status: 'pending' },
  ],
  dinner: [
    { id: 'P001', name: 'John Smith', room: '101-A', diet: 'Regular', restrictions: 'None', status: 'pending' },
    { id: 'P002', name: 'Mary Johnson', room: '102-B', diet: 'Low Sodium', restrictions: 'No salt', status: 'pending' },
    { id: 'P003', name: 'Robert Williams', room: '103-A', diet: 'Diabetic', restrictions: 'Sugar-free', status: 'pending' },
    { id: 'P004', name: 'Emily Davis', room: '104-B', diet: 'Soft', restrictions: 'Easy to digest', status: 'pending' },
    { id: 'P005', name: 'Michael Brown', room: '105-A', diet: 'Diabetic', restrictions: 'Sugar-free, Low carb', status: 'pending' },
  ],
};

const dietTypes = [
  { type: 'Regular', count: 1, color: 'bg-primary' },
  { type: 'Diabetic', count: 2, color: 'bg-warning' },
  { type: 'Low Sodium', count: 1, color: 'bg-blue-500' },
  { type: 'Liquid', count: 1, color: 'bg-purple-500' },
];

export default function MealManagement() {
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);

  const toggleMealSelection = (id: string) => {
    setSelectedMeals(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const markAsServed = () => {
    toast.success(`${selectedMeals.length} meals marked as served`);
    setSelectedMeals([]);
  };

  const MealTable = ({ meals }: { meals: typeof mealSchedule.breakfast }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12"></TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Room</TableHead>
          <TableHead>Diet Type</TableHead>
          <TableHead>Restrictions</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {meals.map((meal) => (
          <TableRow key={meal.id}>
            <TableCell>
              <Checkbox 
                checked={selectedMeals.includes(meal.id)}
                onCheckedChange={() => toggleMealSelection(meal.id)}
                disabled={meal.status === 'served'}
              />
            </TableCell>
            <TableCell className="font-medium">{meal.name}</TableCell>
            <TableCell>{meal.room}</TableCell>
            <TableCell>
              <Badge variant="outline" className={
                meal.diet === 'Diabetic' ? 'border-warning text-warning' :
                meal.diet === 'Low Sodium' ? 'border-blue-500 text-blue-500' :
                meal.diet === 'Liquid' ? 'border-purple-500 text-purple-500' :
                'border-primary text-primary'
              }>
                {meal.diet}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{meal.restrictions}</TableCell>
            <TableCell>
              <Badge variant="outline" className={
                meal.status === 'served' 
                  ? 'border-success text-success' 
                  : 'border-muted-foreground text-muted-foreground'
              }>
                {meal.status === 'served' ? (
                  <><CheckCircle className="w-3 h-3 mr-1" /> Served</>
                ) : (
                  <><Clock className="w-3 h-3 mr-1" /> Pending</>
                )}
              </Badge>
            </TableCell>
            <TableCell>
              {meal.status === 'pending' && (
                <Button size="sm" variant="outline" onClick={() => {
                  toast.success(`Meal served to ${meal.name}`);
                }}>
                  Mark Served
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <DashboardLayout title="Meal Management" subtitle="Track and serve patient meals">
      <div className="space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Patients</p>
                <p className="text-xl font-bold">5</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Served Today</p>
                <p className="text-xl font-bold">8</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-bold">7</p>
              </div>
            </div>
          </Card>
          <Card className="glass-card p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-destructive/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Special Diets</p>
                <p className="text-xl font-bold">4</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Diet Summary */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Diet Type Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              {dietTypes.map((diet) => (
                <div key={diet.type} className="flex items-center gap-2 p-3 rounded-lg bg-secondary/30">
                  <div className={`w-3 h-3 rounded-full ${diet.color}`} />
                  <span className="font-medium">{diet.type}</span>
                  <Badge variant="secondary">{diet.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Meal Schedule Tabs */}
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Meal Schedule</CardTitle>
            {selectedMeals.length > 0 && (
              <Button onClick={markAsServed} className="gradient-primary text-primary-foreground">
                <CheckCircle className="w-4 h-4 mr-2" />
                Mark {selectedMeals.length} as Served
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="breakfast">
              <TabsList className="bg-secondary/50 mb-4">
                <TabsTrigger value="breakfast" className="flex items-center gap-2">
                  <Coffee className="w-4 h-4" />
                  Breakfast (7-9 AM)
                </TabsTrigger>
                <TabsTrigger value="lunch" className="flex items-center gap-2">
                  <Sun className="w-4 h-4" />
                  Lunch (12-2 PM)
                </TabsTrigger>
                <TabsTrigger value="dinner" className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Dinner (7-9 PM)
                </TabsTrigger>
              </TabsList>

              <TabsContent value="breakfast">
                <MealTable meals={mealSchedule.breakfast} />
              </TabsContent>
              <TabsContent value="lunch">
                <MealTable meals={mealSchedule.lunch} />
              </TabsContent>
              <TabsContent value="dinner">
                <MealTable meals={mealSchedule.dinner} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
