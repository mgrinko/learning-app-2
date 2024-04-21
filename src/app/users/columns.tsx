'use client';

import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '@prisma/client';
import { SortButton } from '@/components/ui/sort-button';
import { deleteUser } from '@/actions/user.actions';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Confirmation } from '@/components/Confirmation';
import { Icon } from '@/components/ui/icon';

export const columns: ColumnDef<Employee & { fullName: string }>[] = [
  {
    accessorKey: 'fullName',
    sortingFn: 'alphanumericCaseSensitive',
    header: ({ column }) => <SortButton column={column}>Name</SortButton>,
    cell: ({ row }) => (
      <Link href={`/users/${row.original.id}/tasks`} className="text-blue-800 font-medium">
        {row.original.fullName}
      </Link>
    ),
  },
  {
    accessorKey: 'email',
    sortingFn: 'alphanumeric',
    header: ({ column }) => <SortButton column={column}>Email</SortButton>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      function handleDelete() {
        deleteUser(user.id)
          .then(() => toast.success('User deleted successfully'))
          .catch(() => toast.error('Failed to delete user'));
      }

      return (
        <div className="flex gap-x-2">
          <Confirmation
            title="Delete User"
            message={`Are you sure you want to delete ${user.firstName} ${user.lastName}?`}
            okText="Delete"
            trigger={
              <Button size="sm" className="rounded-full">
                <Icon.X className="h-4 w-4" />
              </Button>
            }
            okCallback={handleDelete}
          />

          <Button size="sm" className="rounded-full" asChild>
            <Link href={`/users/${user.id}`}>
              <Icon.Pen className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
