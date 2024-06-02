import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request
) {
  const body = await req.json();

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Array of data is required" }, { status: 400 });
  }

  try {
    const responses = [];

    for (const entry of body) {
      const {title, url, platform, start_time, end_time, total_questions} = entry;

      if (!title) {
        responses.push({ error: "Contest title are required" });
        continue; // Skip to the next entry
      }

      // Upsert Contest
      const upsertedContest = await prismadb.contest.upsert({
        where: { title: title },
        update: {
          title: title,
          url: url,
          platform: platform,
          start_time: start_time,
          end_time: end_time,
          total_questions: total_questions
        },
        create: {
          title: title,
          url: url,
          platform: platform,
          start_time: start_time,
          end_time: end_time,
          total_questions: total_questions
        }
      });

      responses.push(upsertedContest);
    }

    return NextResponse.json(responses);
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}
