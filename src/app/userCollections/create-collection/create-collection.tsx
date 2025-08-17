"use client";

import { useState, useTransition, type SetStateAction } from "react";
import { Plus } from "lucide-react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addCollection } from "~/actions/create-collection";

export default function CreateCollectionButton() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [privacy, setPrivacy] = useState("public");
  const [isOpen, setisOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();

  const createCollection = async (e: React.FormEvent) => {
    if (!session?.user.id) {
      await signIn();
      return;
    }
    await addCollection(name, description, privacy, session?.user.id!);
    router.refresh();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setisOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Collection
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Collection Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Winter Favorites"
            />
          </div>
          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setDescription(e.target.value)
              }
              placeholder="Describe your collection..."
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label>Privacy</Label>
            <Select value={privacy} onValueChange={setPrivacy}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="public">Public - Anyone can see</SelectItem>
                <SelectItem value="private">
                  Private - Only you can see
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setisOpen(false)}>
            Cancel
          </Button>
          <Button onClick={createCollection} disabled={!name.trim()}>
            Create Collection
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
