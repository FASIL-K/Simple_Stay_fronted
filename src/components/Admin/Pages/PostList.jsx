import React, { useEffect, useState } from "react";
import { VerifyPost, ListPosts, BlockPost } from "../../../services/adminApi";
import NotificationModal from "../../Modal/NotificationModal";
import { MagnifyingGlassIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

import { toast } from "react-toastify";
import axios from "axios";
import { AdminUrl } from "../../../Constants/Constants";
import PostDetailsModal from "../Layouts/PostModalDetails";

function PostLists() {
  

  const TABLE_HEAD = [
    "ID",
    "Furnish Type",
    "Property Type",
    "BHK",
    "Status",
    "Action",
    "Status",
    "Action",
  ];

  const [post, setPost] = useState();
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    console.log("Previous Post:", post);
    FetchPostInfo();
  }, []);

  const FetchPostInfo = async () => {
    try {
      const res = await ListPosts();
      const data = res.data;
      console.log("New Data:", data);
      setPost(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error("An error occurred while fetching user data.");
    }
  };

  //   const searchUser = async (keyword) => {
  //     if (keyword !== "") {
  //       try {
  //         const request = await axios.get(
  //           `${AdminUrl}searchuser/?search=${keyword}`
  //         );
  //         const userData = request.data;
  //         setUser(userData);
  //       } catch (error) {
  //         console.error("Error searching for users:", error);
  //         toast.error("An error occurred while searching for users.");
  //       }
  //     } else {
  //       // Handle case when keyword is empty
  //     }
  //   };
  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleModalClose = () => {
    setSelectedPost(null);
  };

  return (
    <div>
      <div className=" -mt-7 ">
        <Card className="h-full w-[62rem] ">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Post list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all Post
                </Typography>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                
              </Tabs>
              {/* <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  onChange={(e) => searchUser(e.target.value)}
                />
              </div> */}
            </div>
          </CardHeader>
          <CardBody className="overflow-scroll px-0">
            <table className="mt-4 w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {post && post.length > 0 ? (
                  post.map((singlePost, index) => {
                    const isLast = index === post.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={singlePost.id} onClick={() => handlePostClick(singlePost)}>
                      <td className={classes}>
                          <div className="flex items-center gap-3">
                            {singlePost.id}
                            <img
                              src={
                                singlePost.images.length > 0
                                  ? `${import.meta.env.VITE_USER_URL}${
                                      singlePost.images[0].image
                                    }`
                                  : "no image"
                              }
                              alt=""
                              className="h-10 w-10 object-cover rounded-t-lg"
                            />{" "}
                            <div className="flex flex-col"></div>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {singlePost.furnished_type}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {singlePost.looking_to}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {singlePost.bhk_type}
                            </Typography>
                          </div>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                singlePost.is_verify ? "verified" : "Unverifyed"
                              }
                              color={
                                singlePost.is_verify ? "green" : "blue-gray"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip
                            content={
                              singlePost.is_verify
                                ? "Verify Post"
                                : "Un verify Post"
                            }
                          >
                            <div style={{ minWidth: "80px" }}>
                              {" "}
                              {/* Set a fixed size for the container */}
                              {singlePost.is_verify ? (
                                <NotificationModal
                                  buttonText="UnVerify"
                                  modalTitle="Confirmation"
                                  modalHeading="Do you want to Unverify this Post ?"
                                  buttonColor="red"
                                  modalContent="Note : User will not be able to access this account"
                                  onOkClick={async () => {
                                    const data = { is_verify: false };
                                    await VerifyPost(singlePost.id, data);
                                    await FetchPostInfo()
                                }}
                                />
                              ) : (
                                <NotificationModal
                                  buttonText="Verify"
                                  modalTitle="Confirmation"
                                  modalHeading="Do you want to Unverify this Post ?"
                                  buttonColor="green"
                                  modalContent="Note : User will be able to access this account"
                                  onOkClick={async () => {
                                    const data = { is_verify: true };
                                    await VerifyPost(singlePost.id, data);
                                    await FetchPostInfo()
                                }}
                                />
                              )}
                            </div>
                          </Tooltip>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                singlePost.is_blocked_by_admin
                                  ? "blocked"
                                  : "active"
                              }
                              color={
                                singlePost.is_blocked_by_admin
                                  ? "green"
                                  : "blue-gray"
                              }
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Tooltip
                            content={
                              singlePost.is_blocked_by_admin
                                ? "Block Post"
                                : "Unblock Post"
                            }
                          >
                            <div style={{ minWidth: "80px" }}>
                              {" "}
                              {/* Set a fixed size for the container */}
                              {singlePost.is_blocked_by_admin ? (
                                <NotificationModal
                                  buttonText="UnBlock"
                                  modalTitle="Confirmation"
                                  modalHeading="Do you want to block this Post ?"
                                  buttonColor="green"
                                  modalContent="Note : User will not be able to access this account"
                                  onOkClick={async () => {
                                    const data = { is_blocked_by_admin: false };
                                    await BlockPost(singlePost.id, data);
                                  await  FetchPostInfo()
                                  }}
                                />
                              ) : (
                                <NotificationModal
                                  buttonText="Block"
                                  modalTitle="Confirmation"
                                  modalHeading="Do you want to Unblock this Post ?"
                                  buttonColor="red"
                                  modalContent="Note : Post will be able to access this account"
                                  onOkClick={async () => {
                                    const data = { is_blocked_by_admin: true };
                                    await BlockPost(singlePost.id, data);
                                   await FetchPostInfo()
                                     
                                  }}
                                />
                              )}
                            </div>
                          </Tooltip>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={TABLE_HEAD.length} className="p-4 text-center">
                      No posts found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              Page 1 of 10
            </Typography>
            <div className="flex gap-2">
              <Button variant="outlined" size="sm">
                Previous
              </Button>
              <Button variant="outlined" size="sm">
                Next
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      {selectedPost && (
        <PostDetailsModal
          isOpen={!!selectedPost}
          onClose={handleModalClose}
          post={selectedPost}
        />
      )}
    </div>
  );
}

export default PostLists;
