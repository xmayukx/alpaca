"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ChatBubbleIcon, FilePlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
// import {} from "react-icons/";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
};

export default function ChatSideBar({ chats, chatId }: Props) {
  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900 overflow-scroll overflow-x-hidden">
      <Link href={"/"}>
        <Button className="w-full border border-dashed border-white">
          <FilePlusIcon className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-4">
        {chats.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn(
                " rounded-lg p-3 text-slate-300 flex items-center",
                {
                  " bg-blue-600 text-white": chat.id === chatId,
                  "hover:text-white": chat.id !== chatId,
                },
              )}
            >
              <ChatBubbleIcon className=" mr-2" />
              <p className=" w-full overflow-hidden text-sm  truncate whitespace-nowrap text-ellipsis">
                {chat?.pdfName}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className=" absolute bottom-4 left-4 bg-white w-fit h-5">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href={"/"}>Home</Link>
          <Link href={"/"}>Source</Link>
        </div>
      </div>
    </div>
  );
}
