"use client";
import React, { useEffect } from "react";
import { Input } from "./ui/input";
import { useChat } from "ai/react";
import { Button } from "./ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import MessageList from "./MessageList";
import { useQuery } from "@tanstack/react-query";
import { Message } from "ai";
import axios from "axios";
type ChatProps = {
  chatId: number;
};
export default function ChatComponent({ chatId }: ChatProps) {
  const { data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await axios.post<Message[]>("/api/get-messages", { chatId });
      console.log(res);
      return res.data;
    },
  });
  const { input, handleInputChange, handleSubmit, messages } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    initialMessages: data || [],
  });
  useEffect(() => {
    const messageContainer = document.getElementById("message-container");
    if (messageContainer) {
      messageContainer.scrollTo({
        top: messageContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  });
  return (
    <div
      className=" relative max-h-screen overflow-scroll overflow-x-hidden"
      id="message-container"
    >
      <div className=" sticky top-0 inset-x-0 p-2 h-fit">
        <h3 className="text-white text-xl font-bold">Chat</h3>
      </div>
      <MessageList messages={messages} />
      <form
        onSubmit={handleSubmit}
        className="flex sticky bottom-0 inset-x-0 px-2 py-4 bg-gray-900 text-white h-fit"
      >
        <Input
          className="w-full"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask any question regarding the pdf..."
        />
        <Button type="submit" className=" bg-gray-800 ml-2">
          <PaperPlaneIcon className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
