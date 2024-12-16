import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EditCategory from "./EditCategory";
import { ICategory } from "@/types/modal";
import Image from "next/image";
import CategoryDelete from "./CategoryDelete";

interface IProps {
  categories: ICategory[];
}

const CategoryTable: React.FC<IProps> = ({ categories }) => {
  // Filter out categories that are marked as deleted
  const activeCategories = categories.filter((category) => !category.isDeleted);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Image</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activeCategories.map((category) => (
          <TableRow key={category.id}>
            <TableCell className="font-medium">{category.label}</TableCell>
            <TableCell>
              <Image width={30} height={20} src={category.image} alt={category.name} />
            </TableCell>
            <TableCell className="flex gap-5">
              <div className="flex space-x-2">
                <EditCategory category={category} />
              </div>
              <div className="flex space-x-2">
                <CategoryDelete category={category} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CategoryTable;
