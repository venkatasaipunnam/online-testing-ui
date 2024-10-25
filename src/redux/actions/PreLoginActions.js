import axios from "axios";
import { APP_BASE_URL } from "../../api/BaseUrls";
import { PreLoginApi } from "../../api/PreLogin";

export const doLogin = async (data) => {
    console.log('Logging in with:', data, 'to the server : ', APP_BASE_URL, PreLoginApi.LoginEndPoint);
    const response = await axios.post(APP_BASE_URL + PreLoginApi.LoginEndPoint, data)
    return response;
}

export const doLogout = async (data) => {
    const response = await axios.post(APP_BASE_URL + PreLoginApi.LogoutEndPoint, String(data), {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}

export const forgetPassword = async (data) => {
    const response = await axios.get(APP_BASE_URL + PreLoginApi.ForgetPasswordEndPoint, {
        params: {
            'emailId':data
        },
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}

export const signUpUser = async (data) => {
    const response = await axios.post(APP_BASE_URL + PreLoginApi.SignUpEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response;
}