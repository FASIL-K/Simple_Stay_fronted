import axios from 'axios'
import { UserUrl, OwnerUrl,AdminUrl} from '../Constants/Constants'

const CreateAxiosClient = (baseURL) =>{
    const client = axios.create({
        baseURL,
        timeout : 8000,
        timeoutErrorMessage: "Request timed out please try again!!!" 
    })
    return client
}


const attachToken = (req,tokenName) => {
    let authToken = localStorage.getItem(tokenName.access)
    if(authToken){
        req.headers.Authorization = `Bearer ${authToken}`;
    }
    return req
}


const UserAxiosInstant = CreateAxiosClient(UserUrl)
UserAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})


const OwnerAxiosInstant = CreateAxiosClient(OwnerUrl)
OwnerAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})

const AdminAxiosInstant = CreateAxiosClient(AdminUrl)
AdminAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})




export {UserAxiosInstant,OwnerAxiosInstant,AdminAxiosInstant}

