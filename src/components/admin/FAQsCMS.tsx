"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from "lucide-react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

const FAQsCMS = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    is_published: true,
  });

  const fetchFAQs = async () => {
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      toast.error("Failed to fetch FAQs");
      console.error(error);
    } else {
      setFaqs(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFAQs();
  }, []);

  const resetForm = () => {
    setFormData({
      question: "",
      answer: "",
      category: "",
      is_published: true,
    });
    setEditingFAQ(null);
  };

  const handleOpenDialog = (faq?: FAQ) => {
    if (faq) {
      setEditingFAQ(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category || "",
        is_published: faq.is_published,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.question.trim() || !formData.answer.trim()) {
      toast.error("Question and answer are required");
      return;
    }

    if (editingFAQ) {
      const { error } = await supabase
        .from("faqs")
        .update({
          question: formData.question,
          answer: formData.answer,
          category: formData.category || null,
          is_published: formData.is_published,
        })
        .eq("id", editingFAQ.id);

      if (error) {
        toast.error(error.message || "Failed to update FAQ");
        console.error(error);
      } else {
        toast.success("FAQ updated successfully");
        handleCloseDialog();
        fetchFAQs();
      }
    } else {
      const maxOrder = faqs.length > 0 ? Math.max(...faqs.map((f) => f.display_order)) : 0;

      const { error } = await supabase.from("faqs").insert({
        question: formData.question,
        answer: formData.answer,
        category: formData.category || null,
        is_published: formData.is_published,
        display_order: maxOrder + 1,
      });

      if (error) {
        toast.error(error.message || "Failed to create FAQ");
        console.error(error);
      } else {
        toast.success("FAQ created successfully");
        handleCloseDialog();
        fetchFAQs();
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this FAQ?")) return;

    const { error } = await supabase.from("faqs").delete().eq("id", id);

    if (error) {
      toast.error(error.message || "Failed to delete FAQ");
      console.error(error);
    } else {
      toast.success("FAQ deleted successfully");
      fetchFAQs();
    }
  };

  const handleTogglePublish = async (faq: FAQ) => {
    const { error } = await supabase
      .from("faqs")
      .update({ is_published: !faq.is_published })
      .eq("id", faq.id);

    if (error) {
      toast.error(error.message || "Failed to update FAQ");
      console.error(error);
    } else {
      toast.success(faq.is_published ? "FAQ unpublished" : "FAQ published");
      fetchFAQs();
    }
  };

  const handleReorder = async (faq: FAQ, direction: "up" | "down") => {
    const currentIndex = faqs.findIndex((f) => f.id === faq.id);
    const swapIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (swapIndex < 0 || swapIndex >= faqs.length) return;

    const swapFaq = faqs[swapIndex];

    // Swap display orders
    const updates = [
      supabase
        .from("faqs")
        .update({ display_order: swapFaq.display_order })
        .eq("id", faq.id),
      supabase
        .from("faqs")
        .update({ display_order: faq.display_order })
        .eq("id", swapFaq.id),
    ];

    const results = await Promise.all(updates);
    const hasError = results.some((r) => r.error);

    if (hasError) {
      toast.error("Failed to reorder FAQs");
    } else {
      fetchFAQs();
    }
  };

  if (loading) {
    return <div className="p-6">Loading FAQs...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">FAQs Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingFAQ ? "Edit FAQ" : "Add New FAQ"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="question">Question *</Label>
                <Input
                  id="question"
                  value={formData.question}
                  onChange={(e) =>
                    setFormData({ ...formData, question: e.target.value })
                  }
                  placeholder="Enter the question"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="answer">Answer *</Label>
                <Textarea
                  id="answer"
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData({ ...formData, answer: e.target.value })
                  }
                  placeholder="Enter the answer (HTML supported)"
                  rows={6}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category (optional)</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  placeholder="e.g., Getting Started, Pricing, Features"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, is_published: checked })
                  }
                />
                <Label htmlFor="is_published">Published</Label>
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingFAQ ? "Update" : "Create"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {faqs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No FAQs yet. Click "Add FAQ" to create your first one.
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Order</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-24">Published</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq, index) => (
              <TableRow key={faq.id}>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleReorder(faq, "up")}
                      disabled={index === 0}
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={() => handleReorder(faq, "down")}
                      disabled={index === faqs.length - 1}
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="max-w-md">
                  <p className="truncate font-medium">{faq.question}</p>
                </TableCell>
                <TableCell>{faq.category || "-"}</TableCell>
                <TableCell>
                  <Switch
                    checked={faq.is_published}
                    onCheckedChange={() => handleTogglePublish(faq)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleOpenDialog(faq)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(faq.id)}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default FAQsCMS;
