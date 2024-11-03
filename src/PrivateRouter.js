import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { saveUser, doLogout } from "./redux/reducers/UserReducers";
import { doAuth } from "./redux/actions/AuthActions";
import { LoadingPage } from "./components/Loading/Loading";
import { Logout } from "./containers/LogoutContainer/Logout";
import Home from "./components/Home/Home";
import { getSessionId } from "./utils/Helper";
import ChangePassword from "./containers/ChangePassword/ChangePassword";
import Dashboard from "./components/Dashboard/Dashboard";
import ExamDetails from "./components/Tests/Exams/ExamDetails";

export const PrivateRouter = () => {
    const dispatch = useDispatch();
    const userState = useSelector((state) => state.user.value)
    const [isAuth, setIsAuth] = useState(userState?.isUserAuthenticated);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await doAuth();
                dispatch(saveUser(response));
                setIsAuth(true);
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                dispatch(doLogout());
                setIsLoading(false);
            }
        };
        const isAuthenticated = getSessionId();
        console.log("isAuthenticated : ", isAuthenticated);
        if (!isAuth && isAuthenticated) {
            fetchUser();
        } else {
            setIsLoading(false);
        }
    });

    if (isLoading) {
        return <LoadingPage />
    }
    return isAuth ? (
        <Routes >
            <Route path="/" exact element={<Navigate to='/home' />} />
            <Route path="/change-password" exact element={<ChangePassword />} />
            <Route path="/home" exact element={<Home path='/home' />} />
            <Route path="/exams" exact element={<Home path='/exams' />} />
            <Route path="/exam/:examId" exact element={<Home path='/exam-details' />} />
            <Route path="/exam/update/:examId" exact element={<Home path='/update-exam' />} />
            <Route path="/create-test" exact element={<Home path='/create-test' />} />
            
            <Route path="/dashboard" exact element={<Dashboard />} />
            {/* <Route path="/profile" exact element={<HomeComponent path='/profile' />} /> */}
            <Route path="/logout" exact element={<Logout />} />
            <Route path="*" element={<Navigate to='/home' />} />
        </Routes>
    ) : (
        <Navigate to="/login" />
    );
}