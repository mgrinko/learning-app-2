'use client';

import { Task } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { SortButton } from '@/components/ui/sort-button';
import Link from 'next/link';
import { deleteTask } from '@/actions/task.actions';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Confirmation } from '@/components/Confirmation';
import { Icon } from '@/components/ui/icon';

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: 'title',
    header: 'Task Name',
    cell: ({ row }) => (
      <Link href={`/tasks/${row.original.id}`} className="text-blue-800 font-medium">
        {row.original.title}
      </Link>
    ),
  },
  {
    accessorKey: 'deadline',
    sortingFn: 'datetime',
    header: ({ column }) => <SortButton column={column}>Deadline</SortButton>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original;

      function handleDelete() {
        deleteTask(task.id)
          .then(() => toast.success('Task deleted successfully'))
          .catch(() => toast.error('Failed to delete task'));
      }

      return (
        <div className="flex gap-x-2">
          <Confirmation
            title="Delete Task"
            message={`Are you sure you want to delete task "${task.title}"?`}
            okText="Delete"
            trigger={
              <Button size="sm" className="rounded-full">
                <Icon.X className="h-4 w-4" />
              </Button>
            }
            okCallback={handleDelete}
          />

          <Button size="sm" className="rounded-full" asChild>
            <Link href={`/tasks/${task.id}`}>
              <Icon.Pen className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
