import React, { useEffect, useState } from 'react';
import './ProfilePage.css';
import { useSelector } from 'react-redux';
import { Avatar } from '@agney/react-avatar';
import { getUserExamMetaData } from '../../redux/actions/ExamActions';
import { LoadingPage } from '../../components/Loading/Loading';

const ProfilePage = (props) => {

    const { path } = props;

    const [isLoading, setIsLoading] = useState(true);
    const [examsMetaData, setExamsMetaData] = useState(undefined);
    const userState = useSelector((state) => state.user.value)

    const user = userState?.user;

    useEffect(() => {

        const fetchUsersExamMetaData = async () => {
            try {
                const response = await getUserExamMetaData();
                setExamsMetaData(response?.data);
            } catch (error) {
                console.error("Error fetching exam meta data", error);
            }
        };

        if (isLoading && examsMetaData === undefined) {
            fetchUsersExamMetaData();
        } else if (examsMetaData != undefined) {
            setIsLoading(false);
        }
    }, [isLoading, examsMetaData]);


    if (isLoading) {
        return <LoadingPage />;
    }

    return (
        <div className="user-profile-container">
            {/* <header className="profile-header">
                <h1>User Profile</h1>
            </header> */}
            <div className='user-profile-header'>
                <div className="profile-image">
                    <Avatar text={user.firstName[0]+user.lastName[0]} shape="circle" />
                </div>
                <div className="profile-details">
                    <h2 className='user-full-name'>{user.firstName} {user.lastName}</h2>
                    <p className='profile-user-email'>{user.emailId}</p>
                </div>
                <div className='profile-status'>
                    <p className='profile-active-status' style={{
                        color: user.isActive ? 'green' : 'white',
                        'background-color': user.isActive ? 'greenyellow' : 'rgba(243, 9, 11, 0.57)',
                        'padding': '5px 20px',
                        'margin': '0px',
                        'border-radius': '20px'
                    }}>{user.isActive ? 'Active' : 'In Active'}</p>
                    <p className='profile-locked-status'style={{
                        color: !user.isLocked && 'white',
                        'background-color': !user.isLocked && 'rgba(243, 9, 11, 0.57)',
                        'padding': '5px 20px',
                        'margin': '10px 0px 0px 0px',
                        'border-radius': '20px'
                        
                    }}>{!user.isLocked && 'Locked'}</p>
                </div>
            </div>

            <div className="profile-card">
                <h2>Personal Information</h2>
                <div className="profile-details">
                    <div className="detail-row">
                        <div className="detail-label">First Name:</div>
                        <div className="detail-value">{user.firstName}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Last Name:</div>
                        <div className="detail-value">{user.lastName}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Username:</div>
                        <div className="detail-value">{user.username}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Email:</div>
                        <div className="detail-value">{user.emailId}</div>
                    </div>
                </div>
            </div>

            <div className="profile-card">
                <h2>Exam Details</h2>
                <div className="profile-details">
                    <div className="detail-row">
                        <div className="detail-label">Exams Assigned:</div>
                        <div className="detail-value">{examsMetaData?.examsAssigned}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">Exams Attempted:</div>
                        <div className="detail-value">{examsMetaData?.examsAttempted}</div>
                    </div>
                </div>
            </div>
        </div >
    );

};

export default ProfilePage;

