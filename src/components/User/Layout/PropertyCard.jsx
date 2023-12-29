import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import { OwnerUrl } from "../../../Constants/Constants";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  export function HorizontalCard() {
    const [postData, setPostData] = useState(null);
  
    useEffect(() => {
      const apiUrl = `${OwnerUrl}post/`;
      axios
        .get(apiUrl)
        .then((response) => {
          setPostData(response.data);
          console.log(postData,"dadadasda");
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
    // Return null if postData is not available yet
    if (!postData) {
      return null;
    }
  
    return (
      <div>
        {postData.map((post) => (
          <Card
            key={post.id}
            className="w-full max-w-[68rem] flex-row shadow-2xl mb-36"
          >
            <CardHeader shadow={false} floated={false} className="m-0 shrink-0">
            <img
                src={
                    post.images.length > 0
                    ? `${import.meta.env.VITE_USER_URL}${
                        post.images[0].image
                      }`
                    : ""
                }
                alt="no image"
                className="h-[18rem] w-[18rem] object-cover rounded"
                />


            </CardHeader>
            <CardBody>
              <Typography variant="h3" color="blue-gray" className="mb-4 uppercase text-left">
                ₹ {post.monthly_rent}
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2 text-left">
                {post.bhk_type} {post.property_type} for {post.looking_to } in   {post.locality},{post.city},{post.house_name}
              </Typography>
              <Typography color="gray" className="mb-8 font-normal text-left">
                {post.description}
              </Typography>
              <a href="#" className="inline-block text-left">
                <Button variant="text" className="flex items-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }
  