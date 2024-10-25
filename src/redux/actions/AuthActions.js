import axios from "axios";
import { APP_BASE_URL } from "../../api/BaseUrls";
import { AuthApis } from "../../api/Auth";
import { getSessionId } from "../../utils/Helper";

export const doAuth = async () => {
    const response = await axios.get(APP_BASE_URL + AuthApis.AuthEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': getSessionId(),
        },
    })
    return response;
}