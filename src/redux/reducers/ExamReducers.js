import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    createExam: undefined,
    updateExam: undefined,
    exam: undefined,
    exams: [],
    userExamResponses: undefined,
    examGrades: undefined,
    studentGrades: undefined,
    examAnalysis: undefined

}

export const examSlice = createSlice({
    name: "exam",
    initialState: { value: initialState },
    reducers: {
        saveExam: (state, action) => {
            if (action.payload?.data){
                state.value.exam = action.payload?.data;
            } else {
                state.value.exam = undefined;
            }
        },
        saveExams: (state, action) => {
            if (action.payload?.data){
                state.value.exams = action.payload?.data;
            } else {
                state.value.exams = [];
            }
        },
        saveCreateExam: (state, action) => {
            state.value.createExam = action.payload.data;
        },
        saveUpdateExam: (state, action) => {
            state.value.updateExam = action.payload.data;
        },
        saveUserExamResponses: (state, action) => {
            state.value.userExamResponses = action.payload.data;
        },
        saveExamGrades: (state, action) => {
            state.value.examGrades = action.payload.data;
        },
        saveStudentGrades: (state, action) => {
            state.value.studentGrades = action.payload.data;
        },
        saveExamAnalysis: (state, action) => {
            state.value.examAnalysis = action.payload.data;
        },
    }
})

export const { saveExam, saveExams, saveCreateExam, saveUpdateExam, saveUserExamResponses, saveExamAnalysis, saveExamGrades, saveStudentGrades } = examSlice.actions;
export default examSlice.reducer;