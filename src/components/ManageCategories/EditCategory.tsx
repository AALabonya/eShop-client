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
import { ICategory } from "@/types/modal";

import { Pen } from "lucide-react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "sonner";

interface IProps {
  category: ICategory;
}

const EditCategory: React.FC<IProps> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    label: category.label || "",
    image: category.image || "", // Add more fields as required
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateCategory = async () => {
    const { label, image } = formData;

    if (!label || !image) {
      toast.error("Please fill in all required fields (label and image)");
      return;
    }

    const loadingToast = toast.loading("Updating category...");

    try {
      const payload = new FormData();
      payload.append("label", label);
      payload.append("image", image);


      toast.success("Category updated successfully!");
      setIsOpen(false);
    } catch (error) {
      toast.error("Error updating category!");
    } finally {
      toast.dismiss(loadingToast);
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
          <DialogDescription>
            Update the category details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="label" className="text-right">
              Label
            </Label>
            <Input
              name="label"
              id="label"
              value={formData.label}
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
              value={formData.image}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateCategory}
            className="center gap-[5px]"
            disabled={false} // Optionally handle loading state if required
          >
            Save Changes
            {false ? <FaSpinner className="animate-spin" /> : ""} {/* Handle spinner here if required */}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditCategory;
