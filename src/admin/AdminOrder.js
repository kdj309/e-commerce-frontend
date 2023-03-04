import React from "react";
import { MdDeleteOutline } from "react-icons/md";
export default function AdminOrder({ order, index, DeleteOrder }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <div>
          <h6>{new Date(order?.timestamp).toLocaleDateString()}</h6>
        </div>
      </td>
      <td>{`${order?.user?.firstname} ${order?.user?.lastname}`}</td>
      <td>
        <p
          className="p-2"
          style={{
            color: order.Status === "Received" ? "rgb(104 220 25)" : "#900",
            backgroundColor: "rgb(249 243 243)",
            width: "max-content",
          }}
        >
          {order?.Status}
        </p>
      </td>
      <td>{order?.products.length}</td>
      <td>{order?.amount}</td>
      <td>
        <button
          onClick={() => DeleteOrder(order?._id)}
          className="btn btn-danger btn-sm"
        >
          <MdDeleteOutline />
        </button>
      </td>
    </tr>
  );
}
