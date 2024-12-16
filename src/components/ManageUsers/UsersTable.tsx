import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SuspendUser from "./SuspendUser";
import DeleteUser from "./DeleteUser";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import { IUser } from "@/types/modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LucideMoreVertical } from "lucide-react";
import { useState } from "react";

interface IProps {
  users: IUser[];
  isLoading: boolean;
}

const UsersTable: React.FC<IProps> = ({ users, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.status}</TableCell>
            <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>
              <DropdownMenu>
               
                    <SuspendUser user={user} setIsOpen={setIsOpen} isOpen={isOpen} /> {/* Pass setIsOpen */}
                  
        <DeleteUser user={user} setIsOpen={setIsOpen} isOpen={isOpen}/>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
        {!isLoading && users.length === 0 && <NoTableDataFound span={7} />}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
