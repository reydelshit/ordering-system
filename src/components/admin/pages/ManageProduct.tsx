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
import AddProductModal from '../components/manage-products/AddProductModal';
import { Link } from 'react-router-dom';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit3 } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { Input } from '@/components/ui/input';

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
  product_id: number;
  product_name: string;
  product_price: number;
  quantity: number;
  product_image: string;
};
export default function ManageProduct() {
  const [product, setProduct] = useState<Product[]>([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchProduct, setSearchProduct] = useState('' as string);

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
      <div className="flex justify-end w-full">
        <h1 className="font-bold text-2xl">Manage Product</h1>
      </div>

      {showAddProduct ? (
        <AddProductModal setShowAddProduct={setShowAddProduct} />
      ) : (
        <div className="w-[80%] mt-[5rem]">
          <div className="flex w-full justify-between items-center my-2">
            <Input
              onChange={(e) => setSearchProduct(e.target.value)}
              className="w-[20rem]"
              placeholder="search product.."
            />

            <Button
              onClick={() => setShowAddProduct(!showAddProduct)}
              className="self-end bg-green-700"
            >
              {showAddProduct ? 'Close' : 'Add Product'}
            </Button>
          </div>

          <Table>
            <TableCaption>A list of product added.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-black"></TableHead>
                <TableHead className="font-bold text-black">
                  Product Name
                </TableHead>
                <TableHead className="font-bold text-black">Price</TableHead>
                <TableHead className="font-bold text-black">Stocks</TableHead>
                <TableHead className="font-bold text-black">Amount</TableHead>
                <TableHead className="font-bold text-black ">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product
                .filter((prod) => prod.product_name.includes(searchProduct))
                .map((prod) => {
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
                      <TableCell>{prod.quantity}</TableCell>
                      <TableCell>${prod.product_price}</TableCell>
                      <TableCell>
                        <span className="flex gap-2">
                          <AlertDialog>
                            <AlertDialogTrigger className="cursor-pointer">
                              <RiDeleteBin5Line className="w-[2rem] h-[1.5rem]" />
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your the product and remove
                                  the data from our the server.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(prod.product_id)}
                                >
                                  Continue
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          <Link
                            to={`/admin/manage-product/update/${prod.product_id}`}
                          >
                            {' '}
                            <FiEdit3 className="w-[2rem] h-[1.5rem]" />
                          </Link>
                          <Link to={`/shop/${prod.product_id}`}>
                            {' '}
                            <AiOutlineEye className="w-[2rem] h-[1.5rem]" />
                          </Link>
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
