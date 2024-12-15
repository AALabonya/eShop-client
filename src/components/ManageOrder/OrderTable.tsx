import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent } from "../ui/card";
import NoTableDataFound from "../uiElements/NoTableDataFound";
import { IOrder } from "@/types/modal";


interface IProps {
  orders: IOrder[];
  isLoading: boolean;
}

const OrderTable: React.FC<IProps> = ({ orders, isLoading }) => {
  return (
    <Card className="relative">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Details</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           
              <TableRow >
                <TableCell className="font-medium">
               
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
          
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>
            
                </TableCell>
                <TableCell>
                 
        
                </TableCell>
              </TableRow>
   

            {!isLoading && orders.length === 0 && <NoTableDataFound span={7} />}
          </TableBody>
        </Table>
      </CardContent>

      {isLoading ? (
        <span className="absolute top-0 right-0 w-full h-full bg-[#ffffffc2] center">
          Loading...
        </span>
      ) : (
        ""
      )}
    </Card>
  );
};

export default OrderTable;
