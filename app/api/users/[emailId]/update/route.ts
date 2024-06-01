import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { User } from "@/types";

const validKeys = [
  'email',
  'username',
  'password',
  'first_name',
  'last_name',
  'bio',
  'gender',
  'is_admin',
  'avatar',
  'rooms',
  'submissions',
  'codechef',
  'codeforces',
  'leetcode',
  'room',
  'messages',
  'rating_change'
];

const validCodeforcesKeys = [
  'codeforces_id',
  'verified',
  'rating',
  'global_rank',
  'number_of_contests',
  'number_of_questions'
];

const validCodechefKeys = [
  'codechef_id',
  'verified',
  'rating',
  'global_rank',
  'number_of_contests',
  'number_of_questions'
];

const validLeetcodeKeys = [
  'leetcode_id',
  'verified',
  'rating',
  'global_rank',
  'number_of_contests',
  'number_of_questions'
];


export async function PATCH(
  req: Request,
  { params }: { params: { emailId: string } }
) {
  const { emailId } = params;
  const body = await req.json();

  // Extract fields from the request body
  const { codeforces, codechef, leetcode, ...userData } = body;
  const validUserData = Object.keys(userData)
  .filter(key => validKeys.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: userData[key],
    };
  }, {});

  // Extract fields from the codeforces object
  const validCodeforces = Object.keys(codeforces)
  .filter(key => validCodeforcesKeys.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: codeforces[key],
    };
  }, {});

  // Extract fields from the codechef object
  const validCodechef = Object.keys(codechef)
  .filter(key => validCodechefKeys.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: codechef[key],
    };
  }, {});

  const validLeetcode = Object.keys(leetcode)
  .filter(key => validLeetcodeKeys.includes(key))
  .reduce((obj, key) => {
    return {
      ...obj,
      [key]: leetcode[key],
    };
  }, {});

  
  try {
    // Update the user data
    const updatedUser = await prismadb.user.update({
      where: { email: emailId },
      include: {
        codeforces: true,
        codechef: true,
        leetcode: true,
      },
      data: {
        ...validUserData,
        codeforces: codeforces && {
          upsert: {
            where: { user_email: emailId },
            create: {
              ...validCodeforces
            },
            update: {
              ...validCodeforces
            },
          },
        },
        codechef: codechef && {
          upsert: {
            where: { user_email: emailId },
            create: {
              ...validCodechef 
            },
            update: {
              ...validCodechef 
            },
          },
        },
        leetcode: leetcode && {
          upsert: {
            where: { user_email: emailId },
            create: {
              ...validLeetcode
            },
            update: {
              ...validLeetcode
            },
          },
        }
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error : any) {
    if (error.code === 'P2002' && error.meta?.target === 'User_username_key') {
      return NextResponse.json({ error: 'This username is already taken.' }, { status: 409 });
    }
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
