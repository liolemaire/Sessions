//import Post from "@/components/Post";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
//import { onDeletePost } from "./_actions/actions";

export default async function Home() {
  const { data: kititems } = await cookieBasedClient.models.KitItem.list({
    selectionSet: ["content", "id"],
    authMode: "apiKey",
  });

  console.log("kititems", kititems);
  
  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10">List Of All Titles</h1>
      {kititems?.map(async (kititem, idx) => (
        <h1 key={idx}>{kititem.content}</h1>
      ))}
    </main>
  );
}