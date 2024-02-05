import React, { useState } from 'react';
import Example from '../Layout/Navbar/UserListingNavbar';
import { HorizontalCard } from '../Layout/PropertyCard';
import axios from 'axios';
import { UserUrl } from '../../../Constants/Constants';
import { Input } from '@material-tailwind/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { toast } from 'react-toastify';
import FilterBar from '../Layout/FilterBar';

function PostList() {
  // const [post, setPost] = useState([]);
  const [postData, setPostData] = useState(null);

  const searchPost = async (keyword) => {
    if (keyword !== "") {
      try {
        const request = await axios.get(
          `${UserUrl}user/searchpost/?search=${keyword}`
        );
        const postData = request.data;
        setPostData(postData);
      } catch (error) {
        console.error("Error searching for users:", error);
        toast.error("An error occurred while searching for users.");
      }
    } else {
      // Handle case when keyword is empty
    }
  }
  
  return (
    <div>
      <Example searchPost={searchPost} />
      <Input
                variant="standard"
                onChange={(e) => searchPost(e.target.value)}

                
                  icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                  
                />
      <div className="mt-3">
        <FilterBar postData={postData} setPostData={setPostData} />
        {/* <div className="text-center ">
          <HorizontalCard postData={postData} setPostData={setPostData}  />
        </div> */}
      </div>
    </div>
  );
}

export default PostList;
