import React, { useEffect, useState } from "react";
// import { NavBar } from "../../Components/NavBar/NavBar";
// import Logo from "../../assets/logos/dc-black-transparent.png";


import { BlockUser, ListUser } from "../../../services/adminApi";
import NotificationModal from "../../Modal/NotificationModal";
// import "../../Components/NavBar/NavBar.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
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

function UserList() {
  const TABS = [
    {
      label: "All",
      value: "all",
    },
    {
      label: "Monitored",
      value: "monitored",
    },
    {
      label: "Unmonitored",
      value: "unmonitored",
    },
  ];

  const TABLE_HEAD = ["Member", "Name", "Email", "Status", ""];

  const [user, setUser] = useState([]);

  useEffect(() => {
    FetchUserInfo();

  }, []);

  const FetchUserInfo = async (e) => {
    try {
      const res = await ListUser();
      const data = res.data;
      const user = data.filter((user) => user.user_type === "user");
      setUser(user);
    } catch {
      console.log("error trying fetch");
    }
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        {/* <img src={Logo} className="w-20" alt="" /> */}
      </div>
      <div
        className="w-full sticky top-0 z-50
     transition-all duration-300 ease-in-out"
      >
        {/* <NavBar /> */}
      </div>

      <div className="mx-20 my-10">
        <Card className="h-full w-full">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                  Members list
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all members
                </Typography>
              </div>
              <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Button variant="outlined" size="sm">
                  view all
                </Button>
                <Button className="flex items-center gap-3" size="sm">
                  <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add
                  member
                </Button>
              </div>
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <Tabs value="all" className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab key={value} value={value}>
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
              <div className="w-full md:w-72">
                <Input
                  label="Search"
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                />
              </div>
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
                {user.map((user, index) => {
                  const isLast = index === user.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={user.name}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {user.id}
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
                            {user.name}
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
                            {user.email}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={user.is_active ? "active" : "blocked"}
                            color={user.is_active ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Block User">
                          <IconButton variant="text">
                            {user.is_active ? (
                              <NotificationModal
                                buttonText="Block"
                                modalTitle="Confirmation"
                                modalHeading="Do you want to block this user ?"
                                buttonColor="red"
                                modalContent="Note : User will not be able to access this account"
                                onOkClick={async () => {
                                  const data = { is_active: false };
                                  await BlockUser(user.id, data);
                                  await FetchUserInfo()

                                }}
                              />
                            ) : (
                              <NotificationModal
                                buttonText="Unblock"
                                modalTitle="Confirmation"
                                modalHeading="Do you want to Unblock this user ?"
                                buttonColor="red"
                                modalContent="Note : User will be able to access this account"
                                onOkClick={async () => {
                                  const data = { is_active: true };
                                  await BlockUser(user.id, data);
                                  await FetchUserInfo()

                                }}
                              />
                            )}
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                })}
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
    </div>
  );
}

export default UserList;
