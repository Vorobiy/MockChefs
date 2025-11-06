"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { submitPost } from "./actions";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/app/(main)/SessionProvider";
import { Button } from "@/components/ui/button";
import "./styles.css";
import { useState } from "react";

export default function PostEditor() {
  const { user } = useSession();
  const [input, setInput] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    onUpdate({ editor }) {
      setInput(editor.getText());
    },
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });

  const inputs =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  async function onSubmit() {
    await submitPost(input);
    editor?.commands.clearContent();
    setInput("");
  }

  return (
    <div className="bg-card flex flex-col gap-5 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar
          avatarUrl={user.avatarUrl}
          className="hidden sm:inline"
          size={0}
          username={user.username}
        />
        <EditorContent
          editor={editor}
          className="bg-secondary text-card-foreground max-h-80 w-full overflow-y-auto rounded-2xl px-5 py-3"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!inputs.trim()}
          className="min-w-20"
        >
          Post
        </Button>
      </div>
    </div>
  );
}
