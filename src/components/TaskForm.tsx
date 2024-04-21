'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Employee, LearningMaterial, Task } from '@prisma/client';

import { Input } from './ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { createTask, updateTask } from '@/actions/task.actions';
import { Textarea } from './ui/textarea';

const taskSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(5),
  deadline: z.date().optional(),
  employeeId: z.coerce.number().int().positive(),
  learningMaterialId: z.coerce.number().int().positive(),
});

export const TaskForm = ({
  task,
  users,
  learningMaterials,
}: {
  task?: Task;
  users: Employee[];
  learningMaterials: LearningMaterial[];
}) => {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
      deadline: task?.deadline || undefined,
      employeeId: task?.employeeId || 0,
      learningMaterialId: task?.learningMaterialId || 0,
    },
  });

  function onSubmit(values: z.infer<typeof taskSchema>) {
    if (task) {
      return updateTask(task.id, values)
        .then(() => toast('Task was updated'))
        .catch(() => toast('Failed to update task'));
    }

    return createTask({ ...values, deadline: values.deadline || null }).then(
      () => {
        toast('Task was created');
        redirect('/tasks');
      },
      () => toast('Failed to create task'),
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 p-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the task"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="deadline"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Deadline</FormLabel>

              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(...args) => {
                      field.onChange(...args);
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="employeeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a User" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id.toString()}>
                      {user.firstName} {user.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="learningMaterialId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Learning Material</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a material" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {learningMaterials.map(material => (
                    <SelectItem
                      key={material.id}
                      value={material.id.toString()}
                    >
                      {material.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
