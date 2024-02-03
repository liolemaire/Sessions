"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Schema } from "../../../amplify/data/resource";

export async function deleteSession(formData: FormData) {
  const id = formData.get("id")?.toString();
  if (!id) return;
  const { data: deletedSession } =
    await cookieBasedClient.models.Session.delete({
      id,
    });
  console.log("deleted", deletedSession);
}

export async function addSession(
  content: string,
  kititems : Schema["KitItem"],
  paramsId: string
) {
  if (content.trim().length === 0) return;
  console.log(kititems);
  const { data: session } = await cookieBasedClient.models.Session.create(    
  {
    kititems,
    content
  });

  console.log("got session", session);
  revalidatePath(`/kititem/${paramsId}`);
}

export async function onDeleteKitItem(id: string) {
  const { data, errors } = await cookieBasedClient.models.KitItem.delete({
    id,
  });

  console.log("data deleted", data, errors);
  revalidatePath("/");
}

export async function createKitItem(formData: FormData) {
  const { data } = await cookieBasedClient.models.KitItem.create({
    title: formData.get("title")?.toString() || "",
  });
  console.log("create kititem data", data);
  redirect("/");
}
