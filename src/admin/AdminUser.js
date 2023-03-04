import React from "react";
import { MdDeleteOutline } from "react-icons/md";
export default function AdminUser({ user, DeleteUser, index }) {
  return (
    <tr>
      <th scope="row">{index}</th>
      <td>
        <div className="d-flex flex-column gap-2">
          <h6>{`${user?.firstname} ${user?.lastname}`}</h6>
          <h6 className="small-text text-secondary">{user?.email}</h6>
        </div>
      </td>
      <td>{new Date(user?.createdAt).toLocaleDateString()}</td>
      <td>
        <button
          onClick={() => DeleteUser(user?._id)}
          className="btn btn-danger btn-sm"
        >
          <MdDeleteOutline />
        </button>
      </td>
    </tr>
  );
}
