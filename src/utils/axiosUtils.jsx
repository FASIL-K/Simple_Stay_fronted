import axios from 'axios'
import { UserUrl, OwnerUrl,AdminUrl, SavedPostUrl} from '../Constants/Constants'
import { json } from 'react-router-dom'

const CreateAxiosClient = (baseURL) =>{
    const client = axios.create({
        baseURL,
        timeout : 8000,
        timeoutErrorMessage: "Request timed out please try again!!!" 
    })
    return client
}


const attachToken = (req,tokenName) => {
    let authToken = localStorage.getItem('token')
    const accessToken = JSON.parse(authToken)
    if(accessToken){
        req.headers.Authorization = `Bearer ${accessToken.access}`;
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


const PostAxiosInstant = CreateAxiosClient(SavedPostUrl)
PostAxiosInstant.interceptors.request.use(async (req) =>{
    const modifiedReq = attachToken(req, 'token')
    return modifiedReq
})


export {UserAxiosInstant,OwnerAxiosInstant,AdminAxiosInstant,PostAxiosInstant}

