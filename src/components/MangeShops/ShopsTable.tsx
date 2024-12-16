import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IVendor } from "@/types/modal"; 
import NoTableDataFound from "../uiElements/NoTableDataFound";
import ToggleBlackListShop from "./ToggleBlackListShop"; // Import the new component

interface IProps {
  shops: IVendor[];
  isLoading: boolean;
  onDelete: (userId: string) => void; 
}

const ShopsTable: React.FC<IProps> = ({ shops, isLoading, onDelete }) => {
  console.log(shops, "shops");

  if (isLoading) {
    return <div>Loading...</div>; 
  }


  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Shop Logo</TableHead>
          <TableHead>Shop Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {shops?.map((shop) => (
          <TableRow key={shop.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={shop.vendor.logo || "/default-avatar.png"} /> 
                  <AvatarFallback>{shop.vendor.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </div>
            </TableCell>
            <TableCell className="max-w-[300px] truncate">
              {shop.vendor.name || "No shop name"}
            </TableCell>
            <TableCell>
              {shop.email || "No email"}
            </TableCell>
            <TableCell>
              {shop.vendor.description || "No description"}
            </TableCell>
            <TableCell>
            <span
  className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
    shop.status === "ACTIVE" && shop.vendor.isDeleted === false
      ? "bg-success/10 text-success"
      : shop.status === "ACTIVE" && shop.vendor.isDeleted === true
      ? "bg-destructive/10 text-destructive"
      : "bg-neutral/10 text-neutral"
  }`}
>
  {shop.status === "ACTIVE" && shop.vendor.isDeleted === false
    ? "Active"
    : shop.status === "ACTIVE" && shop.vendor.isDeleted === true
    ? "Restricted"
    : "Unknown"}
</span>

            </TableCell>
            <TableCell>
              {new Date(shop.createdAt).toLocaleDateString()}
            </TableCell>
            <TableCell>
              <div className="flex space-x-2">
                {/* Open Dialog on Delete Click */}
                <ToggleBlackListShop shop={shop} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ShopsTable;
