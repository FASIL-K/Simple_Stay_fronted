import { UserAxiosInstant } from "../utils/axiosUtils";
import { OwnerAxiosInstant } from "../utils/axiosUtils";
const UserSignin = async (values) => {
  try {
    const response = await UserAxiosInstant.post("user/token/", values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await RefreshToken();
      const retryResponse = await UserAxiosInstant.post("user/token/", values, {
        withCredentials: true,
      });
      return retryResponse.data;
    } else {
      throw error;
    }
  }
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

const UserGoogleSignup = (accessToken, userData) => {
  const values = {
    first_name: userData.given_name,
    last_name: userData.family_name,
    email: userData.email,
    password: userData.id,
    access_token: accessToken,
  };
  return UserAxiosInstant.post("user/googleuser/", values, {
    withCredentials: true,
  }).catch((error) => {
    throw error;
  });
};

const UserGoogleSignin = async (value) => {
  const values = {
    email: value.email,
    password: value.id,
  };
  try {
    const response = await UserAxiosInstant.post("user/token/", values, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await RefreshToken();
      const retryResponse = await UserAxiosInstant.post("user/token/", values, {
        withCredentials: true,
      });
      return retryResponse.data;
    } else {
      throw error;
    }
  }
};

export const getUserDetails = async (accessToken) => {
  try {
    const response = await OwnerAxiosInstant.get("user-details/", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await RefreshToken();
      const retryResponse = await OwnerAxiosInstant.get("user-details/", {
        withCredentials: true,
      });
      return retryResponse.data;
    } else {
      throw error;
    }
  }
};




const GetChatList = (sender_id , search) =>{
  return UserAxiosInstant.get(`chat/chatlistusers/${sender_id}/?search=${search}`, {withCredentials:true})
}

//Edit//------------------------------------------------------------------------

export const updateUserProfile = async (ownerId, form, accessToken) => {
  try {
    const response = await OwnerAxiosInstant.patch(
      `profileEdit/${ownerId}/`,
      form,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      await RefreshToken();
      const retryResponse = await OwnerAxiosInstant.patch(
        `profileEdit/${ownerId}/`,
        form,
        {
          withCredentials: true,
        }
      );
      return retryResponse.data;
    } else {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }
};

const logout = async () => {
  try {
    const authToken = localStorage.getItem("token");
    const refresh_token = JSON.parse(authToken).refresh;

    await UserAxiosInstant.post("user/logout/", { refresh_token });

    localStorage.removeItem("token");
  } catch (error) {
    console.error(error);
  }
};

// User Token refresh
const RefreshToken = async () => {
  let authToken = localStorage.getItem("token");
  const refreshtoken = JSON.parse(authToken);
  try {
    const res = await UserAxiosInstant.post(
      "user/token/refresh/",
      { refresh: refreshtoken.refresh },
      { withCredentials: true }
    );
    if (res.status === 200) {
      const token = JSON.stringify(res.data);
      localStorage.setItem("token", token);
    }
  } catch (error) {
    console.error(error);
  }
};

export {
  UserSignin,
  UserSignup,
  UserGoogleSignup,
  UserGoogleSignin,
  RefreshToken,
  UserResendEmail,
  logout,
  GetChatList,
};
