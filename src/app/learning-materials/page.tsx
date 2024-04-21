import prisma from '@/lib/db';
import { DataTable } from '@/components/ui/data-table';
import { columns } from './columns';

export default async function LearningItemsPage() {
  const data = await prisma.learningMaterial.findMany();

  return (
    <DataTable
      columns={columns}
      data={data}
      caption={<h1 className="text-xl font-bold text-slate-950">Learning Materials</h1>}
    />
  );
}
