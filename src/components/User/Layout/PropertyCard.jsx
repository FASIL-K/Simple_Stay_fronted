import {
  Card,
  CardHeader,
  CardBody,
  Typography,
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
import { jwtDecode } from "jwt-decode";
import { PostAxiosInstant } from "../../../utils/axiosUtils";
import { FaHeart } from "react-icons/fa";
import { IsSave, Unsave } from "../../../services/postApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export function HorizontalCard({ postData, setPostData }) {
  console.log(postData, "posttttttttttttttttttttttttttttttttt");

  const [selectedPostId, setSelectedPostId] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);

  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const userId = decode.id;
  const tokenData = JSON.parse(token);
  const accessToken = tokenData ? tokenData.access : null;

  const CreateSaved = async (userId, postId) => {
    try {
      const response = await PostAxiosInstant.post(
        "createsaved/",
        { user: userId, post: postId },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your actual authentication token
          },
        }
      );
      // Handle the response as needed
      console.log("CreateSaved API Response:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        RefreshToken();
      } else {
        console.error("Error:", error.response);
        // You may want to rethrow the error here to propagate it further
        throw error;
      }
    }
  };

  const handleHeartClick = async (postId) => {

    setSelectedPostId(postId);

    try {
      const isSaved = await IsSave(userId, postId);
      if (isSaved.data.saved) {
        // If already saved, call the Unsave API to remove the post from wishlist
         await Unsave(userId, postId);

        // Update savedProperties state by removing the postId
        setSavedProperties((prevSavedProperties) =>
          prevSavedProperties.filter((id) => id !== postId)
        );

        toast.success("Post removed from wishlist!");
      } else {
        // If not saved, call the CreateSaved API with userId and postId
        await CreateSaved(userId, postId);

        // Update savedProperties state by adding the postId
        setSavedProperties((prevSavedProperties) => [
          ...prevSavedProperties,
          postId,
        ]);

        toast.success("Post added to wishlist!");
      }
    } catch (error) {
      console.error("Error handling heart click:", error);

      // Display an error toast message
      toast.error("Error processing your request. Please try again later.");
    }
  };

  useEffect(() => {
    // Use the initial postData to check saved status
    if (postData) {
      postData.forEach(async (post) => {
        try {
          const isSaved = await IsSave(userId, post.id);

          if (isSaved.data.saved) {
            // If already saved, update savedProperties state
            setSavedProperties((prevSavedProperties) => [
              ...prevSavedProperties,
              post.id,
            ]);
          }
        } catch (error) {
          console.error("Error checking saved status:", error);
        }
      });
    }
  }, [postData, userId]);

  useEffect(() => {
    const apiUrl = `${OwnerUrl}post/`;
    axios
      .get(apiUrl)
      .then((response) => {
        setPostData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
              {post.images.map((image) => (
                <img
                  key={image.id}
                  src={`${import.meta.env.VITE_USER_URL}${image.image}`}
                  alt={image.altText}
                  className="h-[18rem] w-[18rem] object-cover"
                />
              ))}
            </Carousel>

            <div className="flex justify-start ml-6 mb-6 gap-3">
              <Avatar
                src={post.owner_detail.profile_photo}
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
          </CardHeader>

          <CardBody>
            <Typography
              variant="h3"
              color="blue-gray"
              className="mb-4 uppercase text-left"
            >
              <div className="flex justify-end gap-7 text-blue-900">
                <IoShareSocialOutline
                  className="cursor-pointer"
                  onClick={() => handleHeartClick(post.id)}
                />
                {savedProperties.includes(post.id) ? (
                  <FaHeart onClick={() => handleHeartClick(post.id)} />
                ) : (
                  <FaRegHeart onClick={() => handleHeartClick(post.id)} />
                )}
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
