"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2, Edit2, FolderPlus } from "lucide-react";
import { deleteCategory, updateCategory } from "../_actions/category";

type Category = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type Props = {
  categories: Category[];
};

export function CategoryTable({ categories }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
    setError(null);
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const result = await updateCategory(id, editName);
      if (result.success) {
        setEditingId(null);
        setEditName("");
      } else {
        setError(result.error || "Failed to update category");
      }
    } catch (e) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCategory(id);
  };

  if (categories.length === 0) {
    return (
      <div className="rounded-xl border border-dashed p-12 text-center text-muted-foreground bg-card shadow-xs">
        <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <FolderPlus className="w-6 h-6 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-lg text-foreground mb-1">No categories yet</h3>
        <p className="text-sm max-w-xs mx-auto mb-4">
          Create some categories to group your skills properly.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="p-4 text-left font-medium text-muted-foreground">
                Name
              </th>
              <th className="p-4 text-left font-medium text-muted-foreground w-[200px]">
                Created
              </th>
              <th className="p-4 text-right font-medium text-muted-foreground w-[180px]">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((category) => (
              <tr key={category.id} className="hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  {editingId === category.id ? (
                    <div className="space-y-1">
                      <Input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="max-w-xs"
                        autoFocus
                        disabled={loading}
                      />
                      {error && (
                        <p className="text-xs font-medium text-destructive">{error}</p>
                      )}
                    </div>
                  ) : (
                    <span className="font-semibold text-foreground">
                      {category.name}
                    </span>
                  )}
                </td>
                <td className="p-4 text-muted-foreground">
                  {new Date(category.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="p-4">
                  <div className="flex gap-2 justify-end items-center">
                    {editingId === category.id ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => handleSaveEdit(category.id)}
                          disabled={loading}
                        >
                          {loading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingId(null)}
                          disabled={loading}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit2 size={16} />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Category</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{category.name}"?
                                All skills in this category will also be deleted. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <div className="flex gap-2 justify-end pt-4 border-t">
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(category.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </div>
                          </AlertDialogContent>
                        </AlertDialog>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
