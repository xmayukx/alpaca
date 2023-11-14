"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChatBubbleIcon, FilePlusIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import axios from "axios";
import SubscriptionButton from "./SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";
// import {} from "react-icons/";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

export default function ChatSideBar({ chats, chatId, isPro }: Props) {
  // const _chats = chats.reverse();
  const [loading, setLoading] = useState(false);
  const handleSubscription = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      console.log(response.data);
      window.location.href = response.data.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="relative flex flex-col">
      <Link href={"/"}>
        <Button className="w-full border border-dashed border-white">
          <FilePlusIcon className="mr-2 w-4 h-4" />
          New Chat
        </Button>
      </Link>
      <div className="w-[17rem] h-[34.5rem] p-2 text-gray-200 bg-gray-900 overflow-scroll overflow-x-hidden">
        <div className="flex flex-col gap-2 mt-1">
          {chats.map((chat, key) => (
            <Link key={key} href={`/chat/${chat.id}`}>
              <div
                className={cn(
                  " rounded-lg p-2 text-slate-300 flex items-center",
                  {
                    " bg-blue-600 text-white": chat.id === chatId,
                    "hover:text-white": chat.id !== chatId,
                  },
                )}
              >
                <ChatBubbleIcon className=" mr-2" />
                <p className="w-full overflow-hidden text-sm truncate whitespace-nowrap text-ellipsis">
                  {chat?.pdfName}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" flex flex-col bg-white text-gray-800 p-4">
        <div className=" w-full flex items-center gap-5 justify-center text-base font-semibold transition-all">
          <Link href={"/"} className="hover:text-black">
            Home
          </Link>
          <Link href={"/"} className="hover:text-black">
            Source
          </Link>
        </div>
        <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  );
}
