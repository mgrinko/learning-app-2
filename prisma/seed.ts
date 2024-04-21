/* eslint-disable no-await-in-loop */
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  prisma.account.deleteMany();
  prisma.task.deleteMany();
  prisma.employee.deleteMany();
  prisma.learningMaterial.deleteMany();

  const departments = ['HR', 'IT', 'Finance', 'Marketing', 'Sales'];
  const employeesCount = 17;
  const learningMaterialsCount = 5;
  const maxTasksPerEmployee = 3;

  for (let i = 1; i <= learningMaterialsCount; i++) {
    await prisma.learningMaterial.create({
      data: {
        title: `Learning Material ${i}`,
        content: faker.lorem.paragraph(),
      },
    });
  }

  const learningMaterials = await prisma.learningMaterial.findMany();

  for (let i = 1; i <= employeesCount; i++) {
    const employee = await prisma.employee.create({
      data: {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        position: faker.person.jobTitle(),
        department: departments[Math.floor(Math.random() * departments.length)],
        startDate: faker.date.past(),
      },
    });

    await prisma.account.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        accessLevel: 'user',
        employeeId: employee.id,
      },
    });

    // take 0-3 random learning materials
    const count = Math.floor(Math.random() * maxTasksPerEmployee + 1);
    const randomIndexes = [...learningMaterials]
      .sort(() => Math.random() - 0.5)
      .slice(0, count);

    for (const learningMaterial of randomIndexes) {
      await prisma.task.create({
        data: {
          title: `${employee.firstName} ${employee.lastName} - ${learningMaterial.title}`,
          description: `Learn ${learningMaterial.title}`,
          employeeId: employee.id,
          learningMaterialId: learningMaterial.id,
        },
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
