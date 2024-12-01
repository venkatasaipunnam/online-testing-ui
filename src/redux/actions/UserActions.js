import axios from "axios";
import { APP_BASE_URL } from "../../api/BaseUrls";
import { UserApis } from "../../api/User";
import { getSessionId } from "../../utils/Helper";

const default_headers = {
    'Content-Type': 'application/json',
    'sessionid': getSessionId(),
} 

export const getUserProfile = async (data) => {
    const response = await axios.get(APP_BASE_URL + UserApis.getUserProfileEndPoint, {
        params: {
            userId: data
        },
        headers: default_headers,
    })
    return response;
}

export const updateUserProfile = async (data) => {
    const response = await axios.put(APP_BASE_URL + UserApis.updateUserProfileEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const changePassword = async (data) => {
    const response = await axios.post(APP_BASE_URL + UserApis.changePasswordEndpoint, data, {
        headers: default_headers,
    })
    return response;
}
