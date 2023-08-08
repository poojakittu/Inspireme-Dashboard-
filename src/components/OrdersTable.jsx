import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";
const OrdersTable = ({ data, handleStatus }) => {
  // console.log('data: ', data);
  const fields = [
    "Total Items",
    "User Name",
    "Total Price",
    "Status",
    "Ordered Time",
    "Action",
  ];
  const [newStatus, setNewStatus] = useState("");
  console.log(newStatus);
  const updateOrderStatus = async () => {
    try {
      await axios.put(
        `https://shy-cyan-bear-tie.cyclic.app/order/changestatus/${data._id}`,
        {
            orderStatus: newStatus,
        }
      );
      setOrder((prevOrder) => ({ ...prevOrder, orderStatus: newStatus }));
      setNewStatus("");
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
  };

  return (
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
        {data?.map((item, i) => (
          <Tr key={item.id}>
            <Td>Items - {item?.products?.length}</Td>
            <Td>{item.username}</Td>
            <Td>{item.totalprice}</Td>
            <Td>{item.orderStatus}</Td>
            <Td>
              {" "}
              <p>Status: {item.orderStatus}</p>
              <select value={newStatus} onChange={handleStatusChange}>
                <option value="">Select Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Delivered">Delivered</option>
              </select>
            </Td>
            <button onClick={updateOrderStatus}>Update Status</button>
            <Td>{item.createdAt.substring(0, 10)}</Td>
            <Td>
              <Link to={`/allorders/${item._id}`}>
                <Button variant={"outline"}>View Details</Button>
              </Link>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrdersTable;
