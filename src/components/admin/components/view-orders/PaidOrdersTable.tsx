import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

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
  status_id: number;
};

export default function PaidOrdersTable({
  paidOrders,
  status,
}: {
  paidOrders: Product[];
  status: string;
}) {
  return (
    <div className="w-[100%] flex flex-col bg-white p-2 rounded-md border-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>

            <TableHead className="text-center">Price</TableHead>
            <TableHead className="text-center">Quantity</TableHead>
            <TableHead className="text-center">Total</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paidOrders.map((prod, index) => {
            return (
              <TableRow key={index}>
                <TableCell className="flex items-center gap-4">
                  <img
                    className="w-[4rem] h-[4rem] rounded-md object-cover bg-gray-100"
                    src={prod.product_image}
                    alt={prod.product_name}
                  />
                  {prod.product_name}
                </TableCell>

                <TableCell>₱{prod.product_price}</TableCell>
                <TableCell>{prod.quantity}</TableCell>
                <TableCell>₱{prod.product_price * prod.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <div className="self-end mt-[2rem] mr-[2rem] flex gap-2 flex-col items-start w-[10rem]">
        <span className="flex gap-[2rem] text-center w-full justify-between items-center bg-[#5d383a] text-white p-2 rounded-md">
          <h1>Total: </h1>
          <p className="font-bold text-start text-2xl">
            ₱
            {paidOrders.reduce(
              (total, prod) => total + prod.product_price * prod.quantity,
              0,
            )}
          </p>
        </span>

        <div className="flex gap-[2rem] text-center w-full justify-between">
          <h1>Status: </h1>
          <p className="font-bold">{status}</p>
        </div>
      </div>
    </div>
  );
}
