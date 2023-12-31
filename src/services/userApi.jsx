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

const UserResendEmail = (values) => {
  return UserAxiosInstant.post("user/resend-verification-email/", values, {
    withCredentials: true,
  }).catch((error) => error.response);
};

// const UserGoogleSignup = (value) => {
//   const values = {
//     email: value.email,
//     name: value.given_name,
//     password: value.id,
//   };
//   return UserAxiosInstant.post("user/googleuser/", values, {
//     withCredentials: true,
//   });
// };

const UserGoogleSignup = (accessToken, userData) => {
  const values = {
    first_name :  userData.given_name,
    last_name : userData.family_name,
    email: userData.email,
    password: userData.id,
    access_token: accessToken,
  }
  console.log(values,'ifdfdfdfdfdfdfdfdfdchsbijsabjasbkjgcasuik');
  return UserAxiosInstant.post("user/googleuser/", values, {
    withCredentials: true,
  })
  .catch((error) => {
    throw error;
  });
};
const UserGoogleSignin = (value) => {
  const values = {
    email: value.email,
    password: value.id,
  };
  return UserAxiosInstant.post("user/token/", values, {
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
  UserResendEmail,
}