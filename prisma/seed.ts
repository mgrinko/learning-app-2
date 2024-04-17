/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  for (let i = 1; i <= 10; i++) {
    const employee = await prisma.employee.create({
      data: {
        firstName: `Employee ${i}`,
        lastName: `Lastname ${i}`,
        email: `employee${i}@example.com`,
        position: `Position ${i}`,
        department: `Department ${i}`,
        startDate: new Date(),
      },
    });

    const account = await prisma.account.create({
      data: {
        username: `username${i}`,
        password: `password${i}`,
        accessLevel: 'user',
        employeeId: employee.id,
      },
    });

    const taskCount = Math.random() * 3;

    for (let taskNo = 1; taskNo < taskCount; taskNo++) {
      const task = await prisma.task.create({
        data: {
          title: `Task ${i} ${taskNo}`,
          description: `Description for task ${i} ${taskNo}`,
          employeeId: employee.id,
        },
      });

      const itemsCount = Math.random() * 4;

      for (let itemNo = 1; itemNo < itemsCount; itemNo++) {
        await prisma.learningMaterial.create({
          data: {
            title: `Learning Material ${i} ${taskNo} ${itemNo}`,
            content: `Content for learning material ${i} ${taskNo} ${itemNo}`,
            taskId: task.id,
          },
        });
      }
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
