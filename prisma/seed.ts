import { slugify } from '@/features/shared/helpers/slugify';
import { faker } from '@faker-js/faker';
import { LeaveStatus, Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Create admin
  const admin = await prisma.user.upsert({
    where: {
      email: 'admin@gmail.com',
    },
    update: {},
    create: {
      email: 'admin@gmail.com',
      password: await bcrypt.hash(faker.internet.password(), 12),
      name: 'admin',
      role: 'ADMIN',
      image: faker.internet.avatar(),
    },
  });

  // Create User
  const numOfUsers = 10;
  const userIds: number[] = [admin.id];
  const adminIds: number[] = [admin.id];
  for (let i = 0; i < numOfUsers; i++) {
    const createUserInput: Prisma.UserCreateInput = {
      name: faker.internet.displayName(),
      email: faker.internet.email(),
      password: await bcrypt.hash(faker.internet.password(), 12),
      role: faker.helpers.arrayElement(['ADMIN', 'MANAGER', 'MEMBER']),
      image: faker.internet.avatar(),
    };

    const user = await prisma.user.upsert({
      where: {
        email: createUserInput.email,
      },
      update: {},
      create: createUserInput,
    });

    userIds.push(user.id);
    if (user.role !== 'MEMBER') adminIds.push(user.id);
  }

  // Create Leave
  const numOfLeaves = 50;
  for (let i = 0; i < numOfLeaves; i++) {
    const status: LeaveStatus = faker.helpers.arrayElement([
      'PENDING',
      'APPROVED',
      'REJECTED',
    ]);
    const userId = faker.helpers.arrayElement(userIds);
    const leaveDate = faker.date.future().toISOString();
    const createLeaveInput: Prisma.LeaveCreateInput = {
      leaveDate,
      reason: faker.lorem.paragraph(),
      status,
      user: { connect: { id: userId } },
      rejectionReason:
        status === 'REJECTED' ? faker.lorem.paragraph() : undefined,
    };

    await prisma.leave.upsert({
      where: {
        userId_leaveDate: {
          userId,
          leaveDate,
        },
      },
      update: {},
      create: createLeaveInput,
    });
  }

  // Create Article
  const numOfArticles = 50;
  for (let i = 0; i < numOfArticles; i++) {
    const title = faker.lorem.sentence();
    const createArticleInput: Prisma.ArticleCreateInput = {
      title,
      slug: slugify(title),
      excerpt: faker.lorem.paragraph(),
      content: faker.lorem.paragraphs({ min: 3, max: 6 }),
      image: faker.image.url(),
      user: {
        connect: {
          id: faker.helpers.arrayElement(userIds),
        },
      },
    };

    await prisma.article.upsert({
      where: { slug: createArticleInput.slug },
      update: {},
      create: createArticleInput,
    });
  }

  // Create Announcement
  const numOfAnnouncements = 20;
  for (let i = 0; i < numOfAnnouncements; i++) {
    const title = faker.lorem.sentence();
    const createAnnouncementInput: Prisma.AnnouncementCreateInput = {
      title,
      slug: slugify(title),
      excerpt: faker.lorem.paragraph(),
      content: faker.lorem.paragraphs({ min: 3, max: 6 }),
      user: {
        connect: {
          id: faker.helpers.arrayElement(userIds),
        },
      },
    };

    await prisma.announcement.upsert({
      where: { slug: createAnnouncementInput.slug },
      update: {},
      create: createAnnouncementInput,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
