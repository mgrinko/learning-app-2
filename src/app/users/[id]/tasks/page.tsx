import prisma from '@/lib/db';
import { DataTable } from '@/components/ui/data-table';
import { columns } from '@/app/tasks/columns';
import { redirect } from 'next/navigation';
import { AppPageTitle } from '@/components/ui/app-page-title';

export default async function TasksPage({ params: { id = '' } }) {
  const employeeId = +id;
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    redirect('/users');
  }

  const tasks = await prisma.task.findMany({
    where: { employeeId },
  });

  return (
    <div className="mt-4">
      <AppPageTitle>
        {employee.firstName} {employee.lastName} Tasks
      </AppPageTitle>

      <DataTable columns={columns} data={tasks} />
    </div>
  );
}
