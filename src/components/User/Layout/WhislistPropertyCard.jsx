import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    CardFooter,
  } from "@material-tailwind/react";
  import { OwnerUrl } from "../../../constants/constants";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Carousel } from "@material-tailwind/react";
  import { FaHeart, FaRegHeart } from "react-icons/fa";
  import { IoShareSocialOutline } from "react-icons/io5";
  import { Avatar } from "@material-tailwind/react";
  import { FiMessageSquare } from "react-icons/fi";
  import { Link } from "react-router-dom";
  import { jwtDecode } from "jwt-decode";
  import { toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";
  import { ToastContainer } from "react-toastify";
import { Unsave } from "../../../services/postApi";
  
  export function HorizontalCard({ wishlist, setWhishlistData }) {
    console.log(wishlist,'posttttttttttttttttttttttttttttttttt');
  
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [savedProperties, setSavedProperties] = useState([]);
    
    const token = localStorage.getItem('token');
    const decode = jwtDecode(token);
    const userId = decode.user_id;
    const tokenData = JSON.parse(token);
    const accessToken = tokenData ? tokenData.access : null;

  
    
  
  
    if (wishlist.length===0) {
      return (
        <div className="flex w-auto h-auto justify-center items-center">
          <div className="">
            <Typography>No Post found</Typography>
          </div>
        </div>
      );
    }
  
    const handleHeartClick = async (propertyId) => {
        try {
            await Unsave(userId, propertyId);
            toast.success('Property removed from wishlist!');
            
            // Update the wishlist state after removal
            const updatedWishlist = wishlist.filter(post => post.post.id !== propertyId);
            setWhishlistData(updatedWishlist);
        } catch (error) {
            console.error('Error handling heart click:', error);
            toast.error('Error processing your request. Please try again later.');
        }
    };
    
    return (
      <div>
        {wishlist.map((post) => (
          <Card
            key={post.post.id}
            className="w-full max-w-[56rem] flex-row shadow-2xl mb-36 rounded-3xl relative"
          >
            <CardHeader shadow={false} floated={false} className="m-0 shrink-0">
              <Carousel className="rounded-xl h-[18rem] w-[18rem] mb-7 ml-3 mt-2">
                {post.post.images.map((image) => (
                  <img
                    key={image.id}
                    src={`${import.meta.env.VITE_USER1_URL}${image.image}`}
                    alt={image.altText}
                    className="h-[18rem] w-[18rem] object-cover"
                  />
                ))}
              </Carousel>
  
              <div className="flex justify-start ml-6 mb-6 gap-3">
                <Avatar
                  src={post.post.owner_detail.profile_photo}
                  alt="avatar"
                  size="lg"
                />
                <div>
                  <Typography variant="h6" color="black">
                    {post.post.owner_detail.email}
                  </Typography>
                  <Typography
                    color="gray"
                    className="-mt-1 flex justify-start"
                    variant="small"
                  >
                    Owner
                  </Typography>
                </div>
              </div>
            </CardHeader>
  
            <CardBody>
              <Typography
                variant="h3"
                color="blue-gray"
                className="mb-4 uppercase text-left"
              >
                <div className="flex justify-end gap-7 text-blue-900">
                  <IoShareSocialOutline className="cursor-pointer" />
                  <FaHeart
                    size={"1.5rem"}
                    className="cursor-pointer"
                    onClick={() => handleHeartClick(post.post.id)}
                    />     
                   </div>
                <Link to={`/user/property/${post.post.id}`} className="cursor-pointer">
                  ₹ {post.post.monthly_rent}
                </Link>
              </Typography>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-2 text-left"
              >
                {post.post.bhk_type} {post.post.property_type} for {post.post.looking_to} in{" "}
                {post.post.locality},{post.post.city},{post.post.house_name}
              </Typography>
              <Typography color="gray" className="mb-8 font-normal text-left">
                {post.description}
              </Typography>
            </CardBody>
            <div className="absolute gap-3 cursor-pointer bottom-9 right-20 w-[15rem] h-12 bg-light-green-400 rounded-md flex justify-center items-center text-white">
              <FiMessageSquare />
              <Typography>Message Owner</Typography>
            </div>
          </Card>
        ))}
        <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
      </div>
    );
  }
  