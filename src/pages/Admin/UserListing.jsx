import React from "react";
import UserList from "../../components/Admin/Layouts/UserList";
import AdminSideBar from "./AdminsideBar";

function UserLists() {
    return (<><div className="flex">
    <AdminSideBar />
    <UserList  /></div>
      
    </>
    )
}
export default UserLists;