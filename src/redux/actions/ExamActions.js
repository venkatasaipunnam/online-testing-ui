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
        headers: default_headers,
    })
    return response;
}

export const getCreatedExamDetails = async (data) => {
    const response = await axios.get(APP_BASE_URL + ExamApis.getAllCreatedExamsEndPoint, {
        headers: default_headers,
    })
    return response;
}

export const getAssignedExamDetails = async (data) => {
    const response = await axios.get(APP_BASE_URL + ExamApis.getAllAssignedExamsEndPoint, {
        headers: default_headers,
    })
    return response;
}

export const updateExamDetails = async (data) => {
    const response = await axios.put(APP_BASE_URL + ExamApis.updateExamEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const updateQuestionDetails = async (data) => {
    const response = await axios.put(APP_BASE_URL + ExamApis.updateQuestionEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const updateOptionDetails = async (data) => {
    const response = await axios.put(APP_BASE_URL + ExamApis.updateOptionEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const createExam = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.createExamEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const createQuestion = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.createQuestionEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const createOption = async (data) => {
    const response = await axios.post(APP_BASE_URL + ExamApis.createOptionEndPoint, data, {
        headers: default_headers,
    })
    return response;
}

export const deleteQuestion = async (data) => {
    const response = await axios.delete(APP_BASE_URL + ExamApis.deleteQuestionEndPoint, {
        params: {
            questionId: data
        },
        headers: default_headers,
    })
    return response;
}

export const deleteOption = async (data) => {
    const response = await axios.delete(APP_BASE_URL + ExamApis.deleteOptionEndPoint, {
        params: {
            optionId: data
        },
        headers: default_headers,
    })
    return response;
}