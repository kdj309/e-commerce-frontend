import React from "react";
import UserDashBoardWrapper from "./UserDashBoardWrapper";
import UserOrders from "./UserOrders";

export default function UserOrderPage() {
  return (
    <UserDashBoardWrapper>
      <UserOrders></UserOrders>
    </UserDashBoardWrapper>
  );
}
