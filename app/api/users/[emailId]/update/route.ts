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
  
  return NextResponse.json({title: 'Username already taken', description: 'Please choose a different username'}, {status: 400});

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
              ...codeforces
            },
            update: {
              ...codeforces
            },
          },
        },
        codechef: codechef && {
          upsert: {
            where: { user_email: emailId },
            create: {
              ...codechef
            },
            update: {
              ...codechef
            },
          },
        },
        leetcode: leetcode && {
          upsert: {
            where: { user_email: emailId },
            create: {
              ...leetcode
            },
            update: {
              ...leetcode
            },
          },
        }
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.error();
  }
}
