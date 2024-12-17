"use client"
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { Card, CardContent } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { IProduct } from "@/types/modal";
import { trimText } from "@/utils/trimText";
import Link from "next/link";
import ProductDelete from "./ProductDelete";
import DuplicateProduct from "./DuplicateProduct";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import UpdateProductView from "@/views/UpdateProductView";

interface IProps {
  products: IProduct[];
  isLoading: boolean;
}

const ProductTable: React.FC<IProps> = ({ products, isLoading }) => {
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = (product: IProduct) => {
    setProductToEdit(product);
    setEditDialogOpen(true);
  };


  
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[300px]">Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">
                  <p className="line-clamp-2">{trimText(product.name, 70)}</p>
                </TableCell>
                <TableCell>${product.price.toFixed(2)}</TableCell>
                <TableCell>{product.discount}%</TableCell>
           
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-[10px]">
                    <Link
                      href={`#`}
                      onClick={() => handleEditClick(product)}
                      className="w-[40px] h-[40px] bg-[#16d120] text-white rounded-full center hover:bg-[#1a7e1f]"
                    >
                      <MdEdit />
                    </Link>
                    <ProductDelete
                      productId={product.id}
                      productName={product.name}
                    />
                    <DuplicateProduct productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {!isLoading && products.length === 0 && (
              <NoTableDataFound span={5} />
            )}
          </TableBody>
        </Table>
      </CardContent>
      {productToEdit && (
        <UpdateProductView
          product={productToEdit}
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        />
      )}
    </Card>
  );
};

export default ProductTable;
