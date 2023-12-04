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
const SearchUser = (values) =>{
  return AdminAxiosInstant.get("/listuser/?search=", values, {withCredentials : true})
  .catch((error) => error.response);
}

const BlockUser = (id,values) =>{

  return AdminAxiosInstant.put("/user_block_unblock/" +id+ "/", values , {withCredentials : true})
  .catch((error) => error.response);
}

export {
  AdminSignin,ListUser,BlockUser,SearchUser
}