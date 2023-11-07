import PDFViewer from "@/components/PDFViewer";
import ChatComponent from "@/components/chat-component";
import ChatSideBar from "@/components/chat-sidebar";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type ChatProps = {
  params: {
    id: string;
  };
};
const Page = async ({ params: { id } }: ChatProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/sign-in");
  }
  const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
  if (!_chats) {
    return redirect("/");
  }
  console.log(_chats);
  if (!_chats.find((chat) => chat.id === parseInt(id))) {
    return redirect("/");
  }
  const currentChat = _chats.find((chat) => chat.id === parseInt(id));
  return (
    <div className="flex max-h-screen">
      <div className="flex w-full max-h-screen overflow-scroll overflow-x-hidden">
        {/* chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSideBar chats={_chats} chatId={parseInt(id)} />
        </div>
        {/* chat component */}
        <div className="max-h-screen p-4 overflow-scroll overflow-x-hidden overflow-y-hidden flex-[5]">
          <ChatComponent chatId={parseInt(id)} />
        </div>
        {/* pdf viewer */}
        <div className="flex-[5] border-l-4 border-l-slate-200 ">
          <PDFViewer pdf_url={currentChat?.pdfUrl || ""} />
        </div>
      </div>
    </div>
  );
};

export default Page;
