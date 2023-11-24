import ChatList from "@/components/ChatList";
import ChatPermissionError from "@/components/ChatPermissionError";
import React from "react";

interface Props {
  params: {};
  searchParams: {
    error: string;
  };
}

function ChatsPage({ searchParams: { error } }: Props) {
  return (
    <div className="flex-1 w-full flex flex-col max-w-6xl mx-auto">
      {/* Chat Permission Error */}
      {error && (
        <div className="m-2">
          <ChatPermissionError />
        </div>
      )}
      {/* ChatList */}
      <ChatList />
    </div>
  );
}

export default ChatsPage;
