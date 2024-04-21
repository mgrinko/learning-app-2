'use server';

import prisma from '@/lib/db';
import { Task } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getTasks() {
  return prisma.task.findMany();
}

export async function getTask(id: number) {
  return prisma.task.findUnique({
    where: { id },
  });
}

export async function deleteTask(id: number) {
  await prisma.task.delete({
    where: { id },
  });

  revalidatePath('/tasks');
}

export async function createTask(data: Omit<Task, 'id'>) {
  await prisma.task.create({
    data,
  });

  revalidatePath('/tasks');
}

export async function updateTask(id: number, data: Partial<Task>) {
  await prisma.task.update({
    where: { id },
    data,
  });

  revalidatePath('/tasks');
}

export async function getTasksBy(department: string) {
  return prisma.task.findMany({
    where: {
      employee: { department },
    },
    orderBy: {
      employee: {
        firstName: 'asc',
      },
    },
    skip: 0,
    take: 10,
  });
}