import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type Product = {
  cart_id: number;
  product_name: string;
  product_price: number;
  qty: number;
  quantity: number;
  product_image: string;
  status: string;
  product_id: number;
  order_id: number;
};

export default function ProfileOrdersTable({
  paidOrders,
}: {
  paidOrders: Product[];
}) {
  const orderGroups: { [orderId: string]: Product[] } = {} as {
    [orderId: string]: Product[];
  };
  paidOrders.forEach((order) => {
    const orderId = order.order_id;
    if (!orderGroups[orderId]) {
      orderGroups[orderId] = [];
    }
    orderGroups[orderId].push(order);
  });

  return (
    <Table className="w-[80%] mx-auto">
      <TableCaption>A list of your orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-center">Product</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="text-center">Status</TableHead>
          <TableHead className="text-center">Order ID</TableHead>

          <TableHead className="text-center w-[5rem]"></TableHead>
        </TableRow>
      </TableHeader>

      {Object.keys(orderGroups).map((orderId, index) => (
        <TableBody key={index}>
          {orderGroups[orderId].map((prod, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <img
                    className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                    src={prod.product_image}
                    alt={prod.product_name}
                  />
                </TableCell>
                <TableCell>{prod.product_name}</TableCell>
                <TableCell>${prod.product_price}</TableCell>
                <TableCell>{prod.quantity}</TableCell>
                <TableCell>${prod.product_price * prod.quantity}</TableCell>

                <TableCell>{prod.status}</TableCell>
                <TableCell>
                  {prod.order_id === prod.order_id ? prod.order_id : 'ngek'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="underline">
                      Actions
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="cursor-pointer">
                      <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                      <DropdownMenuItem
                        disabled={prod.status == 'Delivered' ? false : true}
                      >
                        <Link
                          to={`/shop/${prod.product_id}?orderid=${prod.order_id}`}
                        >
                          Rate now
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      ))}
    </Table>
  );
}
