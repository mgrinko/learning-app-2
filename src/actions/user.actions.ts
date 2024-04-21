'use server';

import prisma from '@/lib/db';
import { Employee } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getUsers() {
  return prisma.employee.findMany();
}

export async function getUser(id: number) {
  return prisma.employee.findUnique({
    where: { id },
  });
}

export async function deleteUser(id: number) {
  await prisma.employee.delete({
    where: { id },
  });

  revalidatePath('/users');
}

export async function createUser(data: Omit<Employee, 'id'>) {
  const user = await prisma.employee.create({
    data,
  });

  revalidatePath('/users');

  return user;
}

export async function updateUser(id: number, data: Partial<Employee>) {
  const user = await prisma.employee.update({
    where: { id },
    data,
  });

  revalidatePath(`/users/${id}`);

  return user;
}
