import { PostAxiosInstant } from "../utils/axiosUtils";
import { RefreshToken } from "./userApi";
import { jwtDecode } from "jwt-decode";


const token = localStorage.getItem('token');
let decode, accessToken, ownerId;

if (token) {
  try {
    decode = jwtDecode(token);
    console.log(decode);
    const tokenData = JSON.parse(token);
    accessToken = tokenData ? tokenData.access : null;
    ownerId = decode.id;
  } catch (error) {
    console.error('Error decoding token:', error);
    // Handle the error as needed
  }
}


const CreateSaved = (values) => {
    return PostAxiosInstant.post('createsaved/', values, {
      withCredentials: true,  // Correct syntax
      headers: {
        Authorization: `Bearer ${accessToken}`, // Replace with your actual authentication token
      },
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        console.error('Error:', error.response);
        throw error; // You may want to rethrow the error here to propagate it further
      }
    });
  };

  const ListSaved = (user_id,searchQuery) => {
    return PostAxiosInstant.get(`listsaved/${user_id}/?search=${searchQuery}`,{
        withCredentials: true,  // Correct syntax
      headers: {
        Authorization: `Bearer ${accessToken}`, // Replace with your actual authentication token
      },
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        console.error('Error:', error.response);
        throw error; // You may want to rethrow the error here to propagate it further
      }
    });
  };
  

    const IsSave = (user_id,post_id) => {
        return PostAxiosInstant.get(`saveview/?user_id=${user_id}&post_id=${post_id}`,{
            withCredentials: true,  // Correct syntax
        headers: {
            Authorization: `Bearer ${accessToken}`, // Replace with your actual authentication token
        },
        }).catch((error) => {
        if (error.response.status === 401 || error.response.status === 403 ) {
            RefreshToken();
        } else {
            console.error('Error:', error.response);
            throw error; // You may want to rethrow the error here to propagate it further
        }
        });
    };          
  

const Unsave=(user_id,post_id)=>{
    return PostAxiosInstant.delete(`saveview/?user_id=${user_id}&post_id=${post_id}`,{
        withCredentials:true
    }).catch((error) => {
      if (error.response.status === 401) {
        RefreshToken();
      } else {
        error.response;
      }
    });
}



export {CreateSaved,ListSaved,IsSave,Unsave,

}