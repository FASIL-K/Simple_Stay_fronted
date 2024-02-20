import React from "react";
import AdminSideBar from "./AdminsideBar";
import PostLists from "../../components/Admin/Pages/PostList";

function PostList() {
  return (
    <div>
      <>
        <div className="flex">
          <AdminSideBar />
          <PostLists />
        </div>
      </>
    </div>
  );
}

export default PostList;
