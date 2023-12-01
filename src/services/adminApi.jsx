import { AdminAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const AdminSignin = (values) => {
  return AdminAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};



export {
  AdminSignin
}