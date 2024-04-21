import prisma from '@/lib/db';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default async function TasksPage() {
  const tasks = await prisma.task.findMany();

  return <DataTable columns={columns} data={tasks} caption={<h1>Tasks</h1>} />;
}
