import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'; // Optional, for chevron icons

const Orders = () => {
  const [ordersGroupedByDate, setOrdersGroupedByDate] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userDataString = localStorage.getItem("userData");
        const userId = userDataString ? JSON.parse(userDataString).uuid : "Guest";
        const response = await axios.post("https://swyft-server.onrender.com/orders", { userId });

        // Group the cartItems by orderDate
        const groupedOrders = response.data.reduce((acc, order) => {
          const orderDate = new Date(order.orderDate).toLocaleDateString();
          if (!acc[orderDate]) {
            acc[orderDate] = [];
          }
          acc[orderDate].push(...order.cartItems);
          return acc;
        }, {});

        setOrdersGroupedByDate(groupedOrders);

      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);
  
  return (
    <div className="h-[100vh] md:ml-36 mb-10 lg:ml-48 xl:ml-64  overflow-y-auto bg-gray-100 py-10 px-5">
      <h1 className="lg:text-4xl md:text-2xl  text-xl  font-bold text-center text-gray-800  fixed">My Orders</h1>
      {Object.entries(ordersGroupedByDate).map(([date, items]) => (
        <Disclosure key={date} as="div" className="mb-5 mt-9 md:mt-18 lg:mt-14 bg-opacity-50 backdrop-blur-md  shadow-lg ">
          {({ open }) => (
            <>
              <Disclosure.Button className="w-full py-3 px-4 bg-gray-200  text-gray-800 rounded-lg flex justify-between items-center">
                <span className="text-xl font-semibold">{date}</span>
                <span>
                  {open ? (
                    <ChevronUpIcon className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                  )}
                </span>
              </Disclosure.Button>
              <Disclosure.Panel className="pt-4">
                <div className="grid grid-cols-1  px-3 py-1 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {items.map(item => (
                    <div key={item._id} className="bg-white  flex flex-col justify-center items-center  shadow-lg rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 mt-5 self-center md:self-center md:h-24 md:w-28 object-cover"
                      />
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-gray-800">{item.name}</h3>
                        <p className="text-gray-600 mt-2">
                          Quantity : <span className="font-semibold">{item.quantity}</span>
                        </p>
                        <p className="text-gray-600 mt-2">
                          Price : <span className="font-semibold">₹{item.price}</span>
                        </p>
                        <p className="text-gray-600 mt-2">
                          Discount : <span className="font-semibold">{item.discount}%</span>
                        </p>
                        <p className="text-gray-600 mt-2">
                          Total : <span className="font-semibold">₹{item.price - (item.price * item.discount) / 100}</span>
                        </p>
                        <p className="text-gray-500 text-sm mt-4">Ordered on {new Date(item.createdAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
};

export default Orders;