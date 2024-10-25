import Cookies from 'js-cookie'

export const getSessionId = () => {
    const sessionId = Cookies.get('sessionid');
    console.log('Session ID:', sessionId);
    return sessionId ? sessionId.replace(/"/g, '') : sessionId;
}

export const setSession = (sessionId) => {
    Cookies.set('sessionid', sessionId.replace(/"/g, ''), { expires: 1 });
}
