'use client';
import { Column, SortDirection } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from './button';

export const SortArrow = ({
  isSorted,
}: {
  isSorted: false | SortDirection;
}) => {
  if (isSorted === false) return <ArrowUpDown className="ml-2 h-4 w-4" />;
  if (isSorted === 'asc') return <ArrowUp className="ml-2 h-4 w-4" />;
  if (isSorted === 'desc') return <ArrowDown className="ml-2 h-4 w-4" />;
};

export const SortButton = ({
  column,
  children,
}: {
  column: Column<any>;
  children?: React.ReactNode;
}) => {
  const isSorted = column.getIsSorted();

  return (
    <Button
      variant="ghost"
      className="cursor-pointer"
      onClick={() => {
        if (isSorted === false) column.toggleSorting(false);
        if (isSorted === 'asc') column.toggleSorting(true);
        if (isSorted === 'desc') column.clearSorting();
      }}
    >
      {children}
      <SortArrow isSorted={isSorted} />
    </Button>
  );
};
