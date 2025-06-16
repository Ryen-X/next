import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create Students with numeric IDs
  const student1 = await prisma.student.upsert({
    where: { id: 101 },
    update: {},
    create: {
      id: 101,
      name: 'Alice Smith',
      hasVoted: false,
    },
  });
  const student2 = await prisma.student.upsert({
    where: { id: 102 },
    update: {},
    create: {
      id: 102,
      name: 'Bob Johnson',
      hasVoted: false,
    },
  });
  const student3 = await prisma.student.upsert({
    where: { id: 103 },
    update: {},
    create: {
      id: 103,
      name: 'Charlie Brown',
      hasVoted: true, // This student has already voted for testing duplicate votes
    },
  });
  console.log(`Created students: ${student1.name}, ${student2.name}, ${student3.name}`);

  // Create Candidates
  const candidates = [
    { id: 'HB1', name: 'Candidate HB1', category: 'headBoy' },
    { id: 'HB2', name: 'Candidate HB2', category: 'headBoy' },
    { id: 'HB3', name: 'Candidate HB3', category: 'headBoy' },
    { id: 'HB4', name: 'Candidate HB4', category: 'headBoy' },
    { id: 'HG1', name: 'Candidate HG1', category: 'headGirl' },
    { id: 'HG2', name: 'Candidate HG2', category: 'headGirl' },
    { id: 'HG3', name: 'Candidate HG3', category: 'headGirl' },
    { id: 'HG4', name: 'Candidate HG4', category: 'headGirl' },
    { id: 'D1', name: 'Candidate D1', category: 'deputyBoy' },
    { id: 'D2', name: 'Candidate D2', category: 'deputyBoy' },
    { id: 'D3', name: 'Candidate D3', category: 'deputyBoy' },
    { id: 'D4', name: 'Candidate D4', category: 'deputyBoy' },
  ];

  for (const candidateData of candidates) {
    await prisma.candidate.upsert({
      where: { id: candidateData.id },
      update: {},
      create: candidateData,
    });
  }
  console.log(`Created ${candidates.length} candidates.`);

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
