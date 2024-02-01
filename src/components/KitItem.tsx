"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Schema } from "../../amplify/data/resource";

const KitItem = ({
  kititem,
  onDelete,
  isSignedIn,
}: {
  kititem: Pick<Schema["KitItem"], "title" | "id">;
  onDelete: (id: string) => void;
  isSignedIn: boolean;
}) => {
  const router = useRouter();
  const onDetail = () => {
    router.push(`kititems/${kititem.id}`);
  };
  return (
    <div className="border bg-gray-100 w-full p-4 rounded flex justify-between ">
      <button onClick={onDetail}>
        <div className="flex gap-2">
          <div>Title:</div>
          <div>{kititem.title}</div>
        </div>
      </button>
      <input type="hidden" name="id" id="id" value={kititem.id} />
      {isSignedIn ? (
        <button
          className="text-red-500 cursor-pointer"
          onClick={() => onDelete(kititem.id)}
        >
          X
        </button>
      ) : null}
    </div>
  );
};

export default KitItem;
