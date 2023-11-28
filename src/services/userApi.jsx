import axios from "axios";
import { loginAxiosInstant } from "../utils/axiosUtils";
import { Auth_url } from "../constants/constants";
// ---------------------------------------Post Methoda-------------------------------//
const userSignin = (values) => {
  return loginAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};

// User Google signup and signIn
const UserGoogleSignup = (value) => {
  const values = {
    first_name : value.given_name,
    last_name : value.family_name,
    email: value.email,
    password: value.id,
  }
  return axios.post(`${Auth_url}googleauth/`, values, {
    withCredentials: true,
  })
  .catch((error) => {
    throw error;
  });
};





// User Token refresh
const TokenRefresh = (value) => {
  return userAxiosInstant
    .post("token/refresh/", value, {
      withCredentials: true,
    })
    .catch((error) => error.response);
};

export {
  userSignin,
  UserGoogleSignup,

  TokenRefresh,
}