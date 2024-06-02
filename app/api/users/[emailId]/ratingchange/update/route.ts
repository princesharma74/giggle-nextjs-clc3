import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const validKeys = [
  'rating_change',
  'final_rating',
  'number_of_problems_solved',
  'end_time',
  'rank',
  'contest'
];

const validContestKeys = [
  'url',
  'platform',
  'start_time',
  'end_time',
  'total_questions'
];

export async function PATCH(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  const { emailId } = params;
  const body = await req.json();

  // Extract fields from the request body
  const { contest, ...rating_change } = body;

  if (!contest || !contest.title) {
    return NextResponse.json({ error: "Contest and contest title are required" }, { status: 400 });
  }

  const validRatingChange = Object.keys(rating_change)
    .filter(key => validKeys.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: rating_change[key],
      };
    }, {});

  const validContest = Object.keys(contest)
    .filter(key => validContestKeys.includes(key))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: contest[key],
      };
    }, {});

  const contest_title = contest.title;

  try {
        // Upsert Contest
        const upsertedContest = await prismadb.contest.upsert({
          where: { title: contest_title },
          update: validContest,
          create: { title: contest_title, ...validContest }
        });
    
        // Upsert RatingChange
        const updatedRatingChange = await prismadb.ratingChange.upsert({
          where: { 
              identifier: {
                  contest_title, 
                  user_email: emailId
              }
          }, // Use separate fields for contest_title and user_email
          include: { contest: true },
          update: {
            ...validRatingChange,
            contest: upsertedContest && {
              connect: { title: contest_title }
            }
          },
          create: {
            ...validRatingChange,
            contest: upsertedContest && {
              connect: { title: contest_title }
            },
            user: {
              connect: { email: emailId }
            }
          }
        });

    return NextResponse.json(updatedRatingChange);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}