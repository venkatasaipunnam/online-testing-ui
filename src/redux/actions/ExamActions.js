import axios from "axios";
import { APP_BASE_URL } from "../../api/BaseUrls";
import { ExamApis } from "../../api/Exam";
import { getSessionId } from "../../utils/Helper";

const default_headers = {
    'Content-Type': 'application/json',
    'sessionid': getSessionId(),
} 

export const getExamDetails = async (data) => {
    const response = await axios.get(APP_BASE_URL + ExamApis.getExamDetailsByIdEndPoint, {
        params: {
            examId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const getCreatedExamDetails = async (data) => {
    console.log(default_headers)
    const response = await axios.get(APP_BASE_URL + ExamApis.getAllCreatedExamsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const getAssignedExamDetails = async (data) => {
    console.log(default_headers)
    const response = await axios.get(APP_BASE_URL + ExamApis.getAllAssignedExamsEndPoint, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const updateExamDetails = async (data) => {
    const response = await axios.put(APP_BASE_URL + ExamApis.updateExamEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const updateQuestionDetails = async (data) => {
    const response = await axios.put(APP_BASE_URL + ExamApis.updateQuestionEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const updateOptionDetails = async (data) => {
    const response = await axios.put(APP_BASE_URL + ExamApis.updateOptionEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const createExam = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.createExamEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const createQuestion = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.createQuestionEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const createOption = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.createOptionEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const deleteQuestion = async (data) => {
    const response = await axios.delete(APP_BASE_URL + ExamApis.deleteQuestionEndPoint, {
        params: {
            questionId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const deleteOption = async (data) => {
    const response = await axios.delete(APP_BASE_URL + ExamApis.deleteOptionEndPoint, {
        params: {
            optionId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const deleteExam = async (data) => {
    const response = await axios.delete(APP_BASE_URL + ExamApis.deleteExamEndPoint, {
        params: {
            examId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const startExam = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.startExamEndPoint, parseInt(data), {        
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const submitExam = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.endExamEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
            'examsessionid': sessionStorage.getItem('examSessionId'),
        } ,
    })
    return response;
}

export const saveUserExamResponse = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.saveUserExamResponse, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
            'examsessionid': sessionStorage.getItem('examSessionId'),
        } ,
    })
    return response;
}

export const assignUserToExams = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.AssignExamToUsersEndPoint, data, {
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}

export const getUserExamResponses = async (data) => {
    const response = await axios.get(APP_BASE_URL + ExamApis.getUserExamResponse, {
        params: {
            examId: data
        },
        headers: {
            'Content-Type': 'application/json',
            'sessionid': sessionStorage.getItem('sessionId'),
        } ,
    })
    return response;
}