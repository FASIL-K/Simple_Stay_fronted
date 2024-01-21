import React from 'react';
import { Avatar, Typography, Card, CardBody } from "@material-tailwind/react";
import { Link } from 'react-router-dom';

function ProfileNavigation() {
  return (
      <div className="w-1/4  bg-white">
        <div className="flex flex-col items-center justify-start p-6">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" className="mb-4 mt-10" />
          <Typography size="xl" fontWeight="bold">Fasil K</Typography>
          <Typography className="mb-4">fasilmlm10@gmail.com</Typography>

          <Card className="w-full flex flex-col items-center bg-blue-gray-50 h-full">
            <CardBody className="flex-grow">
              <ul className="list-none p-0 mb-4">
                <li className="mb-4">
                <Link to="/user/userprofile/myactivity/">
                    <Typography>My Activity</Typography>
                  </Link>
                </li>
                <li className="mb-4">
                  <Link to="/user/userprofile">
                    <Typography>Edit Profile</Typography>
                  </Link>
                </li>
              </ul>
              {/* Logout link outside the list */}
              <Link to="/logout">
                <Typography className="mt-20">Logout</Typography>
              </Link>
            </CardBody>
          </Card>
        </div>
      </div>
  );
}

export default ProfileNavigation;
