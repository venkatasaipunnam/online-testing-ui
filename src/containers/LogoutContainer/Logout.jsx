
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLogout } from "../../redux/reducers/UserReducers";
import { doLogout as logout } from "../../redux/actions/PreLoginActions";
import { useState } from "react";
import { getSessionId } from "../../utils/Helper";

export const Logout = () => {

    const dispatch = useDispatch();
    const [isLogout, setIsLogout] = useState(false);
    const userState = useSelector((state) => state.user.value)
    const navigate = useNavigate();

    useEffect( () => {
        const performLogout = async () => {
            try {
                await logout(getSessionId());
            } catch (error) {
                console.error("Error during logout", error);
            }
            dispatch(doLogout());
            setIsLogout(true);
            navigate('/login');
        };
        if(!isLogout) {
            performLogout();
        }
    }, [isLogout, dispatch, navigate]);

    return (<></>);
}