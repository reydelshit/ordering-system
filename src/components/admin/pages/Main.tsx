import { Separator } from '@/components/ui/separator';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Cards from '../components/main/Cards';
import { PieChart } from '@mui/x-charts/PieChart';
import { set } from 'date-fns';
import { Link } from 'react-router-dom';

type Product = {
  product_names: string;
  total_quantity: number;
  payment_type: string;
  status: string;
  product_id: number;
  order_id: number;
  total_amount: number;
  user_id: number;
  status_id: number;
};

type Status = {
  status: string;
  count: number;
  color: string;
};

export default function Main() {
  const [product, setProduct] = useState([]);
  const [paidOrders, setPaidOrders] = useState<Product[]>([]);
  const [customers, setCustomers] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]) as any[];

  const getProduct = () => {
    axios.get('http://localhost/ordering/product.php/').then((res) => {
      console.log(res.data);
      setProduct(res.data);
    });
  };
  const getPaidOrders = () => {
    axios.get('http://localhost/ordering/orders-admin.php').then((res) => {
      console.log(res.data, 'paid');

      const paidOrders = res.data.map((product: Product) => ({
        ...product,
        total_quantity: Number(product.total_quantity),
      }));

      setPaidOrders(paidOrders);
    });
  };

  const getCustomersDetails = () => {
    axios.get('http://localhost/ordering/user.php').then((response) => {
      console.log(response.data, 'users');
      setCustomers(response.data);
    });
  };

  const getOrderStatus = () => {
    axios.get('http://localhost/ordering/pie-chart.php').then((res) => {
      const status = res.data.map(
        (stat: { count: number; status: string }, index: number) => {
          return {
            id: index,
            value: stat.count,
            name: stat.status,

            color:
              stat.status === 'Delivered'
                ? 'purple'
                : stat.status === 'On Delivery'
                ? 'green'
                : stat.status === 'Cancelled'
                ? 'red'
                : 'yellow',
          };
        },
      );
      console.log(status, 'status');
      setOrderStatus(status);
    });
  };

  useEffect(() => {
    getOrderStatus();
    getProduct();
    getPaidOrders();
    getCustomersDetails();
  }, []);

  return (
    <div className="p-4">
      <div className="text-start mb-4 h-[4rem] my-auto">
        <h1 className="font-bold text-2xl">Admin Main</h1>
        <p>Here is whats happening in your business!</p>
      </div>
      <Separator />
      <div className="grid grid-cols-4 my-2 gap-4">
        <Cards
          title="Total Products"
          value={`+${product.length}`}
          description=" Total number of products"
        />
        <Cards
          title="Total Revenue"
          value={` $${paidOrders.reduce(
            (total, prod) => total + prod.total_amount,
            0,
          )}`}
          description="  +20.1% from last month"
        />
        <Cards
          title="Total Orders"
          value={`+${paidOrders.length}`}
          description="+20.1% from last month"
        />

        <Cards
          title="Registered Customers"
          value={`${customers.length}`}
          description="Total number of registered customers"
        />
      </div>

      <div className="border-2 mt-[2rem] w-[55rem] p-4">
        <div className="w-full text-start">
          <h1 className="font-bold text-2xl">Order Summary</h1>
          <p className="text-sm">Check and manage orders</p>
        </div>

        <div className="flex w-full p-2 mt-[2rem] gap-[2rem]">
          <div className="flex items-center">
            <PieChart
              series={[
                {
                  data: orderStatus,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -90,
                  endAngle: 180,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={350}
              height={300}
            />
          </div>

          <div className="w-full">
            <Link to="/admin/orders">
              <div className="cursor-pointer text-start justify-between flex items-center font-bold h-[4rem] p-2 bg-orange-100 w-full rounded-lg  px-5">
                <h1 className="flex item-center">
                  <span className="text-orange-400 mr-2 text-xl">
                    {' '}
                    {orderStatus.map(
                      (stat: any) =>
                        stat.name.includes('Pending') && stat.value,
                    )}
                  </span>{' '}
                  New Orders
                </h1>
                <span className="font-bold text-3xl">{'>'}</span>
              </div>
            </Link>

            <div className="grid grid-cols-2 place-content-center place-items-center gap-7 mt-[2rem]">
              <span className="flex items-center gap-2">
                <div className="bg-green-600 rounded-sm p-4 w-[2rem]"></div> On
                Delivery
              </span>
              <span className="flex items-center gap-2">
                <div className="bg-purple-900 rounded-sm p-4 w-[2rem]"></div>{' '}
                Delivered
              </span>
              <span className="flex items-center gap-2">
                <div className="bg-red-600 rounded-sm p-4 w-[2rem]"></div>{' '}
                Cancelled
              </span>

              <span className="flex items-center gap-2">
                <div className="bg-yellow-400 rounded-sm p-4 w-[2rem]"></div>{' '}
                Pending
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between h-[6rem] mt-[2rem]">
          <div className="bg-green-600 text-white w-[16rem] rounded-lg text-start flex items-start flex-col justify-center p-4">
            <h1 className="font-bold text-2xl">
              {orderStatus.map(
                (stat: any) => stat.name.includes('On Delivery') && stat.value,
              )}
            </h1>
            <p>On Delivery</p>
          </div>

          <div className="bg-purple-900  text-white w-[16rem] rounded-lg text-start flex items-start flex-col justify-center p-4">
            <h1 className="font-bold text-2xl">
              {' '}
              {orderStatus.map(
                (stat: any) => stat.name.includes('Delivered') && stat.value,
              )}
            </h1>
            <p>Delivered</p>
          </div>

          <div className="bg-red-600  text-white w-[16rem] rounded-lg text-start flex items-start flex-col justify-center p-4">
            <h1 className="font-bold text-2xl">
              {' '}
              {orderStatus.map(
                (stat: any) => stat.name.includes('Cancelled') && stat.value,
              )}
            </h1>
            <p>Cancelled</p>
          </div>
        </div>
      </div>
    </div>
  );
}
