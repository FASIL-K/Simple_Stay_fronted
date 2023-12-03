import { AdminAxiosInstant } from "../utils/axiosUtils";
// ---------------------------------------Post Methoda-------------------------------//
const AdminSignin = (values) => {
  return AdminAxiosInstant
    .post("token/", values, { withCredentials: true })
    .catch((error) => {
      throw error;
    });
};

const ListUser = (values) =>{
  return AdminAxiosInstant.get("/listuser/", values, {withCredentials : true})
  .catch((error) => error.response);
}

const BlockUser = (id,values) =>{

  return AdminAxiosInstant.patch("/editdeleteuser/" +id+ "/", values , {withCredentials : true})
  .catch((error) => error.response);
}

export {
  AdminSignin,ListUser,BlockUser
}