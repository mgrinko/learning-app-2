'use server';

import prisma from '@/lib/db';
import { LearningMaterial } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function getLearningMaterials() {
  return await prisma.learningMaterial.findMany();
}

export async function getLearningMaterial(id: number) {
  return await prisma.learningMaterial.findUnique({
    where: { id },
  });
}

export async function deleteLearningMaterial(id: number) {
  await prisma.learningMaterial.delete({
    where: { id },
  });

  revalidatePath('/learning-materials');
}

export async function createLearningMaterial(data: Omit<LearningMaterial, 'id'>) {
  await prisma.learningMaterial.create({
    data,
  });

  revalidatePath('/learning-materials');
}

export async function updateLearningMaterial(id: number, data: Partial<LearningMaterial>) {
  await prisma.learningMaterial.update({
    where: { id },
    data,
  });

  revalidatePath('/learning-materials');
}
