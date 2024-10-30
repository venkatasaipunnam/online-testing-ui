import ExamComponent from "../../components/Tests/Exams/ExamComponent";


const ExamContainer = (props) => {

    return (
        <div className="exam-container">
            <ExamComponent testData={props} />
        </div>
    );

};

export default ExamContainer;