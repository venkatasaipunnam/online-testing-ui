import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; 
import { setSession } from '../../utils/Helper';

const initialState = {
    isUserAuthenticated: false,
    user: {},
    changePassword: {}
}

export const userSlice = createSlice({
    name: "user",
    initialState: { value: initialState },
    reducers: {
        saveUser: (state, action) => {

            state.value.isUserAuthenticated = action.payload.status === 200 ? true : false;
            state.value.user = action.payload.data;
            setSession(JSON.stringify(state?.value?.user?.session?.sessionId));
        },
        doLogout: (state, action) => {
            state.value.isUserAuthenticated = false;
            state.value.user = {}
            Cookies.remove("sessionid");
        },
    }
})

export const { saveUser, doLogout } = userSlice.actions;
export default userSlice.reducer;