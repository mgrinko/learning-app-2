'use client';

import { LearningMaterial } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { SortButton } from '@/components/ui/sort-button';
import { ExtraActions } from '@/components/ui/extra-actions';
import Link from 'next/link';
import { deleteLearningMaterial } from '@/actions/learning-material.actions';

export const columns: ColumnDef<LearningMaterial>[] = [
  {
    accessorKey: 'title',
    sortingFn: 'alphanumericCaseSensitive',
    header: ({ column }) => <SortButton column={column}>Title</SortButton>,
  },
  {
    accessorKey: 'content',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const learningMaterial = row.original;

      return (
        <ExtraActions
          actions={[
            [
              <Link
                className="grow"
                href={`/learning-materials/${learningMaterial.id}`}
              >
                Edit
              </Link>,
            ],
            ['Delete', () => deleteLearningMaterial(learningMaterial.id)],
            ['View'],
          ]}
        />
      );
    },
  },
];
