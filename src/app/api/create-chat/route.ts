import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { loadS3IntoPinecone } from "@/lib/pinecone";
import { getS3Url } from "@/lib/s3";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { fileKey, fileName } = body;
    console.log(fileKey, fileName);
    await loadS3IntoPinecone(fileKey)
      .then((doc) => {
        console.log(doc);
      })
      .catch((e) => {
        console.log(e);
      });
    const chat_id = await db
      .insert(chats)
      .values({
        fileKey: fileKey,
        pdfName: fileName,
        pdfUrl: getS3Url(fileKey),
        userId: userId,
      })
      .returning({
        insertedId: chats.id,
      });

    console.log(chat_id);
    return NextResponse.json(
      { chat_id: chat_id[0].insertedId },
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
