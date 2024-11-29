export const ExamApis={
    createExamEndPoint:'/exam/create',
    updateExamEndPoint:'/exam/update',
    deleteExamEndPoint:'/exam/delete',
    createQuestionEndPoint:'/exam/question/create',
    updateQuestionEndPoint:'/exam/question/update',
    deleteQuestionEndPoint:'/exam/question/delete',
    createOptionEndPoint:'/exam/question/option/create',
    updateOptionEndPoint:'/exam/question/option/update',
    deleteOptionEndPoint:'/exam/question/option/delete',
    getAllAssignedExamsEndPoint: '/exam/assigned',
    getExamDetailsByIdEndPoint: '/exam/get',
    getAllCreatedExamsEndPoint:'/exam/created',
    AssignExamToUsersEndPoint:'/exam/assign',
    startExamEndPoint:'/exam/start',
    endExamEndPoint:'/exam/end',
    saveUserExamResponse: '/exam/response/save',
    getUserExamResponse: '/exam/response/get',
    getUserExamResponseByStudent: '/exam/response/student/get',
    SaveUserFeedbackEndPoint: '/exam/response/feedback/create',
    UpdateUserFeedbackEndPoint: '/exam/response/feedback/update',
    SaveStudentExamGrades: '/exam/response/student/grades/save',
    publishExamGrades: '/exam/response/result/publish',
    getExamGrades: '/exam/grade',
    getStudentGrades: '/exam/grade/student',
    getExamAnalysis: '/exam/analysis'
}