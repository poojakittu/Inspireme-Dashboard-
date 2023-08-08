import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Order = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://shy-cyan-bear-tie.cyclic.app/order/orders"
      );
      const data = await response.json();
      console.log(data, "offer");
      setData(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fields = [
    "Total Items",
    "User Name",
    "Total Price",
    "Status",
    "Ordered Time",
    "Action",
  ];

  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    fetchData();
    console.log(newStatus);
    updateOrderStatus(orderId, newStatus);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(
        `https://shy-cyan-bear-tie.cyclic.app/order/changestatus/${orderId}`,
        {
          orderStatus: newStatus,
        }
      );
      fetchData(); // Refetch the orders after updating status
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div>
      <Select placeholder="Filter option" variant="filled" mb={4}>
        <option value="recieved">Received Orders</option>
        <option value="dispatched">Dispatched Orders</option>
        <option value="delivered">Delivered Orders</option>
        <option value="canceled">Canceled Orders</option>
      </Select>
      <Table variant="simple">
        <Thead>
          <Tr>
            {fields.map((field) => (
              <Th key={field} backgroundColor="blue.400" color="white">
                {field}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item) => (
            <Tr key={item._id}>
              <Td>Items - {item.products.length}</Td>
              <Td>{item.username}</Td>
              <Td>{item.totalprice}</Td>
              <Td>
                <select
                  value={item.orderStatus}
                  onChange={(event) => handleStatusChange(event, item._id)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </Td>
              <Td>{item.createdAt.substring(0, 10)}</Td>
              <Td>
                <Link to={`/allorders/${item._id}`}>
                  <Button variant="outline">View Details</Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default Order;
