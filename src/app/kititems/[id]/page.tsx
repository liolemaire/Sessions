import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { revalidatePath } from "next/cache";
import { addSession, deleteSession } from "@/app/_actions/actions";
import AddSession from "@/components/AddSession";
import React from "react";
import { Schema } from "../../../../amplify/data/resource";

const KitItems = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const isSignedIn = await isAuthenticated();
  const { data: kititem } = await cookieBasedClient.models.KitItem.get(
    {
      id: params.id,
    },
    {
      authMode: "apiKey",
      selectionSet: ["id", "title"],
    }
  );
  const { data: allSessions } = await cookieBasedClient.models.Session.list({
    authMode: "apiKey",
    selectionSet: ["content", "kititems.id", "id"],
  });

  const sessions = allSessions.filter(
    (session) => session.kititems.id === params.id
  );

  return (
    <div className="flex flex-col items-center p-4 gap-4">
      <h1 className="text-2xl font-bold">KitItem Information:</h1>
      <div className="border rounded w-1/2 m-auto bg-gray-200 p-4 ">
        <h2>Title: {kititem.title}</h2>
      </div>

      {isSignedIn ? (
        <AddSession
          addSession={addSession}
          paramsId={params.id}
          kititem={kititem as Schema["KitItem"]}
        />
      ) : null}

      <h1 className="text-xl font-bold">Sessions:</h1>
      {sessions.map((session, idx) => (
        <div key={idx}>
          <div className="w-96 p-2 rounded border bg-yellow-100 flex justify-between">
            <div>{session.content}</div>
            <form
              action={async (formData) => {
                "use server";
                await deleteSession(formData);
                revalidatePath(`/kititems/${params.id}`);
              }}
            >
              <input type="hidden" name="id" id="id" value={session.id} />
              {isSignedIn ? (
                <button type="submit" className="text-red-950">
                  X
                </button>
              ) : null}
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KitItems;
