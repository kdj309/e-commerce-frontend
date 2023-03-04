import React from "react";
import UserDashBoardWrapper from "./UserDashBoardWrapper";
import UserProfile from "./UserProfile";

export default function UserDashBoardPage() {
  return (
    <>
      <UserDashBoardWrapper>
        <UserProfile></UserProfile>
      </UserDashBoardWrapper>
    </>
  );
}
