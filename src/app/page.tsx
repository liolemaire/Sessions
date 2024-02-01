import KitItem from "@/components/KitItem";
import { cookieBasedClient, isAuthenticated } from "@/utils/amplify-utils";
import { onDeleteKitItem } from "./_actions/actions";

export default async function Home() {
  const { data: kititems } = await cookieBasedClient.models.KitItem.list({
    selectionSet: ["title", "id"],
    authMode: "apiKey",
  });

  console.log("kititems", kititems);
  
  return (
    <main className="flex flex-col items-center justify-between p-24 w-1/2 m-auto">
      <h1 className="text-2xl pb-10">List Of All Titles</h1>
      {kititems?.map(async (kititem, idx) => (
        <KitItem
          onDelete={onDeleteKitItem}
          kititem={kititem}
          key={idx}
          isSignedIn={await isAuthenticated()}
        />
      ))}
    </main>
  );
}