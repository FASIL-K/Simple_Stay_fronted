// import { loginAxiosInstant } from "../utils/axiosUtils";
// // ---------------------------------------Post Methoda-------------------------------//
// const customerSignin = (values) => {
//   return loginAxiosInstant
//     .post("token/", values, { withCredentials: true })
//     .catch((error) => {
//       throw error;
//     });
// };



// export {
//   customerSignin
// }

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { OwnerAxiosInstant } from "../utils/axiosUtils";

const OwnerGoogleSignup = (value) => {
  const values = {
    email: value.email,
    name: value.given_name,
    password: value.id,
  };
  return OwnerAxiosInstant.post("/googleowner/", values, {
    withCredentials: true,
  });
  
};





const OwnerPostCreation =(userId,values)=>{
  console.log(values,'afsassafas');

  return OwnerAxiosInstant.post("property-post/" +userId+ "/",values,{
    withCredentials: true,
  });
};


const DeletePropertyImages = (id) =>{
  return OwnerAxiosInstant.delete("/editdeletepropertyimages/" +id+ "/" , {withCredentials:true})
}

const EditPropertyImages = (id , value) =>{
  return OwnerAxiosInstant.patch("/editdeletepropertyimages/" +id+ "/" , value, {withCredentials:true})
  
}

const PropertyListing = (id) =>{
  return OwnerAxiosInstant.get("/property-post/" +id+ "/", {withCredentials:true,})
  .catch((error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      RemoveToken();
    } else {
      error.response;
    }
  });
}

const PropertyEdit = (userId,propertyId) =>{
  return OwnerAxiosInstant.get("/property-post/" +userId+ "/" +propertyId+ "/", {withCredentials:true,})
  .catch((error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      RemoveToken();
    } else {
      error.response;
    }
  });
}



const OwnerLogout = () =>{
  let authToken = localStorage.getItem('token');
  const refreshToken = JSON.parse(authToken);
  return OwnerAxiosInstant.post("logout/",{refresh_token : refreshToken.refresh}, {withCredentials:true})
  .catch((error) => {
      error.response;
  });
}






// ------------------------------------UPDATE-----------------------------
const DeactivateProperty = (id,propertyId,value) =>{
  return OwnerAxiosInstant.put("property-post/"+id+"/"+propertyId+"/",value, {withCredentials:true})
  .catch((error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      RemoveToken();
    } else {
      error.response;
    }
  });
}



const EditProperty = (userId,propertyId,values) =>{
  return OwnerAxiosInstant.put("/property-post/" +userId+ "/" +propertyId+ "/",values, {withCredentials:true,})
  .catch((error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      RemoveToken();
    } else {
      error.response;
    }
  });
}

const RemoveToken = () => {
    localStorage.removeItem('token');
};


export {
  OwnerGoogleSignup,
  OwnerPostCreation,
  DeletePropertyImages,
  EditPropertyImages,
  EditProperty,
  PropertyListing,
  DeactivateProperty,
  PropertyEdit,
  OwnerLogout,
}

