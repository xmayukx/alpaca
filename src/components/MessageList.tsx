import React from "react";
import { Message } from "ai/react";
import { cn } from "@/lib/utils";

type MessageListProps = {
  messages: Message[];
};

export default function MessageList({ messages }: MessageListProps) {
  if (!messages) return <></>;
  console.log(messages);
  return (
    <div className=" flex flex-col gap-2 px-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={cn(" flex", {
            "justify-end": message.role === "user",
            "justify-start": message.role === "system",
          })}
        >
          <div
            className={cn(
              "rounded-lg px-3 text-sm py-1",
              {
                " bg-gray-500 text-white": message.role === "user",
              },
              {
                " bg-gray-800 text-white": message.role === "system",
              },
            )}
          >
            <p>{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
