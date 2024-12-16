
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
import { useUpdateCategoryMutation } from "@/redux/features/category/categoryApi";
import { ICategory } from "@/types/modal";

import { Pen } from "lucide-react";
import { log } from "node:console";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface IProps {
  category: ICategory;
}

const EditCategory: React.FC<IProps> = ({ category }) => {


  const [isOpen, setIsOpen] = useState(false);
  const [updateCategory, { isSuccess, isError, error, isLoading }] = useUpdateCategoryMutation();
  const [formData, setFormData] = useState<{
    category: string;
    image: File | null;
  }>({
    category: category.label || "",
    image: null,
  });
  const id = category.id
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdateCategory = async () => {
    const { category, image } = formData;

    if (!category || !image) {
      toast.error("Please fill in all required fields (label and image)");
      return;
    }

    // Preparing FormData
    const payload = new FormData();
    payload.append("category", category);
    if (image) {
      payload.append("image", image); // Append image to FormData
    }

    try {
   
      await updateCategory({ categoryId: id, formData: payload }).unwrap();
      toast.success("Category updated successfully!");
      setIsOpen(false); // Close the dialog after successful update
    } catch (error) {
      toast.error("Error updating category!");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="center gap-[5px]">
          <Pen className="w-[15px]" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>Update the category details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category Name
            </Label>
            <Input
              name="category"
              id="category"
              value={formData.category}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Image
            </Label>
            <Input
              name="image"
              id="image"
              type="file"
              onChange={handleInputChange}
              className="col-span-3"
            />
            {formData.image && (
              <p className="col-span-3 text-sm text-gray-500">
                Selected File: {formData.image.name}
              </p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCategory}
            className="center gap-[5px]"
            disabled={isLoading} // Disable the button when loading
          >
            Save Changes
            {isLoading && <FaSpinner className="animate-spin" />} {/* Show spinner if loading */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
