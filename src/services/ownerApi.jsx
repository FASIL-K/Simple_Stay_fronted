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





const OwnerPostCreation =(values)=>{
  console.log(values,'afsassafas');

  return OwnerAxiosInstant.post("createpost/",values,{
    withCredentials: true,
  });
};


const DeletePropertyImages = (id) =>{
  return OwnerAxiosInstant.delete("/editdeletepropertyimages/" +id+ "/" , {withCredentials:true})
}

const EditPropertyImages = (id , value) =>{
  return OwnerAxiosInstant.patch("/editdeletepropertyimages/" +id+ "/" , value, {withCredentials:true})
}

export {
  OwnerGoogleSignup,
  OwnerPostCreation,
  DeletePropertyImages,
  EditPropertyImages,
  
}

