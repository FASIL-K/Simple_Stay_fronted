import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { OwnerUrl } from "../../../Constants/Constants";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "@material-tailwind/react";
import { FaRegHeart } from "react-icons/fa";
import { IoShareSocialOutline } from "react-icons/io5";
import { Avatar } from "@material-tailwind/react";
import { FiMessageSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

export function HorizontalCard({ postData, setPostData }) {
  // const [postData, setPostData] = useState(null);

  useEffect(() => {
    const apiUrl = `${OwnerUrl}post/`;
    axios
      .get(apiUrl)
      .then((response) => {
        setPostData(response.data);
        console.log(postData, "dadadasda");
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Return null if postData is not available yet
  if (!postData) {
    return (
      <div className="flex w-auto h-auto justify-center items-center">
        <div className="">
          <Typography>No Post found</Typography>
        </div>
      </div>
    );
  }

  return (
    <div>
      {postData.map((post) => (
        <Card
          key={post.id}
          className="w-full max-w-[68rem] flex-row shadow-2xl mb-36 rounded-3xl relative"
        >
          <CardHeader shadow={false} floated={false} className="m-0 shrink-0">
            <Carousel className="rounded-xl h-[18rem] w-[18rem] mb-7 ml-3 mt-2">
              {/* Map over post.images to create image elements */}
              {post.images.map((image) => (
                <img
                  key={image.id} // Assuming image objects have unique IDs
                  src={`${import.meta.env.VITE_USER_URL}${image.image}`}
                  alt={image.altText} // Use alt text if available
                  className="h-[18rem] w-[18rem] object-cover"
                />
              ))}
            </Carousel>

            <div className="flex justify-start ml-6 mb-6 gap-3">
              <Avatar
                src="https://docs.material-tailwind.com/img/face-2.jpg"
                alt="avatar"
                size="lg"
              />
              <div>
                <Typography variant="h6" color="black">
                  {post.owner_detail.email}
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
            {/* <img
              src={
                post.images.length > 0
                  ? `${import.meta.env.VITE_USER_URL}${post.images[0].image}`
                  : ""
              }
              alt="no image"
              className="h-[18rem] w-[18rem] object-cover rounded"
            /> */}
          </CardHeader>

          <CardBody>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-4 uppercase text-left"
            >
              <div className="flex justify-end gap-7 text-blue-900">
                <IoShareSocialOutline />

                <FaRegHeart />
              </div>
              <Link to={`/user/property/${post.id}`} className="cursor-pointer">
                ₹ {post.monthly_rent}
              </Link>
            </Typography>
            <Typography
              variant="h4"
              color="blue-gray"
              className="mb-2 text-left"
            >
              {post.bhk_type} {post.property_type} for {post.looking_to} in{" "}
              {post.locality},{post.city},{post.house_name}
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
    </div>
  );
}
