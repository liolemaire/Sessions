"use server";

import { cookieBasedClient } from "@/utils/amplify-utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Schema } from "../../../amplify/data/resource";

// export async function deleteComment(formData: FormData) {
//   const id = formData.get("id")?.toString();
//   if (!id) return;
//   const { data: deletedComment } =
//     await cookieBasedClient.models.Comment.delete({
//       id,
//     });
//   console.log("deleted", deletedComment);
// }

// export async function addComment(
//   content: string,
//   kititem: Schema["KitItem"],
//   paramsId: string
// ) {
//   if (content.trim().length === 0) return;
//   const { data: comment } = await cookieBasedClient.models.Comment.create({
//     kititem,
//     content,
//   });

//   console.log("got comment", comment);
//   revalidatePath(`/kititem/${paramsId}`);
// }

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
