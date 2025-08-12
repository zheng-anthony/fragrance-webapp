"use client";

import { useState } from "react";

export default function handleCreateCollection({ collectionName: string }) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDescription, setNewCollectionDescription] = useState("");
  const [newCollectionPrivacy, setNewCollectionPrivacy] = useState("public");
  console.log("Creating collection:", {
    name: newCollectionName,
    description: newCollectionDescription,
    privacy: newCollectionPrivacy,
  });
  setIsCreateDialogOpen(false);
  setNewCollectionName("");
  setNewCollectionDescription("");
  setNewCollectionPrivacy("public");
}
