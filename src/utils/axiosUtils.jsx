import axios from 'axios';
import { UserUrl, OwnerUrl, AdminUrl, SavedPostUrl, Premiumurl } from '../constants/constant';

const CreateAxiosClient = (baseURL) => {
  const client = axios.create({
    baseURL,
    timeout: 8000,
    timeoutErrorMessage: 'Request timed out, please try again!!!',
  });
  return client;
};

const attachToken = (req, tokenName) => {
  let authToken = localStorage.getItem('token');
  const accessToken = JSON.parse(authToken);
  if (accessToken) {
    req.headers.Authorization = `Bearer ${accessToken.access}`;
  }
  return req;
};

const refreshToken = async () => {
  let authToken = localStorage.getItem('token');
  const refreshToken = JSON.parse(authToken)?.refresh;

  try {
    const res = await UserAxiosInstant.post(
      'user/token/refresh/',
      { refresh: refreshToken },
      { withCredentials: true }
    );

    if (res.status === 200) {
      const newToken = JSON.stringify(res.data);
      localStorage.setItem('token', newToken);
      return newToken;
    }
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

const handleUnauthorizedError = async (error, axiosInstance) => {
  if (error.response && (error.response.status === 403 || error.response.status === 401)) {
    try {
      const newToken = await refreshToken();
      error.config.headers.Authorization = `Bearer ${JSON.parse(newToken).access}`;
      return axiosInstance(error.config);
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      throw refreshError;
    }
  }
  return Promise.reject(error);
};

const UserAxiosInstant = CreateAxiosClient(UserUrl);
UserAxiosInstant.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'token');
  return modifiedReq;
});

UserAxiosInstant.interceptors.response.use(
  (response) => response,
  async (error) => handleUnauthorizedError(error, UserAxiosInstant)
);

const OwnerAxiosInstant = CreateAxiosClient(OwnerUrl);
OwnerAxiosInstant.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'token');
  return modifiedReq;
});

OwnerAxiosInstant.interceptors.response.use(
  (response) => response,
  async (error) => handleUnauthorizedError(error, OwnerAxiosInstant)
);

const AdminAxiosInstant = CreateAxiosClient(AdminUrl);
AdminAxiosInstant.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'token');
  return modifiedReq;
});

AdminAxiosInstant.interceptors.response.use(
  (response) => response,
  async (error) => handleUnauthorizedError(error, AdminAxiosInstant)
);

const PostAxiosInstant = CreateAxiosClient(SavedPostUrl);
PostAxiosInstant.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'token');
  return modifiedReq;
});

PostAxiosInstant.interceptors.response.use(
  (response) => response,
  async (error) => handleUnauthorizedError(error, PostAxiosInstant)
);

const PremiumAxiosInstant = CreateAxiosClient(Premiumurl);
PremiumAxiosInstant.interceptors.request.use(async (req) => {
  const modifiedReq = attachToken(req, 'token');
  return modifiedReq;
});

PremiumAxiosInstant.interceptors.response.use(
  (response) => response,
  async (error) => handleUnauthorizedError(error, PremiumAxiosInstant)
);


export { UserAxiosInstant, OwnerAxiosInstant, AdminAxiosInstant, PostAxiosInstant,PremiumAxiosInstant };
