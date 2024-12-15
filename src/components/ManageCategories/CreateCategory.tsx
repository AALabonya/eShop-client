import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateCategoryMutation } from "@/redux/features/category/categoryApi";


import { Plus } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

const CreateCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [createCategory] = useCreateCategoryMutation()
  const [formData, setFormData] = useState({
    category: "",
    image: "",
    label: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateCategory = async () => {
    const { category, image, label } = formData;

    if (!category || !image) {
      toast.error("Please fill in all required fields (category and image)");
      return;
    }

    const loadingToast = toast.loading("Creating category...");
    try {
      const payload = new FormData();
      payload.append("category", category);
      payload.append("image", image);
      if (label) payload.append("label", label);

      await createCategory(payload);
      toast.success("Category created successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error creating category!");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="center gap-[5px]">
          Add Category
          <Plus className="w-[15px]" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Category</DialogTitle>
          <DialogDescription>Create a new category below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category Name
            </Label>
            <Input
              name="category"
              id="category"
              placeholder="Enter category name"
              value={formData.category}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image URL
            </Label>
            <Input
              name="image"
              id="image"
              placeholder="Enter image URL"
              value={formData.image}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label (Optional)
            </Label>
            <Input
              name="label"
              id="label"
              placeholder="Enter label (optional)"
              value={formData.label}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateCategory} className="center gap-[5px]">
            Create
            <FaSpinner className="hidden" /> {/* Keep for future loading state */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
