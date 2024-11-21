import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    createExam: undefined,
    updateExam: undefined,
    exam: undefined,
    exams: [],
    userExamResponses: undefined,

}

export const examSlice = createSlice({
    name: "exam",
    initialState: { value: initialState },
    reducers: {
        saveExam: (state, action) => {
            console.log('Saving exam:', action.payload);
            if (action.payload?.data){
                state.value.exam = action.payload?.data;
            } else {
                state.value.exam = undefined;
            }
        },
        saveExams: (state, action) => {
            console.log('Saving exams:', action.payload);
            if (action.payload?.data){
                state.value.exams = action.payload?.data;
            } else {
                state.value.exams = [];
            }
        },
        saveCreateExam: (state, action) => {
            console.log('Saving Create exam:', action.payload);
            state.value.createExam = action.payload.data;
        },
        saveUpdateExam: (state, action) => {
            console.log('Saving Update exam:', action.payload);
            state.value.updateExam = action.payload.data;
        },
        
        saveUserExamResponses: (state, action) => {
            state.value.userExamResponses = action.payload.data;
        },
    }
})

export const { saveExam, saveExams, saveCreateExam, saveUpdateExam, saveUserExamResponses } = examSlice.actions;
export default examSlice.reducer;