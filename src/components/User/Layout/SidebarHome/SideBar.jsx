import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import avatar from "../../../../assets/profileavatar.png";
import { Button } from "@material-tailwind/react";

export default function TemporaryDrawer({ isOpen, onClose }) {
  const list = (
    <Box
      sx={{ width: "350px" }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <List>
        <div>


        <div className="w-auto h-auto pt-4">
          <div className=" flex">
            <img className="w-16 h-16 ml-4" src={avatar} alt="" />
            <h3 className="font-semibold font-sans text-base  opacity-90 ml-3 mt-2 ">
              Hello 👋🏻
            </h3>
            <div>
            <Button className="bg-green-600 ml-14 w-24 h-11">Login</Button>
            </div>
            

          </div>
          <h3 className=" -mt-7 ml-20 text-sm opacity-95">
                fasil@gmail.com
            </h3>
        </div>
        </div>
      </List>
      <Divider />
     <div className="flex justify-center">

     
       <Button className="mt-2">
        LogOut
       </Button>
       </div>
    </Box>
  );

  return (
    <Drawer anchor="right" open={isOpen} onClose={onClose}>
      {list}
    </Drawer>
  );
}
