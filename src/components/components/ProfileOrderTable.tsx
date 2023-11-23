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
import moment from 'moment';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
  created_at: string;
};

export default function ProfileOrdersTable({
  paidOrders,
  status,
}: {
  paidOrders: Product[];
  status: string;
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

  const handleStatus = (orderID: number) => {
    axios
      .put(`${import.meta.env.VITE_ORDERING_LOCAL_HOST}/status.php`, {
        status: 'Cancelled',
        order_id: orderID,
      })
      .then((res) => {
        console.log(res.data, 'status');
      });
  };

  return (
    <Table className="w-[80%] mx-auto">
      <TableCaption>A list of your orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Date</TableHead>
          <TableHead></TableHead>
          <TableHead className="text-center">Product</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-center">Total</TableHead>
          <TableHead className="text-center">Status</TableHead>

          <TableHead className="text-center w-[5rem]"></TableHead>
        </TableRow>
      </TableHeader>

      {Object.keys(orderGroups).map((orderId, index) => (
        <TableBody className="rounded-md mb-[5rem]" key={index}>
          <tr className="mt-[3rem] block"></tr>
          {orderGroups[orderId]
            .filter((prod) => prod.status.includes(status) || status === 'All')
            .map((prod, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="break-words w-[8rem]">
                    {index === 0 && (
                      <h2 className=" font-bold">Order ID {orderId}</h2>
                    )}
                    {moment(prod.created_at).format('LLLL')}
                  </TableCell>

                  <TableCell>
                    <img
                      className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                      src={prod.product_image}
                      alt={prod.product_name}
                    />
                  </TableCell>
                  <TableCell>{prod.product_name}</TableCell>
                  <TableCell>₱{prod.product_price}</TableCell>
                  <TableCell>{prod.quantity}</TableCell>
                  <TableCell>₱{prod.product_price * prod.quantity}</TableCell>

                  <TableCell>{prod.status}</TableCell>

                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="underline">
                        Actions
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="cursor-pointer">
                        <AlertDialog>
                          <AlertDialogTrigger className="text-sm p-2">
                            Cancel order
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Are you sure you want to cancel the order?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently cancelled the order. If mistake, you
                                can just order again.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleStatus(prod.order_id)}
                                disabled={
                                  prod.status.includes('On Delivery')
                                    ? true
                                    : false || prod.status.includes('Delivered')
                                    ? true
                                    : false
                                }
                              >
                                Cancel Order
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
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
