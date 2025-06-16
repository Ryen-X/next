import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

// Zod schema for vote submission validation (relaxed for testing)
const voteSchema = z.object({
  studentId: z.coerce.number().min(1, "Student ID is required"), // Coerce to number
  headBoy: z.string().optional(),
  headGirl: z.string().optional(),
  deputyBoy: z.string().optional(),
  deputyGirl: z.string().optional(),
});

export async function POST(request: Request) {
  let requestBody;
  try {
    requestBody = await request.json();
  } catch (error) {
    await prisma.log.create({
      data: {
        type: "malformed",
        message: `Malformed JSON input: ${error instanceof Error ? error.message : String(error)}`,
      },
    });
    return NextResponse.json({ message: "Malformed JSON input" }, { status: 400 });
  }

  const validationResult = voteSchema.safeParse(requestBody);

  if (!validationResult.success) {
    const errorMessage = validationResult.error.errors.map(err => err.message).join(", ");
    await prisma.log.create({
      data: {
        studentId: typeof requestBody.studentId === 'string' ? parseInt(requestBody.studentId) : requestBody.studentId || null,
        type: "malformed",
        message: `Invalid vote data: ${errorMessage}`,
      },
    });
    return NextResponse.json({ message: `Invalid vote data: ${errorMessage}` }, { status: 400 });
  }

  const { studentId, headBoy, headGirl, deputyBoy, deputyGirl } = validationResult.data;

  try {
    // Use a transaction to ensure atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Save the vote
      await tx.vote.create({
        data: {
          studentId: studentId,
          headBoy: headBoy,
          headGirl: headGirl,
          deputyBoy: deputyBoy,
          deputyGirl: deputyGirl,
        },
      });

      // Mark student as voted (temporarily commented out to allow any admission number submission)
      // await tx.student.update({
      //   where: { id: studentId },
      //   data: { hasVoted: true },
      // });

      await tx.log.create({
        data: {
          studentId: studentId,
          type: "success",
          message: `Vote successfully recorded for student ID: ${studentId}`,
        },
      });

      return { status: 200, message: "Vote successful" };
    });

    return NextResponse.json({ message: result.message }, { status: result.status });

  } catch (error) {
    console.error("Vote submission error:", error);
    await prisma.log.create({
      data: {
        studentId: null, // Set to null as studentId might be invalid or not exist
        type: "backend_error",
        message: `System error during vote submission: ${error instanceof Error ? error.message : String(error)}`,
      },
    });
    return NextResponse.json({ message: "Internal Server Error during vote submission" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
