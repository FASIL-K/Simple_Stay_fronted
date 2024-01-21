import React from 'react';
import ProfileNavigation from '../Layout/ProfileNavigation.jsx/ProfileNaviagtion';
import { Card, CardBody, Avatar, Typography, Button } from '@material-tailwind/react';
import { Input } from "@material-tailwind/react";

function UserProfiles() {
  const defaultName = "John Doe"; // Replace with your default name
  const defaultEmail = "john.doe@example.com"; // Replace with your default email

  return (
    <div className="w-screen">
      <div className="flex justify-center">
        {/* Existing ProfileNavigation component */}
        <ProfileNavigation />

        <Card className="w-2/3 h-3/4 mx-4 bg-blue-gray-50 shadow-2xl mt-11">
          <CardBody className="flex items-start">
            <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" className="mr-4" />
            <div className="flex justify-center items-center ml-11 mt-3 flex-col">
              <Input variant="static" label="Name" placeholder="Name" value={defaultName} />
              <div className="mt-8"></div>
              <Input variant="static" label="Email" placeholder="Email" value={defaultEmail} />
              <div className="mt-8"></div>
              <Input variant="static" label="Phone" placeholder="Phone" value="" />
              <Button color="blue" className="mt-4">
                Save Changes
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}

export default UserProfiles;
