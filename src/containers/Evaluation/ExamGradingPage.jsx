import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveUserExamResponses } from "../../redux/reducers/ExamReducers";
import { getUserExamResponses } from "../../redux/actions/ExamActions";
import { useParams } from "react-router-dom";
import { LoadingPage } from "../../components/Loading/Loading";


const ExamGradingPage = (props) => {

    const { examId, userId } = useParams();

    const dispatch = useDispatch();
    const userResponses = useSelector((state) => state.exam.userExamResponses)
    const [examsData, setExamsData] = useState(null);
    const [userResponse, setUserResponse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const filterAndMapResponses = (targetUserId) => {
        // Filter responses by target user ID
        const filteredResponses = examsData?.studentResponses?.filter(response => response.studentId === targetUserId);
      
        // Create a map with questionId as the key and response object as the value
        const responseMap = {};
        filteredResponses?.forEach(response => {
          responseMap[response.questionId] = response;
        });

        setUserResponse(responseMap);
      
        return responseMap;
    };

    useEffect(() => {
        const fetchCreatedExams = async () => {
            try {
                const response = await getUserExamResponses(examId);
                dispatch(saveUserExamResponses(response));
                console.log("Exams fetched successfully + ", response);
                setExamsData(response?.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error : ", error);
                setIsLoading(false);
            } finally {
                setIsLoading(false);
            }
        };
        if (!userResponses && isLoading) {
            fetchCreatedExams();
        } else {
            setExamsData(userResponses);
            filterAndMapResponses(userId);
            setIsLoading(false);
        }
    });

    if (isLoading) {
        return <LoadingPage />
    }

    return (
        <div>
            {userResponse && `${userResponse}`}
            This is the Exam Grading Page.
        </div>
    );
}


export default ExamGradingPage;