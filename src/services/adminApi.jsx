import { loginAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const AdminSignin = (values) => {
  return loginAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};



export {
  AdminSignin
}