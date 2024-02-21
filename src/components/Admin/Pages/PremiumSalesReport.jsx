import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
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
import { UserUrl } from "../../../constants/constants";
import PackageDetailsModal from "../Layouts/PremiumPackageDetailModal";
  
function PremiumSalesReports() {
  const [premiumSalesReport, setPremiumSalesReport] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    axios.get(`${UserUrl}premium/premiumsales/`).then((response) => {
        console.log(response,"rsssssssssssssss");
      setPremiumSalesReport(response.data);
    });
  }, []);

  const openModal = (rowData) => {
    setSelectedPost(rowData);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const TABLE_HEAD = [
    "ID",
    "User Email",
    "Package Name",
    "Price",
    "Exp Date",
    
  ];

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };
  const handleModalClose = () => {
    setSelectedPost(null);
  };
  return (
    <>
     <div>
      <div className=" -mt-7 ">
        <Card className="h-full w-[62rem] ">
          <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-8 flex items-center justify-between gap-8">
              <div>
                <Typography variant="h5" color="blue-gray">
                Premium Plan Sales Report
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                  See information about all Premium Plan
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
                {premiumSalesReport && premiumSalesReport.length > 0 ? (
                  premiumSalesReport.map((singlePost, index) => {
                    const isLast = index === premiumSalesReport.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={singlePost.id} onClick={() => handlePostClick(singlePost)}>
                      <td className={classes}>
                          <div className="flex items-center gap-3">
                            {singlePost.id}
                            
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
                              {singlePost.user_details.email}
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
                              {singlePost.package_details.name}
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
                              {singlePost.package_details.price}
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
                              {singlePost.exp_date}
                            </Typography>
                          </div>
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
        <PackageDetailsModal
          isOpen={!!selectedPost}
          onClose={handleModalClose}
          post={selectedPost}
        />
      )}
    </div>
    </>
  );
}

export default PremiumSalesReports;
