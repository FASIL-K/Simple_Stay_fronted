import React, { useEffect } from 'react';
import { Avatar, Typography, Card, CardBody, Button } from "@material-tailwind/react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom/dist';
import { logout } from '../../../../services/userApi';
import { resetState } from '../../../../redux/User';

const ProfileNavigation=({userDetails,setUserDetails}) => {
  if (!userDetails) {
    return null; // or any loading state or fallback UI
  }


  console.log(userDetails,"resoooooooooooooooooooo");

  const userInfo = useSelector((state) => state.user.userInfo)
  const dispatch = useDispatch()
  const navigate = useNavigate()

 const handlelogout = async () => {
    try {
      await logout();  // Call the logout API function
      dispatch(resetState()); // Call the resetState action
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      // Handle error, e.g., if the refresh token is invalid
      console.error(error);
    }
  };

  return (
      <div className="w-1/4  bg-white ml-4">
        <div className="flex flex-col items-center justify-start p-6">
          <Avatar src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="xxl" className="mb-4 mt-10" />
          <Typography size="xl" fontWeight="bold">{userDetails.name}</Typography>
          <Typography className="mb-4">{userDetails.email}</Typography>

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
              <Button onClick={handlelogout}>
              Logout
              </Button>
              
            </CardBody>
          </Card>
        </div>
      </div>
  );
}

export default ProfileNavigation;
