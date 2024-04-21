import prisma from '@/lib/db';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { AppPageTitle } from '@/components/ui/app-page-title';

export default async function TasksPage() {
  const users = await prisma.employee.findMany();

  const data = users.map(user => ({
    ...user,
    fullName: `${user.firstName} ${user.lastName}`,
  }));

  return (
    <>
      <div className="flex justify-between items-center p-4">
        <AppPageTitle>Users</AppPageTitle>

        <Button asChild>
          <Link href="/users/new">Invite a User</Link>
        </Button>
      </div>

      <DataTable columns={columns} data={data} />
    </>
  );
}
