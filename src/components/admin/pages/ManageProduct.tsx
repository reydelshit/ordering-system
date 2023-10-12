import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AddProductModal from '../components/AddProductModal';

type Product = {
  product_id: number;
  product_name: string;
  product_price: number;
  product_qty: number;
  product_image: string;
};
export default function ManageProduct() {
  const [product, setProduct] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const getProduct = () => {
    axios.get('http://localhost/ordering/product.php/').then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`http://localhost/ordering/product.php/${id}`).then((res) => {
      console.log(res.data);
      getProduct();
    });
  };

  return (
    <div className="flex flex-col p-4 justify-center items-center">
      <Button
        onClick={() => setShowAddProduct(!showAddProduct)}
        className="self-end"
      >
        {showAddProduct ? 'Close' : 'Add Product'}
      </Button>
      {showAddProduct ? (
        <AddProductModal setShowAddProduct={setShowAddProduct} />
      ) : (
        <div className="w-[80%] mt-[5rem]">
          <Table>
            <TableCaption>A list of product added.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black"></TableHead>
                <TableHead className="font-bold text-black">
                  Product Name
                </TableHead>
                <TableHead className="font-bold text-black">Price</TableHead>
                <TableHead className="font-bold text-black">QTY</TableHead>
                <TableHead className="font-bold text-black">Amount</TableHead>
                <TableHead className="font-bold text-black">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product.map((prod) => {
                return (
                  <TableRow
                    className="text-start border-b-2"
                    key={prod.product_id}
                  >
                    <TableCell>
                      <img
                        className="w-[8rem] h-[6rem] object-cover rounded-md"
                        src={prod.product_image}
                        alt={prod.product_name}
                      />
                    </TableCell>
                    <TableCell>{prod.product_name}</TableCell>
                    <TableCell>{prod.product_price}</TableCell>
                    <TableCell>{prod.product_qty}</TableCell>
                    <TableCell>${prod.product_price}</TableCell>
                    <TableCell>
                      <span>
                        <p
                          className="cursor-pointer"
                          onClick={() => handleDelete(prod.product_id)}
                        >
                          delete
                        </p>
                        <p>update</p>
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
