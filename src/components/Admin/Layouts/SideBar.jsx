import React from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export function SideBar() {
  const navigate = useNavigate()
  
  const handledashboard = ()=>{
    navigate("/admin/adminhomepage/")
  }
  const handleUserList = () =>{
    navigate("/admin/users/")

  }
  const handlePostList = ()=>{
    navigate("/admin/posts/")
  }
  const handlePremiumSales =()=>{
    navigate("/admin/premuimsales/")
  }
  
  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate('/admin/adminlogin')
  }
 
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Admin Dashboard
        </Typography>
      </div>
      <List>
        
       
        <ListItem onClick={handledashboard}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
         
        </ListItem>
        <ListItem onClick={handleUserList}>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          User
          
        </ListItem>
        <ListItem onClick={handlePostList}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Post
        </ListItem>
        <ListItem onClick={handlePremiumSales}>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Premium Sales Report
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem onClick={handleLogout}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}