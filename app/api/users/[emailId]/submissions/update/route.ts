import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const validKeys = [
  'submission_id',
  'submitted_at',
  'submission_url',
  'platform_title',
];

const validProblemKeys = [
  'platform',
  'platform_title',
  'problem_link'
];

export async function PATCH(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  const { emailId } = params;
  const body = await req.json();
  try {
    const responses = [];
    for (const entry of body) {
        // Extract fields from the request body
        const validSubmission = Object.keys(entry)
        .filter(key => validKeys.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: entry[key],
          };
        }, {});
      
        const problem_title = entry.problem_title;
        const submission_id = entry.submission_id;
        const submitted_at = entry.submitted_at;

      // Extract fields from the codeforces object
      const validProblem = Object.keys(entry)
        .filter(key => validProblemKeys.includes(key))
        .reduce((obj, key) => {
          return {
            ...obj,
            [key]: entry[key],
          };
        }, {});
        // create a problem
        const updatedProblem = await prismadb.problem.upsert({
          where: { problem_title: problem_title },
          update: {...validProblem},
          create: { problem_title, ...validProblem },
        });
        // Update the user data
        const updateSubmission = await prismadb.submission.upsert({
          where: { submission_id: submission_id },
          include: { problem: true },
          create: {
            submission_id,
            problem_title : problem_title,
            user_email: emailId,
            submitted_at: submitted_at
          },
          update: {
            problem_title : problem_title,
            user_email: emailId,
            ...validSubmission,
          },
        });
        responses.push(updateSubmission);
      }
      return NextResponse.json(responses);
  } catch (error : any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
