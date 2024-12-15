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
import { TUser } from "@/redux/features/auth/authSlice";

import { useState } from "react";


interface IProps {
  user: TUser;
}

const DeleteUser: React.FC<IProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);



  // const confirmDelete = async () => {
  //   if (isLoading) return;

  //   if (!user?.id) {
  //     toast.error("User not found");
  //     return;
  //   }

  //   try {
  //     const res = await deleteUser(user?.id);
  //     const error = res.error as any;

  //     if (error) {
  //       toast.error(error?.data?.message || "Something went wrong");
  //       setIsOpen(false);
  //       return;
  //     }

  //     toast.success("User deleted successfully");
  //     setIsOpen(false);
  //   } catch (error) {
  //     toast.error("Something went wrong");
  //     setIsOpen(false);
  //   }
  // };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete 
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUser;
