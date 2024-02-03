"use client";
import React, { useState } from "react";
import { Schema } from "../../amplify/data/resource";

const Sessions = ({
  addSession,
  kititem,
  paramsId,
}: {
  addSession: (content: string, kititem: Schema["KitItem"], paramsId: string) => void;
  kititem: Schema["KitItem"];
  paramsId: string;
}) => {
  const [session, setSession] = useState("");

  const add = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSession("");
    addSession(session, kititem, paramsId);
  };
  return (
    <form onSubmit={add} className="p-4 flex flex-col items-center gap-4">
      <input
        type="text"
        name="session"
        id="session"
        placeholder="add session"
        value={session}
        onChange={(e) => setSession(e.target.value)}
        className="border border-gray-200 text-gray-900 block p-2 rounded-lg"
      />
      <button type="submit" className="text-white bg-teal-600 rounded p-4">
        Submit
      </button>
    </form>
  );
};

export default Sessions;
