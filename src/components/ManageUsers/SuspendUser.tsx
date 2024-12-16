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
import { IUser } from "@/types/modal";
import { Edit } from "lucide-react";

interface IProps {
  user: IUser;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; // Function to update state
  isOpen: boolean; // Boolean state to control modal visibility
}

const SuspendUser: React.FC<IProps> = ({ user, setIsOpen, isOpen }) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}> {/* Using open from Dialog component */}
      <DialogTrigger>
        <Button className="bg-[#80b500]" onClick={() => setIsOpen(true)}> {/* Trigger modal open from button */}
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm</DialogTitle>
          <DialogDescription>
            Are you sure you want to suspend this user: {user.email}?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}> {/* Close on Cancel */}
            Cancel
          </Button>
          <Button
            className="center gap-[6px]"
            onClick={() => {
              // Add suspend logic here
              setIsOpen(false); // Close modal after action
            }}
          >
            Suspend
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuspendUser;
