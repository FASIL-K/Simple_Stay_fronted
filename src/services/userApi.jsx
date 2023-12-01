// import axios from "axios";
// import { loginAxiosInstant } from "../utils/axiosUtils";
// import { Auth_url } from "";
// // ---------------------------------------Post Methoda-------------------------------//
// const userSignin = (values) => {
//   return loginAxiosInstant
//     .post("token/", values, { withCredentials: true })
//     .catch((error) => {
//       throw error;
//     });
// };

// // User Google signup and signIn
// const UserGoogleSignup = (value) => {
//   const values = {
//     first_name : value.given_name,
//     last_name : value.family_name,
//     email: value.email,
//     password: value.id,
//   }
//   return axios.post(`${Auth_url}googleauth/`, values, {
//     withCredentials: true,
//   })
//   .catch((error) => {
//     throw error;
//   });
// };


import { UserAxiosInstant } from "../utils/axiosUtils";

const UserSignin = (values) => {
  return UserAxiosInstant.post("user/token/", values, {
    withCredentials: true,
  }).catch((error) => error.response);
};

const UserSignup = (values) => {
  return UserAxiosInstant.post("user/register/", values, {
    withCredentials: true,
  });
};

const UserGoogleSignup = (value) => {
  const values = {
    email: value.email,
    name: value.given_name,
    password: value.id,
  };
  return UserAxiosInstant.post("googleuser", values, {
    withCredentials: true,
  });
};

const UserGoogleSignin = (value) => {
  const values = {
    email: value.email,
    password: value.id,
  };
  return UserAxiosInstant.post("/user/token/", values, {
    withCredentials: true,
  });
};






// User Token refresh
const TokenRefresh = (value) => {
  return UserAxiosInstant
    .post("token/refresh/", value, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};

export {
  UserSignin,
  UserSignup,
  UserGoogleSignup,
  UserGoogleSignin,
  TokenRefresh,
}