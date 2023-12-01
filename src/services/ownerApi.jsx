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

export {
  OwnerGoogleSignup,
  
}